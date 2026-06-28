// ─────────────────────────────────────────────
// Login Page
// ─────────────────────────────────────────────
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/context/toast-context";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password, remember);
      toast("Welcome back!");
      router.push("/");
    } catch (err: any) {
      toast(err?.message ?? "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast("Signed in with Google");
      router.push("/");
    } catch (err: any) {
      toast(err?.message ?? "Google sign-in failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fadeInUp">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-500/20">
            <span className="text-white font-display font-bold text-2xl">M</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-ink-0 dark:text-surface-1">Welcome back</h1>
          <p className="text-ink-4 dark:text-surface-4 mt-2">Log in to your MarketHub account</p>
        </div>

        {/* Social Login */}
        <div className="space-y-3 mb-6">
          <Button variant="secondary" onClick={handleGoogle} loading={loading} className="w-full">
            🔵 Continue with Google
          </Button>
          <Button variant="secondary" onClick={handleGoogle} loading={loading} className="w-full">
            ⚫ Continue with GitHub
          </Button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-ink-0/10 dark:border-surface-1/10" /></div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-surface-1 dark:bg-ink-0 text-ink-4 dark:text-surface-4">or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-ink-0/20 text-brand-500 focus:ring-brand-500"
              />
              Remember me
            </label>
            <Link href="/auth/forgot" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" loading={loading} className="w-full">
            Log In
          </Button>
        </form>

        <p className="text-center text-sm text-ink-4 dark:text-surface-4 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
