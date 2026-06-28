// ─────────────────────────────────────────────
// Profile Page
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
  const listings = MOCK_LISTINGS.slice(0, 4);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center animate-fadeIn">
        <div className="text-6xl mb-4">👤</div>
        <h2 className="font-display text-2xl font-bold mb-2">Profile</h2>
        <p className="text-ink-4 dark:text-surface-4 mb-6">Log in to view your profile</p>
        <Button onClick={() => (window.location.href = "/auth/login")}>Log In</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fadeIn">
      {/* Profile Header */}
      <div className="bg-surface-0 dark:bg-ink-1 rounded-2xl border border-ink-0/5 dark:border-surface-1/5 overflow-hidden mb-8">
        <div className="h-32 bg-gradient-to-r from-brand-500 to-brand-700 relative">
          <div className="absolute inset-0 hero-mesh opacity-50" />
        </div>
        <div className="px-6 pb-6 -mt-12 relative">
          {user.avatar ? (
            <img src={user.avatar} alt="" className="w-24 h-24 rounded-2xl border-4 border-surface-0 dark:border-ink-1 object-cover shadow-lg" />
          ) : (
            <div className="w-24 h-24 rounded-2xl border-4 border-surface-0 dark:border-ink-1 bg-brand-500 flex items-center justify-center text-white font-display font-bold text-3xl shadow-lg">
              {user.username[0]?.toUpperCase()}
            </div>
          )}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold text-ink-0 dark:text-surface-1">{user.username}</h1>
                {user.verified && <VerifiedIcon />}
              </div>
              <p className="text-ink-4 dark:text-surface-4 text-sm mt-0.5">Member since {new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="flex items-center gap-1"><StarIcon size={14} className="text-brand-500" /> <strong>4.9</strong> rating</span>
                <span>24 listings</span>
              </div>
            </div>
            <Button variant="secondary" onClick={() => (window.location.href = "/settings")}>Edit Profile</Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[{ l: "Total Sales", v: "$12,480" }, { l: "Items Sold", v: "34" }, { l: "Avg. Rating", v: "4.9" }].map((s) => (
          <div key={s.l} className="bg-surface-0 dark:bg-ink-1 rounded-2xl border border-ink-0/5 dark:border-surface-1/5 p-5 text-center">
            <p className="font-display text-2xl font-bold text-ink-0 dark:text-surface-1">{s.v}</p>
            <p className="text-sm text-ink-4 dark:text-surface-4">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Listings */}
      <h2 className="font-display text-2xl font-bold text-ink-0 dark:text-surface-1 mb-4">Listings by this seller</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {listings.map((l, i) => <ListingCard key={l.id} listing={l} index={i} />)}
      </div>
    </div>
  );
}
