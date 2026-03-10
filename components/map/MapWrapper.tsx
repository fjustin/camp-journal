"use client";

import dynamic from "next/dynamic";
import type { CampRecord } from "@/lib/types";

const CampMap = dynamic(() => import("./CampMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ backgroundColor: "var(--mist)" }}
    >
      <div className="text-center">
        <span className="text-4xl">🗺️</span>
        <p className="mt-2 text-sm" style={{ color: "var(--forest)" }}>
          地図を読み込み中...
        </p>
      </div>
    </div>
  ),
});

export default function MapWrapper({ records }: { records: CampRecord[] }) {
  return <CampMap records={records} />;
}
