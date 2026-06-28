// ─────────────────────────────────────────────
// Auth Context — Firebase Authentication
// Session persistence via browserLocalPersistence
// ─────────────────────────────────────────────
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  signOut as firebaseSignOut,
  setPersistence,
  browserLocalPersistence,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import type { User } from "@/types";

// ── Types ───────────────────────────────────
interface AuthContextValue {
  firebaseUser: FirebaseUser | null;
  user: User | null;
  loading: boolean;
  initialized: boolean;

  // Auth actions
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
  updateUsername: (name: string) => Promise<void>;
  updateAvatar: (url: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ── Mock user for demo mode ─────────────────
function createMockUser(email: string, name: string): User {
  return {
    id: "demo-user",
    firebaseUid: "demo-fb-uid",
    username: name || email.split("@")[0],
    email,
    avatar: `https://i.pravatar.cc/80?u=${email}`,
    bio: null,
    role: "USER",
    verified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// ── Persistence helpers (demo mode) ─────────
const DEMO_STORAGE_KEY = "markethub_demo_session";

function loadDemoSession(): { email: string; name: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(DEMO_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveDemoSession(email: string, name: string) {
  sessionStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify({ email, name }));
}

function clearDemoSession() {
  sessionStorage.removeItem(DEMO_STORAGE_KEY);
}

// ── Provider ────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // ── Listen to Firebase auth state ─────────
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      // DEMO MODE — restore from sessionStorage
      const session = loadDemoSession();
      if (session) {
        setUser(createMockUser(session.email, session.name));
      }
      setLoading(false);
      setInitialized(true);
      return;
    }

    // Set persistence to LOCAL (survives browser restart)
    setPersistence(auth, browserLocalPersistence).catch(console.error);

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        // In production, fetch User from PostgreSQL via API
        // For now, create a local representation
        const mapped: User = {
          id: fbUser.uid,
          firebaseUid: fbUser.uid,
          username: fbUser.displayName ?? fbUser.email?.split("@")[0] ?? "User",
          email: fbUser.email ?? "",
          avatar: fbUser.photoURL,
          bio: null,
          role: "USER",
          verified: fbUser.emailVerified,
          createdAt: fbUser.metadata.creationTime ?? new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setUser(mapped);
      } else {
        setUser(null);
      }
      setLoading(false);
      setInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  // ── Login ─────────────────────────────────
  const login = useCallback(async (email: string, password: string, remember = true) => {
    if (!isFirebaseConfigured || !auth) {
      // DEMO MODE
      saveDemoSession(email, email.split("@")[0]);
      setUser(createMockUser(email, email.split("@")[0]));
      return;
    }
    if (!remember) {
      await setPersistence(auth, browserLocalPersistence);
    }
    const cred = await signInWithEmailAndPassword(auth, email, password);
    // After Firebase login, sync user record in PostgreSQL via API
    await fetch("/api/auth/sync-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firebaseUid: cred.user.uid, email, username: cred.user.displayName }),
    }).catch(() => {});
  }, []);

  // ── Register ──────────────────────────────
  const register = useCallback(async (email: string, password: string, username: string) => {
    if (!isFirebaseConfigured || !auth) {
      // DEMO MODE
      saveDemoSession(email, username);
      setUser(createMockUser(email, username));
      return;
    }
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: username });
    await sendEmailVerification(cred.user);
    // Sync user to PostgreSQL
    await fetch("/api/auth/sync-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firebaseUid: cred.user.uid, email, username }),
    }).catch(() => {});
  }, []);

  // ── Google Login ──────────────────────────
  const loginWithGoogle = useCallback(async () => {
    if (!isFirebaseConfigured || !auth) {
      saveDemoSession("google@demo.com", "Google User");
      setUser(createMockUser("google@demo.com", "Google User"));
      return;
    }
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    await fetch("/api/auth/sync-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firebaseUid: cred.user.uid,
        email: cred.user.email,
        username: cred.user.displayName,
        avatar: cred.user.photoURL,
      }),
    }).catch(() => {});
  }, []);

  // ── Logout ────────────────────────────────
  const logout = useCallback(async () => {
    if (!isFirebaseConfigured || !auth) {
      clearDemoSession();
      setUser(null);
      return;
    }
    await firebaseSignOut(auth);
    setUser(null);
    setFirebaseUser(null);
  }, []);

  // ── Password Reset ────────────────────────
  const resetPassword = useCallback(async (email: string) => {
    if (!isFirebaseConfigured || !auth) return;
    await sendPasswordResetEmail(auth, email);
  }, []);

  // ── Email Verification ────────────────────
  const verifyEmail = useCallback(async () => {
    if (!isFirebaseConfigured || !auth?.currentUser) return;
    await sendEmailVerification(auth.currentUser);
  }, []);

  // ── Profile Updates ───────────────────────
  const updateUsername = useCallback(async (name: string) => {
    if (!isFirebaseConfigured || !auth?.currentUser) {
      setUser((prev) => (prev ? { ...prev, username: name } : prev));
      return;
    }
    await updateProfile(auth.currentUser, { displayName: name });
    setUser((prev) => (prev ? { ...prev, username: name } : prev));
  }, []);

  const updateAvatar = useCallback(async (url: string) => {
    if (!isFirebaseConfigured || !auth?.currentUser) {
      setUser((prev) => (prev ? { ...prev, avatar: url } : prev));
      return;
    }
    await updateProfile(auth.currentUser, { photoURL: url });
    setUser((prev) => (prev ? { ...prev, avatar: url } : prev));
  }, []);

  const value: AuthContextValue = {
    firebaseUser,
    user,
    loading,
    initialized,
    login,
    register,
    loginWithGoogle,
    logout,
    resetPassword,
    verifyEmail,
    updateUsername,
    updateAvatar,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
