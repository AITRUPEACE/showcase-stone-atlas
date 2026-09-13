"use client";

import { cn } from "@/lib/utils";

interface ChipProps {
  children: React.ReactNode;
  variant?: "default" | "feature" | "status" | "timestamp";
  className?: string;
}

export function Chip({ children, variant = "default", className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full",
        {
          "bg-white/10 text-white/80": variant === "default",
          "bg-orange-500/20 text-orange-400 border border-orange-500/30": variant === "feature",
          "bg-green-500/20 text-green-400 border border-green-500/30": variant === "status",
          "bg-blue-500/20 text-blue-400 border border-blue-500/30": variant === "timestamp",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
