// ─────────────────────────────────────────────
// Section Heading — tightened spacing
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
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
      <div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-0 dark:text-surface-1 tracking-tight leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1.5 text-sm text-ink-4 dark:text-surface-4 leading-relaxed max-w-xl">
            {subtitle}
          </p>
        )}
      </div>
      {action && href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors shrink-0"
        >
          {action}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      )}
    </div>
  );
}
