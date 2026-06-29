// ─────────────────────────────────────────────
// Browse Page — improved layout & spacing
// ─────────────────────────────────────────────
"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, SORT_OPTIONS } from "@/lib/data";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import type { Listing } from "@/types";
import { ListingCard } from "@/components/ui/ListingCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterIcon, XIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("newest");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list: Listing[] = [...MOCK_LISTINGS];
    if (selectedCategory) list = list.filter((l) => l.category === selectedCategory);
    if (priceMin) list = list.filter((l) => l.price >= Number(priceMin));
    if (priceMax) list = list.filter((l) => l.price <= Number(priceMax));
    switch (sortBy) {
      case "price-asc":  list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "popular":    list.sort((a, b) => b.views - a.views); break;
      default: list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return list;
  }, [selectedCategory, sortBy, priceMin, priceMax]);

  const activeCategory = CATEGORIES.find((c) => c.slug === selectedCategory);

  const Sidebar = () => (
    <div className="space-y-7">
      {/* Categories */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-5 dark:text-surface-4 mb-3">
          Categories
        </h3>
        <div className="space-y-0.5">
          <button
            onClick={() => { setSelectedCategory(""); setMobileFiltersOpen(false); }}
            className={cn(
              "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
              !selectedCategory
                ? "bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 font-semibold"
                : "text-ink-3 dark:text-surface-3 hover:bg-black/5 dark:hover:bg-white/5"
            )}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => { setSelectedCategory(cat.slug); setMobileFiltersOpen(false); }}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2.5",
                selectedCategory === cat.slug
                  ? "bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 font-semibold"
                  : "text-ink-3 dark:text-surface-3 hover:bg-black/5 dark:hover:bg-white/5"
              )}
            >
              <span className="text-base leading-none">{cat.icon}</span>
              <span className="flex-1 truncate">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-5 dark:text-surface-4 mb-3">
          Price Range
        </h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-surface-0 dark:bg-ink-2 text-sm outline-none focus:border-brand-400 dark:focus:border-brand-500 text-ink-0 dark:text-surface-1"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-surface-0 dark:bg-ink-2 text-sm outline-none focus:border-brand-400 dark:focus:border-brand-500 text-ink-0 dark:text-surface-1"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-5 dark:text-surface-4 mb-3">
          Location
        </h3>
        <input
          type="text"
          placeholder="City or zip code"
          className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-surface-0 dark:bg-ink-2 text-sm outline-none focus:border-brand-400 dark:focus:border-brand-500 text-ink-0 dark:text-surface-1 placeholder:text-ink-5"
        />
      </div>

      {/* Clear button */}
      {(selectedCategory || priceMin || priceMax) && (
        <button
          onClick={() => { setSelectedCategory(""); setPriceMin(""); setPriceMax(""); }}
          className="text-sm text-brand-600 dark:text-brand-400 font-medium hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="container py-8 animate-fadeIn">
      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-0 dark:text-surface-1">
            {activeCategory ? `${activeCategory.icon} ${activeCategory.name}` : "Browse All"}
          </h1>
          <p className="text-ink-5 dark:text-surface-4 text-sm mt-1">
            {filtered.length} listing{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-sm font-medium hover:border-brand-300 dark:hover:border-brand-700 transition-colors text-ink-2 dark:text-surface-2"
          >
            <FilterIcon size={15} /> Filters
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-surface-0 dark:bg-ink-1 text-sm font-medium outline-none cursor-pointer text-ink-0 dark:text-surface-1"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* ── Desktop sidebar ── */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 bg-surface-0 dark:bg-ink-1 rounded-2xl border border-black/5 dark:border-white/6 p-5">
            <Sidebar />
          </div>
        </aside>

        {/* ── Mobile filter overlay ── */}
        {mobileFiltersOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
            <div className="relative ml-auto w-72 max-w-full h-full bg-surface-0 dark:bg-ink-1 shadow-2xl overflow-y-auto p-6 animate-slideDown">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-ink-0 dark:text-surface-1">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)} className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5">
                  <XIcon size={18} />
                </button>
              </div>
              <Sidebar />
            </div>
          </div>
        )}

        {/* ── Listings grid ── */}
        <div className="flex-1 min-w-0">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((listing, i) => (
                <ListingCard key={listing.id} listing={listing} index={i} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="🔍"
              title="No listings found"
              description="Try adjusting your filters or browse a different category"
              actionLabel="Clear Filters"
              onAction={() => { setSelectedCategory(""); setPriceMin(""); setPriceMax(""); }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
