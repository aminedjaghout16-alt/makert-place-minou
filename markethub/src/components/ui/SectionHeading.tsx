// ─────────────────────────────────────────────
// Section Heading Component
// ─────────────────────────────────────────────
"use client";

import React from "react";
import Link from "next/link";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  action?: string;
  href?: string;
}

export function SectionHeading({ title, subtitle, action, href }: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-0 dark:text-surface-1 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-ink-4 dark:text-surface-4 text-lg">{subtitle}</p>
        )}
      </div>
      {action && href && (
        <Link
          href={href}
          className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-500 transition-colors"
        >
          {action}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      )}
    </div>
  );
}
