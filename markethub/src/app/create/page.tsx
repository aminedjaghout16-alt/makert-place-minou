// ─────────────────────────────────────────────
// Create Listing Page — Drag & Drop Uploader
// ─────────────────────────────────────────────
"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/context/toast-context";
import { CATEGORIES } from "@/lib/data";
import { uploadFile } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { UploadIcon, ImagePlusIcon } from "@/components/ui/Icons";

export default function CreateListingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [dragOver, setDragOver] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", price: "", category: "",
    location: "", tags: "", contact: "email",
  });

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center text-center animate-fadeIn">
        <div className="text-6xl mb-4">🔐</div>
        <h2 className="font-display text-2xl font-bold mb-2">Sign in to create a listing</h2>
        <p className="text-ink-4 dark:text-surface-4 mb-6">You need an account to sell on MarketHub</p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => router.push("/auth/login")}>Log In</Button>
          <Button variant="secondary" onClick={() => router.push("/auth/register")}>Sign Up</Button>
        </div>
      </div>
    );
  }

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    await processFiles(files);
  }, []);

  const processFiles = async (files: File[]) => {
    setUploading(true);
    for (const file of files.slice(0, 8 - images.length)) {
      // Try Supabase storage; fall back to local preview
      const url = await uploadFile("listings", `${Date.now()}-${file.name}`, file);
      setImages((prev) => [...prev, url ?? URL.createObjectURL(file)].slice(0, 8));
    }
    setUploading(false);
  };

  const removeImage = (i: number) => setImages((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async () => {
    if (!form.title || !form.price || !form.category) {
      toast("Please fill in required fields", "error");
      return;
    }
    setSubmitting(true);
    try {
      // In production, POST to /api/listings
      await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          images,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      }).catch(() => {});
      toast("Listing published successfully!");
      router.push("/seller");
    } catch {
      toast("Failed to publish listing", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      <h1 className="font-display text-3xl font-bold text-ink-0 dark:text-surface-1 mb-2">Create a Listing</h1>
      <p className="text-ink-4 dark:text-surface-4 mb-8">Fill in the details to post your item or service</p>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <button onClick={() => setStep(s)} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? "bg-brand-500 text-white" : "bg-surface-2 dark:bg-ink-2 text-ink-4 dark:text-surface-4"}`}>
              {s}
            </button>
            {s < 3 && <div className={`flex-1 h-0.5 rounded-full transition-all ${step > s ? "bg-brand-500" : "bg-surface-2 dark:bg-ink-2"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1 — Images & Details */}
      {step === 1 && (
        <div className="animate-fadeIn space-y-6">
          <div>
            <label className="block font-semibold text-sm mb-2">Photos (up to 8)</label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput")?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${dragOver ? "drop-zone-active border-brand-400 bg-brand-50 dark:bg-brand-950/10" : "border-ink-0/10 dark:border-surface-1/10 hover:border-brand-300 dark:hover:border-brand-700"}`}
            >
              <input id="fileInput" type="file" multiple accept="image/*" className="hidden" onChange={(e) => e.target.files && processFiles(Array.from(e.target.files))} />
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-950/30 flex items-center justify-center mb-4 text-brand-500">
                  <UploadIcon />
                </div>
                <p className="font-semibold text-ink-0 dark:text-surface-1 mb-1">Drop images here or click to browse</p>
                <p className="text-sm text-ink-4 dark:text-surface-4">PNG, JPG, WEBP up to 10MB each</p>
              </div>
            </div>
            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button onClick={(e) => { e.stopPropagation(); removeImage(i); }} className="absolute top-1 right-1 w-6 h-6 bg-ink-0/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs">✕</button>
                    {i === 0 && <div className="absolute bottom-1 left-1 px-2 py-0.5 bg-brand-500 text-white text-[10px] font-bold rounded">COVER</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Input label="Title *" value={form.title} onChange={update("title")} placeholder="e.g., iPhone 15 Pro Max 256GB" />
          <div>
            <label className="block text-sm font-medium mb-1.5">Description</label>
            <textarea value={form.description} onChange={update("description")} rows={5} placeholder="Describe your item, condition, what's included..." className="w-full px-4 py-3 rounded-xl border border-ink-0/10 dark:border-surface-1/10 bg-surface-0 dark:bg-ink-1 outline-none focus:border-brand-400 text-sm resize-none" />
          </div>
          <Button onClick={() => setStep(2)} className="w-full">Next Step</Button>
        </div>
      )}

      {/* Step 2 — Pricing & Category */}
      {step === 2 && (
        <div className="animate-fadeIn space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Price ($) *" type="number" value={form.price} onChange={update("price")} placeholder="0.00" />
            <div>
              <label className="block text-sm font-medium mb-1.5">Category *</label>
              <select value={form.category} onChange={update("category")} className="w-full px-4 py-3 rounded-xl border border-ink-0/10 dark:border-surface-1/10 bg-surface-0 dark:bg-ink-1 outline-none focus:border-brand-400 text-sm appearance-none cursor-pointer">
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>)}
              </select>
            </div>
          </div>
          <Input label="Location" value={form.location} onChange={update("location")} placeholder="City, State" />
          <Input label="Tags" value={form.tags} onChange={update("tags")} placeholder="e.g., premium, shipping-available" />
          <div>
            <label className="block text-sm font-medium mb-1.5">Preferred Contact Method</label>
            <div className="grid grid-cols-3 gap-2">
              {(["email", "phone", "chat"] as const).map((m) => (
                <button key={m} onClick={() => setForm((prev) => ({ ...prev, contact: m }))} className={`py-2.5 rounded-xl text-sm font-medium border transition-all capitalize ${form.contact === m ? "border-brand-400 bg-brand-50 dark:bg-brand-950/20 text-brand-600 dark:text-brand-400" : "border-ink-0/10 dark:border-surface-1/10 text-ink-3 dark:text-surface-3"}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep(1)} className="flex-1">Back</Button>
            <Button onClick={() => setStep(3)} className="flex-1">Next Step</Button>
          </div>
        </div>
      )}

      {/* Step 3 — Review & Publish */}
      {step === 3 && (
        <div className="animate-fadeIn space-y-6">
          <h3 className="font-semibold text-lg">Review your listing</h3>
          <div className="bg-surface-0 dark:bg-ink-1 rounded-2xl border border-ink-0/5 dark:border-surface-1/5 p-6 space-y-4">
            {images.length > 0 && <img src={images[0]} alt="" className="w-full h-48 object-cover rounded-xl" />}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-ink-4 dark:text-surface-4">Title</p><p className="font-medium">{form.title || "—"}</p></div>
              <div><p className="text-ink-4 dark:text-surface-4">Price</p><p className="font-medium">${form.price || "—"}</p></div>
              <div><p className="text-ink-4 dark:text-surface-4">Category</p><p className="font-medium">{CATEGORIES.find((c) => c.slug === form.category)?.name ?? "—"}</p></div>
              <div><p className="text-ink-4 dark:text-surface-4">Location</p><p className="font-medium">{form.location || "—"}</p></div>
            </div>
          </div>

          {/* Promotion */}
          <div className="bg-gradient-to-r from-brand-50 to-brand-100/50 dark:from-brand-950/20 dark:to-brand-900/10 rounded-2xl p-5 border border-brand-200/30 dark:border-brand-800/20">
            <p className="font-semibold text-sm mb-2">🚀 Boost your listing</p>
            <p className="text-sm text-ink-4 dark:text-surface-4 mb-3">Get 10x more views with featured placement</p>
            <div className="grid grid-cols-3 gap-2">
              {[{ n: "Basic", p: "$4.99", d: "3 days" }, { n: "Featured", p: "$9.99", d: "7 days" }, { n: "Premium", p: "$19.99", d: "14 days" }].map((p) => (
                <button key={p.n} className="p-3 rounded-xl border border-ink-0/10 dark:border-surface-1/10 hover:border-brand-400 transition-all text-center">
                  <p className="font-bold text-sm">{p.n}</p>
                  <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold">{p.p}</p>
                  <p className="text-[10px] text-ink-4">{p.d}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep(2)} className="flex-1">Back</Button>
            <Button onClick={handleSubmit} loading={submitting} className="flex-1">Publish Listing</Button>
          </div>
        </div>
      )}
    </div>
  );
}
