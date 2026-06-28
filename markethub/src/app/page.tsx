// ─────────────────────────────────────────────
// Home Page — Landing
// ─────────────────────────────────────────────
"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/data";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import { SearchIcon, ZapIcon, TrendingUpIcon, ShieldIcon, GlobeIcon, DollarSignIcon, PackageIcon, StarIcon, ChevronRightIcon } from "@/components/ui/Icons";
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
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(heroSearch)}`);
  };

  const featured = MOCK_LISTINGS.filter((l) => l.featured).slice(0, 6);
  const trending = MOCK_LISTINGS.slice(0, 4);

  const stats = [
    { label: "Active Listings", value: "48K+", icon: <PackageIcon /> },
    { label: "Verified Sellers", value: "12K+", icon: <ShieldIcon /> },
    { label: "Cities Covered", value: "350+", icon: <GlobeIcon /> },
    { label: "Transactions", value: "$2.4M", icon: <DollarSignIcon /> },
  ];

  const testimonials = [
    { id: 1, name: "Sarah Chen", role: "Freelance Designer", avatar: "https://i.pravatar.cc/80?img=1", text: "MarketHub transformed how I find clients. The platform is incredibly intuitive and the quality of leads is outstanding.", rating: 5 },
    { id: 2, name: "Marcus Johnson", role: "Car Dealer", avatar: "https://i.pravatar.cc/80?img=3", text: "We sold 40% more vehicles after switching to MarketHub. The analytics dashboard gives us insights we never had before.", rating: 5 },
    { id: 3, name: "Emma Rodriguez", role: "Vintage Collector", avatar: "https://i.pravatar.cc/80?img=5", text: "The collectibles community here is amazing. Found rare pieces I searched for years. The verification system builds real trust.", rating: 5 },
  ];

  return (
    <div>
      {/* ── Hero ──────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center hero-mesh noise overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-brand-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-600/5 rounded-full blur-3xl animate-float delay-3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-3xl">
            <div className="animate-fadeInUp inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800/30 mb-8">
              <ZapIcon size={16} />
              <span className="text-sm font-semibold text-brand-700 dark:text-brand-400">
                New: AI-powered recommendations are live
              </span>
            </div>

            <h1 className="animate-fadeInUp delay-1 font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-ink-0 dark:text-surface-1 tracking-tight leading-[1.08]">
              Buy, sell &amp; offer
              <br />
              <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
                anything, anywhere
              </span>
            </h1>

            <p className="animate-fadeInUp delay-2 mt-6 text-lg sm:text-xl text-ink-4 dark:text-surface-4 leading-relaxed max-w-xl">
              The premium marketplace connecting buyers and sellers across 15 categories. From cars to freelance services — everything in one place.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="animate-fadeInUp delay-3 mt-10">
              <div className="flex items-center gap-2 p-2 bg-surface-0 dark:bg-ink-1 rounded-2xl shadow-xl shadow-ink-0/5 dark:shadow-ink-0/30 border border-ink-0/5 dark:border-surface-1/10 max-w-2xl">
                <div className="flex items-center gap-3 flex-1 px-4">
                  <SearchIcon />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Search for cars, electronics, services..."
                    className="w-full py-3 bg-transparent border-none outline-none text-ink-0 dark:text-surface-1 placeholder:text-ink-5 dark:placeholder:text-surface-4 text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl hover:from-brand-600 hover:to-brand-700 transition-all shadow-lg shadow-brand-500/20 text-sm whitespace-nowrap"
                >
                  Search
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 ml-1">
                {["Tesla Model 3", "MacBook Pro", "Freelance Design", "Real Estate"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => router.push(`/search?q=${encodeURIComponent(tag)}`)}
                    className="px-3 py-1.5 text-xs font-medium text-ink-4 dark:text-surface-4 bg-surface-2/50 dark:bg-ink-1/50 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-950/20 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading title="Explore Categories" subtitle="Browse across our diverse marketplace" action="View All" href="/browse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.slug} slug={cat.slug} name={cat.name} icon={cat.icon} count={Math.floor(Math.random() * 5000) + 500} index={i} />
          ))}
        </div>
      </section>

      {/* ── Featured Listings ─────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeading title="Featured Listings" subtitle="Hand-picked premium items from verified sellers" action="See All" href="/browse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>
      </section>

      {/* ── Trending ──────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white">
            <TrendingUpIcon />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold text-ink-0 dark:text-surface-1">Trending Now</h2>
            <p className="text-ink-4 dark:text-surface-4 text-sm mt-0.5">Most viewed listings this week</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>
      </section>

      {/* ── Statistics ────────────────────────── */}
      <section ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-ink-0 to-ink-1 dark:from-ink-1 dark:to-ink-2 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 hero-mesh opacity-50" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-surface-1 text-center mb-3">
              The numbers speak for themselves
            </h2>
            <p className="text-surface-4 text-center mb-12 text-lg">A thriving marketplace trusted by thousands</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, i) => (
                <div key={stat.label} className={`text-center ${statsVisible ? "animate-countUp" : "opacity-0"}`} style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-4 text-brand-400">
                    {stat.icon}
                  </div>
                  <p className="font-display text-3xl sm:text-4xl font-bold text-surface-1">{stat.value}</p>
                  <p className="text-surface-4 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading title="What our users say" subtitle="Join thousands of satisfied buyers and sellers" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={t.id} className={`animate-fadeInUp delay-${i + 1} p-6 bg-surface-0 dark:bg-ink-1 rounded-2xl border border-ink-0/5 dark:border-surface-1/5`}>
              <div className="flex gap-1 mb-4">
                {Array(t.rating).fill(0).map((_, j) => (
                  <span key={j} className="text-brand-500"><StarIcon size={14} /></span>
                ))}
              </div>
              <p className="text-ink-2 dark:text-surface-3 text-[15px] leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-sm text-ink-0 dark:text-surface-1">{t.name}</p>
                  <p className="text-xs text-ink-4 dark:text-surface-4">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center py-16 px-6 bg-gradient-to-br from-brand-50 to-brand-100/50 dark:from-brand-950/20 dark:to-brand-900/10 rounded-3xl border border-brand-200/30 dark:border-brand-800/20">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-0 dark:text-surface-1 mb-4">Ready to start selling?</h2>
          <p className="text-ink-4 dark:text-surface-4 text-lg mb-8 max-w-md mx-auto">
            Create your seller account in minutes and reach millions of buyers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/create" className="px-8 py-3.5 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl hover:from-brand-600 hover:to-brand-700 transition-all shadow-lg shadow-brand-500/20">
              Create a Listing
            </Link>
            <Link href="/auth/register" className="px-8 py-3.5 bg-surface-0 dark:bg-ink-1 text-ink-0 dark:text-surface-1 font-semibold rounded-xl border border-ink-0/10 dark:border-surface-1/10 hover:border-brand-300 dark:hover:border-brand-700 transition-all">
              Open a Shop
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
