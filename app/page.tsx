import { getAllCampRecords } from "@/lib/actions";
import RecordCard from "@/components/records/RecordCard";
import Link from "next/link";
import Image from "next/image";
import type { CampRecord } from "@/lib/types";

const heroPhoto = "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1920&q=80";

const stripPhotos = [
  { id: 1, src: "https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b?auto=format&fit=crop&w=400&q=80", alt: "焚き火" },
  { id: 2, src: "https://images.unsplash.com/photo-1476611338391-6f395a0dd82e?auto=format&fit=crop&w=400&q=80", alt: "夕暮れのテント" },
  { id: 3, src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80", alt: "山の森林" },
  { id: 4, src: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=400&q=80", alt: "夜のキャンプ" },
  { id: 5, src: "https://images.unsplash.com/photo-1488196797940-5a9c3e0fc8c6?auto=format&fit=crop&w=400&q=80", alt: "キャンプサイト" },
];

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
            background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.5) 50%, rgba(4,13,8,0.88) 100%)",
          }}
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

        {/* Forest silhouette — layered pine trees merging into cream section */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 160" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "160px" }}>
            {/* Far layer — small distant trees */}
            <path
              d="M0,160 L0,120 L20,100 L40,120 L60,95 L80,120 L100,100 L120,120 L140,92 L160,120 L180,98 L200,120 L220,94 L240,120 L260,100 L280,120 L300,88 L320,120 L340,96 L360,120 L380,90 L400,120 L420,98 L440,120 L460,86 L480,120 L500,94 L520,120 L540,90 L560,120 L580,96 L600,120 L620,88 L640,120 L660,94 L680,120 L700,90 L720,120 L740,96 L760,120 L780,88 L800,120 L820,94 L840,120 L860,90 L880,120 L900,96 L920,120 L940,88 L960,120 L980,94 L1000,120 L1020,92 L1040,120 L1060,96 L1080,120 L1100,90 L1120,120 L1140,94 L1160,120 L1180,92 L1200,120 L1220,96 L1240,120 L1260,90 L1280,120 L1300,94 L1320,120 L1340,92 L1360,120 L1380,96 L1400,120 L1420,90 L1440,120 L1440,160 Z"
              fill="rgba(250,247,242,0.25)"
            />
            {/* Mid layer — medium trees */}
            <path
              d="M0,160 L0,130 L30,100 L60,130 L90,88 L120,130 L150,95 L180,130 L210,82 L240,130 L270,92 L300,130 L330,78 L360,130 L390,90 L420,130 L450,75 L480,130 L510,88 L540,130 L570,80 L600,130 L630,86 L660,130 L690,76 L720,130 L750,88 L780,130 L810,80 L840,130 L870,86 L900,130 L930,76 L960,130 L990,88 L1020,130 L1050,82 L1080,130 L1110,86 L1140,130 L1170,78 L1200,130 L1230,88 L1260,130 L1290,80 L1320,130 L1350,86 L1380,130 L1410,78 L1440,130 L1440,160 Z"
              fill="rgba(250,247,242,0.5)"
            />
            {/* Front layer — tall trees, merging to cream */}
            <path
              d="M0,160 L0,140 L36,100 L50,140 L72,75 L90,140 L110,58 L130,140 L150,70 L165,140 L188,50 L205,140 L224,65 L240,140 L260,45 L278,140 L300,60 L316,140 L336,48 L352,140 L374,55 L390,140 L412,42 L428,140 L450,58 L466,140 L488,46 L504,140 L526,55 L542,140 L564,44 L580,140 L602,58 L618,140 L640,46 L656,140 L678,54 L694,140 L716,44 L732,140 L754,58 L770,140 L792,46 L808,140 L830,54 L846,140 L868,44 L884,140 L906,58 L922,140 L944,46 L960,140 L982,54 L998,140 L1020,44 L1036,140 L1058,58 L1074,140 L1096,46 L1112,140 L1134,54 L1150,140 L1172,44 L1188,140 L1210,58 L1226,140 L1248,46 L1264,140 L1286,54 L1302,140 L1324,44 L1340,140 L1362,58 L1378,140 L1400,48 L1418,140 L1440,60 L1440,160 Z"
              fill="#faf7f2"
            />
          </svg>
        </div>
      </section>

      {/* Photo Strip */}
      <section className="py-10 px-6" style={{ backgroundColor: "var(--cream)" }}>
        <div
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {stripPhotos.map((photo) => (
            <div
              key={photo.id}
              className="flex-none rounded-2xl overflow-hidden"
              style={{ width: "180px", height: "240px", position: "relative" }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
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
