// ─────────────────────────────────────────────
// Input Component
// ─────────────────────────────────────────────
"use client";

import React, { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-ink-1 dark:text-surface-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-4 dark:text-surface-4">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-surface-0 dark:bg-ink-1 outline-none text-sm",
              "border-ink-0/10 dark:border-surface-1/10",
              "focus:border-brand-400 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10",
              "placeholder:text-ink-4 dark:placeholder:text-surface-4",
              "transition-all duration-200",
              !!icon && "pl-10",
              error && "border-red-400 dark:border-red-500",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
