import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { FormSectionProps } from "@/types/computer";

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography
        variant="overline"
        sx={{
          color: "text.secondary",
          letterSpacing: 0.6,
        }}
      >
        {title}
      </Typography>
      <Box sx={{ mt: 1 }}>{children}</Box>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}
