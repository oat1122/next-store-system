import { useMemo, useState, useEffect } from "react";
import { Computer } from "@/types/computer";
import { getImageUrl } from "@/utils/formatters";

export interface UseComputerViewDialogProps {
  computer?: Computer | null;
}

export function useComputerViewDialog({
  computer,
}: UseComputerViewDialogProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset active index when computer changes
  useEffect(() => {
    setActiveIndex(0);
  }, [computer?.id]);

  const images = useMemo(() => {
    if (!computer?.images || computer.images.length === 0) return [];
    // move primary to front
    const sorted = [...computer.images].sort(
      (a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0)
    );
    return sorted;
  }, [computer]);

  const activeImageUrl = useMemo(() => {
    if (!computer) return "";
    if (images.length > 0)
      return images[Math.min(activeIndex, images.length - 1)]?.url ?? "";
    return getImageUrl(computer.images);
  }, [computer, images, activeIndex]);

  const hasOwnershipInfo = Boolean(computer?.owner || computer?.location);
  const hasTags = Boolean(computer?.tags && computer.tags.length > 0);
  const hasMultipleImages = images.length > 1;

  return {
    activeIndex,
    setActiveIndex,
    images,
    activeImageUrl,
    hasOwnershipInfo,
    hasTags,
    hasMultipleImages,
  };
}
