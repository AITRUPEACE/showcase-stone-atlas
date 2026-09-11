"use client";

import { motion } from "framer-motion";
import { Check, Image, FileText, Lightbulb, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { useTourStore } from "@/stores/tour-store";
import { tourCopy } from "@/data/tour";

export function StopFour() {
  const { currentStop, exitTour, reducedMotion } = useTourStore();
  
  if (currentStop !== "stop4") return null;

  const copy = tourCopy.stop4;

  const variants = reducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
      };

  const itemVariants = reducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: -10 },
        visible: (i: number) => ({
          opacity: 1,
          x: 0,
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
      <div className="glass-panel p-5 rounded-t-2xl sm:rounded-lg max-h-[70vh] sm:max-h-none overflow-y-auto scrollbar-hide">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">{copy.panelTitle}</h3>
          <p className="text-sm text-white/50">{copy.panelSubtitle}</p>
        </div>

        <div className="space-y-3">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="bg-white/5 rounded-lg p-3 border border-white/10"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-wider text-white/40 font-medium mb-1">
                  {copy.items.correction.title}
                </p>
                <p className="text-sm text-white/80">
                  {copy.items.correction.detail}
                </p>
                <p className="text-xs text-white/40 mt-1">
                  {copy.items.correction.byline}
                </p>
                <p className="text-xs text-blue-400/80 mt-1">
                  {copy.items.correction.source}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="bg-white/5 rounded-lg p-3 border border-white/10"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Image className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-wider text-white/40 font-medium mb-1">
                  Photograph
                </p>
                <p className="text-sm text-white/80">
                  {copy.items.photograph.caption}
                </p>
                <p className="text-xs text-white/40 mt-1">
                  {copy.items.photograph.byline}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="bg-white/5 rounded-lg p-3 border border-white/10"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-wider text-white/40 font-medium mb-1">
                  Source
                </p>
                <p className="text-sm text-white/80">
                  {copy.items.source.title}
                </p>
                <p className="text-xs text-white/40 mt-1">
                  {copy.items.source.meta}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="bg-white/5 rounded-lg p-3 border border-orange-500/30"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-4 h-4 text-orange-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs uppercase tracking-wider text-white/40 font-medium">
                    Explanation
                  </p>
                  <Chip variant="status">{copy.items.explanation.status}</Chip>
                </div>
                <p className="text-sm text-white font-medium mb-2">
                  {copy.items.explanation.title}
                </p>
                <p className="text-sm text-white/60 leading-relaxed">
                  {copy.items.explanation.body}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {copy.items.explanation.actions.map((action) => (
                    <Button key={action} variant="ghost" size="sm" className="text-xs h-7 text-white/50">
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
          {copy.closing.map((line, i) => (
            <p key={i} className="text-sm text-white/60 leading-relaxed">
              {line}
            </p>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
          <Button onClick={exitTour} className="gap-1">
            {copy.primaryCta}
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="secondary" className="gap-1">
            {copy.secondaryCta}
          </Button>
          <a href="#" className="text-sm text-white/50 hover:text-white text-center sm:text-left transition-colors flex items-center justify-center sm:justify-start gap-1">
            {copy.textLink}
            <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
