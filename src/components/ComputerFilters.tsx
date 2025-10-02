"use client";

import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Stack,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { ViewMode } from "@/types/computer";
import { ViewToggle } from "@/components/ViewToggle";

interface ComputerFiltersProps {
  mounted: boolean;
  searchTerm: string;
  conditionFilter: string;
  viewMode: ViewMode;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onConditionChange: (event: any) => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export function ComputerFilters({
  mounted,
  searchTerm,
  conditionFilter,
  viewMode,
  onSearchChange,
  onConditionChange,
  onViewModeChange,
}: ComputerFiltersProps) {
  return (
    <Paper sx={{ p: 3, mb: 3 }} suppressHydrationWarning>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
      >
        {/* Search */}
        <TextField
          key={`search-${mounted}`}
          placeholder="ค้นหาด้วยรหัส, ชื่อ, ยี่ห้อ, ผู้ถือครอง..."
          value={searchTerm}
          onChange={onSearchChange}
          sx={{ flex: 1, minWidth: 300 }}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
          }}
        />

        {/* Condition Filter */}
        <FormControl sx={{ minWidth: 120 }} key={`filter-${mounted}`}>
          <InputLabel>สภาพ</InputLabel>
          <Select
            value={conditionFilter}
            onChange={onConditionChange}
            label="สภาพ"
          >
            <MenuItem value="">ทั้งหมด</MenuItem>
            <MenuItem value="in_use">ใช้งาน</MenuItem>
            <MenuItem value="repair">ซ่อม</MenuItem>
            <MenuItem value="retired">เลิกใช้</MenuItem>
          </Select>
        </FormControl>

        {/* View Toggle */}
        <ViewToggle
          view={viewMode}
          onViewChange={onViewModeChange}
          key={`toggle-${mounted}`}
        />
      </Stack>
    </Paper>
  );
}
