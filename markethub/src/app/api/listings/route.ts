// ─────────────────────────────────────────────
// API: Listings CRUD
// GET  /api/listings — list/search
// POST /api/listings — create
// ─────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const query = searchParams.get("q");
    const sort = searchParams.get("sort") ?? "newest";
    const limit = Number(searchParams.get("limit") ?? "20");
    const offset = Number(searchParams.get("offset") ?? "0");

    const where: any = { status: "ACTIVE" };
    if (category) where.category = category;
    if (minPrice) where.price = { ...where.price, gte: Number(minPrice) };
    if (maxPrice) where.price = { ...where.price, lte: Number(maxPrice) };
    if (query) {
      where.OR = [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ];
    }

    const orderBy: any =
      sort === "price-asc" ? { price: "asc" } :
      sort === "price-desc" ? { price: "desc" } :
      sort === "popular" ? { views: "desc" } :
      { createdAt: "desc" };

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        orderBy,
        take: limit,
        skip: offset,
        include: { seller: { select: { id: true, username: true, avatar: true, verified: true } } },
      }),
      prisma.listing.count({ where }),
    ]);

    return NextResponse.json({ success: true, data: listings, total });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, price, category, location, images, tags, sellerId } = body;

    if (!title || !price || !category || !sellerId) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description: description ?? "",
        price,
        category,
        location: location ?? "",
        images: images ?? [],
        tags: tags ?? [],
        sellerId,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, data: listing }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
