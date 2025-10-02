"use client";

import React from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { Computer as ComputerType } from "@/types/computer";
import { useComputerViewDialog } from "@/hooks/useComputerViewDialog";
import { DialogHeader, DialogFooter } from "./ViewDialog/HeaderFooter";
import { Section } from "./ViewDialog/Section";
import {
  ImageSection,
  OwnershipSection,
  HardwareSection,
  TagsSection,
  MetadataSection,
} from "./ViewDialog/Sections";

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
  const {
    activeIndex,
    setActiveIndex,
    images,
    activeImageUrl,
    hasOwnershipInfo,
    hasTags,
    hasMultipleImages,
  } = useComputerViewDialog({ computer });

  if (!computer) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogHeader computer={computer} onClose={onClose} />

      <DialogContent dividers sx={{ pt: 2 }}>
        <Grid container spacing={3}>
          {/* LEFT: Images */}
          <Grid size={{ xs: 12, md: 5 }}>
            <ImageSection
              activeImageUrl={activeImageUrl}
              computerName={computer.name}
              images={images}
              activeIndex={activeIndex}
              onImageSelect={setActiveIndex}
              hasMultipleImages={hasMultipleImages}
            />
          </Grid>

          {/* RIGHT: Details */}
          <Grid size={{ xs: 12, md: 7 }}>
            {/* Ownership & Location */}
            <Section title="รายละเอียดการครอบครอง">
              <OwnershipSection
                computer={computer}
                hasOwnershipInfo={hasOwnershipInfo}
              />
            </Section>

            {/* Hardware */}
            <Section title="สเปกฮาร์ดแวร์">
              <HardwareSection computer={computer} />
            </Section>

            {/* Tags (optional) */}
            {hasTags && (
              <Section title="แท็ก">
                <TagsSection computer={computer} />
              </Section>
            )}

            {/* Metadata */}
            <Section title="ข้อมูลระบบ">
              <MetadataSection computer={computer} />
            </Section>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogFooter
        computer={computer}
        onEdit={onEdit}
        onDuplicate={onDuplicate}
        onExport={onExport}
      />
    </Dialog>
  );
}
