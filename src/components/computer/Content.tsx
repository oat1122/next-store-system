"use client";

import React from "react";
import { Box, CircularProgress, Alert, Typography } from "@mui/material";
import { ComputerContentProps } from "@/types/computer";
import { ComputerCards } from "./Cards";
import { ComputerTable } from "./Table";

export function ComputerContent({
  loading,
  error,
  computers,
  viewMode,
  onView,
  onEdit,
}: ComputerContentProps) {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  if (computers.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          ไม่พบข้อมูลคอมพิวเตอร์
        </Typography>
      </Box>
    );
  }

  return viewMode === "card" ? (
    <ComputerCards data={computers} onView={onView} onEdit={onEdit} />
  ) : (
    <ComputerTable data={computers} onView={onView} onEdit={onEdit} />
  );
}
