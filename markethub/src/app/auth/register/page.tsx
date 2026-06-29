// ─────────────────────────────────────────────
// Register Page
// ─────────────────────────────────────────────
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/context/toast-context";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function RegisterPage() {
  const router = useRouter();
  const { register, loginWithGoogle } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast("Passwords do not match", "error");
      return;
    }
    if (form.password.length < 6) {
      toast("Password must be at least 6 characters", "error");
      return;
    }
    setLoading(true);
    try {
      await register(form.email, form.password, form.name);
      toast("Account created! Check your email for verification.");
      router.push("/");
    } catch (err: any) {
      toast(err?.message ?? "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-16 min-h-[80vh]">
      <div className="w-full max-w-md animate-fadeInUp">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-500/20">
            <span className="text-white font-display font-bold text-2xl">M</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-ink-0 dark:text-surface-1">Create your account</h1>
          <p className="text-ink-4 dark:text-surface-4 mt-2">Start buying and selling on MarketHub</p>
        </div>

        <div className="space-y-3 mb-6">
          <Button variant="secondary" onClick={() => loginWithGoogle()} className="w-full">
            🔵 Sign up with Google
          </Button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-ink-0/10 dark:border-surface-1/10" /></div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-surface-1 dark:bg-ink-0 text-ink-4 dark:text-surface-4">or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Full Name" value={form.name} onChange={update("name")} placeholder="John Doe" required />
          <Input label="Email" type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" required />
          <Input label="Password" type="password" value={form.password} onChange={update("password")} placeholder="Min. 6 characters" required />
          <Input label="Confirm Password" type="password" value={form.confirm} onChange={update("confirm")} placeholder="Repeat password" required />

          <label className="flex items-start gap-2 text-sm cursor-pointer">
            <input type="checkbox" required className="w-4 h-4 mt-0.5 rounded border-ink-0/20 text-brand-500" />
            <span className="text-ink-4 dark:text-surface-4">
              I agree to the{" "}
              <button type="button" className="text-brand-600 dark:text-brand-400 font-medium">Terms of Service</button>
              {" "}and{" "}
              <button type="button" className="text-brand-600 dark:text-brand-400 font-medium">Privacy Policy</button>
            </span>
          </label>

          <Button type="submit" loading={loading} className="w-full">
            Create Account
          </Button>
        </form>

        <p className="text-center text-sm text-ink-4 dark:text-surface-4 mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
