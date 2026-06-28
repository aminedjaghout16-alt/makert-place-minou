// ─────────────────────────────────────────────
// API: Favorites (Save/Unsave Listings)
// GET    /api/favorites — list user's favorites
// POST   /api/favorites — add favorite
// DELETE /api/favorites — remove favorite
// ─────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        listing: {
          include: { seller: { select: { id: true, username: true, avatar: true, verified: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: favorites });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const { listingId } = await req.json();
    if (!listingId) return NextResponse.json({ success: false, error: "Missing listingId" }, { status: 400 });

    const favorite = await prisma.favorite.create({
      data: { userId, listingId },
    });

    return NextResponse.json({ success: true, data: favorite }, { status: 201 });
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json({ success: false, error: "Already favorited" }, { status: 409 });
    }
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const { listingId } = await req.json();
    if (!listingId) return NextResponse.json({ success: false, error: "Missing listingId" }, { status: 400 });

    await prisma.favorite.deleteMany({
      where: { userId, listingId },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
