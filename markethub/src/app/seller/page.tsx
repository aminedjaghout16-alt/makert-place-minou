// ─────────────────────────────────────────────
// Seller Dashboard — Analytics + Manage
// ─────────────────────────────────────────────
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { PlusIcon, EyeIcon, EditIcon, TrashIcon, PackageIcon, MessageIcon, DollarSignIcon } from "@/components/ui/Icons";

export default function SellerDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) { router.push("/auth/login"); return null; }

  const myListings = MOCK_LISTINGS.slice(0, 5);
  const stats = [
    { label: "Total Views", value: "12,847", change: "+12.5%", icon: <EyeIcon /> },
    { label: "Active Listings", value: "24", change: "+3", icon: <PackageIcon /> },
    { label: "Messages", value: "89", change: "+8.2%", icon: <MessageIcon /> },
    { label: "Revenue", value: "$8,420", change: "+23.1%", icon: <DollarSignIcon /> },
  ];
  const chartBars = [35, 52, 48, 65, 72, 58, 80, 68, 90, 75, 85, 95];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="container py-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink-0 dark:text-surface-1">Seller Dashboard</h1>
          <p className="text-ink-4 dark:text-surface-4 mt-1">Welcome back, {user.username}</p>
        </div>
        <Link href="/create">
          <Button><PlusIcon size={18} /> New Listing</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={s.label} className={`animate-fadeInUp delay-${i + 1} bg-surface-0 dark:bg-ink-1 rounded-2xl border border-ink-0/5 dark:border-surface-1/5 p-5`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-ink-4 dark:text-surface-4">{s.icon}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-green-600 bg-green-50 dark:bg-green-950/30 dark:text-green-400">{s.change}</span>
            </div>
            <p className="font-display text-2xl font-bold text-ink-0 dark:text-surface-1">{s.value}</p>
            <p className="text-sm text-ink-4 dark:text-surface-4 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-surface-0 dark:bg-ink-1 rounded-2xl border border-ink-0/5 dark:border-surface-1/5 p-6 mb-8">
        <h3 className="font-semibold text-ink-0 dark:text-surface-1 mb-6">Monthly Views</h3>
        <div className="flex items-end gap-2 h-40">
          {chartBars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-lg bg-gradient-to-t from-brand-500 to-brand-400 transition-all hover:from-brand-600 hover:to-brand-500" style={{ height: `${h}%` }} />
              <span className="text-[9px] text-ink-5 hidden sm:block">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* My Listings */}
      <div className="bg-surface-0 dark:bg-ink-1 rounded-2xl border border-ink-0/5 dark:border-surface-1/5 overflow-hidden">
        <div className="p-6 border-b border-ink-0/5 dark:border-surface-1/5 flex items-center justify-between">
          <h3 className="font-semibold text-ink-0 dark:text-surface-1">My Listings</h3>
          <span className="text-sm text-ink-4 dark:text-surface-4">{myListings.length} active</span>
        </div>
        <div className="divide-y divide-ink-0/5 dark:divide-surface-1/5">
          {myListings.map((l) => (
            <div key={l.id} className="flex items-center gap-4 p-4 hover:bg-surface-2/30 dark:hover:bg-ink-2/30 transition-colors">
              <img src={l.images[0]} alt={l.title} className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-ink-0 dark:text-surface-1 truncate">{l.title}</p>
                <p className="text-xs text-ink-4 dark:text-surface-4 flex items-center gap-2 mt-0.5">
                  <span>${l.price.toLocaleString()}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><EyeIcon size={12} /> {l.views}</span>
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="p-2 rounded-lg hover:bg-ink-0/5 dark:hover:bg-surface-1/5 text-ink-4 dark:text-surface-4"><EditIcon size={14} /></button>
                <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-ink-4 hover:text-red-500"><TrashIcon size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
