// ─────────────────────────────────────────────
// Button Component
// ─────────────────────────────────────────────
"use client";

import React, { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
          "disabled:opacity-50 disabled:pointer-events-none",
          // Variants
          variant === "primary" && "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/20 hover:from-brand-600 hover:to-brand-700 hover:shadow-brand-500/30",
          variant === "secondary" && "bg-surface-0 dark:bg-ink-1 text-ink-0 dark:text-surface-1 border border-ink-0/10 dark:border-surface-1/10 hover:border-brand-300 dark:hover:border-brand-700",
          variant === "outline" && "border-2 border-brand-500 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/20",
          variant === "ghost" && "text-ink-3 dark:text-surface-3 hover:bg-ink-0/5 dark:hover:bg-surface-1/5 hover:text-ink-0 dark:hover:text-surface-1",
          variant === "danger" && "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20",
          // Sizes
          size === "sm" && "px-3 py-1.5 text-sm",
          size === "md" && "px-5 py-2.5 text-sm",
          size === "lg" && "px-8 py-3.5 text-base",
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
