// ─────────────────────────────────────────────
// Category Card — improved spacing & alignment
// ─────────────────────────────────────────────
"use client";

import React from "react";
import Link from "next/link";

interface CategoryCardProps {
  slug: string;
  name: string;
  icon: string;
  count?: number;
  index?: number;
}

export function CategoryCard({ slug, name, icon, count, index = 0 }: CategoryCardProps) {
  return (
    <Link
      href={`/browse?category=${slug}`}
      className={`animate-fadeInUp delay-${(index % 6) + 1} group flex flex-col items-center justify-center gap-2 py-5 px-3 rounded-2xl bg-surface-0 dark:bg-ink-1 border border-black/5 dark:border-white/6 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-lg hover:shadow-brand-500/8 transition-all text-center`}
    >
      <span className="text-3xl leading-none group-hover:scale-110 transition-transform duration-200">
        {icon}
      </span>
      <p className="text-xs font-semibold text-ink-2 dark:text-surface-2 leading-tight">
        {name}
      </p>
      {count !== undefined && (
        <p className="text-[10px] text-ink-5 dark:text-surface-4">
          {count.toLocaleString()} listings
        </p>
      )}
    </Link>
  );
}
