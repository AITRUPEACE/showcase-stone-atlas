"use client";

import dynamic from "next/dynamic";
import { TourContainer } from "@/components/tour/tour-container";

const AtlasMap = dynamic(
  () => import("@/components/map/atlas-map").then((mod) => mod.AtlasMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white/30 text-sm">Loading map...</div>
      </div>
    ),
  }
);

export default function Home() {
  return (
    <main className="w-full h-screen relative overflow-hidden">
      <AtlasMap />
      <TourContainer />
    </main>
  );
}
