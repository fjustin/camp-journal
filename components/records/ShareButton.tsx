"use client";

import { useState } from "react";

export default function ShareButton({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleInstagram = () => {
    // Instagramアプリを開く（モバイルのみ有効）
    window.location.href = "instagram://";
    setTimeout(() => {
      window.open("https://www.instagram.com", "_blank");
    }, 500);
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleCopy}
        className="w-full py-2.5 rounded-xl text-sm font-bold transition-all"
        style={{
          backgroundColor: copied ? "var(--forest)" : "var(--lime)",
          color: copied ? "var(--lime)" : "var(--forest)",
        }}
      >
        {copied ? "✓ リンクをコピーしました！" : "🔗 リンクをコピー"}
      </button>
      <button
        onClick={handleInstagram}
        className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
        style={{
          background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
        }}
      >
        📷 Instagramを開く
      </button>
      <p className="text-center text-xs" style={{ color: "var(--bark)" }}>
        コピーしたリンクをInstagramのキャプションやストーリーズに貼り付けよう
      </p>
    </div>
  );
}
