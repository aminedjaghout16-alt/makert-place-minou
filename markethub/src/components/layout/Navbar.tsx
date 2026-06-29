// ─────────────────────────────────────────────
// Navbar — improved layout & alignment
// ─────────────────────────────────────────────
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import {
  SunIcon, MoonIcon, MenuIcon, XIcon, PlusIcon,
  MessageIcon, HeartIcon, SearchIcon,
} from "@/components/ui/Icons";

export function Navbar() {
  const { user, logout, loading } = useAuth();
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  // Close profile on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [profileOpen]);

  // Close mobile on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("markethub-theme", next ? "dark" : "light");
  };

  const navLinks = [
    { href: "/",                       label: "Home" },
    { href: "/browse",                  label: "Browse" },
    { href: "/browse?category=freelance", label: "Services" },
    { href: "/browse?category=jobs",     label: "Jobs" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-black/5 dark:border-white/5 shadow-sm shadow-black/5"
          : "bg-transparent"
      )}
      style={{ height: "var(--nav-height)" }}
    >
      <div className="container h-full flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-shadow">
            <span className="text-white font-display font-bold text-[15px]">M</span>
          </div>
          <span className="font-display font-bold text-[1.1rem] tracking-tight text-ink-0 dark:text-surface-1 hidden sm:block">
            MarketHub
          </span>
        </Link>

        {/* ── Desktop nav links ── */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3.5 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive(link.href)
                  ? "text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/25"
                  : "text-ink-3 dark:text-surface-3 hover:text-ink-0 dark:hover:text-surface-1 hover:bg-black/5 dark:hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── Right side actions ── */}
        <div className="flex items-center gap-1.5">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-ink-4 dark:text-surface-4 hover:text-ink-0 dark:hover:text-surface-1 hover:bg-black/5 dark:hover:bg-white/8 transition-colors"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>

          {loading ? (
            <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/8 animate-pulse" />
          ) : user ? (
            <>
              {/* Messages */}
              <Link
                href="/messages"
                aria-label="Messages"
                className="hidden sm:flex p-2 rounded-lg text-ink-4 dark:text-surface-4 hover:text-ink-0 dark:hover:text-surface-1 hover:bg-black/5 dark:hover:bg-white/8 transition-colors"
              >
                <MessageIcon />
              </Link>

              {/* Saved */}
              <Link
                href="/saved"
                aria-label="Saved"
                className="hidden sm:flex p-2 rounded-lg text-ink-4 dark:text-surface-4 hover:text-ink-0 dark:hover:text-surface-1 hover:bg-black/5 dark:hover:bg-white/8 transition-colors"
              >
                <HeartIcon />
              </Link>

              {/* Sell CTA */}
              <Link
                href="/create"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white text-sm font-semibold rounded-lg transition-all shadow-sm shadow-brand-500/20 hover:shadow-md hover:shadow-brand-500/25"
              >
                <PlusIcon size={16} />
                Sell
              </Link>

              {/* Avatar + dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  aria-label="Open profile menu"
                  aria-expanded={profileOpen}
                  className="w-8 h-8 rounded-lg overflow-hidden ring-2 ring-transparent hover:ring-brand-400 focus:ring-brand-400 transition-all"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold">
                      {user.username[0]?.toUpperCase()}
                    </div>
                  )}
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-[calc(100%+8px)] w-52 glass rounded-xl shadow-xl border border-black/8 dark:border-white/8 py-1.5 animate-slideDown z-50">
                    {/* User info */}
                    <div className="px-4 py-2.5 border-b border-black/6 dark:border-white/6 mb-1">
                      <p className="font-semibold text-[13px] text-ink-0 dark:text-surface-1 truncate">{user.username}</p>
                      <p className="text-[11px] text-ink-5 dark:text-surface-4 truncate">{user.email}</p>
                    </div>
                    {[
                      { href: "/profile",  label: "My Profile" },
                      { href: "/seller",   label: "Seller Dashboard" },
                      { href: "/saved",    label: "Saved Listings" },
                      { href: "/settings", label: "Settings" },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2.5 text-sm text-ink-2 dark:text-surface-3 hover:text-ink-0 dark:hover:text-surface-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                    {user.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2.5 text-sm text-ink-2 dark:text-surface-3 hover:text-ink-0 dark:hover:text-surface-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <div className="border-t border-black/6 dark:border-white/6 mt-1 pt-1">
                      <button
                        onClick={() => { logout(); setProfileOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/auth/login"
                className="px-3.5 py-2 text-sm font-medium text-ink-3 dark:text-surface-3 hover:text-ink-0 dark:hover:text-surface-1 rounded-lg transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 rounded-lg transition-all shadow-sm shadow-brand-500/20"
              >
                Sign up
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-lg text-ink-3 dark:text-surface-3 hover:bg-black/5 dark:hover:bg-white/8 transition-colors"
          >
            {mobileOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden glass border-t border-black/6 dark:border-white/6 animate-slideDown">
          <div className="container py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                  isActive(link.href)
                    ? "bg-brand-50 dark:bg-brand-950/20 text-brand-600 dark:text-brand-400"
                    : "text-ink-2 dark:text-surface-2 hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="h-px bg-black/6 dark:bg-white/6 my-1" />

            {user ? (
              <>
                <Link href="/create" className="flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-xl bg-brand-500 text-white">
                  <PlusIcon size={16} /> Post a Listing
                </Link>
                <Link href="/messages" className="px-4 py-3 text-sm font-medium text-ink-2 dark:text-surface-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">Messages</Link>
                <Link href="/saved"    className="px-4 py-3 text-sm font-medium text-ink-2 dark:text-surface-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">Saved</Link>
                <Link href="/profile"  className="px-4 py-3 text-sm font-medium text-ink-2 dark:text-surface-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">Profile</Link>
                <button
                  onClick={logout}
                  className="px-4 py-3 text-sm font-medium text-red-500 text-left hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex gap-2 mt-1">
                <Link href="/auth/login"    className="flex-1 py-3 text-sm font-medium text-center rounded-xl border border-black/10 dark:border-white/10 text-ink-2 dark:text-surface-2">Log in</Link>
                <Link href="/auth/register" className="flex-1 py-3 text-sm font-semibold text-center rounded-xl bg-brand-500 text-white">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
