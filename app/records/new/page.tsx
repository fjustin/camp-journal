import RecordForm from "@/components/records/RecordForm";
import Link from "next/link";

export default function NewRecordPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* パンくず */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: "var(--brown)" }}>
        <Link href="/records" className="hover:underline">
          記録一覧
        </Link>
        <span>/</span>
        <span>新規追加</span>
      </div>

      {/* タイトル */}
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold" style={{ color: "var(--forest)" }}>
          記録を追加
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--brown)" }}>
          キャンプの思い出を記録しましょう 🏕️
        </p>
      </div>

      {/* 装飾 */}
      <div className="h-px mb-8" style={{ backgroundColor: "var(--sand)" }} />

      {/* フォーム */}
      <div
        className="rounded-2xl p-6 shadow-sm border"
        style={{ backgroundColor: "white", borderColor: "var(--sand)" }}
      >
        <RecordForm />
      </div>
    </div>
  );
}
