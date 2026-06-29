// ─────────────────────────────────────────────
// MarketHub — Categories & Constants
// ─────────────────────────────────────────────

export const CATEGORIES = [
  { slug: "cars", name: "Cars", icon: "🚗", color: "#ee7612" },
  { slug: "real-estate", name: "Real Estate", icon: "🏠", color: "#b94309" },
  { slug: "electronics", name: "Electronics", icon: "📱", color: "#4a90d9" },
  { slug: "gaming", name: "Gaming", icon: "🎮", color: "#7c3aed" },
  { slug: "jobs", name: "Jobs", icon: "💼", color: "#059669" },
  { slug: "freelance", name: "Freelance Services", icon: "🎨", color: "#d946ef" },
  { slug: "furniture", name: "Furniture", icon: "🛋️", color: "#ca8a04" },
  { slug: "fashion", name: "Fashion", icon: "👗", color: "#e11d48" },
  { slug: "books", name: "Books", icon: "📚", color: "#0891b2" },
  { slug: "collectibles", name: "Collectibles", icon: "🏺", color: "#92400e" },
  { slug: "pets", name: "Pets", icon: "🐾", color: "#16a34a" },
  { slug: "sports", name: "Sports Equipment", icon: "⚽", color: "#2563eb" },
  { slug: "business", name: "Business Equipment", icon: "🏭", color: "#475569" },
  { slug: "local", name: "Local Services", icon: "🔧", color: "#ea580c" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);

export const CONDITIONS = [
  "Brand New",
  "Used - Like New",
  "Used - Excellent",
  "Used - Good",
  "Used - Fair",
  "Refurbished",
] as const;

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
] as const;

export const PRICE_RANGES = [
  { label: "Any", min: undefined, max: undefined },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 – $200", min: 50, max: 200 },
  { label: "$200 – $1,000", min: 200, max: 1000 },
  { label: "$1,000 – $10,000", min: 1000, max: 10000 },
  { label: "$10,000+", min: 10000, max: undefined },
] as const;

export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "ar", name: "العربية" },
] as const;
