"use client";

import React from "react";
import { Box, Pagination, Typography } from "@mui/material";

interface ComputerPaginationProps {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  currentPage: number;
  computersCount: number;
  onPageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
}

export function ComputerPagination({
  pagination,
  currentPage,
  computersCount,
  onPageChange,
}: ComputerPaginationProps) {
  return (
    <>
      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={pagination.totalPages}
            page={currentPage}
            onChange={onPageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}

      {/* Summary */}
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          แสดง {computersCount} รายการ จากทั้งหมด {pagination.total} รายการ
        </Typography>
      </Box>
    </>
  );
}
