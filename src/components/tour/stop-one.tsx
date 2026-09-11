"use client";

import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { TourNavigation } from "./tour-navigation";
import { useTourStore } from "@/stores/tour-store";
import { tourCopy, sites } from "@/data/tour";

export function StopOne() {
  const { currentStop, reducedMotion } = useTourStore();
  
  if (currentStop !== "stop1") return null;

  const site = sites.sacsayhuaman;
  const copy = tourCopy.stop1;

  const variants = reducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
      };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="fixed bottom-0 left-0 right-0 sm:bottom-8 sm:left-8 sm:right-auto z-20 w-full sm:w-auto sm:max-w-sm"
    >
      <div className="glass-panel overflow-hidden rounded-t-2xl sm:rounded-lg">
        <div className="aspect-video bg-gradient-to-br from-stone-800 to-stone-900 relative">
          <div className="absolute inset-0 flex items-center justify-center text-white/20">
            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <span className="text-xs">Site photograph</span>
            </div>
          </div>
          {copy.photoCaption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <p className="text-xs text-white/70">{copy.photoCaption}</p>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-white">{copy.cardTitle}</h3>
              <p className="text-sm text-white/50">{copy.cardMeta}</p>
            </div>
            <Chip variant="feature">{copy.featureChip}</Chip>
          </div>
          
          <p className="text-sm text-white/70 mt-3">
            {copy.body}
          </p>
          
          <Button variant="ghost" size="sm" className="mt-3 -ml-2 text-white/60">
            <ExternalLink className="w-3 h-3 mr-1" />
            {copy.control}
          </Button>
          
          <TourNavigation nextLabel={copy.next} showPrev={false} />
        </div>
      </div>
    </motion.div>
  );
}
