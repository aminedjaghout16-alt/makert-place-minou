// ─────────────────────────────────────────────
// Forgot Password Page
// ─────────────────────────────────────────────
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/context/toast-context";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowLeftIcon } from "@/components/ui/Icons";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
      toast("Password reset email sent!");
    } catch (err: any) {
      toast(err?.message ?? "Failed to send reset email", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-16 min-h-[80vh]">
      <div className="w-full max-w-md animate-fadeInUp">
        <Link href="/auth/login" className="flex items-center gap-1.5 text-sm text-ink-4 dark:text-surface-4 hover:text-brand-500 mb-8 transition-colors">
          <ArrowLeftIcon size={16} /> Back to login
        </Link>

        {sent ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">📧</div>
            <h2 className="font-display text-2xl font-bold mb-2">Check your email</h2>
            <p className="text-ink-4 dark:text-surface-4 mb-6">
              We sent a password reset link to <strong>{email}</strong>
            </p>
            <Button variant="secondary" onClick={() => setSent(false)}>
              Try a different email
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold text-ink-0 dark:text-surface-1">Reset password</h1>
              <p className="text-ink-4 dark:text-surface-4 mt-2">
                Enter your email and we&apos;ll send you a reset link
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
              <Button type="submit" loading={loading} className="w-full">
                Send Reset Link
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
