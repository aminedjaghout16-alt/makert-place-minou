// ─────────────────────────────────────────────
// Navbar Component
// ─────────────────────────────────────────────
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import {
  SunIcon, MoonIcon, MenuIcon, XIcon, PlusIcon,
  MessageIcon, HeartIcon, UserIcon, SearchIcon,
} from "@/components/ui/Icons";

export function Navbar() {
  const { user, logout, loading } = useAuth();
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/browse", label: "Browse" },
    { href: "/browse?category=freelance", label: "Services" },
    { href: "/browse?category=jobs", label: "Jobs" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-shadow">
              <span className="text-white font-display font-bold text-lg">M</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-ink-0 dark:text-surface-1">
              MarketHub
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                  pathname === link.href
                    ? "text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/20"
                    : "text-ink-3 dark:text-surface-3 hover:text-ink-0 dark:hover:text-surface-1 hover:bg-ink-0/5 dark:hover:bg-surface-1/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-ink-0/5 dark:hover:bg-surface-1/10 transition-colors text-ink-3 dark:text-surface-3"
              aria-label="Toggle theme"
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>

            {loading ? (
              <div className="w-9 h-9 rounded-xl bg-ink-0/5 dark:bg-surface-1/10 animate-pulse" />
            ) : user ? (
              <>
                <Link
                  href="/messages"
                  className="p-2.5 rounded-xl hover:bg-ink-0/5 dark:hover:bg-surface-1/10 transition-colors text-ink-3 dark:text-surface-3 relative hidden sm:block"
                >
                  <MessageIcon />
                </Link>
                <Link
                  href="/saved"
                  className="p-2.5 rounded-xl hover:bg-ink-0/5 dark:hover:bg-surface-1/10 transition-colors text-ink-3 dark:text-surface-3 relative hidden sm:block"
                >
                  <HeartIcon />
                </Link>
                <Link
                  href="/create"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-semibold rounded-xl hover:from-brand-600 hover:to-brand-700 transition-all shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30"
                >
                  <PlusIcon size={18} /> Sell
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="w-9 h-9 rounded-xl overflow-hidden ring-2 ring-transparent hover:ring-brand-400 transition-all"
                  >
                    {user.avatar ? (
                      <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-brand-500 flex items-center justify-center text-white text-sm font-bold">
                        {user.username[0]?.toUpperCase()}
                      </div>
                    )}
                  </button>
                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                      <div className="absolute right-0 top-12 w-56 glass rounded-2xl shadow-2xl border border-ink-0/5 dark:border-surface-1/10 py-2 animate-slideDown z-20">
                        <div className="px-4 py-3 border-b border-ink-0/5 dark:border-surface-1/10">
                          <p className="font-semibold text-sm">{user.username}</p>
                          <p className="text-xs text-ink-4 dark:text-surface-4">{user.email}</p>
                        </div>
                        {[
                          { href: "/profile", label: "My Profile" },
                          { href: "/seller", label: "Seller Dashboard" },
                          { href: "/saved", label: "Saved Listings" },
                          { href: "/settings", label: "Settings" },
                        ].map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setProfileOpen(false)}
                            className="block px-4 py-2.5 text-sm hover:bg-ink-0/5 dark:hover:bg-surface-1/5 transition-colors"
                          >
                            {link.label}
                          </Link>
                        ))}
                        {user.role === "ADMIN" && (
                          <Link href="/admin" onClick={() => setProfileOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-ink-0/5 dark:hover:bg-surface-1/5 transition-colors">
                            Admin Dashboard
                          </Link>
                        )}
                        <div className="border-t border-ink-0/5 dark:border-surface-1/10 mt-1 pt-1">
                          <button
                            onClick={() => { logout(); setProfileOpen(false); }}
                            className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                          >
                            Log Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/auth/login" className="px-4 py-2 text-sm font-medium text-ink-3 dark:text-surface-3 hover:text-ink-0 dark:hover:text-surface-1 rounded-xl transition-colors">
                  Log In
                </Link>
                <Link href="/auth/register" className="px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-semibold rounded-xl hover:from-brand-600 hover:to-brand-700 transition-all shadow-lg shadow-brand-500/20">
                  Sign Up
                </Link>
              </div>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-ink-0/5 dark:hover:bg-surface-1/10"
            >
              {mobileOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden glass border-t border-ink-0/5 dark:border-surface-1/10 animate-slideDown">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-medium rounded-xl hover:bg-ink-0/5 dark:hover:bg-surface-1/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <div className="flex gap-2 pt-2">
                <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="flex-1 py-3 text-sm font-medium text-center rounded-xl border border-ink-0/10 dark:border-surface-1/10">
                  Log In
                </Link>
                <Link href="/auth/register" onClick={() => setMobileOpen(false)} className="flex-1 py-3 text-sm font-semibold text-center rounded-xl bg-brand-500 text-white">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
