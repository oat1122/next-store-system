"use client";

import React from "react";
import { Menu, MenuItem } from "@mui/material";

interface ComputerMenuProps {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onExport?: () => void;
}

export function ComputerMenu({
  anchorEl,
  isOpen,
  onClose,
  onDelete,
  onDuplicate,
  onExport,
}: ComputerMenuProps) {
  const handleDelete = () => {
    onDelete?.();
    onClose();
  };

  const handleDuplicate = () => {
    onDuplicate?.();
    onClose();
  };

  const handleExport = () => {
    onExport?.();
    onClose();
  };

  return (
    <Menu anchorEl={anchorEl} open={isOpen} onClose={onClose}>
      <MenuItem onClick={handleDelete}>ลบ</MenuItem>
      <MenuItem onClick={handleDuplicate}>ทำซ้ำ</MenuItem>
      <MenuItem onClick={handleExport}>ส่งออก</MenuItem>
    </Menu>
  );
}
