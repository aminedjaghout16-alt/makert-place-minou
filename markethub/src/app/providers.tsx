// ─────────────────────────────────────────────
// Providers — Client-Side Wrappers
// ─────────────────────────────────────────────
"use client";

import React, { useState, useEffect, type ReactNode } from "react";
import { AuthProvider, useAuth } from "@/context/auth-context";
import { ToastProvider } from "@/context/toast-context";
import { ToastContainer } from "@/components/ui/Toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("markethub-theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  if (!mounted) return <>{children}</>;
  return <>{children}</>;
}

function AuthLoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-1 dark:bg-ink-0">
      <div className="flex flex-col items-center gap-4 animate-fadeIn">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20 animate-pulse">
          <span className="text-white font-display font-bold text-xl">M</span>
        </div>
        <p className="text-sm text-ink-4 dark:text-surface-4 font-medium">Loading MarketHub…</p>
      </div>
    </div>
  );
}

function AuthLoader({ children }: { children: ReactNode }) {
  const { loading, initialized } = useAuth();
  if (loading && !initialized) return <AuthLoadingScreen />;
  return <>{children}</>;
}

function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* pt-nav offsets the fixed navbar height */}
      <main className="flex-1 pt-nav">
        {children}
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

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
