import React from "react";
import { DialogActions, Button, Chip, Box } from "@mui/material";
import { Save } from "@mui/icons-material";
import { EditDialogFooterProps } from "@/types/computer";

export function DialogFooter({
  isDirty,
  isSubmitting,
  onCancel,
  onSubmit,
}: EditDialogFooterProps) {
  return (
    <DialogActions sx={{ p: 2 }}>
      <Box sx={{ flex: 1 }} />
      {isDirty && (
        <Chip
          size="small"
          color="warning"
          label="มีการแก้ไขยังไม่บันทึก"
          sx={{ mr: 1 }}
        />
      )}
      <Button onClick={onCancel} disabled={isSubmitting}>
        ยกเลิก
      </Button>
      <Button
        onClick={onSubmit}
        variant="contained"
        startIcon={<Save />}
        disabled={isSubmitting}
      >
        {isSubmitting ? "กำลังบันทึก..." : "บันทึก"}
      </Button>
    </DialogActions>
  );
}
