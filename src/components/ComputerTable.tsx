"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { Visibility, Edit, MoreVert } from "@mui/icons-material";
import { Computer, conditionLabels, conditionColors } from "@/types/computer";
import { useState } from "react";

interface ComputerTableProps {
  data: Computer[];
}

export function ComputerTable({ data }: ComputerTableProps) {
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

  const formatStorage = (storageGb?: number, storageType?: string) => {
    if (!storageGb) return "—";
    return `${storageGb}GB ${storageType || ""}`.trim();
  };

  const formatRam = (ramGb?: number) => {
    if (!ramGb) return "—";
    return `${ramGb}GB`;
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "grey.50" }}>
            <TableCell sx={{ fontWeight: 600 }}>รูป</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>รหัส</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>ชื่อ</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>ยี่ห้อ/รุ่น</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>CPU</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>GPU</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>RAM</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Storage</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>ผู้ถือครอง</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>สถานที่</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>สภาพ</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>อัปเดต</TableCell>
            <TableCell sx={{ fontWeight: 600, width: 120 }}>จัดการ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((computer) => (
            <TableRow
              key={computer.id}
              sx={{
                "&:hover": {
                  backgroundColor: "grey.50",
                  transition: "background-color 0.2s ease",
                },
              }}
            >
              <TableCell>
                <Avatar
                  src={computer.images[0]?.url || "/images/noimage.svg"}
                  alt={computer.name}
                  variant="rounded"
                  sx={{ width: 48, height: 48 }}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                  {computer.code}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {computer.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Box>
                  <Typography variant="body2">{computer.brand}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {computer.model}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                  {computer.cpu || "—"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  noWrap
                  sx={{ maxWidth: 150 }}
                >
                  {computer.gpu || "—"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {formatRam(computer.ramGb)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {formatStorage(computer.storageGb, computer.storageType)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{computer.owner || "—"}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {computer.location || "—"}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={
                    conditionLabels[
                      computer.condition as keyof typeof conditionLabels
                    ] || computer.condition
                  }
                  color={
                    conditionColors[
                      computer.condition as keyof typeof conditionColors
                    ] as any
                  }
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {new Date(computer.updatedAt).toLocaleDateString("th-TH")}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <IconButton size="small" color="primary">
                    <Visibility fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="default">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, computer.id)}
                  >
                    <MoreVert fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Menu สำหรับตัวเลือกเพิ่มเติม */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>ลบ</MenuItem>
        <MenuItem onClick={handleMenuClose}>ทำซ้ำ</MenuItem>
        <MenuItem onClick={handleMenuClose}>ส่งออก</MenuItem>
      </Menu>
    </TableContainer>
  );
}
