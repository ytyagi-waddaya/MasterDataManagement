"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ComingSoonTooltipProps = {
  children: React.ReactNode;
  message?: string;
  side?: "top" | "bottom" | "left" | "right";
};

export function ComingSoonTooltip({
  children,
  message = "Coming soon",
  side = "top",
}: ComingSoonTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* wrapper required for disabled elements */}
          <span className="inline-block cursor-not-allowed">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent side={side}>
          <p className="text-sm">{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
