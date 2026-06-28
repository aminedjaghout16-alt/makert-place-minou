// ─────────────────────────────────────────────
// Toast Display Component
// ─────────────────────────────────────────────
"use client";

import React from "react";
import { useToast } from "@/context/toast-context";
import { cn } from "@/lib/utils";

export function ToastContainer() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => dismiss(t.id)}
          className={cn(
            "pointer-events-auto animate-toast-in glass rounded-xl px-5 py-3 shadow-lg flex items-center gap-3 min-w-[280px] cursor-pointer",
            "border transition-all",
            t.type === "error" && "border-red-300 dark:border-red-700",
            t.type === "success" && "border-brand-300 dark:border-brand-700",
            t.type === "info" && "border-blue-300 dark:border-blue-700",
            t.type === "warning" && "border-yellow-300 dark:border-yellow-700"
          )}
        >
          <div
            className={cn(
              "w-2 h-2 rounded-full flex-shrink-0",
              t.type === "error" && "bg-red-500",
              t.type === "success" && "bg-brand-500",
              t.type === "info" && "bg-blue-500",
              t.type === "warning" && "bg-yellow-500"
            )}
          />
          <span className="text-sm font-medium text-ink-1 dark:text-surface-2">
            {t.message}
          </span>
        </div>
      ))}
    </div>
  );
}
