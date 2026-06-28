// ─────────────────────────────────────────────
// Settings Page
// ─────────────────────────────────────────────
"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/context/toast-context";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SettingsPage() {
  const { user, updateUsername, updateAvatar, logout } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(user?.username ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState("en");
  const [notifs, setNotifs] = useState({ email: true, push: true, marketing: false });

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("markethub-theme", dark ? "light" : "dark");
  };

  const handleSave = async () => {
    await updateUsername(name);
    toast("Settings saved successfully!");
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fadeIn">
      <h1 className="font-display text-3xl font-bold text-ink-0 dark:text-surface-1 mb-8">Settings</h1>

      <div className="space-y-6">
        {/* Profile */}
        <div className="bg-surface-0 dark:bg-ink-1 rounded-2xl border border-ink-0/5 dark:border-surface-1/5 p-6">
          <h3 className="font-semibold text-ink-0 dark:text-surface-1 mb-4">Profile Information</h3>
          <div className="space-y-4">
            <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            <div>
              <label className="block text-sm font-medium mb-1.5">Bio</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-ink-0/10 dark:border-surface-1/10 bg-surface-0 dark:bg-ink-2 outline-none focus:border-brand-400 text-sm resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Profile Picture</label>
              <div className="flex items-center gap-4">
                {user.avatar ? (
                  <img src={user.avatar} alt="" className="w-16 h-16 rounded-xl object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-brand-500 flex items-center justify-center text-white font-display font-bold text-xl">
                    {user.username[0]?.toUpperCase()}
                  </div>
                )}
                <Button variant="secondary" size="sm">Upload Photo</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-surface-0 dark:bg-ink-1 rounded-2xl border border-ink-0/5 dark:border-surface-1/5 p-6">
          <h3 className="font-semibold text-ink-0 dark:text-surface-1 mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Dark Mode</p>
                <p className="text-xs text-ink-4 dark:text-surface-4">Toggle dark theme</p>
              </div>
              <button onClick={toggleDark} className={`w-12 h-6 rounded-full transition-all ${dark ? "bg-brand-500" : "bg-ink-0/10 dark:bg-surface-1/20"} relative`}>
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${dark ? "left-7" : "left-1"}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Language</p>
                <p className="text-xs text-ink-4 dark:text-surface-4">Select interface language</p>
              </div>
              <select value={lang} onChange={(e) => setLang(e.target.value)} className="px-3 py-1.5 rounded-lg border border-ink-0/10 dark:border-surface-1/10 bg-surface-0 dark:bg-ink-2 text-sm outline-none">
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="ar">العربية</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-surface-0 dark:bg-ink-1 rounded-2xl border border-ink-0/5 dark:border-surface-1/5 p-6">
          <h3 className="font-semibold text-ink-0 dark:text-surface-1 mb-4">Notifications</h3>
          <div className="space-y-3">
            {([
              { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
              { key: "push", label: "Push Notifications", desc: "Browser push notifications" },
              { key: "marketing", label: "Marketing Emails", desc: "Promotional offers and news" },
            ] as const).map((n) => (
              <div key={n.key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{n.label}</p>
                  <p className="text-xs text-ink-4 dark:text-surface-4">{n.desc}</p>
                </div>
                <button
                  onClick={() => setNotifs({ ...notifs, [n.key]: !notifs[n.key] })}
                  className={`w-12 h-6 rounded-full transition-all ${notifs[n.key] ? "bg-brand-500" : "bg-ink-0/10 dark:bg-surface-1/20"} relative`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${notifs[n.key] ? "left-7" : "left-1"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50/50 dark:bg-red-950/10 rounded-2xl border border-red-200/30 dark:border-red-800/20 p-6">
          <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">Danger Zone</h3>
          <p className="text-sm text-ink-4 dark:text-surface-4 mb-4">Once you delete your account, there is no going back.</p>
          <Button variant="danger" size="sm">Delete Account</Button>
        </div>

        <Button onClick={handleSave} className="w-full">Save Changes</Button>
      </div>
    </div>
  );
}
