"use client";

import { useEffect } from "react";
import { useTourStore } from "@/stores/tour-store";
import { TourHeader } from "./tour-header";
import { TourProgress } from "./tour-progress";
import { EntryOverlay } from "./entry-overlay";
import { StopOne } from "./stop-one";
import { StopTwo } from "./stop-two";
import { StopThree } from "./stop-three";
import { StopFour } from "./stop-four";
import { LeaveDialog } from "./leave-dialog";
import { AfterTourTip } from "./after-tour-tip";

export function TourContainer() {
  const { currentStop, nextStop, prevStop, exitTour, setReducedMotion } = useTourStore();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [setReducedMotion]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const inTour = currentStop !== "idle" && currentStop !== "free";
      
      if (e.key === "Escape") {
        if (inTour) {
          exitTour();
        }
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (inTour && currentStop !== "stop4") {
          e.preventDefault();
          nextStop();
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (inTour && currentStop !== "stop1") {
          e.preventDefault();
          prevStop();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStop, nextStop, prevStop, exitTour]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tourParam = params.get("tour");
    
    if (tourParam) {
      const stopMap: Record<string, () => void> = {
        "1": () => useTourStore.getState().goToStop("stop1"),
        "2": () => useTourStore.getState().goToStop("stop2"),
        "3": () => useTourStore.getState().goToStop("stop3"),
        "4": () => useTourStore.getState().goToStop("stop4"),
      };
      
      const goTo = stopMap[tourParam];
      if (goTo) {
        goTo();
      }
    }
  }, []);

  return (
    <>
      <TourHeader />
      <TourProgress />
      <EntryOverlay />
      <StopOne />
      <StopTwo />
      <StopThree />
      <StopFour />
      <LeaveDialog />
      <AfterTourTip />
    </>
  );
}
