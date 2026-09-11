"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTourStore } from "@/stores/tour-store";
import { tourCopy } from "@/data/tour";

export function LeaveDialog() {
  const { isLeaveDialogOpen, closeLeaveDialog, exitTour } = useTourStore();

  return (
    <Dialog open={isLeaveDialogOpen} onOpenChange={closeLeaveDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{tourCopy.leaveDialog.title}</DialogTitle>
          <DialogDescription>{tourCopy.leaveDialog.body}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="secondary" onClick={closeLeaveDialog}>
            {tourCopy.leaveDialog.keepGoing}
          </Button>
          <Button onClick={exitTour}>
            {tourCopy.leaveDialog.exploreFree}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
