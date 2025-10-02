"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  CircularProgress,
  Alert,
  Pagination,
  Stack,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { Computer, ViewMode } from "@/types/computer";
import { ViewToggle } from "@/components/ViewToggle";
import { ComputerCards } from "@/components/ComputerCards";
import { ComputerTable } from "@/components/ComputerTable";

interface ComputerResponse {
  data: Computer[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [computers, setComputers] = useState<Computer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [searchTerm, setSearchTerm] = useState("");
  const [conditionFilter, setConditionFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });

  // Fix hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchComputers = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "12",
          ...(searchTerm && { search: searchTerm }),
          ...(conditionFilter && { condition: conditionFilter }),
        });

        const response = await fetch(`/api/computers?${params}`);
        if (!response.ok) throw new Error("Failed to fetch computers");

        const data: ComputerResponse = await response.json();
        setComputers(data.data);
        setPagination(data.pagination);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchComputers();
  }, [page, searchTerm, conditionFilter]);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handleConditionChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setConditionFilter(event.target.value as string);
    setPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // Prevent hydration mismatch by only rendering after mount
  if (!mounted) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ระบบจัดการคอมพิวเตอร์
        </Typography>
        <Typography variant="body1" color="text.secondary">
          จัดการและติดตามข้อมูลคอมพิวเตอร์ในองค์กร
        </Typography>
      </Box>

      {/* Filters and View Toggle */}
      <Paper sx={{ p: 3, mb: 3 }} suppressHydrationWarning>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          {/* Search */}
          <TextField
            key={`search-${mounted}`}
            placeholder="ค้นหาด้วยรหัส, ชื่อ, ยี่ห้อ, ผู้ถือครอง..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ flex: 1, minWidth: 300 }}
            InputProps={{
              startAdornment: (
                <Search sx={{ mr: 1, color: "text.secondary" }} />
              ),
            }}
          />

          {/* Condition Filter */}
          <FormControl sx={{ minWidth: 120 }} key={`filter-${mounted}`}>
            <InputLabel>สภาพ</InputLabel>
            <Select
              value={conditionFilter}
              onChange={handleConditionChange}
              label="สภาพ"
            >
              <MenuItem value="">ทั้งหมด</MenuItem>
              <MenuItem value="in_use">ใช้งาน</MenuItem>
              <MenuItem value="repair">ซ่อม</MenuItem>
              <MenuItem value="retired">เลิกใช้</MenuItem>
            </Select>
          </FormControl>

          {/* View Toggle */}
          <ViewToggle
            view={viewMode}
            onViewChange={setViewMode}
            key={`toggle-${mounted}`}
          />
        </Stack>
      </Paper>

      {/* Content */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      ) : (
        <>
          {/* Data Display */}
          {viewMode === "card" ? (
            <ComputerCards data={computers} />
          ) : (
            <ComputerTable data={computers} />
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={pagination.totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}

          {/* Summary */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              แสดง {computers.length} รายการ จากทั้งหมด {pagination.total}{" "}
              รายการ
            </Typography>
          </Box>
        </>
      )}
    </Container>
  );
}
