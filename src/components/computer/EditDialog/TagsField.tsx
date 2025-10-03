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
        render={({ field, fieldState: { error } }) => {
          const handleChange = (event: any, newValue: string[]) => {
            // Filter out empty strings and duplicates
            const filteredValue = newValue
              .map((tag) =>
                typeof tag === "string" ? tag.trim() : String(tag).trim()
              )
              .filter(
                (tag, index, arr) =>
                  tag && tag.length > 0 && arr.indexOf(tag) === index
              );

            field.onChange(filteredValue);
          };

          // Ensure value is always an array of strings
          const currentValue = Array.isArray(field.value)
            ? field.value
                .map((tag) => (typeof tag === "string" ? tag : String(tag)))
                .filter((tag) => tag && tag.trim().length > 0)
            : [];

          return (
            <Autocomplete
              multiple
              freeSolo
              options={tagOptions}
              value={currentValue}
              onChange={handleChange}
              getOptionLabel={(option: string) => {
                return typeof option === "string" ? option : String(option);
              }}
              isOptionEqualToValue={(option: string, value: string) => {
                return String(option) === String(value);
              }}
              renderTags={(value: string[], getTagProps) => {
                return value.map((option: string, index: number) => {
                  const tagProps = getTagProps({ index });
                  const label =
                    typeof option === "string" ? option : String(option);

                  return (
                    <Chip
                      {...tagProps}
                      key={`tag-${index}-${label}`}
                      label={label}
                      variant="filled"
                      size="medium"
                    />
                  );
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="แท็ก (พิมพ์แล้ว Enter เพิ่ม)"
                  error={!!error}
                  helperText={error?.message}
                  placeholder={currentValue.length === 0 ? "เพิ่มแท็ก..." : ""}
                />
              )}
              filterOptions={(options, params) => {
                const filtered = options.filter((option) =>
                  String(option)
                    .toLowerCase()
                    .includes(params.inputValue.toLowerCase())
                );

                const { inputValue } = params;
                const isExisting = options.some(
                  (option) =>
                    String(option).toLowerCase() === inputValue.toLowerCase()
                );

                if (inputValue !== "" && !isExisting) {
                  filtered.push(inputValue);
                }

                return filtered;
              }}
            />
          );
        }}
      />
    </FormSection>
  );
}
