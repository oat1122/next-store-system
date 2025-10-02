import React from "react";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Chip,
  ImageList,
  ImageListItem,
} from "@mui/material";
import {
  Computer as ComputerIcon,
  Memory,
  Storage,
  Place,
  Person,
} from "@mui/icons-material";
import { Computer } from "@/types/computer";
import {
  formatDate,
  formatRam,
  formatStorage,
  handleImageError,
} from "@/utils/formatters";

interface ImageSectionProps {
  activeImageUrl: string;
  computerName: string;
  images: Array<{ url: string; isPrimary: boolean }>;
  activeIndex: number;
  onImageSelect: (index: number) => void;
  hasMultipleImages: boolean;
}

export function ImageSection({
  activeImageUrl,
  computerName,
  images,
  activeIndex,
  onImageSelect,
  hasMultipleImages,
}: ImageSectionProps) {
  return (
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
        {activeImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={activeImageUrl}
            alt={computerName}
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

      {hasMultipleImages && (
        <Box sx={{ p: 1.5 }}>
          <ImageList cols={5} gap={8} rowHeight={64}>
            {images.map((img, idx) => (
              <ImageListItem key={`${img.url}-${idx}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={`thumb-${idx}`}
                  loading="lazy"
                  onClick={() => onImageSelect(idx)}
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
  );
}

interface OwnershipSectionProps {
  computer: Computer;
  hasOwnershipInfo: boolean;
}

export function OwnershipSection({
  computer,
  hasOwnershipInfo,
}: OwnershipSectionProps) {
  return (
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
      {!hasOwnershipInfo && (
        <Typography variant="body2" color="text.secondary">
          ไม่ได้ระบุข้อมูล
        </Typography>
      )}
    </Stack>
  );
}

interface HardwareSectionProps {
  computer: Computer;
}

export function HardwareSection({ computer }: HardwareSectionProps) {
  return (
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
        value={formatStorage(computer.storageGb, computer.storageType)}
      />
      {computer.gpu && <SpecRow label="GPU" value={computer.gpu} />}
    </Grid>
  );
}

interface TagsSectionProps {
  computer: Computer;
}

export function TagsSection({ computer }: TagsSectionProps) {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      {computer.tags?.map((computerTag) => (
        <Chip
          key={computerTag.tag.id}
          label={computerTag.tag.name}
          size="small"
        />
      ))}
    </Stack>
  );
}

interface MetadataSectionProps {
  computer: Computer;
}

export function MetadataSection({ computer }: MetadataSectionProps) {
  return (
    <Grid container spacing={1.5}>
      <SpecRow label="รหัส" value={computer.code} mono />
      <SpecRow label="สร้างเมื่อ" value={formatDate(computer.createdAt)} />
      <SpecRow label="อัปเดตล่าสุด" value={formatDate(computer.updatedAt)} />
    </Grid>
  );
}

interface SpecRowProps {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}

export function SpecRow({ icon, label, value, mono }: SpecRowProps) {
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
