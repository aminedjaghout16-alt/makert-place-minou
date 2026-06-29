// ─────────────────────────────────────────────
// Search Page — improved layout
// ─────────────────────────────────────────────
"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import { ListingCard } from "@/components/ui/ListingCard";
import { SearchIcon } from "@/components/ui/Icons";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return MOCK_LISTINGS.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        (l.seller?.username ?? "").toLowerCase().includes(q)
    );
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const popularSearches = ["Tesla", "MacBook", "PlayStation", "Web Design", "Photography", "Vintage", "Apartments", "React"];

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      {/* Search bar */}
      <div className="max-w-2xl mx-auto mb-10">
        <form onSubmit={handleSearch}>
          <div className="flex items-center gap-2 p-2 bg-surface-0 dark:bg-ink-1 rounded-2xl shadow-lg shadow-black/5 border border-black/5 dark:border-white/8">
            <div className="flex items-center gap-3 flex-1 px-3">
              <SearchIcon className="text-ink-5 dark:text-surface-4 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search listings, sellers, categories…"
                className="w-full py-2.5 bg-transparent border-none outline-none text-ink-0 dark:text-surface-1 placeholder:text-ink-5 dark:placeholder:text-surface-4 text-sm"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl text-sm transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {query.trim() ? (
        <>
          <p className="text-ink-5 dark:text-surface-4 text-sm mb-6">
            {results.length} result{results.length !== 1 ? "s" : ""} for{" "}
            <span className="text-ink-0 dark:text-surface-1 font-semibold">&ldquo;{query}&rdquo;</span>
          </p>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {results.map((l, i) => (
                <ListingCard key={l.id} listing={l} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 flex flex-col items-center gap-3">
              <div className="text-5xl">🔍</div>
              <h3 className="font-display text-xl font-bold text-ink-0 dark:text-surface-1">No results found</h3>
              <p className="text-ink-4 dark:text-surface-4 text-sm max-w-xs">
                Try different keywords or browse all listings
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="mb-10">
            <h2 className="font-display text-xl font-bold text-ink-0 dark:text-surface-1 mb-4">Popular Searches</h2>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((s) => (
                <button
                  key={s}
                  onClick={() => { setQuery(s); router.push(`/search?q=${encodeURIComponent(s)}`); }}
                  className="px-4 py-2 rounded-full bg-surface-0 dark:bg-ink-1 border border-black/8 dark:border-white/8 text-sm font-medium text-ink-2 dark:text-surface-2 hover:border-brand-300 dark:hover:border-brand-700 hover:text-brand-600 dark:hover:text-brand-400 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <h2 className="font-display text-xl font-bold text-ink-0 dark:text-surface-1 mb-6">Trending Now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MOCK_LISTINGS.slice(0, 4).map((l, i) => (
              <ListingCard key={l.id} listing={l} index={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
