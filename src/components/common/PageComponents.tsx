"use client";

import React from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {subtitle}
      </Typography>
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
