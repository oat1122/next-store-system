"use client";

import React from "react";
import { Dialog, DialogContent, Box, Stack } from "@mui/material";
import {
  useComputerEditDialog,
  ComputerFormValues,
  type UseComputerEditDialogProps,
} from "@/hooks/useComputerEditDialog";
import {
  DialogHeader,
  DialogFooter,
  ImageEditor,
  FormFields,
  TagsField,
} from "./EditDialog/index";

export interface ComputerEditDialogProps extends UseComputerEditDialogProps {
  open: boolean;
  onClose: () => void;
  tagOptions?: string[];
}

export default function ComputerEditDialog({
  open,
  onClose,
  initial,
  onSubmit,
  tagOptions = [],
}: ComputerEditDialogProps) {
  const {
    // Form state
    control,
    register,
    errors,
    isSubmitting,
    isDirty,
    watchedValues,

    // Image state
    images,
    activeIndex,
    hasImages,
    activeImageUrl,

    // Actions
    submit,
    setPrimary,
    removeImage,
    addImageByUrl,
    addImageByFile,
    setActiveIndex,
  } = useComputerEditDialog({ initial, onSubmit });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogHeader
        code={watchedValues.code}
        name={watchedValues.name}
        brand={watchedValues.brand || undefined}
        model={watchedValues.model || undefined}
        activeImageUrl={activeImageUrl}
        onClose={onClose}
      />

      <DialogContent dividers sx={{ pt: 2 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          {/* LEFT: Images editor */}
          <Box sx={{ width: { xs: "100%", md: "40%" } }}>
            <ImageEditor
              images={images}
              activeIndex={activeIndex}
              hasImages={hasImages}
              activeImageUrl={activeImageUrl}
              onSetActiveIndex={setActiveIndex}
              onSetPrimary={setPrimary}
              onRemoveImage={removeImage}
              onAddImageByUrl={addImageByUrl}
              onAddImageByFile={addImageByFile}
            />
          </Box>

          {/* RIGHT: Form fields */}
          <Box sx={{ width: { xs: "100%", md: "60%" } }}>
            <FormFields register={register} control={control} errors={errors} />
            <TagsField control={control} tagOptions={tagOptions} />
          </Box>
        </Stack>
      </DialogContent>

      <DialogFooter
        isDirty={isDirty}
        isSubmitting={isSubmitting}
        onCancel={onClose}
        onSubmit={submit}
      />
    </Dialog>
  );
}
