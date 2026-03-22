import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = parseFloat(searchParams.get("lat") ?? "");
  const lng = parseFloat(searchParams.get("lng") ?? "");
  const radius = parseFloat(searchParams.get("radius") ?? "200");

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json({ error: "lat and lng are required" }, { status: 400 });
  }

  // Convert radius (meters) to approximate degrees (1 degree ≈ 111km)
  const radiusDeg = radius / 111000;

  const campsites = await prisma.campsite.findMany({
    where: {
      lat: { gte: lat - radiusDeg, lte: lat + radiusDeg },
      lng: { gte: lng - radiusDeg, lte: lng + radiusDeg },
    },
  });

  return NextResponse.json(campsites);
}
