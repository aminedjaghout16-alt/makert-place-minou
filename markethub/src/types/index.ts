// ─────────────────────────────────────────────
// MarketHub — TypeScript Types
// ─────────────────────────────────────────────

export type Role = "USER" | "SELLER" | "ADMIN";

export interface User {
  id: string;
  firebaseUid: string;
  username: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  role: Role;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ListingStatus = "DRAFT" | "PENDING" | "ACTIVE" | "SOLD" | "FLAGGED" | "REMOVED";

export interface Listing {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  images: string[];
  tags: string[];
  status: ListingStatus;
  featured: boolean;
  views: number;
  seller?: User;
  favoriteCount?: number;
  isFavorited?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string;
  color: string;
  count: number;
  parentId: string | null;
}

export interface Favorite {
  id: string;
  userId: string;
  listingId: string;
  listing?: Listing;
  createdAt: string;
}

export interface Review {
  id: string;
  authorId: string;
  sellerId: string;
  listingId: string;
  rating: number;
  comment: string;
  author?: User;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessage: string | null;
  updatedAt: string;
  participants?: User[];
  unreadCount?: number;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  imageUrl?: string;
  read: boolean;
  createdAt: string;
}

export type ReportStatus = "PENDING" | "REVIEWED" | "RESOLVED" | "DISMISSED";

export interface Report {
  id: string;
  reporterId: string;
  listingId: string | null;
  reason: string;
  description: string;
  status: ReportStatus;
  reporter?: User;
  listing?: Listing;
  createdAt: string;
}

export type NotificationType = "MESSAGE" | "FAVORITE" | "REVIEW" | "LISTING_SOLD" | "PRICE_DROP" | "SYSTEM";

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  link: string | null;
  createdAt: string;
}

export interface AnalyticsEvent {
  id: string;
  listingId: string | null;
  userId: string | null;
  eventType: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

// ── Filter & search ─────────────────────────
export interface SearchFilters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  condition?: string;
  sortBy?: "newest" | "price-asc" | "price-desc" | "popular";
}

// ── API Response ────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
