// ─────────────────────────────────────────────
// Profile Page — improved layout
// ─────────────────────────────────────────────
"use client";

import React from "react";
import { useAuth } from "@/context/auth-context";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import { ListingCard } from "@/components/ui/ListingCard";
import { Button } from "@/components/ui/Button";
import { VerifiedIcon, StarIcon } from "@/components/ui/Icons";

export default function ProfilePage() {
  const { user } = useAuth();
  const listings = MOCK_LISTINGS.slice(0, 6);

  if (!user) {
    return (
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center text-center animate-fadeIn">
        <div className="text-5xl mb-5">👤</div>
        <h2 className="font-display text-2xl font-bold text-ink-0 dark:text-surface-1 mb-2">
          Sign in to view your profile
        </h2>
        <p className="text-ink-4 dark:text-surface-4 mb-8 max-w-xs">
          Your profile, listings, and activity live here.
        </p>
        <Button onClick={() => (window.location.href = "/auth/login")}>Log In</Button>
      </div>
    );
  }

  const stats = [
    { label: "Total Sales",  value: "$12,480" },
    { label: "Items Sold",   value: "34" },
    { label: "Avg. Rating",  value: "4.9 ★" },
    { label: "Active Listings", value: "6" },
  ];

  return (
    <div className="animate-fadeIn">
      {/* ── Profile header card ── */}
      <div className="bg-surface-0 dark:bg-ink-1 border-b border-black/5 dark:border-white/6">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Banner */}
          <div className="h-36 sm:h-48 rounded-b-none bg-gradient-to-r from-brand-500 to-brand-700 relative overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-10">
            <div className="absolute inset-0 hero-mesh opacity-60" />
          </div>

          {/* Avatar + meta */}
          <div className="relative -mt-14 sm:-mt-16 pb-8 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
            {/* Avatar */}
            <div className="shrink-0 self-start">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-surface-0 dark:border-ink-1 object-cover shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-surface-0 dark:border-ink-1 bg-brand-500 flex items-center justify-center text-white font-display font-bold text-4xl shadow-lg">
                  {user.username[0]?.toUpperCase()}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 sm:pb-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="font-display text-2xl font-bold text-ink-0 dark:text-surface-1">
                      {user.username}
                    </h1>
                    {user.verified && <VerifiedIcon />}
                  </div>
                  <p className="text-ink-5 dark:text-surface-4 text-sm">
                    Member since{" "}
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-ink-3 dark:text-surface-3">
                    <span className="flex items-center gap-1">
                      <StarIcon size={13} className="text-brand-500" />
                      <strong>4.9</strong> rating
                    </span>
                    <span>24 listings</span>
                    <span>{user.email}</span>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => (window.location.href = "/settings")}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-surface-0 dark:bg-ink-1 rounded-2xl border border-black/5 dark:border-white/6 p-5 flex flex-col items-center justify-center text-center gap-1"
            >
              <p className="font-display text-2xl sm:text-3xl font-bold text-ink-0 dark:text-surface-1">
                {s.value}
              </p>
              <p className="text-xs text-ink-5 dark:text-surface-4">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Listings section */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-ink-0 dark:text-surface-1">
            Listings by this seller
          </h2>
          <a
            href={`/browse?seller=${user.id}`}
            className="text-sm text-brand-600 dark:text-brand-400 font-medium hover:underline"
          >
            View all
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map((l, i) => (
            <ListingCard key={l.id} listing={l} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
