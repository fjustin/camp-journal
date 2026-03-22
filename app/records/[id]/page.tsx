import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ShareButton from "@/components/records/ShareButton";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const record = await prisma.campRecord.findUnique({
    where: { id: parseInt(id) },
    include: { campsite: true },
  });
  if (!record) return { title: "Not Found" };

  const photos = JSON.parse(record.photos) as string[];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  return {
    title: `${record.campsite.name} | Camp Journal`,
    description: record.memo ?? `${format(new Date(record.date), "yyyy年M月d日")}に訪問したキャンプ場`,
    openGraph: {
      title: record.campsite.name,
      description: record.memo ?? `${format(new Date(record.date), "yyyy年M月d日")}に訪問`,
      images: photos[0] ? [{ url: `${baseUrl}${photos[0]}`, width: 1200, height: 630 }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: record.campsite.name,
      description: record.memo ?? "",
    },
  };
}

export default async function RecordDetailPage({ params }: Props) {
  const { id } = await params;
  const record = await prisma.campRecord.findUnique({
    where: { id: parseInt(id) },
    include: { campsite: true, user: true },
  });
  if (!record) notFound();

  const photos = JSON.parse(record.photos) as string[];
  const formattedDate = format(new Date(record.date), "yyyy年M月d日 (EEE)", { locale: ja });

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* パンくず */}
      <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--bark)" }}>
        <Link href="/records" className="hover:underline">みんなの記録</Link>
        <span>/</span>
        <span className="truncate">{record.campsite.name}</span>
      </div>

      {/* タイトルエリア */}
      <div className="mb-6">
        <div
          className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
          style={{ backgroundColor: "var(--lime)", color: "var(--forest)" }}
        >
          {formattedDate}
        </div>
        <h1 className="font-syne text-3xl font-bold leading-tight" style={{ color: "var(--forest)" }}>
          {record.campsite.name}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--bark)" }}>
          📍 {record.campsite.lat.toFixed(4)}, {record.campsite.lng.toFixed(4)}
        </p>
        {record.rating && (
          <p className="mt-1.5 text-lg" style={{ color: "var(--sand)" }}>
            {"★".repeat(record.rating)}{"☆".repeat(5 - record.rating)}
          </p>
        )}
        {record.user?.name && (
          <p className="text-xs mt-1" style={{ color: "var(--brown)" }}>
            by {record.user.name}
          </p>
        )}
      </div>

      {/* 写真グリッド */}
      {photos.length > 0 && (
        <div className={`grid gap-2 mb-6 ${photos.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
          {photos.map((src, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden ${photos.length === 1 ? "aspect-[4/3]" : i === 0 && photos.length >= 3 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}
            >
              <Image src={src} alt={`${record.campsite.name}-${i}`} fill className="object-cover" unoptimized />
            </div>
          ))}
        </div>
      )}

      {/* メモ */}
      {record.memo && (
        <div
          className="rounded-2xl p-5 mb-6"
          style={{ backgroundColor: "var(--mist)", border: "1px solid #d8e8cc" }}
        >
          <p className="text-xs font-bold mb-2 tracking-widest" style={{ color: "var(--bark)" }}>MEMO</p>
          <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#333" }}>
            {record.memo}
          </p>
        </div>
      )}

      {/* シェアエリア */}
      <div
        className="rounded-2xl p-5 dot-pattern"
        style={{ border: "2px solid var(--forest)" }}
      >
        <p className="font-syne text-base font-bold mb-1" style={{ color: "var(--forest)" }}>
          このキャンプをシェア
        </p>
        <p className="text-xs mb-4" style={{ color: "var(--brown)" }}>
          Instagramのストーリーズやキャプションにリンクを貼って紹介しよう
        </p>
        <ShareButton name={record.campsite.name} />
      </div>

      <div className="mt-6 text-center">
        <Link href="/records" className="text-xs" style={{ color: "var(--bark)" }}>
          ← みんなの記録一覧へ
        </Link>
      </div>
    </div>
  );
}
