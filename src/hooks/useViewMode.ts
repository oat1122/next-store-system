"use client";

import { useState, useEffect } from "react";
import { ViewMode } from "@/types/computer";

interface UseViewModeReturn {
  mounted: boolean;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export function useViewMode(): UseViewModeReturn {
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("card");

  // Fix hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    mounted,
    viewMode,
    setViewMode,
  };
}
