"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTourStore } from "@/stores/tour-store";
import { tourCopy } from "@/data/tour";

export function EntryOverlay() {
  const { currentStop, startTour, exitTour, reducedMotion } = useTourStore();

  if (currentStop !== "idle") return null;

  const variants = reducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
      };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="glass-panel max-w-lg mx-4 p-8 text-center pointer-events-auto"
      >
        <p className="text-lg text-white/90 leading-relaxed mb-8">
          {tourCopy.entry.body}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button onClick={startTour} size="lg">
            {tourCopy.entry.primaryButton}
          </Button>
          <Button variant="secondary" onClick={exitTour} size="lg">
            {tourCopy.entry.secondaryButton}
          </Button>
        </div>

        <p className="text-xs text-white/40 mt-6">
          {tourCopy.entry.micro}
        </p>
      </motion.div>
    </div>
  );
}
