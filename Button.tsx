// ─────────────────────────────────────────────
// Browse Page — Category browsing + filters
// ─────────────────────────────────────────────
"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, SORT_OPTIONS } from "@/lib/data";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import type { Listing } from "@/types";
import { ListingCard } from "@/components/ui/ListingCard";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("newest");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list: Listing[] = [...MOCK_LISTINGS];
    if (selectedCategory) list = list.filter((l) => l.category === selectedCategory);
    if (priceMin) list = list.filter((l) => l.price >= Number(priceMin));
    if (priceMax) list = list.filter((l) => l.price <= Number(priceMax));
    switch (sortBy) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "popular": list.sort((a, b) => b.views - a.views); break;
      default: list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return list;
  }, [selectedCategory, sortBy, priceMin, priceMax]);

  const activeCategory = CATEGORIES.find((c) => c.slug === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 animate-fadeIn">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink-0 dark:text-surface-1">
            {activeCategory ? activeCategory.name : "Browse All"}
          </h1>
          <p className="text-ink-4 dark:text-surface-4 mt-1">{filtered.length} listings found</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-ink-0/10 dark:border-surface-1/10 text-sm font-medium hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
          >
            <FilterIcon size={16} /> Filters
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-ink-0/10 dark:border-surface-1/10 bg-surface-0 dark:bg-ink-1 text-sm font-medium outline-none appearance-none cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className={cn(
          "w-64 flex-shrink-0 space-y-6",
          filtersOpen ? "fixed inset-0 z-50 bg-surface-0 dark:bg-ink-0 p-6 overflow-y-auto w-full" : "hidden lg:block"
        )}>
          {filtersOpen && (
            <button onClick={() => setFiltersOpen(false)} className="lg:hidden mb-4 text-sm font-medium flex items-center gap-2">
              ✕ Close Filters
            </button>
          )}

          <div>
            <h3 className="font-semibold text-sm text-ink-0 dark:text-surface-1 mb-3">Categories</h3>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory("")}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                  !selectedCategory ? "bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 font-semibold" : "text-ink-3 dark:text-surface-3 hover:bg-ink-0/5 dark:hover:bg-surface-1/5"
                )}
              >
                All Categories
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2",
                    selectedCategory === cat.slug ? "bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 font-semibold" : "text-ink-3 dark:text-surface-3 hover:bg-ink-0/5 dark:hover:bg-surface-1/5"
                  )}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span className="flex-1">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-ink-0 dark:text-surface-1 mb-3">Price Range</h3>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-ink-0/10 dark:border-surface-1/10 bg-surface-0 dark:bg-ink-1 text-sm outline-none focus:border-brand-400"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-ink-0/10 dark:border-surface-1/10 bg-surface-0 dark:bg-ink-1 text-sm outline-none focus:border-brand-400"
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-ink-0 dark:text-surface-1 mb-3">Location</h3>
            <input
              type="text"
              placeholder="City or zip code"
              className="w-full px-3 py-2 rounded-lg border border-ink-0/10 dark:border-surface-1/10 bg-surface-0 dark:bg-ink-1 text-sm outline-none focus:border-brand-400"
            />
          </div>
        </aside>

        {/* Listings Grid */}
        <div className="flex-1">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((listing, i) => (
                <ListingCard key={listing.id} listing={listing} index={i} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="🔍"
              title="No listings found"
              description="Try adjusting your filters or search terms"
              actionLabel="Clear Filters"
              onAction={() => { setSelectedCategory(""); setPriceMin(""); setPriceMax(""); }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
