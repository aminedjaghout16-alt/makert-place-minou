// ─────────────────────────────────────────────
// Listing Card Component
// ─────────────────────────────────────────────
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn, formatPrice, timeAgo } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import type { Listing } from "@/types";

interface ListingCardProps {
  listing: Listing;
  index?: number;
  onFavoriteToggle?: (id: string) => void;
  isFavorited?: boolean;
}

export function ListingCard({
  listing,
  index = 0,
  onFavoriteToggle,
  isFavorited: externalFav,
}: ListingCardProps) {
  const { user } = useAuth();
  const [isFav, setIsFav] = useState(externalFav ?? listing.isFavorited ?? false);

  const handleFav = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !isFav;
    setIsFav(next);
    onFavoriteToggle?.(listing.id);
    // In production, call API:
    // await fetch("/api/favorites", { method: next ? "POST" : "DELETE", body: JSON.stringify({ listingId: listing.id }) })
  };

  const priceLabel =
    listing.category === "real-estate" ? "/mo" :
    listing.category === "freelance" ? "/hr" :
    listing.category === "jobs" ? "/yr" : "";

  return (
    <Link
      href={`/listing/${listing.id}`}
      className={cn(
        "group block animate-fadeInUp card-hover",
        `delay-${(index % 4) + 1}`
      )}
    >
      <div className="bg-surface-0 dark:bg-ink-1 rounded-2xl overflow-hidden border border-ink-0/5 dark:border-surface-1/5">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-2 dark:bg-ink-2">
          <Image
            src={listing.images[0] ?? "/placeholder.jpg"}
            alt={listing.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {listing.featured && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-brand-500 text-white text-[11px] font-bold uppercase tracking-wider rounded-lg shadow-lg">
              Featured
            </div>
          )}

          <button
            onClick={handleFav}
            className={cn(
              "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all",
              isFav
                ? "bg-brand-500 text-white"
                : "bg-white/80 dark:bg-ink-1/80 text-ink-2 dark:text-surface-2 hover:bg-white dark:hover:bg-ink-1"
            )}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          <div className="absolute bottom-3 left-3">
            <p className="text-white font-bold text-lg">
              {formatPrice(listing.price)}
              {priceLabel && <span className="font-normal text-sm opacity-80">{priceLabel}</span>}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-[15px] leading-snug text-ink-0 dark:text-surface-1 line-clamp-2 mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {listing.title}
          </h3>

          <div className="flex items-center gap-1.5 text-ink-4 dark:text-surface-4 text-sm mb-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{listing.location}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-ink-2 dark:text-surface-3">
                {listing.seller?.username ?? "Seller"}
              </span>
              {listing.seller?.verified && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ee7612">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="font-medium text-ink-2 dark:text-surface-3">
                {listing.seller ? "4.9" : "—"}
              </span>
            </div>
          </div>

          <div className="text-[11px] text-ink-5 mt-2">
            {timeAgo(listing.createdAt)}
          </div>
        </div>
      </div>
    </Link>
  );
}
