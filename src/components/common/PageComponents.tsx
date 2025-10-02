"use client";

import React from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Stack,
  Button,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  onAddNew?: () => void;
  addButtonText?: string;
}

export function PageHeader({
  title,
  subtitle,
  onAddNew,
  addButtonText = "เพิ่มใหม่",
}: PageHeaderProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "flex-end" }}
        spacing={2}
        sx={{ mb: 1 }}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>

        {onAddNew && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddNew}
            sx={{ flexShrink: 0 }}
          >
            {addButtonText}
          </Button>
        )}
      </Stack>
    </Box>
  );
}

interface LoadingStateProps {
  children?: React.ReactNode;
}

export function LoadingState({ children }: LoadingStateProps) {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
      {children}
    </Container>
  );
}
