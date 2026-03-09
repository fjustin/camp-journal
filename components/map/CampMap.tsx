"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { CampRecord } from "@/lib/types";

// カスタムテントアイコン
const tentIcon = L.divIcon({
  html: `<div style="
    width:36px;height:36px;
    background:var(--forest,#2D5016);
    border:2px solid #D4A96A;
    border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);
    display:flex;align-items:center;justify-content:center;
    box-shadow:0 2px 6px rgba(0,0,0,0.3);
  ">
    <span style="transform:rotate(45deg);font-size:16px;">⛺</span>
  </div>`,
  className: "",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -38],
});

function FitBounds({ records }: { records: CampRecord[] }) {
  const map = useMap();
  useEffect(() => {
    if (records.length === 0) return;
    if (records.length === 1) {
      map.setView([records[0].lat, records[0].lng], 10);
      return;
    }
    const bounds = L.latLngBounds(records.map((r) => [r.lat, r.lng]));
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [records, map]);
  return null;
}

type Props = {
  records: CampRecord[];
};

export default function CampMap({ records }: Props) {
  const defaultCenter: [number, number] = [36.5, 137.5];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={6}
      className="w-full h-full"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds records={records} />
      {records.map((record) => {
        const photos = JSON.parse(record.photos) as string[];
        return (
          <Marker
            key={record.id}
            position={[record.lat, record.lng]}
            icon={tentIcon}
          >
            <Popup>
              <div className="min-w-[160px]">
                {photos[0] && (
                  <img
                    src={photos[0]}
                    alt={record.name}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                )}
                <p className="font-semibold text-sm" style={{ color: "var(--forest)" }}>
                  {record.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {format(new Date(record.date), "yyyy年M月d日", { locale: ja })}
                </p>
                {record.memo && (
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{record.memo}</p>
                )}
                <Link
                  href={`/records`}
                  className="text-xs mt-2 inline-block"
                  style={{ color: "var(--bark)" }}
                >
                  詳細を見る →
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
