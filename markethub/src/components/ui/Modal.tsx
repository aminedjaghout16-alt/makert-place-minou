// ─────────────────────────────────────────────
// Modal Component
// ─────────────────────────────────────────────
"use client";

import React, { useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
}

export function Modal({ open, onClose, children, className, maxWidth = "max-w-md" }: ModalProps) {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open, handleEsc]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-0/50 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
      <div
        className={cn(
          "relative w-full bg-surface-0 dark:bg-ink-1 rounded-2xl shadow-2xl animate-scaleIn border border-ink-0/5 dark:border-surface-1/10",
          maxWidth,
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
