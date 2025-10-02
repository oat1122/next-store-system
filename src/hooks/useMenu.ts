"use client";

import { useState } from "react";

interface UseMenuReturn {
  anchorEl: HTMLElement | null;
  selectedId: string | null;
  isOpen: boolean;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>, id: string) => void;
  handleMenuClose: () => void;
}

export function useMenu(): UseMenuReturn {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  return {
    anchorEl,
    selectedId,
    isOpen: Boolean(anchorEl),
    handleMenuOpen,
    handleMenuClose,
  };
}
