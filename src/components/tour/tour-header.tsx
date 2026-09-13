"use client";

import { Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTourStore } from "@/stores/tour-store";
import { cn } from "@/lib/utils";

export function TourHeader() {
  const { currentStop, exitTour } = useTourStore();
  const inTour = currentStop !== "idle" && currentStop !== "free";

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-6 py-4">
      <div className="flex items-center gap-2">
        <Triangle className="w-5 h-5 text-orange-500 fill-orange-500" />
        <span className="text-white font-semibold tracking-tight">StoneAtlas</span>
      </div>
      
      <nav className="hidden sm:flex items-center gap-6">
        <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
          About
        </a>
        <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
          Sign in
        </a>
        <Button
          variant="secondary"
          size="sm"
          onClick={exitTour}
          className={cn(
            "transition-opacity duration-300",
            !inTour && currentStop !== "idle" && "opacity-50"
          )}
        >
          Explore freely
        </Button>
      </nav>

      <div className="sm:hidden">
        <Button variant="secondary" size="sm" onClick={exitTour}>
          Explore
        </Button>
      </div>
    </header>
  );
}
