import { getAllCampRecords } from "@/lib/actions";
import RecordCard from "@/components/records/RecordCard";
import Link from "next/link";
import type { CampRecord } from "@/lib/types";

export default async function RecordsPage() {
  const records = await getAllCampRecords() as CampRecord[];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* ヘッダー */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold" style={{ color: "var(--forest)" }}>
            記録一覧
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--brown)" }}>
            {records.length > 0
              ? `${records.length}ヶ所のキャンプ地を記録しました`
              : "記録がまだありません"}
          </p>
        </div>
        <Link
          href="/records/new"
          className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
          style={{ backgroundColor: "var(--forest)", color: "white" }}
        >
          + 記録を追加
        </Link>
      </div>

      {/* 区切り線 */}
      <div className="h-px mb-8" style={{ backgroundColor: "var(--sand)" }} />

      {records.length === 0 ? (
        <div className="text-center py-24">
          <span className="text-7xl">🏕️</span>
          <h2 className="font-display text-2xl font-semibold mt-4" style={{ color: "var(--forest)" }}>
            さあ、最初の記録を
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--brown)" }}>
            キャンプの思い出を記録して、旅の軌跡を残しましょう
          </p>
          <Link
            href="/records/new"
            className="inline-block mt-6 px-6 py-2.5 rounded-lg font-medium"
            style={{ backgroundColor: "var(--forest)", color: "white" }}
          >
            記録を追加する
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </div>
      )}
    </div>
  );
}
