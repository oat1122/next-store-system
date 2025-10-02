"use client";

import React from "react";
import { Button, Stack, IconButton } from "@mui/material";
import { Visibility, Edit, MoreVert } from "@mui/icons-material";

interface ComputerActionsProps {
  computerId: string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onMenuOpen?: (event: React.MouseEvent<HTMLElement>, id: string) => void;
  variant?: "card" | "table";
}

export function ComputerActions({
  computerId,
  onView,
  onEdit,
  onMenuOpen,
  variant = "card",
}: ComputerActionsProps) {
  const handleView = () => onView?.(computerId);
  const handleEdit = () => onEdit?.(computerId);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    onMenuOpen?.(event, computerId);
  };

  if (variant === "table") {
    return (
      <Stack direction="row" spacing={0.5}>
        <IconButton size="small" color="primary" onClick={handleView}>
          <Visibility fontSize="small" />
        </IconButton>
        <IconButton size="small" color="default" onClick={handleEdit}>
          <Edit fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={handleMenuOpen}>
          <MoreVert fontSize="small" />
        </IconButton>
      </Stack>
    );
  }

  return (
    <Stack direction="row" spacing={1}>
      <Button
        variant="contained"
        size="small"
        startIcon={<Visibility />}
        sx={{ flex: 1 }}
        onClick={handleView}
      >
        ดู
      </Button>
      <Button
        variant="outlined"
        size="small"
        startIcon={<Edit />}
        sx={{ flex: 1 }}
        onClick={handleEdit}
      >
        แก้ไข
      </Button>
      <IconButton size="small" onClick={handleMenuOpen}>
        <MoreVert />
      </IconButton>
    </Stack>
  );
}
