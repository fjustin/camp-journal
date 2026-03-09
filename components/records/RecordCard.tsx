import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Image from "next/image";
import type { CampRecord } from "@/lib/types";

type Props = {
  record: CampRecord;
};

export default function RecordCard({ record }: Props) {
  const photos = JSON.parse(record.photos) as string[];
  const formattedDate = format(new Date(record.date), "yyyy年M月d日 (EEE)", { locale: ja });

  return (
    <article
      className="rounded-2xl overflow-hidden shadow-sm border transition-shadow hover:shadow-md"
      style={{ borderColor: "var(--sand)", backgroundColor: "white" }}
    >
      {/* 写真サムネイル */}
      <div className="relative h-48 bg-gray-100" style={{ backgroundColor: "var(--mist)" }}>
        {photos[0] ? (
          <Image src={photos[0]} alt={record.name} fill className="object-cover" unoptimized />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl opacity-40">⛺</span>
          </div>
        )}
        {photos.length > 1 && (
          <span
            className="absolute bottom-2 right-2 text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "white" }}
          >
            +{photos.length - 1}枚
          </span>
        )}
      </div>

      {/* コンテンツ */}
      <div className="p-4">
        <h3
          className="font-display text-lg font-semibold leading-tight"
          style={{ color: "var(--forest)" }}
        >
          {record.name}
        </h3>
        <p className="text-xs mt-1" style={{ color: "var(--bark)" }}>
          📅 {formattedDate}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "var(--bark)" }}>
          📍 {record.lat.toFixed(4)}, {record.lng.toFixed(4)}
        </p>
        {record.memo && (
          <p
            className="text-sm mt-3 leading-relaxed line-clamp-3"
            style={{ color: "#4a3520" }}
          >
            {record.memo}
          </p>
        )}
      </div>
    </article>
  );
}
