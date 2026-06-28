// ─────────────────────────────────────────────
// Mock Data — demo mode fallback
// Used when Firebase/Supabase are not configured
// ─────────────────────────────────────────────
import type { Listing, User, Conversation, Message } from "@/types";

const IMG = (q: string, w = 600, h = 400) =>
  `https://images.unsplash.com/${q}?w=${w}&h=${h}&fit=crop`;

export const MOCK_USERS: User[] = [
  { id: "u1", firebaseUid: "fb1", username: "AutoElite", email: "auto@example.com", avatar: "https://i.pravatar.cc/80?img=12", bio: "Premium car dealership", role: "SELLER", verified: true, createdAt: "2024-01-15T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "u2", firebaseUid: "fb2", username: "UrbanLiving", email: "urban@example.com", avatar: "https://i.pravatar.cc/80?img=14", bio: "Real estate in NYC", role: "SELLER", verified: true, createdAt: "2024-02-10T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "u3", firebaseUid: "fb3", username: "TechDeals", email: "tech@example.com", avatar: "https://i.pravatar.cc/80?img=16", bio: "Latest gadgets", role: "SELLER", verified: true, createdAt: "2024-03-01T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "u4", firebaseUid: "fb4", username: "GameZone", email: "game@example.com", avatar: "https://i.pravatar.cc/80?img=18", bio: "Gaming gear", role: "USER", verified: false, createdAt: "2024-03-20T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "u5", firebaseUid: "fb5", username: "HomeStyle", email: "home@example.com", avatar: "https://i.pravatar.cc/80?img=20", bio: "Modern furniture", role: "SELLER", verified: true, createdAt: "2024-01-25T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "u6", firebaseUid: "fb6", username: "VintageVibes", email: "vintage@example.com", avatar: "https://i.pravatar.cc/80?img=22", bio: "Vintage fashion collector", role: "USER", verified: false, createdAt: "2024-04-10T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "u7", firebaseUid: "fb7", username: "DevMaster", email: "dev@example.com", avatar: "https://i.pravatar.cc/80?img=24", bio: "Full-stack developer", role: "SELLER", verified: true, createdAt: "2024-02-15T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "u8", firebaseUid: "fb8", username: "BookCollector", email: "books@example.com", avatar: "https://i.pravatar.cc/80?img=26", bio: "Rare books & manuscripts", role: "USER", verified: true, createdAt: "2024-05-01T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
];

export const MOCK_LISTINGS: Listing[] = [
  {
    id: "l1", sellerId: "u1", title: "2022 Tesla Model 3 Long Range", description: "Pristine condition, single owner, full autopilot. 25k miles. White exterior, black interior. Premium connectivity included.",
    price: 38500, category: "cars", location: "San Francisco, CA",
    images: [IMG("photo-1560958089-b8a1929cea89"), IMG("photo-1553440569-bcc63803a83d"), IMG("photo-1617788138017-80ad40651399")],
    tags: ["electric", "autopilot", "premium"], status: "ACTIVE", featured: true, views: 1240,
    seller: MOCK_USERS[0], favoriteCount: 89, isFavorited: false,
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: "l2", sellerId: "u2", title: "Modern Downtown Apartment - 2BR", description: "Spacious 2-bedroom in the heart of downtown. Floor-to-ceiling windows, modern kitchen, in-unit washer/dryer. Pets welcome.",
    price: 2850, category: "real-estate", location: "New York, NY",
    images: [IMG("photo-1522708323590-d24dbb6b0267"), IMG("photo-1502672260266-1c1ef2d93688")],
    tags: ["apartment", "downtown", "pets-ok"], status: "ACTIVE", featured: true, views: 2340,
    seller: MOCK_USERS[1], favoriteCount: 156, isFavorited: false,
    createdAt: new Date(Date.now() - 5 * 3600000).toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: "l3", sellerId: "u3", title: 'MacBook Pro 16" M3 Max — 64GB', description: "Brand new sealed MacBook Pro with M3 Max chip, 64GB RAM, 1TB SSD. Space Black. AppleCare+ included.",
    price: 2899, category: "electronics", location: "Austin, TX",
    images: [IMG("photo-1517336714731-489689fd1ca8"), IMG("photo-1611186871348-b1ce696e52c9")],
    tags: ["apple", "brand-new", "m3-max"], status: "ACTIVE", featured: true, views: 890,
    seller: MOCK_USERS[2], favoriteCount: 67, isFavorited: false,
    createdAt: new Date(Date.now() - 1 * 3600000).toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: "l4", sellerId: "u4", title: "PS5 Pro + 5 Games Bundle", description: "PS5 Pro console with DualSense controller, power cable, HDMI, and 5 top games including Spider-Man 2, God of War, and more.",
    price: 749, category: "gaming", location: "Chicago, IL",
    images: [IMG("photo-1606144042614-b2417e99c4e3")],
    tags: ["playstation", "bundle", "console"], status: "ACTIVE", featured: false, views: 567,
    seller: MOCK_USERS[3], favoriteCount: 34, isFavorited: false,
    createdAt: new Date(Date.now() - 3 * 3600000).toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: "l5", sellerId: "u5", title: "Mid-Century Modern Sofa Set", description: "Beautiful mid-century modern sofa in teal velvet. Solid walnut legs. Excellent condition, no stains or tears.",
    price: 1450, category: "furniture", location: "Portland, OR",
    images: [IMG("photo-1555041469-a586c61ea9bc")],
    tags: ["modern", "velvet", "mid-century"], status: "ACTIVE", featured: true, views: 445,
    seller: MOCK_USERS[4], favoriteCount: 52, isFavorited: false,
    createdAt: new Date(Date.now() - 6 * 3600000).toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: "l6", sellerId: "u6", title: "Vintage Leather Jacket — Size M", description: "Genuine vintage leather jacket from the 1980s. Butter-soft leather, classic fit. Minor patina adds character.",
    price: 189, category: "fashion", location: "Los Angeles, CA",
    images: [IMG("photo-1551028719-00167b16eac5")],
    tags: ["vintage", "leather", "genuine"], status: "ACTIVE", featured: false, views: 234,
    seller: MOCK_USERS[5], favoriteCount: 28, isFavorited: false,
    createdAt: new Date(Date.now() - 8 * 3600000).toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: "l7", sellerId: "u7", title: "Full Stack Web Development", description: "Expert full-stack web development services. React, Next.js, Node.js, PostgreSQL. Fast turnaround, clean code, ongoing support.",
    price: 75, category: "freelance", location: "Remote",
    images: [IMG("photo-1461749280684-dccba630e2f6")],
    tags: ["react", "node", "full-stack"], status: "ACTIVE", featured: true, views: 1560,
    seller: MOCK_USERS[6], favoriteCount: 98, isFavorited: false,
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: "l8", sellerId: "u8", title: "Rare 1st Edition Harry Potter Set", description: "Complete set of first edition Harry Potter books (UK). Excellent condition with dust jackets. Authenticated.",
    price: 4200, category: "collectibles", location: "Boston, MA",
    images: [IMG("photo-1512820790803-83ca734da794")],
    tags: ["rare", "first-edition", "authenticated"], status: "ACTIVE", featured: false, views: 678,
    seller: MOCK_USERS[7], favoriteCount: 45, isFavorited: false,
    createdAt: new Date(Date.now() - 12 * 3600000).toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: "l9", sellerId: "u1", title: "Golden Retriever Puppies", description: "AKC registered Golden Retriever puppies. Health guaranteed, first vaccinations done. Ready for their forever homes.",
    price: 1200, category: "pets", location: "Denver, CO",
    images: [IMG("photo-1552053831-71594a27632d")],
    tags: ["akc", "health-guaranteed", "puppies"], status: "ACTIVE", featured: true, views: 3450,
    seller: MOCK_USERS[0], favoriteCount: 234, isFavorited: false,
    createdAt: new Date(Date.now() - 4 * 3600000).toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: "l10", sellerId: "u3", title: "Professional Mountain Bike — Carbon", description: "Full carbon frame mountain bike. Fox suspension, Shimano XT groupset. Size L. Ridden one season.",
    price: 3200, category: "sports", location: "Boulder, CO",
    images: [IMG("photo-1532298229144-0ec0c57515c7")],
    tags: ["carbon", "professional", "shimano"], status: "ACTIVE", featured: false, views: 432,
    seller: MOCK_USERS[2], favoriteCount: 38, isFavorited: false,
    createdAt: new Date(Date.now() - 48 * 3600000).toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: "l11", sellerId: "u5", title: "Commercial Espresso Machine", description: "La Marzocco Linea Mini. Professionally refurbished, 6-month warranty. Perfect for home baristas or small cafes.",
    price: 5600, category: "business", location: "Seattle, WA",
    images: [IMG("photo-1510888009506-64a0c0b0da05")],
    tags: ["commercial", "refurbished", "warranty"], status: "ACTIVE", featured: false, views: 189,
    seller: MOCK_USERS[4], favoriteCount: 12, isFavorited: false,
    createdAt: new Date(Date.now() - 72 * 3600000).toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: "l12", sellerId: "u7", title: "Senior Software Engineer Position", description: "Join our team! Remote-first, competitive salary, equity, unlimited PTO. Tech stack: React, Node, PostgreSQL, AWS.",
    price: 180000, category: "jobs", location: "Remote",
    images: [IMG("photo-1497032628192-86f99bcd76bc")],
    tags: ["remote", "senior", "react"], status: "ACTIVE", featured: true, views: 5670,
    seller: MOCK_USERS[6], favoriteCount: 312, isFavorited: false,
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(), updatedAt: new Date().toISOString(),
  },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  { id: "c1", participantIds: ["current", "u1"], lastMessage: "Is the Tesla still available?", updatedAt: new Date(Date.now() - 120000).toISOString(), unreadCount: 2 },
  { id: "c2", participantIds: ["current", "u3"], lastMessage: "Thanks for the purchase!", updatedAt: new Date(Date.now() - 3600000).toISOString(), unreadCount: 0 },
  { id: "c3", participantIds: ["current", "u5"], lastMessage: "I can deliver on Saturday", updatedAt: new Date(Date.now() - 10800000).toISOString(), unreadCount: 1 },
  { id: "c4", participantIds: ["current", "u7"], lastMessage: "Project files are ready for review", updatedAt: new Date(Date.now() - 86400000).toISOString(), unreadCount: 0 },
];

export const MOCK_MESSAGES: Message[] = [
  { id: "m1", conversationId: "c1", senderId: "other", text: "Hi! Is the MacBook Pro still available?", read: true, createdAt: "2025-01-15T10:30:00Z" },
  { id: "m2", conversationId: "c1", senderId: "me", text: "Yes, it is! Would you like to arrange a viewing?", read: true, createdAt: "2025-01-15T10:32:00Z" },
  { id: "m3", conversationId: "c1", senderId: "other", text: "Absolutely! I'm free this weekend. Can we meet at your location?", read: true, createdAt: "2025-01-15T10:33:00Z" },
  { id: "m4", conversationId: "c1", senderId: "me", text: "Saturday at 2pm works for me. I'll send you the exact address.", read: true, createdAt: "2025-01-15T10:35:00Z" },
  { id: "m5", conversationId: "c1", senderId: "other", text: "Perfect, looking forward to it!", read: false, createdAt: "2025-01-15T10:36:00Z" },
];
