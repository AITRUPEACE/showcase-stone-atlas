"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { TourNavigation } from "./tour-navigation";
import { useTourStore } from "@/stores/tour-store";
import { tourCopy, sites, polygonalMasonryConnection } from "@/data/tour";
import { cn } from "@/lib/utils";

export function StopTwo() {
  const { currentStop, reducedMotion } = useTourStore();
  
  if (currentStop !== "stop2") return null;

  const copy = tourCopy.stop2;
  const connectionSites = polygonalMasonryConnection.sites.map((id) => sites[id]);

  const variants = reducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
      };

  const thumbVariants = reducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.9 },
        visible: (i: number) => ({
          opacity: 1,
          scale: 1,
          transition: { delay: 0.1 * i, duration: 0.3 },
        }),
      };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="fixed bottom-0 left-0 right-0 sm:bottom-8 sm:left-auto sm:right-8 z-20 w-full sm:w-auto sm:max-w-md"
    >
      <div className="glass-panel p-5 rounded-t-2xl sm:rounded-lg max-h-[70vh] sm:max-h-none overflow-y-auto scrollbar-hide"
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">{copy.panelTitle}</h3>
          <p className="text-sm text-white/50">{copy.meta}</p>
        </div>
        
        <p className="text-sm text-white/70 leading-relaxed">
          {copy.body}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {connectionSites.map((site, i) => (
            <motion.div
              key={site.id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={thumbVariants}
              className="group relative"
            >
              <div
                className={cn(
                  "w-14 h-14 rounded-lg bg-gradient-to-br from-stone-700 to-stone-800 flex items-center justify-center",
                  "border border-white/10 hover:border-orange-500/50 transition-colors cursor-pointer"
                )}
              >
                <MapPin className="w-4 h-4 text-white/30" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-[10px] text-white/50">{site.name}</span>
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="glass-panel px-2 py-1 text-xs text-white whitespace-nowrap">
                  View on map
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <TourNavigation nextLabel={copy.next} showPrev={true} />
      </div>
    </motion.div>
  );
}
