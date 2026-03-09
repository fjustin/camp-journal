"use client";

import { useState, useRef } from "react";
import { createCampRecord } from "@/lib/actions";
import LocationPicker from "./LocationPicker";
import Image from "next/image";

export default function RecordForm() {
  const [lat, setLat] = useState(35.6762);
  const [lng, setLng] = useState(139.6503);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadedPaths, setUploadedPaths] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    // プレビュー
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setPreviews((prev) => [...prev, ...newPreviews]);

    // アップロード
    setUploading(true);
    const fd = new FormData();
    files.forEach((f) => fd.append("files", f));
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploadedPaths((prev) => [...prev, ...data.paths]);
    setUploading(false);
  };

  const removePhoto = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setUploadedPaths((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("lat", lat.toString());
    fd.set("lng", lng.toString());
    uploadedPaths.forEach((p) => fd.append("photos", p));
    await createCampRecord(fd);
  };

  const inputClass =
    "w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2";
  const inputStyle = {
    borderColor: "var(--sand)",
    backgroundColor: "white",
    "--tw-ring-color": "var(--forest)",
  } as React.CSSProperties;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* キャンプ場名 */}
      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--brown)" }}>
          キャンプ場名 <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          required
          placeholder="例：ふもとっぱらキャンプ場"
          className={inputClass}
          style={inputStyle}
        />
      </div>

      {/* 訪問日 */}
      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--brown)" }}>
          訪問日 <span className="text-red-500">*</span>
        </label>
        <input
          name="date"
          type="date"
          required
          className={inputClass}
          style={inputStyle}
        />
      </div>

      {/* 場所 */}
      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--brown)" }}>
          場所 <span className="text-red-500">*</span>
        </label>
        <LocationPicker lat={lat} lng={lng} onChange={(la, lo) => { setLat(la); setLng(lo); }} />
      </div>

      {/* メモ */}
      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--brown)" }}>
          メモ
        </label>
        <textarea
          name="memo"
          rows={4}
          placeholder="天気、焚き火の様子、おすすめポイントなど..."
          className={`${inputClass} resize-none`}
          style={inputStyle}
        />
      </div>

      {/* 写真 */}
      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--brown)" }}>
          写真
        </label>
        <div
          className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:opacity-80 transition-opacity"
          style={{ borderColor: "var(--sand)", backgroundColor: "var(--mist)" }}
          onClick={() => fileRef.current?.click()}
        >
          <span className="text-3xl">📷</span>
          <p className="mt-2 text-sm" style={{ color: "var(--brown)" }}>
            クリックして写真を選択
          </p>
          <p className="text-xs mt-0.5" style={{ color: "var(--bark)" }}>
            複数枚選択可能
          </p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {uploading && (
          <p className="text-xs mt-2" style={{ color: "var(--forest)" }}>
            アップロード中...
          </p>
        )}

        {previews.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-3">
            {previews.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                <Image
                  src={src}
                  alt={`preview-${i}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting || uploading}
        className="w-full py-3 rounded-lg font-medium text-sm transition-opacity disabled:opacity-50"
        style={{ backgroundColor: "var(--forest)", color: "white" }}
      >
        {submitting ? "保存中..." : "記録を保存する"}
      </button>
    </form>
  );
}
