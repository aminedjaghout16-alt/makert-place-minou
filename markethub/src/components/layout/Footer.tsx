// ─────────────────────────────────────────────
// Footer Component
// ─────────────────────────────────────────────
"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink-0 dark:bg-ink-1 border-t border-ink-0/5 dark:border-surface-1/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <span className="text-white font-display font-bold text-base">M</span>
              </div>
              <span className="font-display font-bold text-lg text-surface-1">MarketHub</span>
            </div>
            <p className="text-sm text-ink-5 leading-relaxed">
              The modern marketplace for buying, selling, and offering services across every niche.
            </p>
          </div>

          {[
            {
              title: "Marketplace",
              links: [
                { href: "/browse", label: "Browse All" },
                { href: "/browse?featured=true", label: "Featured" },
                { href: "/browse?sort=popular", label: "Trending" },
                { href: "/browse", label: "Categories" },
              ],
            },
            {
              title: "Company",
              links: [
                { href: "/", label: "About Us" },
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
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm text-surface-2 mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-ink-5 hover:text-brand-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-semibold text-sm text-surface-2 mb-4">Language</h4>
            <div className="flex flex-col gap-2">
              {["English", "Français", "العربية"].map((lang) => (
                <button key={lang} className="text-sm text-ink-5 hover:text-brand-400 transition-colors text-left">
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-ink-0/10 dark:border-surface-1/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-ink-5">&copy; {new Date().getFullYear()} MarketHub. All rights reserved.</p>
          <div className="flex gap-6">
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
