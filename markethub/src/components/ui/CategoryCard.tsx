// ─────────────────────────────────────────────
// Category Card Component
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
      className={`animate-fadeInUp delay-${(index % 6) + 1} group py-4 px-3 rounded-2xl bg-surface-0 dark:bg-ink-1 border border-ink-0/5 dark:border-surface-1/5 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-lg hover:shadow-brand-500/5 transition-all text-center`}
    >
      <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <p className="text-[11px] sm:text-xs font-semibold text-ink-2 dark:text-surface-2 truncate leading-tight">
        {name}
      </p>
      {count !== undefined && (
        <p className="text-[10px] text-ink-5 mt-1">
          {count.toLocaleString()}
        </p>
      )}
    </Link>
  );
}
