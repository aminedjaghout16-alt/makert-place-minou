// ─────────────────────────────────────────────
// Listing Detail Page
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

  const listing = MOCK_LISTINGS.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fadeIn">
        <p className="text-ink-4 dark:text-surface-4 mb-4">Listing not found.</p>
        <Button onClick={() => router.push("/browse")}>Browse Listings</Button>
      </div>
    );
  }

  const similar = MOCK_LISTINGS.filter((x) => x.category === listing.category && x.id !== listing.id).slice(0, 3);
  const priceLabel = listing.category === "real-estate" ? "/mo" : listing.category === "freelance" ? "/hr" : listing.category === "jobs" ? "/yr" : "";

  const handleContact = () => {
    if (!user) { toast("Please log in to contact sellers", "error"); return; }
    toast("Message sent to seller!");
    setContactOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-ink-4 dark:text-surface-4 hover:text-brand-500 mb-6 transition-colors">
        <ArrowLeftIcon size={16} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl overflow-hidden mb-6 aspect-[16/10] bg-surface-2 dark:bg-ink-1 relative">
            <Image src={listing.images[0]} alt={listing.title} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" priority />
          </div>

          <div className="grid grid-cols-4 gap-2 mb-8">
            {listing.images.map((img, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-surface-2 dark:bg-ink-1 border-2 border-transparent hover:border-brand-400 cursor-pointer transition-all relative">
                <Image src={img} alt="" fill sizes="150px" className="object-cover opacity-80 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-surface-2 dark:bg-ink-1 rounded-lg text-xs font-medium text-ink-3 dark:text-surface-3 capitalize">{listing.category}</span>
              <span className="px-3 py-1 bg-surface-2 dark:bg-ink-1 rounded-lg text-xs font-medium text-ink-3 dark:text-surface-3">{listing.tags[0] ?? "Active"}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink-0 dark:text-surface-1 mb-3">{listing.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-ink-4 dark:text-surface-4">
              <span className="flex items-center gap-1.5"><MapPinIcon size={14} /> {listing.location}</span>
              <span>Posted {timeAgo(listing.createdAt)}</span>
              <span className="flex items-center gap-1"><EyeIcon size={14} /> {listing.views.toLocaleString()} views</span>
              <span className="flex items-center gap-1"><HeartIcon size={14} /> {listing.favoriteCount ?? 0} saves</span>
            </div>
            <hr className="my-6 border-ink-0/5 dark:border-surface-1/5" />
            <h2 className="font-semibold text-ink-0 dark:text-surface-1 mb-3">Description</h2>
            <p className="text-ink-3 dark:text-surface-3 leading-relaxed">{listing.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {listing.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/20 text-brand-600 dark:text-brand-400 text-xs font-medium">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 space-y-4">
            <div className="bg-surface-0 dark:bg-ink-1 rounded-2xl border border-ink-0/5 dark:border-surface-1/5 p-6">
              <p className="font-display text-4xl font-bold text-ink-0 dark:text-surface-1">
                {formatPrice(listing.price)}
                {priceLabel && <span className="text-lg font-normal text-ink-4">{priceLabel}</span>}
              </p>
              <div className="flex gap-2 mt-4">
                <Button onClick={() => setContactOpen(true)} className="flex-1">Contact Seller</Button>
                <button
                  onClick={() => setIsFav(!isFav)}
                  className={`w-12 rounded-xl border flex items-center justify-center transition-all ${isFav ? "bg-brand-50 dark:bg-brand-950/30 border-brand-300 text-brand-500" : "border-ink-0/10 dark:border-surface-1/10 text-ink-4 hover:text-red-500"}`}
                >
                  <HeartIcon size={18} filled={isFav} />
                </button>
              </div>
              <button className="w-full mt-2 py-3 border border-ink-0/10 dark:border-surface-1/10 rounded-xl text-sm font-medium hover:border-brand-300 dark:hover:border-brand-700 transition-colors flex items-center justify-center gap-2">
                <FlagIcon size={14} /> Report Listing
              </button>
            </div>

            {/* Seller Card */}
            <div className="bg-surface-0 dark:bg-ink-1 rounded-2xl border border-ink-0/5 dark:border-surface-1/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                {listing.seller?.avatar && (
                  <img src={listing.seller.avatar} alt={listing.seller.username} className="w-12 h-12 rounded-full object-cover" />
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-ink-0 dark:text-surface-1">{listing.seller?.username ?? "Seller"}</p>
                    {listing.seller?.verified && <VerifiedIcon />}
                  </div>
                  <p className="text-xs text-ink-4 dark:text-surface-4">Member since 2024</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                {[
                  { v: "4.9", l: "Rating" },
                  { v: `${Math.floor(listing.views / 10)}`, l: "Sales" },
                  { v: "<1h", l: "Response" },
                ].map((s) => (
                  <div key={s.l} className="p-2 bg-surface-2/50 dark:bg-ink-2/50 rounded-xl">
                    <p className="font-bold text-ink-0 dark:text-surface-1">{s.v}</p>
                    <p className="text-[10px] text-ink-4 dark:text-surface-4">{s.l}</p>
                  </div>
                ))}
              </div>
              <Link href={`/profile?seller=${listing.sellerId}`} className="block w-full py-2.5 border border-ink-0/10 dark:border-surface-1/10 rounded-xl text-sm font-medium text-center hover:border-brand-300 dark:hover:border-brand-700 transition-colors">
                View Profile
              </Link>
            </div>

            {/* Safety */}
            <div className="bg-brand-50 dark:bg-brand-950/10 rounded-2xl border border-brand-200/30 dark:border-brand-800/20 p-5">
              <div className="flex items-center gap-2 mb-2">
                <ShieldIcon size={18} />
                <p className="font-semibold text-sm text-ink-0 dark:text-surface-1">MarketHub Protection</p>
              </div>
              <ul className="space-y-1.5 text-xs text-ink-3 dark:text-surface-4">
                <li>✓ Meet in safe public places</li>
                <li>✓ Verify item before payment</li>
                <li>✓ Never transfer money in advance</li>
                <li>✓ Report suspicious listings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <div className="mt-16">
          <SectionHeading title="Similar Listings" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similar.map((item, i) => (
              <ListingCard key={item.id} listing={item} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Contact Modal */}
      <Modal open={contactOpen} onClose={() => setContactOpen(false)}>
        <div className="p-6">
          <h3 className="font-display text-xl font-bold mb-4">Contact {listing.seller?.username ?? "Seller"}</h3>
          <p className="text-sm text-ink-4 dark:text-surface-4 mb-4">About: {listing.title}</p>
          <textarea
            value={msgText}
            onChange={(e) => setMsgText(e.target.value)}
            rows={4}
            placeholder="Hi, I'm interested in this listing. Is it still available?"
            className="w-full px-4 py-3 rounded-xl border border-ink-0/10 dark:border-surface-1/10 bg-surface-1 dark:bg-ink-2 outline-none focus:border-brand-400 resize-none text-sm"
          />
          <Button onClick={handleContact} className="w-full mt-4">Send Message</Button>
        </div>
      </Modal>
    </div>
  );
}
