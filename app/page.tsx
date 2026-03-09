import { getAllCampRecords } from "@/lib/actions";
import MapWrapper from "@/components/map/MapWrapper";
import Link from "next/link";
import type { CampRecord } from "@/lib/types";

export default async function HomePage() {
  const records = await getAllCampRecords() as CampRecord[];

  return (
    <div className="relative" style={{ height: "calc(100vh - 57px)" }}>
      {/* 地図 */}
      <div className="absolute inset-0">
        <MapWrapper records={records} />
      </div>

      {/* 左上パネル */}
      <div className="absolute top-4 left-4 z-[1000]">
        <div
          className="rounded-2xl px-5 py-4 shadow-lg max-w-xs"
          style={{ backgroundColor: "rgba(245,240,232,0.95)" }}
        >
          <h1 className="font-display text-2xl font-bold" style={{ color: "var(--forest)" }}>
            キャンプ記録帳
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--brown)" }}>
            あなたの冒険の軌跡
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div className="text-center">
              <p className="text-2xl font-bold font-display" style={{ color: "var(--forest)" }}>
                {records.length}
              </p>
              <p className="text-xs" style={{ color: "var(--brown)" }}>
                キャンプ地
              </p>
            </div>
            <div className="w-px h-8 self-center" style={{ backgroundColor: "var(--sand)" }} />
            <Link
              href="/records/new"
              className="text-sm px-3 py-1.5 rounded-lg font-medium transition-opacity hover:opacity-80"
              style={{ backgroundColor: "var(--forest)", color: "white" }}
            >
              + 記録を追加
            </Link>
          </div>
        </div>
      </div>

      {/* 記録なし */}
      {records.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-[500] pointer-events-none">
          <div
            className="text-center rounded-2xl px-8 py-6 shadow-lg pointer-events-auto"
            style={{ backgroundColor: "rgba(245,240,232,0.95)" }}
          >
            <span className="text-6xl">⛺</span>
            <h2 className="font-display text-xl font-semibold mt-3" style={{ color: "var(--forest)" }}>
              まだ記録がありません
            </h2>
            <p className="text-sm mt-1 mb-4" style={{ color: "var(--brown)" }}>
              最初のキャンプを記録してみましょう
            </p>
            <Link
              href="/records/new"
              className="inline-block px-5 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: "var(--forest)", color: "white" }}
            >
              記録を追加する
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
