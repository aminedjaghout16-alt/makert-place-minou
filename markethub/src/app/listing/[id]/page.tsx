// ─────────────────────────────────────────────
// Listing Detail Page — improved layout
// ─────────────────────────────────────────────
"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/context/toast-context";
import { formatPrice, timeAgo } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ListingCard } from "@/components/ui/ListingCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  ArrowLeftIcon, MapPinIcon, EyeIcon, HeartIcon,
  ShieldIcon, VerifiedIcon, FlagIcon,
} from "@/components/ui/Icons";

export default function ListingDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [contactOpen, setContactOpen] = useState(false);
  const [msgText, setMsgText] = useState("");
  const [isFav, setIsFav] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  const listing = MOCK_LISTINGS.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center text-center animate-fadeIn">
        <div className="text-5xl mb-4">🏷️</div>
        <h2 className="font-display text-2xl font-bold text-ink-0 dark:text-surface-1 mb-2">Listing not found</h2>
        <p className="text-ink-4 dark:text-surface-4 mb-6">This listing may have been removed or doesn't exist.</p>
        <Button onClick={() => router.push("/browse")}>Browse Listings</Button>
      </div>
    );
  }

  const similar = MOCK_LISTINGS
    .filter((x) => x.category === listing.category && x.id !== listing.id)
    .slice(0, 3);

  const priceLabel =
    listing.category === "real-estate" ? "/mo" :
    listing.category === "freelance"   ? "/hr" :
    listing.category === "jobs"        ? "/yr" : "";

  const handleContact = () => {
    if (!user) { toast("Please log in to contact sellers", "error"); return; }
    toast("Message sent to seller!");
    setContactOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-sm text-ink-4 dark:text-surface-4 hover:text-brand-500 transition-colors mb-8"
      >
        <ArrowLeftIcon size={15} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">

        {/* ── Left: images + description ── */}
        <div className="lg:col-span-3 space-y-6">
          {/* Main image */}
          <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-surface-2 dark:bg-ink-2 relative">
            <Image
              src={listing.images[activeImg] ?? listing.images[0]}
              alt={listing.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Thumbnails */}
          {listing.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {listing.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square rounded-xl overflow-hidden relative border-2 transition-all ${
                    activeImg === i ? "border-brand-500" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="" fill sizes="120px" className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Meta + description */}
          <div className="bg-surface-0 dark:bg-ink-1 rounded-2xl border border-black/5 dark:border-white/6 p-6 space-y-5">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-surface-2 dark:bg-ink-2 rounded-lg text-xs font-medium text-ink-3 dark:text-surface-3 capitalize">
                {listing.category.replace("-", " ")}
              </span>
              {listing.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/20 text-brand-600 dark:text-brand-400 text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-0 dark:text-surface-1 mb-3 leading-tight">
                {listing.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-5 dark:text-surface-4">
                <span className="flex items-center gap-1.5">
                  <MapPinIcon size={13} /> {listing.location}
                </span>
                <span>Posted {timeAgo(listing.createdAt)}</span>
                <span className="flex items-center gap-1">
                  <EyeIcon size={13} /> {listing.views.toLocaleString()} views
                </span>
                <span className="flex items-center gap-1">
                  <HeartIcon size={13} /> {listing.favoriteCount ?? 0} saves
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-black/5 dark:border-white/6 pt-5">
              <h2 className="font-semibold text-ink-0 dark:text-surface-1 mb-3 text-sm">Description</h2>
              <p className="text-ink-3 dark:text-surface-3 leading-relaxed text-sm">
                {listing.description}
              </p>
            </div>
          </div>
        </div>

        {/* ── Right: price + seller ── */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 space-y-4">

            {/* Price card */}
            <div className="bg-surface-0 dark:bg-ink-1 rounded-2xl border border-black/5 dark:border-white/6 p-6">
              <p className="font-display text-3xl sm:text-4xl font-bold text-ink-0 dark:text-surface-1 mb-1">
                {formatPrice(listing.price)}
                {priceLabel && (
                  <span className="text-base font-normal text-ink-5 ml-1">{priceLabel}</span>
                )}
              </p>
              {listing.status === "ACTIVE" && (
                <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-4">● Available</p>
              )}
              <div className="flex gap-2 mt-4">
                <Button onClick={() => setContactOpen(true)} className="flex-1">
                  Contact Seller
                </Button>
                <button
                  onClick={() => setIsFav(!isFav)}
                  aria-label={isFav ? "Remove from saved" : "Save listing"}
                  className={`w-12 rounded-xl border flex items-center justify-center transition-all ${
                    isFav
                      ? "bg-brand-50 dark:bg-brand-950/30 border-brand-300 dark:border-brand-700 text-brand-500"
                      : "border-black/10 dark:border-white/10 text-ink-4 dark:text-surface-4 hover:text-red-500"
                  }`}
                >
                  <HeartIcon size={18} />
                </button>
              </div>
              <button className="w-full mt-2.5 py-2.5 border border-black/8 dark:border-white/8 rounded-xl text-xs font-medium text-ink-4 dark:text-surface-4 hover:text-red-500 hover:border-red-200 dark:hover:border-red-900 transition-colors flex items-center justify-center gap-1.5">
                <FlagIcon size={12} /> Report this listing
              </button>
            </div>

            {/* Seller card */}
            <div className="bg-surface-0 dark:bg-ink-1 rounded-2xl border border-black/5 dark:border-white/6 p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-5 dark:text-surface-4 mb-4">
                Seller
              </h3>
              <div className="flex items-center gap-3 mb-5">
                {listing.seller?.avatar && (
                  <img
                    src={listing.seller.avatar}
                    alt={listing.seller.username}
                    className="w-11 h-11 rounded-full object-cover shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-ink-0 dark:text-surface-1 text-sm truncate">
                      {listing.seller?.username ?? "Seller"}
                    </p>
                    {listing.seller?.verified && <VerifiedIcon />}
                  </div>
                  <p className="text-xs text-ink-5 dark:text-surface-4">Member since 2024</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { v: "4.9", l: "Rating" },
                  { v: `${Math.floor(listing.views / 10)}`, l: "Sales" },
                  { v: "<1h", l: "Response" },
                ].map((s) => (
                  <div key={s.l} className="p-2.5 bg-surface-1 dark:bg-ink-2 rounded-xl text-center">
                    <p className="font-bold text-sm text-ink-0 dark:text-surface-1">{s.v}</p>
                    <p className="text-[10px] text-ink-5 dark:text-surface-4 mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>

              <Link
                href={`/profile?seller=${listing.sellerId}`}
                className="block w-full py-2.5 text-center text-sm font-medium border border-black/10 dark:border-white/10 rounded-xl hover:border-brand-300 dark:hover:border-brand-700 transition-colors text-ink-2 dark:text-surface-2"
              >
                View Profile
              </Link>
            </div>

            {/* Safety notice */}
            <div className="bg-brand-50 dark:bg-brand-950/15 rounded-2xl border border-brand-200/40 dark:border-brand-800/25 p-5">
              <div className="flex items-center gap-2 mb-3">
                <ShieldIcon size={16} className="text-brand-600 dark:text-brand-400" />
                <p className="font-semibold text-sm text-ink-0 dark:text-surface-1">Safety Tips</p>
              </div>
              <ul className="space-y-1.5 text-xs text-ink-4 dark:text-surface-4">
                <li>✓ Meet in safe, public places</li>
                <li>✓ Inspect the item before payment</li>
                <li>✓ Never transfer money in advance</li>
                <li>✓ Report suspicious behaviour</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Similar listings */}
      {similar.length > 0 && (
        <div className="mt-16">
          <SectionHeading title="Similar Listings" subtitle={`More in ${listing.category.replace("-", " ")}`} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {similar.map((item, i) => (
              <ListingCard key={item.id} listing={item} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Contact modal */}
      <Modal open={contactOpen} onClose={() => setContactOpen(false)}>
        <div className="p-6">
          <h3 className="font-display text-xl font-bold text-ink-0 dark:text-surface-1 mb-1">
            Contact {listing.seller?.username ?? "Seller"}
          </h3>
          <p className="text-sm text-ink-5 dark:text-surface-4 mb-5">Re: {listing.title}</p>
          <textarea
            value={msgText}
            onChange={(e) => setMsgText(e.target.value)}
            rows={4}
            placeholder="Hi, I'm interested in this listing. Is it still available?"
            className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-surface-1 dark:bg-ink-2 outline-none focus:border-brand-400 resize-none text-sm text-ink-0 dark:text-surface-1 placeholder:text-ink-5"
          />
          <Button onClick={handleContact} className="w-full mt-4">Send Message</Button>
        </div>
      </Modal>
    </div>
  );
}
