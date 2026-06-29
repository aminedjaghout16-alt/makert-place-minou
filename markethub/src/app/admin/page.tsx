// ─────────────────────────────────────────────
// Admin Dashboard
// ─────────────────────────────────────────────
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { MOCK_LISTINGS, MOCK_USERS } from "@/lib/mock-data";
import { ListingCard } from "@/components/ui/ListingCard";
import { CATEGORIES } from "@/lib/data";
import { UsersIcon, PackageIcon, FlagIcon, DollarSignIcon, CheckIcon, XIcon } from "@/components/ui/Icons";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  if (!user || user.role !== "ADMIN") {
    // In demo mode, allow access
  }

  const tabs = ["overview", "users", "listings", "reports", "categories"];
  const adminStats = [
    { label: "Total Users", value: "48,291", change: "+2.4%", icon: <UsersIcon /> },
    { label: "Active Listings", value: "12,483", change: "+5.7%", icon: <PackageIcon /> },
    { label: "Pending Reports", value: "23", change: "-12%", icon: <FlagIcon /> },
    { label: "Revenue (MTD)", value: "$124,800", change: "+18.3%", icon: <DollarSignIcon /> },
  ];

  const recentUsers = MOCK_USERS.slice(0, 5).map((u, i) => ({
    ...u,
    status: ["active", "pending", "active", "suspended", "active"][i] as string,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink-0 dark:text-surface-1">Admin Dashboard</h1>
          <p className="text-ink-4 dark:text-surface-4 mt-1">Platform management & analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-green-600 dark:text-green-400 font-medium">All systems operational</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-surface-2/50 dark:bg-ink-1/50 rounded-xl mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-all ${activeTab === tab ? "bg-surface-0 dark:bg-ink-1 text-ink-0 dark:text-surface-1 shadow-sm" : "text-ink-4 dark:text-surface-4 hover:text-ink-0 dark:hover:text-surface-2"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {adminStats.map((s, i) => (
              <div key={s.label} className={`animate-fadeInUp delay-${i + 1} bg-surface-0 dark:bg-ink-1 rounded-2xl border border-ink-0/5 dark:border-surface-1/5 p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-ink-4 dark:text-surface-4">{s.icon}</span>
                  <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-2 py-0.5 rounded-full">{s.change}</span>
                </div>
                <p className="font-display text-2xl font-bold text-ink-0 dark:text-surface-1">{s.value}</p>
                <p className="text-sm text-ink-4 dark:text-surface-4 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-surface-0 dark:bg-ink-1 rounded-2xl border border-ink-0/5 dark:border-surface-1/5 p-6 mb-8">
            <h3 className="font-semibold mb-6">Platform Revenue</h3>
            <div className="flex items-end gap-3 h-48">
              {[42, 55, 48, 70, 65, 80, 72, 88, 76, 92, 85, 98].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-lg bg-gradient-to-t from-brand-600 to-brand-400 hover:from-brand-700 hover:to-brand-500 transition-all" style={{ height: `${h}%` }} />
                  <span className="text-[9px] text-ink-5 hidden sm:block">{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Users */}
            <div className="bg-surface-0 dark:bg-ink-1 rounded-2xl border border-ink-0/5 dark:border-surface-1/5 overflow-hidden">
              <div className="p-5 border-b border-ink-0/5 dark:border-surface-1/5"><h3 className="font-semibold">Recent Users</h3></div>
              <div className="divide-y divide-ink-0/5 dark:divide-surface-1/5">
                {recentUsers.map((u) => (
                  <div key={u.id} className="flex items-center gap-3 p-4">
                    <img src={u.avatar ?? ""} alt="" className="w-9 h-9 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{u.username}</p>
                      <p className="text-xs text-ink-4 dark:text-surface-4">{u.email}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-1 rounded-full capitalize ${u.status === "active" ? "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400" : u.status === "pending" ? "bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400" : "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400"}`}>
                      {u.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Moderation */}
            <div className="bg-surface-0 dark:bg-ink-1 rounded-2xl border border-ink-0/5 dark:border-surface-1/5 overflow-hidden">
              <div className="p-5 border-b border-ink-0/5 dark:border-surface-1/5"><h3 className="font-semibold">Pending Moderation</h3></div>
              <div className="divide-y divide-ink-0/5 dark:divide-surface-1/5">
                {MOCK_LISTINGS.slice(0, 3).map((l) => (
                  <div key={l.id} className="flex items-center gap-3 p-4">
                    <img src={l.images[0]} alt="" className="w-12 h-9 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{l.title}</p>
                      <p className="text-xs text-ink-4 dark:text-surface-4">${l.price.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg bg-green-50 dark:bg-green-950/30 text-green-600 hover:bg-green-100"><CheckIcon size={14} /></button>
                      <button className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 hover:bg-red-100"><XIcon size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <div className="animate-fadeIn bg-surface-0 dark:bg-ink-1 rounded-2xl border border-ink-0/5 dark:border-surface-1/5 overflow-hidden">
          <div className="p-5 border-b border-ink-0/5 dark:border-surface-1/5 flex justify-between items-center">
            <h3 className="font-semibold">User Management</h3>
            <input type="text" placeholder="Search users..." className="px-3 py-2 rounded-lg bg-surface-2/50 dark:bg-ink-2/50 border-none outline-none text-sm w-48" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-2/30 dark:bg-ink-2/30">
                <tr>
                  {["User", "Email", "Role", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 font-semibold text-ink-4 dark:text-surface-4 text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-0/5 dark:divide-surface-1/5">
                {recentUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-surface-2/20 dark:hover:bg-ink-2/20">
                    <td className="px-5 py-3 font-medium">{u.username}</td>
                    <td className="px-5 py-3 text-ink-4 dark:text-surface-4">{u.email}</td>
                    <td className="px-5 py-3"><span className="text-xs capitalize">{u.role}</span></td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] font-semibold px-2 py-1 rounded-full capitalize ${u.status === "active" ? "bg-green-50 dark:bg-green-950/30 text-green-600" : u.status === "pending" ? "bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600" : "bg-red-50 dark:bg-red-950/30 text-red-600"}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-5 py-3"><button className="text-brand-500 hover:underline text-xs font-medium">Manage</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "listings" && (
        <div className="animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_LISTINGS.slice(0, 6).map((l, i) => <ListingCard key={l.id} listing={l} index={i} />)}
          </div>
        </div>
      )}

      {activeTab === "reports" && (
        <div className="animate-fadeIn bg-surface-0 dark:bg-ink-1 rounded-2xl border border-ink-0/5 dark:border-surface-1/5 p-6">
          <h3 className="font-semibold mb-4">Recent Reports</h3>
          <div className="space-y-3">
            {["Spam listing detected", "Suspicious seller activity", "Counterfeit product report", "Payment dispute", "Misleading description"].map((r, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-surface-2/30 dark:bg-ink-2/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${i < 2 ? "bg-red-500" : "bg-yellow-500"}`} />
                  <div>
                    <p className="font-medium text-sm">{r}</p>
                    <p className="text-xs text-ink-4 dark:text-surface-4">{i + 1} report(s) · {i + 2} hours ago</p>
                  </div>
                </div>
                <button className="text-xs font-medium text-brand-500 hover:underline">Review</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "categories" && (
        <div className="animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => (
              <div key={cat.slug} className="bg-surface-0 dark:bg-ink-1 rounded-2xl border border-ink-0/5 dark:border-surface-1/5 p-5 flex items-center gap-4">
                <div className="text-3xl">{cat.icon}</div>
                <div className="flex-1">
                  <p className="font-semibold">{cat.name}</p>
                  <p className="text-sm text-ink-4 dark:text-surface-4">{Math.floor(Math.random() * 5000)} listings</p>
                </div>
                <button className="text-xs font-medium text-brand-500 hover:underline">Edit</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
