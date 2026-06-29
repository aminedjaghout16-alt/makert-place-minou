"use client";
import React from "react";
import { useAuth } from "@/context/auth-context";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import { ListingCard } from "@/components/ui/ListingCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function SavedPage() {
  const { user } = useAuth();
  const saved = MOCK_LISTINGS.slice(0, 4);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center text-center animate-fadeIn">
        <div className="text-5xl mb-5">❤️</div>
        <h2 className="font-display text-2xl font-bold text-ink-0 dark:text-surface-1 mb-2">Saved Listings</h2>
        <p className="text-ink-4 dark:text-surface-4 mb-8">Log in to save your favourite listings</p>
        <Button onClick={() => (window.location.href = "/auth/login")}>Log In</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-0 dark:text-surface-1">Saved Listings</h1>
          <p className="text-ink-5 dark:text-surface-4 text-sm mt-1">{saved.length} item{saved.length !== 1 ? "s" : ""} saved</p>
        </div>
      </div>
      {saved.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {saved.map((l, i) => <ListingCard key={l.id} listing={l} index={i} />)}
        </div>
      ) : (
        <EmptyState
          icon="📌"
          title="No saved listings yet"
          description="Browse and heart items you're interested in"
          actionLabel="Browse Listings"
          actionHref="/browse"
        />
      )}
    </div>
  );
}
