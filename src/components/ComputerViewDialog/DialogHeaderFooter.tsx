import React from "react";
import {
  DialogTitle,
  DialogActions,
  IconButton,
  Typography,
  Stack,
  Box,
  Avatar,
  Button,
  Tooltip,
} from "@mui/material";
import {
  Close,
  Computer as ComputerIcon,
  Edit,
  FileCopy,
  FileDownload,
} from "@mui/icons-material";
import { Computer } from "@/types/computer";
import { ComputerConditionChip } from "@/components/ComputerSpecs";
import { getImageUrl, handleImageError } from "@/utils/formatters";

interface DialogHeaderProps {
  computer: Computer;
  onClose: () => void;
}

export function DialogHeader({ computer, onClose }: DialogHeaderProps) {
  return (
    <DialogTitle sx={{ pr: 6 }}>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Avatar
          variant="rounded"
          sx={{ width: 40, height: 40 }}
          src={getImageUrl(computer.images)}
          alt={computer.name}
          onError={handleImageError}
        >
          <ComputerIcon fontSize="small" />
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h6" noWrap>
            {computer.code} · {computer.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {computer.brand} {computer.model}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }} />
        <ComputerConditionChip condition={computer.condition || "unknown"} />
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

interface DialogFooterProps {
  computer: Computer;
  onEdit?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onExport?: (id: string) => void;
}

export function DialogFooter({
  computer,
  onEdit,
  onDuplicate,
  onExport,
}: DialogFooterProps) {
  return (
    <DialogActions sx={{ p: 2 }}>
      <Box sx={{ flex: 1 }} />
      {onExport && (
        <Tooltip title="ส่งออกข้อมูล">
          <Button
            onClick={() => onExport(computer.id)}
            variant="text"
            startIcon={<FileDownload />}
          >
            ส่งออก
          </Button>
        </Tooltip>
      )}
      {onDuplicate && (
        <Tooltip title="ทำซ้ำข้อมูล">
          <Button
            onClick={() => onDuplicate(computer.id)}
            variant="outlined"
            startIcon={<FileCopy />}
          >
            ทำซ้ำ
          </Button>
        </Tooltip>
      )}
      {onEdit && (
        <Tooltip title="แก้ไขข้อมูล">
          <Button
            onClick={() => onEdit(computer.id)}
            variant="contained"
            startIcon={<Edit />}
          >
            แก้ไข
          </Button>
        </Tooltip>
      )}
    </DialogActions>
  );
}
