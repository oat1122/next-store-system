"use client";

import { useState, useEffect } from "react";
import { ViewMode } from "@/types/computer";

interface UseViewToggleReturn {
  mounted: boolean;
  handleChange: (
    event: React.MouseEvent<HTMLElement>,
    newView: ViewMode | null
  ) => void;
}

interface UseViewToggleProps {
  onViewChange: (view: ViewMode) => void;
}

export function useViewToggle({
  onViewChange,
}: UseViewToggleProps): UseViewToggleReturn {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: ViewMode | null
  ) => {
    if (newView !== null) {
      onViewChange(newView);
    }
  };

  return {
    mounted,
    handleChange,
  };
}
