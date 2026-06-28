// ─────────────────────────────────────────────
// API: Sync Firebase User → PostgreSQL
// POST /api/auth/sync-user
// ─────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { firebaseUid, email, username, avatar } = await req.json();

    if (!firebaseUid || !email) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const user = await prisma.user.upsert({
      where: { firebaseUid },
      update: {
        email,
        username: username ?? email.split("@")[0],
        avatar: avatar ?? undefined,
        updatedAt: new Date(),
      },
      create: {
        firebaseUid,
        email,
        username: username ?? email.split("@")[0],
        avatar: avatar ?? null,
        role: "USER",
      },
    });

    return NextResponse.json({ success: true, data: user });
  } catch (err: any) {
    console.error("sync-user error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
