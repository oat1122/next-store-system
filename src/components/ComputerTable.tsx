"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { Computer } from "@/types/computer";
import { useMenu } from "@/hooks/useMenu";
import {
  formatStorage,
  formatRam,
  formatDate,
  getImageUrl,
  handleImageError,
} from "@/utils/formatters";
import { ComputerConditionChip } from "@/components/ComputerSpecs";
import { ComputerActions } from "@/components/ComputerActions";
import { ComputerMenu } from "@/components/ComputerMenu";

interface ComputerTableProps {
  data: Computer[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onExport?: (id: string) => void;
}

export function ComputerTable({
  data,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
  onExport,
}: ComputerTableProps) {
  const { anchorEl, selectedId, isOpen, handleMenuOpen, handleMenuClose } =
    useMenu();

  const handleDelete = () => {
    if (selectedId) onDelete?.(selectedId);
  };

  const handleDuplicate = () => {
    if (selectedId) onDuplicate?.(selectedId);
  };

  const handleExport = () => {
    if (selectedId) onExport?.(selectedId);
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
                  src={getImageUrl(computer.images)}
                  alt={computer.name}
                  variant="rounded"
                  sx={{ width: 48, height: 48 }}
                  onError={handleImageError}
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
                <ComputerConditionChip
                  condition={computer.condition || "unknown"}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(computer.updatedAt)}
                </Typography>
              </TableCell>
              <TableCell>
                <ComputerActions
                  computerId={computer.id}
                  onView={onView}
                  onEdit={onEdit}
                  onMenuOpen={handleMenuOpen}
                  variant="table"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Menu สำหรับตัวเลือกเพิ่มเติม */}
      <ComputerMenu
        anchorEl={anchorEl}
        isOpen={isOpen}
        onClose={handleMenuClose}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
        onExport={handleExport}
      />
    </TableContainer>
  );
}
