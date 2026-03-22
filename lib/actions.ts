"use server";

import { prisma } from "./db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function findOrCreateCampsite(name: string, lat: number, lng: number) {
  return prisma.campsite.create({
    data: { name, lat, lng },
  });
}

export async function createCampRecord(formData: FormData) {
  const session = await auth().catch(() => null);

  const campsiteName = formData.get("campsiteName") as string;
  const date = formData.get("date") as string;
  const memo = formData.get("memo") as string;
  const lat = parseFloat(formData.get("lat") as string);
  const lng = parseFloat(formData.get("lng") as string);
  const ratingRaw = formData.get("rating") as string;
  const rating = ratingRaw ? parseInt(ratingRaw) : null;
  const photoPaths = formData.getAll("photos") as string[];
  const isPublic = formData.get("isPublic") !== "false";

  if (!campsiteName || !date || isNaN(lat) || isNaN(lng)) {
    throw new Error("必須項目が入力されていません");
  }

  const campsite = await findOrCreateCampsite(campsiteName, lat, lng);

  await prisma.campRecord.create({
    data: {
      userId: session?.user?.id ?? undefined,
      campsiteId: campsite.id,
      date: new Date(date),
      memo: memo || null,
      photos: JSON.stringify(photoPaths),
      rating: rating && rating >= 1 && rating <= 5 ? rating : null,
      isPublic,
    },
  });

  revalidatePath("/");
  revalidatePath("/records");
  redirect("/records");
}

export async function getAllCampRecords() {
  return prisma.campRecord.findMany({
    where: { isPublic: true },
    orderBy: { date: "desc" },
    include: { campsite: true, user: true },
  });
}

export async function deleteCampRecord(id: number) {
  const session = await auth().catch(() => null);

  const record = await prisma.campRecord.findUnique({ where: { id } });
  if (!record) throw new Error("記録が見つかりません");

  if (record.userId && record.userId !== session?.user?.id) {
    throw new Error("削除できません");
  }

  await prisma.campRecord.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/records");
}
