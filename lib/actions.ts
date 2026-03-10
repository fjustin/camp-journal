"use server";

import { prisma } from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCampRecord(formData: FormData) {
  const name = formData.get("name") as string;
  const date = formData.get("date") as string;
  const memo = formData.get("memo") as string;
  const lat = parseFloat(formData.get("lat") as string);
  const lng = parseFloat(formData.get("lng") as string);
  const photoPaths = formData.getAll("photos") as string[];

  if (!name || !date || isNaN(lat) || isNaN(lng)) {
    throw new Error("必須項目が入力されていません");
  }

  await prisma.campRecord.create({
    data: {
      name,
      date: new Date(date),
      memo: memo || null,
      lat,
      lng,
      photos: JSON.stringify(photoPaths),
    },
  });

  revalidatePath("/");
  revalidatePath("/records");
  redirect("/records");
}

export async function getAllCampRecords() {
  return prisma.campRecord.findMany({
    orderBy: { date: "desc" },
  });
}

export async function deleteCampRecord(id: number) {
  await prisma.campRecord.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/records");
}
