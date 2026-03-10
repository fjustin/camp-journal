import { getAllCampRecords } from "@/lib/actions";
import MapWrapper from "@/components/map/MapWrapper";
import Link from "next/link";
import type { CampRecord } from "@/lib/types";

export default async function HomePage() {
  const records = await getAllCampRecords() as CampRecord[];

  return (
    <div className="relative" style={{ height: "calc(100vh - 89px)" }}>
      <div className="absolute inset-0">
        <MapWrapper records={records} />
      </div>

      {/* 左上パネル */}
      <div className="absolute top-4 left-4 z-[1000]">
        <div className="rounded-2xl overflow-hidden shadow-xl" style={{ width: 220 }}>
          <div className="px-4 py-3" style={{ backgroundColor: "var(--forest)" }}>
            <p className="font-syne text-xs font-bold tracking-widest" style={{ color: "var(--lime)" }}>
              CAMP JOURNAL
            </p>
            <p className="font-syne text-3xl font-bold leading-none mt-0.5" style={{ color: "white" }}>
              {records.length}
              <span className="text-sm font-normal ml-1" style={{ color: "var(--lime)" }}>spots</span>
            </p>
          </div>
          <div className="px-4 py-3 dot-pattern" style={{ backgroundColor: "var(--cream)" }}>
            <p className="text-xs mb-2" style={{ color: "var(--brown)" }}>みんなのキャンプ地</p>
            <Link
              href="/records/new"
              className="block w-full text-center text-xs font-bold py-2 rounded-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--lime)", color: "var(--forest)" }}
            >
              + 記録する
            </Link>
            <Link
              href="/records"
              className="block w-full text-center text-xs font-medium py-1.5 mt-1.5 rounded-lg transition-opacity hover:opacity-80"
              style={{ backgroundColor: "transparent", color: "var(--forest)", border: "1px solid var(--forest)" }}
            >
              一覧を見る
            </Link>
          </div>
        </div>
      </div>

      {records.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-[500] pointer-events-none">
          <div className="text-center rounded-2xl px-8 py-6 shadow-xl pointer-events-auto" style={{ backgroundColor: "var(--cream)" }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-3" style={{ backgroundColor: "var(--lime)" }}>
              ⛺
            </div>
            <h2 className="font-syne text-xl font-bold" style={{ color: "var(--forest)" }}>
              まだ記録がありません
            </h2>
            <p className="text-xs mt-1 mb-4" style={{ color: "var(--brown)" }}>最初のキャンプを記録してみよう</p>
            <Link href="/records/new" className="inline-block px-5 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: "var(--lime)", color: "var(--forest)" }}>
              記録する
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
