// ─────────────────────────────────────────────
// Saved Listings Page
// ─────────────────────────────────────────────
"use client";

import React from "react";
import { useAuth } from "@/context/auth-context";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import { ListingCard } from "@/components/ui/ListingCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function SavedPage() {
  const { user } = useAuth();

  // In production, fetch from PostgreSQL: /api/favorites?userId=user.id
  const saved = MOCK_LISTINGS.slice(0, 4);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center animate-fadeIn">
        <div className="text-6xl mb-4">❤️</div>
        <h2 className="font-display text-2xl font-bold mb-2">Saved Listings</h2>
        <p className="text-ink-4 dark:text-surface-4 mb-6">Log in to save your favorite listings</p>
        <Button onClick={() => (window.location.href = "/auth/login")}>Log In</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      <h1 className="font-display text-3xl font-bold text-ink-0 dark:text-surface-1 mb-6">Saved Listings</h1>
      {saved.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {saved.map((l, i) => <ListingCard key={l.id} listing={l} index={i} />)}
        </div>
      ) : (
        <EmptyState
          icon="📌"
          title="No saved listings yet"
          description="Browse and save items you're interested in"
          actionLabel="Browse Listings"
          actionHref="/browse"
        />
      )}
    </div>
  );
}
