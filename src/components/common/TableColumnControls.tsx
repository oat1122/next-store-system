"use client";

import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Divider,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { ViewColumn, Refresh } from "@mui/icons-material";
import { ColumnConfig } from "@/hooks/useTableColumns";

interface TableColumnControlsProps {
  columns: ColumnConfig[];
  onToggleColumn: (key: string) => void;
  onResetColumns: () => void;
}

export function TableColumnControls({
  columns,
  onToggleColumn,
  onResetColumns,
}: TableColumnControlsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (key: string) => {
    onToggleColumn(key);
  };

  const handleReset = () => {
    onResetColumns();
    handleClose();
  };

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{
          border: 1,
          borderColor: "divider",
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
        title="จัดการคอลัมน์"
      >
        <ViewColumn />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: 250,
            maxHeight: 400,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            แสดง/ซ่อนคอลัมน์
          </Typography>
        </Box>
        <Divider />

        {columns.map((column) => (
          <MenuItem key={column.key} dense sx={{ py: 0.5 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={column.visible}
                  size="small"
                  onChange={() => handleToggle(column.key)}
                />
              }
              label={column.label}
              sx={{ m: 0, width: "100%" }}
            />
          </MenuItem>
        ))}

        <Divider />
        <MenuItem onClick={handleReset} sx={{ py: 1 }}>
          <Button
            startIcon={<Refresh />}
            size="small"
            variant="outlined"
            fullWidth
          >
            รีเซ็ต
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  );
}
