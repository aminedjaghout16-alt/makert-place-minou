// ─────────────────────────────────────────────
// Footer — improved layout & spacing
// ─────────────────────────────────────────────
"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  const cols = [
    {
      title: "Marketplace",
      links: [
        { href: "/browse",                 label: "Browse All" },
        { href: "/browse?featured=true",   label: "Featured" },
        { href: "/browse?sort=popular",    label: "Trending" },
        { href: "/browse",                 label: "Categories" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/", label: "About" },
        { href: "/", label: "Careers" },
        { href: "/", label: "Press" },
        { href: "/", label: "Blog" },
      ],
    },
    {
      title: "Support",
      links: [
        { href: "/", label: "Help Center" },
        { href: "/", label: "Safety" },
        { href: "/", label: "Terms" },
        { href: "/", label: "Privacy" },
      ],
    },
  ];

  return (
    <footer className="bg-ink-0 dark:bg-ink-1 mt-24 border-t border-white/5">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <span className="text-white font-display font-bold text-[15px]">M</span>
              </div>
              <span className="font-display font-bold text-lg text-surface-1">MarketHub</span>
            </Link>
            <p className="text-sm text-ink-5 leading-relaxed max-w-xs">
              The modern marketplace for buying, selling, and offering services across every niche.
            </p>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-surface-4 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-5 hover:text-brand-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-ink-5 order-2 sm:order-1">
            &copy; {year} MarketHub. All rights reserved.
          </p>
          <div className="flex items-center gap-6 order-1 sm:order-2">
            {["Twitter", "GitHub", "LinkedIn"].map((s) => (
              <button key={s} className="text-sm text-ink-5 hover:text-brand-400 transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
