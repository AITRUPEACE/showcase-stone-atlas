"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTourStore } from "@/stores/tour-store";
import { tourCopy } from "@/data/tour";

export function AfterTourTip() {
  const { currentStop, hasSeenTip, dismissTip, reducedMotion } = useTourStore();
  
  const shouldShow = currentStop === "free" && !hasSeenTip;

  const variants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
      };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30"
        >
          <div className="glass-panel px-4 py-3 flex items-center gap-4 max-w-md">
            <p className="text-sm text-white/70">
              {tourCopy.afterTourTip}
            </p>
            <Button variant="ghost" size="sm" onClick={dismissTip} className="whitespace-nowrap">
              {tourCopy.tipDismiss}
            </Button>
            <button
              onClick={dismissTip}
              className="text-white/40 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
