// ─────────────────────────────────────────────
// Skeleton Loader Component
// ─────────────────────────────────────────────
"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("skeleton animate-shimmer", className)} />;
}

export function SkeletonCard() {
  return (
    <div className="bg-surface-0 dark:bg-ink-1 rounded-2xl overflow-hidden border border-ink-0/5 dark:border-surface-1/5">
      <Skeleton className="aspect-[4/3]" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-3 w-1/2 rounded" />
        <div className="flex justify-between">
          <Skeleton className="h-3 w-1/4 rounded" />
          <Skeleton className="h-3 w-1/6 rounded" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonLine({ width = "w-full" }: { width?: string }) {
  return <Skeleton className={cn("h-4 rounded", width)} />;
}
