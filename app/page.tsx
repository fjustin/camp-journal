import { getAllCampRecords } from "@/lib/actions";
import RecordCard from "@/components/records/RecordCard";
import Link from "next/link";
import Image from "next/image";
import type { CampRecord } from "@/lib/types";

const heroPhoto = "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=80";

const features = [
  {
    icon: "⛺",
    title: "記録する",
    description: "キャンプ場の写真や感想、評価を記録して残そう",
  },
  {
    icon: "🔍",
    title: "発見する",
    description: "みんなのキャンプ記録から新しいスポットを探そう",
  },
  {
    icon: "📱",
    title: "シェアする",
    description: "記録をInstagramにシェアして仲間に伝えよう",
  },
  {
    icon: "🗺️",
    title: "地図で見る",
    description: "行ったキャンプ場を地図上でまとめて確認しよう",
  },
];

export default async function HomePage() {
  const records = await getAllCampRecords() as CampRecord[];

  return (
    <div>
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        style={{ minHeight: "calc(100vh - 89px)" }}
      >
        {/* Background photo */}
        <Image
          src={heroPhoto}
          alt="キャンプサイトの背景写真"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />

        {/* Dark overlay for readability */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 55%, transparent 75%)",
          }}
        />

        {/* Bottom fade to next section */}
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: "linear-gradient(to bottom, transparent 0%, #faf7f2 100%)" }}
        />

        {/* Subtle vignette */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.35) 100%)" }}
        />

        <div className="relative z-10">
          <p className="font-syne text-xs font-bold tracking-widest mb-4" style={{ color: "var(--lime)" }}>
            ⛺ CAMP JOURNAL
          </p>
          <h1 className="font-syne text-4xl md:text-7xl font-bold leading-tight mb-6" style={{ color: "white" }}>
            キャンプの記録を、
            <br />
            <span style={{ color: "var(--lime)" }}>みんなと</span>
            <br className="sm:hidden" />
            シェアしよう。
          </h1>
          <p className="text-base md:text-lg mb-10 max-w-md mx-auto" style={{ color: "rgba(220,240,225,0.7)" }}>
            行ったキャンプ場を記録して、みんなの体験を発見しよう。
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
            <Link
              href="/records/new"
              className="px-8 py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--lime)", color: "var(--forest)" }}
            >
              + 記録する
            </Link>
            <Link
              href="/records"
              className="px-8 py-3 rounded-full text-sm font-medium transition-colors hover:bg-white/10"
              style={{ color: "white", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              みんなの記録を見る →
            </Link>
          </div>
        </div>

      </section>

      {/* Features */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-syne text-xs font-bold tracking-widest text-center mb-2" style={{ color: "var(--lime)" }}>
            FEATURES
          </p>
          <h2 className="font-syne text-3xl font-bold text-center mb-12" style={{ color: "var(--forest)" }}>
            Camp Journal でできること
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-6 text-center"
                style={{ backgroundColor: "white", border: "1px solid #e0d8cc" }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3"
                  style={{ backgroundColor: "var(--lime)" }}
                >
                  {f.icon}
                </div>
                <h3 className="font-syne text-sm font-bold mb-1" style={{ color: "var(--forest)" }}>
                  {f.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--brown)" }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feed */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--mist)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-syne text-xs font-bold tracking-widest mb-1" style={{ color: "var(--lime)" }}>
                RECENT CAMPS
              </p>
              <h2 className="font-syne text-3xl font-bold" style={{ color: "var(--forest)" }}>
                みんなの記録
              </h2>
            </div>
            <Link
              href="/records"
              className="text-xs font-medium px-4 py-2 rounded-full transition-opacity hover:opacity-80"
              style={{ backgroundColor: "var(--forest)", color: "white" }}
            >
              すべて見る →
            </Link>
          </div>

          {records.length === 0 ? (
            <div className="text-center py-16 rounded-2xl" style={{ backgroundColor: "white" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-3" style={{ backgroundColor: "var(--lime)" }}>
                ⛺
              </div>
              <h3 className="font-syne text-xl font-bold mb-1" style={{ color: "var(--forest)" }}>
                まだ記録がありません
              </h3>
              <p className="text-xs mb-4" style={{ color: "var(--brown)" }}>最初のキャンプを記録してみよう</p>
              <Link
                href="/records/new"
                className="inline-block px-6 py-2 rounded-full text-sm font-bold"
                style={{ backgroundColor: "var(--lime)", color: "var(--forest)" }}
              >
                記録する
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {records.slice(0, 6).map((record) => (
                <RecordCard key={record.id} record={record} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
