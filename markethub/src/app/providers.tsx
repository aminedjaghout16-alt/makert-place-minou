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

function AuthLoader({ children }: { children: ReactNode }) {
  const { loading, initialized } = useAuth();
  if (loading && !initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 animate-pulse" />
      </div>
    );
  }
  return <>{children}</>;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <AuthLoader>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1" style={{ paddingTop: "68px" }}>
                {children}
              </main>
              <Footer />
              <ToastContainer />
            </div>
          </AuthLoader>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
