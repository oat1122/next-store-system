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
  Stack,
} from "@mui/material";
import { Computer } from "@/types/computer";
import { useMenu } from "@/hooks/useMenu";
import { useTableColumns } from "@/hooks/useTableColumns";
import {
  formatStorage,
  formatRam,
  formatDate,
  getImageUrl,
  handleImageError,
} from "@/utils/formatters";
import { ComputerConditionChip } from "./Specs";
import { ComputerActions } from "./Actions";
import { ComputerMenu } from "./Menu";
import { TableColumnControls } from "@/components/common/TableColumnControls";

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

  const { columns, toggleColumnVisibility, resetColumns } = useTableColumns();

  const handleDelete = () => {
    if (selectedId) onDelete?.(selectedId);
  };

  const handleDuplicate = () => {
    if (selectedId) onDuplicate?.(selectedId);
  };

  const handleExport = () => {
    if (selectedId) onExport?.(selectedId);
  };

  const _getColumnByKey = (key: string) => {
    return columns.find((col) => col.key === key);
  };

  const renderCellContent = (computer: Computer, columnKey: string) => {
    switch (columnKey) {
      case "image":
        return (
          <Avatar
            src={getImageUrl(computer.images)}
            alt={computer.name}
            variant="rounded"
            sx={{ width: 48, height: 48 }}
            onError={handleImageError}
          />
        );
      case "code":
        return (
          <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
            {computer.code}
          </Typography>
        );
      case "name":
        return (
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {computer.name}
          </Typography>
        );
      case "brand":
        return (
          <Box>
            <Typography variant="body2">{computer.brand}</Typography>
            <Typography variant="caption" color="text.secondary">
              {computer.model}
            </Typography>
          </Box>
        );
      case "cpu":
        return (
          <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
            {computer.cpu || "—"}
          </Typography>
        );
      case "gpu":
        return (
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            sx={{ maxWidth: 150 }}
          >
            {computer.gpu || "—"}
          </Typography>
        );
      case "ram":
        return (
          <Typography variant="body2">{formatRam(computer.ramGb)}</Typography>
        );
      case "storage":
        return (
          <Typography variant="body2">
            {formatStorage(computer.storageGb, computer.storageType)}
          </Typography>
        );
      case "owner":
        return <Typography variant="body2">{computer.owner || "—"}</Typography>;
      case "location":
        return (
          <Typography variant="body2" color="text.secondary">
            {computer.location || "—"}
          </Typography>
        );
      case "condition":
        return (
          <ComputerConditionChip condition={computer.condition || "unknown"} />
        );
      case "updatedAt":
        return (
          <Typography variant="body2" color="text.secondary">
            {formatDate(computer.updatedAt)}
          </Typography>
        );
      case "actions":
        return (
          <ComputerActions
            computerId={computer.id}
            onView={onView}
            onEdit={onEdit}
            onMenuOpen={handleMenuOpen}
            variant="table"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      {/* Table Controls */}
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={1}
        sx={{ mb: 1 }}
      >
        <TableColumnControls
          columns={columns}
          onToggleColumn={toggleColumnVisibility}
          onResetColumns={resetColumns}
        />
      </Stack>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "grey.50" }}>
              {columns.map((column) => {
                if (!column.visible) return null;
                return (
                  <TableCell
                    key={column.key}
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      py: 2,
                      px: 2,
                      minHeight: 56,
                      width: column.width,
                    }}
                  >
                    {column.label}
                  </TableCell>
                );
              })}
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
                {columns.map((column) => {
                  if (!column.visible) return null;
                  return (
                    <TableCell
                      key={column.key}
                      sx={{
                        width: column.width,
                      }}
                    >
                      {renderCellContent(computer, column.key)}
                    </TableCell>
                  );
                })}
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
    </Box>
  );
}
