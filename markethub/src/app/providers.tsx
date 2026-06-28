// ─────────────────────────────────────────────
// Providers — Client-Side Wrappers
// ─────────────────────────────────────────────
"use client";

import React, { useState, useEffect, type ReactNode } from "react";
import { AuthProvider, useAuth } from "@/context/auth-context";
import { ToastProvider, useToast } from "@/context/toast-context";
import { ToastContainer } from "@/components/ui/Toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// ── Theme Provider (dark mode toggle) ───────
function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check saved preference
    const saved = localStorage.getItem("markethub-theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  if (!mounted) return <>{children}</>;
  return <>{children}</>;
}

// ── Auth Loading Screen ─────────────────────
function AuthLoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-1 dark:bg-ink-0">
      <div className="flex flex-col items-center gap-4 animate-fadeIn">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20 animate-pulse">
          <span className="text-white font-display font-bold text-2xl">M</span>
        </div>
        <p className="text-sm text-ink-4 dark:text-surface-4 font-medium">Loading MarketHub...</p>
      </div>
    </div>
  );
}

// ── Auth Loader ─────────────────────────────
function AuthLoader({ children }: { children: ReactNode }) {
  const { loading, initialized } = useAuth();

  if (loading && !initialized) {
    return <AuthLoadingScreen />;
  }

  return <>{children}</>;
}

// ── Layout Wrapper ──────────────────────────
function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 lg:pt-[72px]">{children}</main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

// ── Combined Providers ──────────────────────
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <AuthLoader>
            <LayoutWrapper>{children}</LayoutWrapper>
          </AuthLoader>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
