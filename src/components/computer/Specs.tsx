"use client";

import React from "react";
import { Box, Typography, Chip, Stack } from "@mui/material";
import { Computer, Memory, Storage } from "@mui/icons-material";
import {
  conditionLabels,
  conditionColors,
  ComputerSpecsProps,
  ComputerConditionChipProps,
} from "@/types/computer";
import { formatStorage, formatRam } from "@/utils/formatters";

export function ComputerSpecs({ computer }: ComputerSpecsProps) {
  return (
    <>
      {/* ยี่ห้อและรุ่น */}
      <Typography
        variant="body2"
        color="text.secondary"
        gutterBottom
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
          minHeight: "20px",
        }}
      >
        {computer.brand} {computer.model}
      </Typography>

      {/* Tags */}
      <Box sx={{ mb: 2, minHeight: "32px" }}>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip label={computer.owner} variant="outlined" size="small" />
          <Chip label={computer.location} variant="outlined" size="small" />
        </Stack>
      </Box>

      {/* ข้อมูลฮาร์ดแวร์ */}
      <Box sx={{ mt: "auto" }}>
        <Stack spacing={1}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Computer color="action" sx={{ fontSize: 16 }} />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
              }}
            >
              {computer.cpu || "—"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Memory color="action" sx={{ fontSize: 16 }} />
            <Typography variant="body2" color="text.secondary">
              {formatRam(computer.ramGb ?? undefined)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Storage color="action" sx={{ fontSize: 16 }} />
            <Typography variant="body2" color="text.secondary">
              {formatStorage(
                computer.storageGb ?? undefined,
                computer.storageType ?? undefined
              )}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export function ComputerConditionChip({
  condition,
}: ComputerConditionChipProps) {
  // Handle undefined/null condition
  if (!condition) {
    return <Chip label="ไม่ระบุ" color="default" size="small" />;
  }

  return (
    <Chip
      label={
        conditionLabels[condition as keyof typeof conditionLabels] || condition
      }
      color={
        (conditionColors[condition as keyof typeof conditionColors] as
          | "default"
          | "primary"
          | "secondary"
          | "error"
          | "info"
          | "success"
          | "warning") || "default"
      }
      size="small"
    />
  );
}
