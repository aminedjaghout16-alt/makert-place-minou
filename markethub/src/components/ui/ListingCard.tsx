// ─────────────────────────────────────────────
// Listing Card — improved layout & spacing
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
    setIsFav((v) => !v);
    onFavoriteToggle?.(listing.id);
  };

  const priceLabel =
    listing.category === "real-estate" ? "/mo" :
    listing.category === "freelance"   ? "/hr" :
    listing.category === "jobs"        ? "/yr" : "";

  return (
    <Link
      href={`/listing/${listing.id}`}
      className={cn(
        "group block animate-fadeInUp card-hover",
        index < 6 ? `delay-${(index % 4) + 1}` : ""
      )}
    >
      <article className="h-full bg-surface-0 dark:bg-ink-1 rounded-2xl overflow-hidden border border-black/5 dark:border-white/6 flex flex-col">

        {/* ── Thumbnail ── */}
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-2 dark:bg-ink-2 shrink-0">
          <Image
            src={listing.images[0] ?? "/placeholder.jpg"}
            alt={listing.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Gradient overlay for price legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* Featured badge */}
          {listing.featured && (
            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-brand-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow">
              Featured
            </div>
          )}

          {/* Favorite button */}
          <button
            onClick={handleFav}
            aria-label={isFav ? "Remove from saved" : "Save listing"}
            className={cn(
              "absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm",
              isFav
                ? "bg-brand-500 text-white"
                : "bg-white/85 dark:bg-ink-0/70 text-ink-3 dark:text-surface-3 hover:bg-white dark:hover:bg-ink-0"
            )}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* Price on image */}
          <div className="absolute bottom-3 left-3">
            <p className="text-white font-bold text-base leading-none">
              {formatPrice(listing.price)}
              {priceLabel && (
                <span className="text-white/75 font-normal text-xs ml-0.5">{priceLabel}</span>
              )}
            </p>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col flex-1 p-4 gap-2.5">
          {/* Title */}
          <h3 className="font-semibold text-sm leading-snug text-ink-0 dark:text-surface-1 line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {listing.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-ink-5 dark:text-surface-4 text-xs">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="truncate">{listing.location}</span>
          </div>

          {/* Seller row — pushed to bottom */}
          <div className="mt-auto pt-3 border-t border-black/5 dark:border-white/6 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-xs text-ink-3 dark:text-surface-3 font-medium truncate">
                {listing.seller?.username ?? "Seller"}
              </span>
              {listing.seller?.verified && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#ee7612" className="shrink-0">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="flex items-center gap-1 shrink-0 text-xs text-ink-4 dark:text-surface-4">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#ee7612">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="font-medium">{listing.seller ? "4.9" : "—"}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
