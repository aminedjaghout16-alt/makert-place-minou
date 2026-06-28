// ─────────────────────────────────────────────
// Search Page
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
    if (!query) return [];
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-10">
        <form onSubmit={handleSearch}>
          <div className="flex items-center gap-2 p-2 bg-surface-0 dark:bg-ink-1 rounded-2xl shadow-lg border border-ink-0/5 dark:border-surface-1/10">
            <div className="flex items-center gap-3 flex-1 px-4">
              <SearchIcon />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search listings, sellers, categories..."
                className="w-full py-3 bg-transparent border-none outline-none text-ink-0 dark:text-surface-1 placeholder:text-ink-5"
                autoFocus
              />
            </div>
            <button type="submit" className="px-6 py-3 bg-brand-500 text-white font-semibold rounded-xl text-sm">
              Search
            </button>
          </div>
        </form>
      </div>

      {query ? (
        <>
          <p className="text-ink-4 dark:text-surface-4 mb-6">
            {results.length} results for &ldquo;<span className="text-ink-0 dark:text-surface-1 font-medium">{query}</span>&rdquo;
          </p>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((l, i) => (
                <ListingCard key={l.id} listing={l} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-display text-xl font-bold mb-2">No results found</h3>
              <p className="text-ink-4 dark:text-surface-4">Try different keywords or check your spelling</p>
            </div>
          )}
        </>
      ) : (
        <>
          <h2 className="font-display text-2xl font-bold mb-4">Popular Searches</h2>
          <div className="flex flex-wrap gap-2 mb-10">
            {popularSearches.map((s) => (
              <button
                key={s}
                onClick={() => { setQuery(s); router.push(`/search?q=${encodeURIComponent(s)}`); }}
                className="px-4 py-2 rounded-full bg-surface-0 dark:bg-ink-1 border border-ink-0/5 dark:border-surface-1/5 text-sm font-medium hover:border-brand-300 dark:hover:border-brand-700 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
          <h2 className="font-display text-2xl font-bold mb-4">Trending Now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_LISTINGS.slice(0, 4).map((l, i) => (
              <ListingCard key={l.id} listing={l} index={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
