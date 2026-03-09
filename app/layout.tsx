import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Camp Journal | キャンプ記録帳",
  description: "あなたのキャンプの記憶を残す場所",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
        <header
          className="sticky top-0 z-50 border-b"
          style={{
            backgroundColor: "var(--forest)",
            borderColor: "var(--forest-light)",
          }}
        >
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                className="text-amber-300"
              >
                <path d="M14 3 L26 22 H2 Z" fill="#D4A96A" />
                <path d="M14 10 L20 22 H8 Z" fill="#2D5016" />
                <rect x="12" y="22" width="4" height="4" fill="#6B3A1F" />
              </svg>
              <span
                className="font-display text-xl font-semibold tracking-wide"
                style={{ color: "var(--sand)" }}
              >
                Camp Journal
              </span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: "var(--mist)" }}
              >
                地図
              </Link>
              <Link
                href="/records"
                className="text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: "var(--mist)" }}
              >
                記録一覧
              </Link>
              <Link
                href="/records/new"
                className="text-sm font-medium px-4 py-1.5 rounded-full transition-colors"
                style={{
                  backgroundColor: "var(--sand)",
                  color: "var(--forest)",
                }}
              >
                + 記録を追加
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
