"use client";

import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Stack,
  Box,
  Grid,
  Chip,
  Divider,
  Avatar,
  Button,
  Tooltip,
  ImageList,
  ImageListItem,
} from "@mui/material";
import {
  Close,
  Computer as ComputerIcon,
  Memory,
  Storage,
  Place,
  Person,
  Edit,
  FileCopy,
  FileDownload,
} from "@mui/icons-material";
import { Computer as ComputerType } from "@/types/computer";
import { ComputerConditionChip } from "@/components/ComputerSpecs";
import {
  formatDate,
  formatRam,
  formatStorage,
  getImageUrl,
  handleImageError,
} from "@/utils/formatters";

/**
 * ComputerViewDialog
 *
 * A clean, consistent, and responsive read-only dialog to view a single computer.
 * - Left: Image (with thumbnails if multiple)
 * - Right: Key details (code/name, condition, brand/model, owner/location, hardware)
 * - Bottom: Metadata (tags, created/updated dates)
 *
 * Design goals:
 * - Repeatable section layout (title → content → subtle divider)
 * - Compact but readable density
 * - Works for both card/table triggers via onView(id)
 */

export interface ComputerViewDialogProps {
  open: boolean;
  onClose: () => void;
  computer?: ComputerType | null;
  onEdit?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onExport?: (id: string) => void;
}

export default function ComputerViewDialog({
  open,
  onClose,
  computer,
  onEdit,
  onDuplicate,
  onExport,
}: ComputerViewDialogProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = useMemo(() => {
    if (!computer?.images || computer.images.length === 0) return [];
    // move primary to front
    const sorted = [...computer.images].sort(
      (a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0)
    );
    return sorted;
  }, [computer]);

  const activeImageUrl = useMemo(() => {
    if (!computer) return "";
    if (images.length > 0)
      return images[Math.min(activeIndex, images.length - 1)]?.url ?? "";
    return getImageUrl(computer.images);
  }, [computer, images, activeIndex]);

  if (!computer) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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

      <DialogContent dividers sx={{ pt: 2 }}>
        <Grid container spacing={3}>
          {/* LEFT: Images */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                border: (t) => `1px solid ${t.palette.divider}`,
              }}
            >
              <Box
                sx={{
                  aspectRatio: "4 / 3",
                  bgcolor: "grey.100",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Main image */}
                {activeImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={activeImageUrl}
                    alt={computer.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={handleImageError}
                  />
                ) : (
                  <ComputerIcon sx={{ fontSize: 64, color: "grey.400" }} />
                )}
              </Box>

              {/* Thumbnails */}
              {images.length > 1 && (
                <Box sx={{ p: 1.5 }}>
                  <ImageList cols={5} gap={8} rowHeight={64}>
                    {images.map((img, idx) => (
                      <ImageListItem key={`${img.url}-${idx}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.url}
                          alt={`thumb-${idx}`}
                          loading="lazy"
                          onClick={() => setActiveIndex(idx)}
                          style={{
                            width: "100%",
                            height: "64px",
                            objectFit: "cover",
                            cursor: "pointer",
                            border:
                              idx === activeIndex
                                ? "2px solid #1976d2"
                                : "2px solid transparent",
                            borderRadius: 6,
                          }}
                          onError={handleImageError}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Box>
              )}
            </Box>
          </Grid>

          {/* RIGHT: Details */}
          <Grid size={{ xs: 12, md: 7 }}>
            {/* Ownership & Location */}
            <Section title="รายละเอียดการครอบครอง">
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {computer.owner && (
                  <Chip
                    icon={<Person />}
                    label={computer.owner}
                    variant="outlined"
                    size="small"
                  />
                )}
                {computer.location && (
                  <Chip
                    icon={<Place />}
                    label={computer.location}
                    variant="outlined"
                    size="small"
                  />
                )}
                {!computer.owner && !computer.location && (
                  <Typography variant="body2" color="text.secondary">
                    ไม่ได้ระบุข้อมูล
                  </Typography>
                )}
              </Stack>
            </Section>

            {/* Hardware */}
            <Section title="สเปกฮาร์ดแวร์">
              <Grid container spacing={1.5}>
                <SpecRow
                  icon={<ComputerIcon fontSize="small" />}
                  label="CPU"
                  value={computer.cpu || "—"}
                />
                <SpecRow
                  icon={<Memory fontSize="small" />}
                  label="RAM"
                  value={formatRam(computer.ramGb)}
                />
                <SpecRow
                  icon={<Storage fontSize="small" />}
                  label="Storage"
                  value={formatStorage(
                    computer.storageGb,
                    computer.storageType
                  )}
                />
                {computer.gpu && <SpecRow label="GPU" value={computer.gpu} />}
              </Grid>
            </Section>

            {/* Tags (optional) */}
            {computer.tags && computer.tags.length > 0 && (
              <Section title="แท็ก">
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {computer.tags.map((computerTag) => (
                    <Chip
                      key={computerTag.tag.id}
                      label={computerTag.tag.name}
                      size="small"
                    />
                  ))}
                </Stack>
              </Section>
            )}

            {/* Metadata */}
            <Section title="ข้อมูลระบบ">
              <Grid container spacing={1.5}>
                <SpecRow label="รหัส" value={computer.code} mono />
                <SpecRow
                  label="สร้างเมื่อ"
                  value={formatDate(computer.createdAt)}
                />
                <SpecRow
                  label="อัปเดตล่าสุด"
                  value={formatDate(computer.updatedAt)}
                />
              </Grid>
            </Section>
          </Grid>
        </Grid>
      </DialogContent>

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
    </Dialog>
  );
}

/** Section wrapper with consistent spacing and divider */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography
        variant="overline"
        sx={{ color: "text.secondary", letterSpacing: 0.6 }}
      >
        {title}
      </Typography>
      <Box sx={{ mt: 1 }}>{children}</Box>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}

/** One-line spec row for label/value pairs */
function SpecRow({
  icon,
  label,
  value,
  mono,
}: {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <Grid size={{ xs: 12 }}>
      <Stack direction="row" spacing={1.25} alignItems="center">
        {icon && (
          <Box sx={{ display: "flex", alignItems: "center" }}>{icon}</Box>
        )}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ minWidth: 108 }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: mono ? "monospace" : undefined,
            fontWeight: mono ? 600 : 400,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flex: 1,
          }}
          title={String(value ?? "")}
        >
          {value}
        </Typography>
      </Stack>
    </Grid>
  );
}
