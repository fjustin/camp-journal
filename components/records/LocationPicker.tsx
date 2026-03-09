"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const LocationPickerMap = dynamic(() => import("./LocationPickerMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-64 flex items-center justify-center rounded-lg border"
      style={{ backgroundColor: "var(--mist)", borderColor: "var(--sand)" }}
    >
      <p className="text-sm" style={{ color: "var(--forest)" }}>
        地図を読み込み中...
      </p>
    </div>
  ),
});

type Props = {
  lat: number;
  lng: number;
  onChange: (lat: number, lng: number) => void;
};

export default function LocationPicker({ lat, lng, onChange }: Props) {
  const [inputLat, setInputLat] = useState(lat.toString());
  const [inputLng, setInputLng] = useState(lng.toString());

  const handleManualInput = () => {
    const parsedLat = parseFloat(inputLat);
    const parsedLng = parseFloat(inputLng);
    if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
      onChange(parsedLat, parsedLng);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2 items-end flex-wrap">
        <div>
          <label className="block text-xs mb-1" style={{ color: "var(--brown)" }}>
            緯度
          </label>
          <input
            type="number"
            step="0.0001"
            value={inputLat}
            onChange={(e) => {
              setInputLat(e.target.value);
              const v = parseFloat(e.target.value);
              if (!isNaN(v)) onChange(v, lng);
            }}
            className="border rounded px-2 py-1.5 text-sm w-32"
            style={{ borderColor: "var(--sand)", backgroundColor: "var(--cream)" }}
          />
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: "var(--brown)" }}>
            経度
          </label>
          <input
            type="number"
            step="0.0001"
            value={inputLng}
            onChange={(e) => {
              setInputLng(e.target.value);
              const v = parseFloat(e.target.value);
              if (!isNaN(v)) onChange(lat, v);
            }}
            className="border rounded px-2 py-1.5 text-sm w-32"
            style={{ borderColor: "var(--sand)", backgroundColor: "var(--cream)" }}
          />
        </div>
        <button
          type="button"
          onClick={handleManualInput}
          className="px-3 py-1.5 text-sm rounded"
          style={{ backgroundColor: "var(--forest)", color: "white" }}
        >
          移動
        </button>
        <p className="text-xs self-end pb-2" style={{ color: "var(--brown)" }}>
          または地図をクリックして場所を指定
        </p>
      </div>
      <div className="h-64 rounded-lg overflow-hidden border" style={{ borderColor: "var(--sand)" }}>
        <LocationPickerMap lat={lat} lng={lng} onChange={onChange} />
      </div>
    </div>
  );
}
