"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = L.divIcon({
  html: `<div style="
    width:32px;height:32px;
    background:#2D5016;
    border:2px solid #D4A96A;
    border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);
    box-shadow:0 2px 6px rgba(0,0,0,0.3);
    display:flex;align-items:center;justify-content:center;
  "><span style="transform:rotate(45deg);font-size:14px;">⛺</span></div>`,
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function ClickHandler({ onChange }: { onChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onChange(
        Math.round(e.latlng.lat * 10000) / 10000,
        Math.round(e.latlng.lng * 10000) / 10000
      );
    },
  });
  return null;
}

function MoveToPosition({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
}

type Props = {
  lat: number;
  lng: number;
  onChange: (lat: number, lng: number) => void;
};

export default function LocationPickerMap({ lat, lng, onChange }: Props) {
  return (
    <MapContainer center={[lat, lng]} zoom={10} className="w-full h-full" scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler onChange={onChange} />
      <MoveToPosition lat={lat} lng={lng} />
      <Marker position={[lat, lng]} icon={markerIcon} />
    </MapContainer>
  );
}
