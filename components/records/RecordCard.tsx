"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { CampRecord } from "@/lib/types";

type Props = {
  record: CampRecord;
};

function StarDisplay({ rating }: { rating: number }) {
  return (
    <span className="text-xs">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= rating ? "var(--sand)" : "#ddd" }}>★</span>
      ))}
    </span>
  );
}

export default function RecordCard({ record }: Props) {
  const photos = JSON.parse(record.photos) as string[];
  const formattedDate = format(new Date(record.date), "yyyy.MM.dd", { locale: ja });
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}/records/${record.id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Link href={`/records/${record.id}`}>
      <article
        className="camp-card rounded-2xl overflow-hidden border cursor-pointer"
        style={{ borderColor: "#e0d8cc", backgroundColor: "white" }}
      >
        {/* 写真 */}
        <div className="relative h-52" style={{ backgroundColor: "var(--mist)" }}>
          {photos[0] ? (
            <Image src={photos[0]} alt={record.campsite.name} fill className="object-cover" unoptimized />
          ) : (
            <div className="w-full h-full flex items-center justify-center dot-pattern">
              <span className="text-5xl opacity-30">⛺</span>
            </div>
          )}
          <div
            className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-bold"
            style={{ backgroundColor: "var(--lime)", color: "var(--forest)" }}
          >
            {formattedDate}
          </div>
          {photos.length > 1 && (
            <div
              className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: "rgba(0,0,0,0.55)", color: "white" }}
            >
              📷 {photos.length}
            </div>
          )}
        </div>

        {/* コンテンツ */}
        <div className="p-4">
          <h3 className="font-syne text-base font-bold leading-snug" style={{ color: "var(--forest)" }}>
            {record.campsite.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs" style={{ color: "var(--bark)" }}>
              📍 {record.campsite.lat.toFixed(4)}, {record.campsite.lng.toFixed(4)}
            </p>
            {record.rating && <StarDisplay rating={record.rating} />}
          </div>
          {record.user?.name && (
            <p className="text-xs mt-1" style={{ color: "var(--brown)" }}>
              by {record.user.name}
            </p>
          )}
          {record.memo && (
            <p className="text-xs mt-2 leading-relaxed line-clamp-2" style={{ color: "#555" }}>
              {record.memo}
            </p>
          )}

          <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: "#eee" }}>
            <span className="text-xs" style={{ color: "#aaa" }}>Tap to view detail</span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full transition-colors"
              style={{
                backgroundColor: copied ? "var(--lime)" : "#f0f0f0",
                color: copied ? "var(--forest)" : "#555",
              }}
            >
              {copied ? "✓ コピー済み" : "🔗 シェア"}
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}
