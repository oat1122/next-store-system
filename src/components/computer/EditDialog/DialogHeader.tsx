import React from "react";
import {
  DialogTitle,
  IconButton,
  Typography,
  Stack,
  Box,
  Avatar,
} from "@mui/material";
import { Close, Computer as ComputerIcon } from "@mui/icons-material";

interface DialogHeaderProps {
  code: string;
  name: string;
  brand?: string;
  model?: string;
  activeImageUrl: string;
  onClose: () => void;
}

export function DialogHeader({
  code,
  name,
  brand,
  model,
  activeImageUrl,
  onClose,
}: DialogHeaderProps) {
  return (
    <DialogTitle sx={{ pr: 6 }}>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Avatar
          variant="rounded"
          sx={{ width: 40, height: 40 }}
          src={activeImageUrl}
          alt={name || ""}
        >
          <ComputerIcon fontSize="small" />
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h6" noWrap>
            {code || "—"} · {name || "แก้ไขข้อมูลคอมพิวเตอร์"}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {brand || "—"} {model || ""}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }} />
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </Stack>
    </DialogTitle>
  );
}
