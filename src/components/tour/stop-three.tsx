"use client";

import { motion } from "framer-motion";
import { Play, MapPin, Clock } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import { TourNavigation } from "./tour-navigation";
import { useTourStore } from "@/stores/tour-store";
import { tourCopy, sampleObservation } from "@/data/tour";

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function StopThree() {
  const { currentStop, reducedMotion } = useTourStore();
  
  if (currentStop !== "stop3") return null;

  const copy = tourCopy.stop3;
  const observation = sampleObservation;

  const variants = reducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
      };

  const cardVariants = reducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.3 } },
      };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="fixed bottom-0 left-0 right-0 sm:bottom-8 sm:left-auto sm:right-8 z-20 w-full sm:w-auto sm:max-w-md"
    >
      <div className="glass-panel p-5 rounded-t-2xl sm:rounded-lg max-h-[70vh] sm:max-h-none overflow-y-auto scrollbar-hide">
        <div className="space-y-3 mb-4">
          {copy.sectionLines.map((line, i) => (
            <p key={i} className="text-sm text-white/70 leading-relaxed">
              {line}
            </p>
          ))}
        </div>

        <div className="bg-black/40 rounded-lg overflow-hidden mb-4">
          <div className="aspect-video relative bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">
                <Play className="w-6 h-6 text-white ml-1" />
              </div>
            </div>
            <div className="absolute bottom-2 left-2 flex items-center gap-2">
              <Chip variant="timestamp" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {copy.timestamp}
              </Chip>
              <span className="text-xs text-white/50">Moment</span>
            </div>
          </div>
          
          <div className="p-3 border-t border-white/5">
            <p className="text-sm font-medium text-white">{copy.videoTitle}</p>
            <div className="flex items-center gap-1 mt-1">
              <YoutubeIcon className="w-3 h-3 text-red-500" />
              <span className="text-xs text-white/50">{copy.videoChannel}</span>
            </div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-white/5 rounded-lg p-3 border border-white/10"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider text-white/40 font-medium">
              Observation
            </span>
          </div>
          
          <p className="text-sm text-white/80 mb-2">
            &ldquo;{observation.note}&rdquo;
          </p>
          
          <div className="flex items-center gap-2 text-xs text-white/40">
            <MapPin className="w-3 h-3" />
            <span>Sacsayhuamán</span>
            <span>·</span>
            <Clock className="w-3 h-3" />
            <span>{observation.timestamp}</span>
          </div>
          
          <p className="text-xs text-white/30 mt-2 italic">
            From the video
          </p>
        </motion.div>

        <p className="text-xs text-white/50 mt-4 italic">
          {copy.addNote}
        </p>
        
        <TourNavigation nextLabel={copy.next} showPrev={true} />
      </div>
    </motion.div>
  );
}
