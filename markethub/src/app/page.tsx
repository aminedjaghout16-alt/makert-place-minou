// ─────────────────────────────────────────────
// Home Page — improved layout & spacing
// ─────────────────────────────────────────────
"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/data";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import {
  SearchIcon, ZapIcon, TrendingUpIcon, ShieldIcon,
  GlobeIcon, DollarSignIcon, PackageIcon, StarIcon,
} from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ListingCard } from "@/components/ui/ListingCard";
import { CategoryCard } from "@/components/ui/CategoryCard";

export default function HomePage() {
  const router = useRouter();
  const [heroSearch, setHeroSearch] = useState("");
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.25 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(heroSearch)}`);
  };

  const featured = MOCK_LISTINGS.filter((l) => l.featured).slice(0, 6);
  const trending  = MOCK_LISTINGS.slice(0, 4);

  const stats = [
    { label: "Active Listings",   value: "48K+",  icon: <PackageIcon /> },
    { label: "Verified Sellers",  value: "12K+",  icon: <ShieldIcon /> },
    { label: "Cities Covered",    value: "350+",  icon: <GlobeIcon /> },
    { label: "Transactions",      value: "$2.4M", icon: <DollarSignIcon /> },
  ];

  const testimonials = [
    { id: 1, name: "Sarah Chen",     role: "Freelance Designer",  avatar: "https://i.pravatar.cc/80?img=1",  text: "MarketHub transformed how I find clients. The platform is incredibly intuitive and the quality of leads is outstanding.", rating: 5 },
    { id: 2, name: "Marcus Johnson", role: "Car Dealer",           avatar: "https://i.pravatar.cc/80?img=3",  text: "We sold 40% more vehicles after switching to MarketHub. The analytics dashboard gives us insights we never had before.", rating: 5 },
    { id: 3, name: "Emma Rodriguez", role: "Vintage Collector",    avatar: "https://i.pravatar.cc/80?img=5",  text: "The collectibles community here is amazing. Found rare pieces I searched for years. The verification system builds real trust.", rating: 5 },
  ];

  return (
    <div>
      {/* ── Hero ──────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center hero-mesh noise overflow-hidden">
        {/* Ambient blobs */}
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-brand-400/10 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/6  w-96 h-96 bg-brand-600/6  rounded-full blur-3xl animate-float delay-3 pointer-events-none" />

        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="animate-fadeInUp inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-950/30 border border-brand-200/60 dark:border-brand-800/30 mb-8">
              <ZapIcon size={14} className="text-brand-500" />
              <span className="text-xs font-semibold text-brand-700 dark:text-brand-400">
                New: AI-powered recommendations are live
              </span>
            </div>

            {/* Headline */}
            <h1 className="animate-fadeInUp delay-1 font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-0 dark:text-surface-1 tracking-tight leading-[1.1] mb-6">
              Buy, sell &amp; offer
              <br />
              <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
                anything, anywhere
              </span>
            </h1>

            <p className="animate-fadeInUp delay-2 text-lg text-ink-4 dark:text-surface-4 leading-relaxed mb-10 max-w-lg">
              The premium marketplace connecting buyers and sellers across 15 categories. From cars to freelance services — everything in one place.
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="animate-fadeInUp delay-3">
              <div className="flex items-center gap-2 p-2 bg-surface-0 dark:bg-ink-1 rounded-2xl shadow-xl shadow-black/8 border border-black/5 dark:border-white/8 max-w-xl">
                <div className="flex items-center gap-3 flex-1 px-3">
                  <SearchIcon className="text-ink-5 dark:text-surface-4 shrink-0" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Search for cars, electronics, services…"
                    className="w-full py-2.5 bg-transparent border-none outline-none text-ink-0 dark:text-surface-1 placeholder:text-ink-5 dark:placeholder:text-surface-4 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-brand-500/20 text-sm whitespace-nowrap"
                >
                  Search
                </button>
              </div>

              {/* Quick tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {["Tesla Model 3", "MacBook Pro", "Freelance Design", "Real Estate"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => router.push(`/search?q=${encodeURIComponent(tag)}`)}
                    className="px-3 py-1.5 text-xs font-medium text-ink-4 dark:text-surface-4 bg-surface-0/60 dark:bg-ink-1/60 border border-black/8 dark:border-white/8 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-950/20 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-200 dark:hover:border-brand-800 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── Categories ────────────────────────── */}
      <section className="py-20">
        <div className="container">
          <SectionHeading
            title="Explore Categories"
            subtitle="Browse across our diverse marketplace"
            action="View All"
            href="/browse"
          />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
            {CATEGORIES.map((cat, i) => (
              <CategoryCard
                key={cat.slug}
                slug={cat.slug}
                name={cat.name}
                icon={cat.icon}
                count={Math.floor(Math.random() * 5000) + 500}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Listings ─────────────────── */}
      <section className="py-10">
        <div className="container">
          <SectionHeading
            title="Featured Listings"
            subtitle="Hand-picked premium items from verified sellers"
            action="See All"
            href="/browse"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((listing, i) => (
              <ListingCard key={listing.id} listing={listing} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Trending ──────────────────────────── */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shrink-0">
              <TrendingUpIcon className="text-white" size={18} />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-ink-0 dark:text-surface-1">Trending Now</h2>
              <p className="text-ink-5 dark:text-surface-4 text-sm">Most viewed listings this week</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trending.map((listing, i) => (
              <ListingCard key={listing.id} listing={listing} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Statistics ────────────────────────── */}
      <section ref={statsRef} className="py-16">
        <div className="container">
          <div className="bg-gradient-to-br from-ink-0 to-ink-1 dark:from-ink-1 dark:to-ink-2 rounded-3xl px-8 py-14 sm:px-14 relative overflow-hidden">
            <div className="absolute inset-0 hero-mesh opacity-60 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-surface-1 text-center mb-2">
                The numbers speak for themselves
              </h2>
              <p className="text-surface-4 text-center text-sm sm:text-base mb-12 max-w-md mx-auto">
                A thriving marketplace trusted by thousands of buyers and sellers.
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`text-center ${statsVisible ? "animate-countUp" : "opacity-0"}`}
                    style={{ animationDelay: `${i * 0.12}s` }}
                  >
                    <div className="w-11 h-11 rounded-2xl bg-brand-500/12 flex items-center justify-center mx-auto mb-4 text-brand-400">
                      {stat.icon}
                    </div>
                    <p className="font-display text-3xl sm:text-4xl font-bold text-surface-1 leading-none mb-1.5">
                      {stat.value}
                    </p>
                    <p className="text-surface-4 text-xs sm:text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────── */}
      <section className="py-16">
        <div className="container">
          <SectionHeading
            title="What our users say"
            subtitle="Join thousands of satisfied buyers and sellers"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={`animate-fadeInUp delay-${i + 1} p-6 bg-surface-0 dark:bg-ink-1 rounded-2xl border border-black/5 dark:border-white/6 flex flex-col gap-4`}
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <StarIcon key={j} size={13} className="text-brand-500" />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-ink-2 dark:text-surface-3 text-sm leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-black/5 dark:border-white/6">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-ink-0 dark:text-surface-1 truncate">{t.name}</p>
                    <p className="text-xs text-ink-5 dark:text-surface-4 truncate">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────── */}
      <section className="py-16">
        <div className="container">
          <div className="text-center py-16 px-8 bg-gradient-to-br from-brand-50 to-brand-100/40 dark:from-brand-950/20 dark:to-brand-900/10 rounded-3xl border border-brand-200/40 dark:border-brand-800/20">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink-0 dark:text-surface-1 mb-4">
              Ready to start selling?
            </h2>
            <p className="text-ink-4 dark:text-surface-4 text-base sm:text-lg mb-8 max-w-sm mx-auto leading-relaxed">
              Create your seller account in minutes and reach millions of buyers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/create"
                className="px-8 py-3.5 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-500/20"
              >
                Create a Listing
              </Link>
              <Link
                href="/auth/register"
                className="px-8 py-3.5 bg-surface-0 dark:bg-ink-1 text-ink-0 dark:text-surface-1 font-semibold rounded-xl border border-black/10 dark:border-white/10 hover:border-brand-300 dark:hover:border-brand-700 transition-all"
              >
                Open a Shop
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
