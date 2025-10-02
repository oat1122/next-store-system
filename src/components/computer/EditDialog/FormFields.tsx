import React from "react";
import { Box, Stack, TextField, MenuItem } from "@mui/material";
import {
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
} from "react-hook-form";
import {
  ComputerFormValues,
  CONDITION_OPTIONS,
  STORAGE_TYPE_OPTIONS,
} from "@/hooks/useComputerEditDialog";
import { FormSection } from "./FormSection";

interface FormFieldsProps {
  register: UseFormRegister<ComputerFormValues>;
  control: Control<ComputerFormValues>;
  errors: FieldErrors<ComputerFormValues>;
}

export function FormFields({ register, control, errors }: FormFieldsProps) {
  return (
    <>
      {/* Basic Information */}
      <FormSection title="ข้อมูลหลัก">
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Box sx={{ flex: "0 0 40%" }}>
              <TextField
                label="รหัส (code)"
                fullWidth
                required
                {...register("code", { required: "ต้องใส่รหัส" })}
                error={!!errors.code}
                helperText={errors.code?.message}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextField
                label="ชื่อ (name)"
                fullWidth
                required
                {...register("name", { required: "ต้องใส่ชื่อ" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Box>
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label="ยี่ห้อ (brand)"
              fullWidth
              {...register("brand")}
            />
            <TextField label="รุ่น (model)" fullWidth {...register("model")} />
          </Stack>
        </Stack>
      </FormSection>

      {/* Hardware Specs */}
      <FormSection title="สเปกฮาร์ดแวร์">
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField label="CPU" fullWidth {...register("cpu")} />
            <TextField label="GPU" fullWidth {...register("gpu")} />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label="RAM (GB)"
              type="number"
              inputProps={{ min: 0 }}
              fullWidth
              {...register("ramGb", {
                valueAsNumber: true,
                min: { value: 0, message: "ต้องไม่ติดลบ" },
              })}
              error={!!errors.ramGb}
              helperText={errors.ramGb?.message}
            />
            <TextField
              label="Storage (GB)"
              type="number"
              inputProps={{ min: 0 }}
              fullWidth
              {...register("storageGb", {
                valueAsNumber: true,
                min: { value: 0, message: "ต้องไม่ติดลบ" },
              })}
              error={!!errors.storageGb}
              helperText={errors.storageGb?.message}
            />
            <Controller
              name="storageType"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="ชนิด Storage"
                  fullWidth
                  {...field}
                  value={field.value || ""}
                >
                  {STORAGE_TYPE_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Stack>
        </Stack>
      </FormSection>

      {/* Status & Ownership */}
      <FormSection title="สถานะ & ผู้ครอบครอง">
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Controller
              name="condition"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="สภาพ (condition)"
                  fullWidth
                  {...field}
                  value={field.value || ""}
                >
                  {CONDITION_OPTIONS.map((c) => (
                    <MenuItem key={c.value} value={c.value}>
                      {c.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <TextField
              label="ผู้ถือครอง (owner)"
              fullWidth
              {...register("owner")}
            />
          </Stack>
          <TextField
            label="สถานที่ (location)"
            fullWidth
            {...register("location")}
          />
        </Stack>
      </FormSection>
    </>
  );
}
