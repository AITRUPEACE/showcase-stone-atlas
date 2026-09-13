import { create } from "zustand";
import { TourStop, tourStops } from "@/data/tour";

interface TourState {
  currentStop: TourStop;
  isLeaveDialogOpen: boolean;
  hasSeenTip: boolean;
  reducedMotion: boolean;
  
  startTour: () => void;
  nextStop: () => void;
  prevStop: () => void;
  goToStop: (stop: TourStop) => void;
  exitTour: () => void;
  openLeaveDialog: () => void;
  closeLeaveDialog: () => void;
  dismissTip: () => void;
  setReducedMotion: (value: boolean) => void;
  
  getStopIndex: () => number;
  getStopConfig: () => typeof tourStops[number] | undefined;
}

export const useTourStore = create<TourState>((set, get) => ({
  currentStop: "idle",
  isLeaveDialogOpen: false,
  hasSeenTip: false,
  reducedMotion: false,

  startTour: () => {
    set({ currentStop: "stop1" });
  },

  nextStop: () => {
    const { currentStop } = get();
    const stopOrder: TourStop[] = ["idle", "stop1", "stop2", "stop3", "stop4", "free"];
    const currentIndex = stopOrder.indexOf(currentStop);
    
    if (currentIndex < stopOrder.length - 1) {
      const nextStop = stopOrder[currentIndex + 1];
      set({ currentStop: nextStop });
    }
  },

  prevStop: () => {
    const { currentStop } = get();
    const stopOrder: TourStop[] = ["idle", "stop1", "stop2", "stop3", "stop4", "free"];
    const currentIndex = stopOrder.indexOf(currentStop);
    
    if (currentIndex > 1) {
      const prevStop = stopOrder[currentIndex - 1];
      set({ currentStop: prevStop });
    }
  },

  goToStop: (stop: TourStop) => {
    set({ currentStop: stop, isLeaveDialogOpen: false });
  },

  exitTour: () => {
    set({ currentStop: "free", isLeaveDialogOpen: false });
  },

  openLeaveDialog: () => {
    set({ isLeaveDialogOpen: true });
  },

  closeLeaveDialog: () => {
    set({ isLeaveDialogOpen: false });
  },

  dismissTip: () => {
    set({ hasSeenTip: true });
  },

  setReducedMotion: (value: boolean) => {
    set({ reducedMotion: value });
  },

  getStopIndex: () => {
    const { currentStop } = get();
    const stopOrder: TourStop[] = ["stop1", "stop2", "stop3", "stop4"];
    return stopOrder.indexOf(currentStop) + 1;
  },

  getStopConfig: () => {
    const { currentStop } = get();
    return tourStops.find((s) => s.id === currentStop);
  },
}));
