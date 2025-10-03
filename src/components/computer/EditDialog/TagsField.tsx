import React from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";
import { Controller } from "react-hook-form";
import { TagsFieldProps } from "@/types/computer";
import { FormSection } from "./FormSection";

export function TagsField({ control, tagOptions = [] }: TagsFieldProps) {
  return (
    <FormSection title="แท็ก">
      <Controller
        control={control}
        name="tags"
        render={({ field }) => (
          <Autocomplete
            multiple
            freeSolo
            options={tagOptions}
            value={field.value || []}
            onChange={(_, v) => field.onChange(v)}
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  key={`${option}-${index}`}
                />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} label="แท็ก (พิมพ์แล้ว Enter เพิ่ม)" />
            )}
          />
        )}
      />
    </FormSection>
  );
}
