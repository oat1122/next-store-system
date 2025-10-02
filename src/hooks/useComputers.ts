"use client";

import { useState, useEffect } from "react";
import { Computer } from "@/types/computer";

interface ComputerResponse {
  data: Computer[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface UseComputersReturn {
  computers: Computer[];
  loading: boolean;
  error: string;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  page: number;
  setPage: (page: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  conditionFilter: string;
  setConditionFilter: (condition: string) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleConditionChange: (event: any) => void;
  handlePageChange: (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => void;
}

export function useComputers(): UseComputersReturn {
  const [computers, setComputers] = useState<Computer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [conditionFilter, setConditionFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });

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

  const handleConditionChange = (event: any) => {
    setConditionFilter(event.target.value as string);
    setPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return {
    computers,
    loading,
    error,
    pagination,
    page,
    setPage,
    searchTerm,
    setSearchTerm,
    conditionFilter,
    setConditionFilter,
    handleSearchChange,
    handleConditionChange,
    handlePageChange,
  };
}
