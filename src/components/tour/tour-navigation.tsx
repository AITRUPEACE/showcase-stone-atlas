"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTourStore } from "@/stores/tour-store";

interface TourNavigationProps {
  nextLabel?: string;
  showPrev?: boolean;
  showNext?: boolean;
  onNext?: () => void;
}

export function TourNavigation({
  nextLabel = "Next",
  showPrev = true,
  showNext = true,
  onNext,
}: TourNavigationProps) {
  const { currentStop, nextStop, prevStop } = useTourStore();

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      nextStop();
    }
  };

  const canGoPrev = currentStop !== "stop1";

  return (
    <div className="flex items-center gap-3 mt-4">
      {showPrev && canGoPrev && (
        <Button
          variant="ghost"
          size="sm"
          onClick={prevStop}
          className="gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
      )}
      {showNext && (
        <Button
          variant="default"
          size="sm"
          onClick={handleNext}
          className="gap-1 ml-auto"
        >
          {nextLabel}
          <ChevronRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
