import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { auth } from "@/auth";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Camp Journal",
  description: "みんなのキャンプ記録が集まる場所",
};

function MarqueeBanner() {
  const items = ["⛺ CAMP JOURNAL", "📍 記録する", "🌲 シェアする", "🔥 発見する"];
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div
      className="overflow-hidden py-1.5 border-b"
      style={{ backgroundColor: "var(--lime)", borderColor: "#a8cc3a" }}
    >
      <div className="marquee-track flex gap-8 w-max">
        {repeated.map((item, i) => (
          <span key={i} className="font-syne text-xs font-bold tracking-widest whitespace-nowrap" style={{ color: "var(--forest)" }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <html lang="ja">
      <body className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
        <MarqueeBanner />
        <header
          className="sticky top-0 z-50 border-b"
          style={{ backgroundColor: "var(--forest)", borderColor: "#0f2208" }}
        >
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: "var(--lime)", color: "var(--forest)" }}
              >
                ⛺
              </div>
              <span className="font-syne text-lg font-bold tracking-tight" style={{ color: "white" }}>
                Camp Journal
              </span>
            </Link>
            <nav className="flex items-center gap-1">
              <Link
                href="/map"
                className="hidden sm:block text-xs font-medium px-3 py-1.5 rounded-full transition-colors hover:bg-white/10"
                style={{ color: "var(--lime)" }}
              >
                地図
              </Link>
              <Link
                href="/records"
                className="hidden sm:block text-xs font-medium px-3 py-1.5 rounded-full transition-colors hover:bg-white/10"
                style={{ color: "var(--lime)" }}
              >
                みんなの記録
              </Link>
              {session?.user ? (
                <>
                  <Link
                    href="/records/new"
                    className="text-xs font-bold px-4 py-1.5 rounded-full ml-2 transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "var(--lime)", color: "var(--forest)" }}
                  >
                    + 記録する
                  </Link>
                  <Link href="/api/auth/signout" className="flex items-center gap-1.5 ml-2">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name ?? ""}
                        width={28}
                        height={28}
                        className="rounded-full border-2"
                        style={{ borderColor: "var(--lime)" }}
                      />
                    ) : (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: "var(--lime)", color: "var(--forest)" }}
                      >
                        {session.user.name?.[0] ?? "?"}
                      </div>
                    )}
                  </Link>
                </>
              ) : (
                <Link
                  href="/api/auth/signin"
                  className="text-xs font-bold px-4 py-1.5 rounded-full ml-2 transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "var(--lime)", color: "var(--forest)" }}
                >
                  ログイン
                </Link>
              )}
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
