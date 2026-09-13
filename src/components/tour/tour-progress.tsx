"use client";

import { TourStop } from "@/data/tour";
import { useTourStore } from "@/stores/tour-store";
import { cn } from "@/lib/utils";

const stopLabels: Record<TourStop, string> = {
  idle: "",
  stop1: "One place",
  stop2: "A pattern",
  stop3: "From a video",
  stop4: "The record",
  free: "",
};

export function TourProgress() {
  const { currentStop, goToStop, getStopIndex } = useTourStore();
  const stopIndex = getStopIndex();
  
  const tourStopIds: TourStop[] = ["stop1", "stop2", "stop3", "stop4"];
  
  if (currentStop === "idle" || currentStop === "free") {
    return null;
  }

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 glass-panel px-4 py-2">
      <span className="text-xs text-white/50 font-medium">
        {stopIndex}/4
      </span>
      <span className="text-sm text-white font-medium">
        {stopLabels[currentStop]}
      </span>
      <div className="flex items-center gap-1.5 ml-2">
        {tourStopIds.map((stopId, idx) => (
          <button
            key={stopId}
            onClick={() => goToStop(stopId)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer",
              currentStop === stopId
                ? "bg-white w-4"
                : idx < stopIndex - 1
                ? "bg-white/60 hover:bg-white/80"
                : "bg-white/30 hover:bg-white/50"
            )}
            aria-label={`Go to ${stopLabels[stopId]}`}
          />
        ))}
      </div>
    </div>
  );
}
