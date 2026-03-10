import { getAllCampRecords } from "@/lib/actions";
import RecordCard from "@/components/records/RecordCard";
import Link from "next/link";
import type { CampRecord } from "@/lib/types";

export default async function RecordsPage() {
  const records = await getAllCampRecords() as CampRecord[];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* ヘッダー */}
      <div className="flex items-end justify-between mb-2">
        <div>
          <p className="text-xs font-bold tracking-widest mb-1" style={{ color: "var(--bark)" }}>
            CAMP RECORDS
          </p>
          <h1 className="font-syne text-4xl font-bold leading-none" style={{ color: "var(--forest)" }}>
            みんなの<br />キャンプ記録
          </h1>
        </div>
        <div className="text-right">
          <p className="font-syne text-5xl font-bold" style={{ color: "var(--lime)", WebkitTextStroke: "1px var(--forest)" }}>
            {records.length}
          </p>
          <p className="text-xs" style={{ color: "var(--brown)" }}>spots logged</p>
          <Link
            href="/records/new"
            className="inline-block mt-2 px-4 py-1.5 rounded-full text-xs font-bold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--forest)", color: "var(--lime)" }}
          >
            + 記録する
          </Link>
        </div>
      </div>

      {/* 区切り */}
      <div className="h-px my-6" style={{ backgroundColor: "#ddd" }} />

      {records.length === 0 ? (
        <div className="text-center py-24 dot-pattern rounded-3xl" style={{ border: "1px dashed #ccc" }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4" style={{ backgroundColor: "var(--lime)" }}>
            🏕️
          </div>
          <h2 className="font-syne text-2xl font-bold" style={{ color: "var(--forest)" }}>
            最初の記録を残そう
          </h2>
          <p className="text-sm mt-2 mb-6" style={{ color: "var(--brown)" }}>
            あなたのキャンプが、誰かの旅のヒントになる
          </p>
          <Link
            href="/records/new"
            className="inline-block px-6 py-2.5 rounded-full font-bold"
            style={{ backgroundColor: "var(--lime)", color: "var(--forest)" }}
          >
            記録する
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {records.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </div>
      )}
    </div>
  );
}
