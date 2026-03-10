import RecordForm from "@/components/records/RecordForm";
import Link from "next/link";

export default function NewRecordPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* パンくず */}
      <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--bark)" }}>
        <Link href="/records" className="hover:underline">みんなの記録</Link>
        <span>/</span>
        <span>新規追加</span>
      </div>

      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest mb-1" style={{ color: "var(--bark)" }}>
          NEW RECORD
        </p>
        <h1 className="font-syne text-4xl font-bold leading-tight" style={{ color: "var(--forest)" }}>
          キャンプを<br />記録する
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--brown)" }}>
          あなたの体験をみんなとシェアしよう 🏕️
        </p>
      </div>

      <div className="h-px mb-8" style={{ backgroundColor: "#ddd" }} />

      <div className="rounded-2xl p-6 shadow-sm" style={{ backgroundColor: "white", border: "1px solid #e8e0d8" }}>
        <RecordForm />
      </div>
    </div>
  );
}
