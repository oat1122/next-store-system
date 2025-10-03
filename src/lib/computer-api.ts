// Computer API client functions

import type { Computer } from "@/types/computer/core";
import type { ComputerFormValues } from "@/types/computer/forms";

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ListComputersResponse {
  data: Computer[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Get all computers with pagination and filters
export async function getComputers(params?: {
  page?: number;
  limit?: number;
  search?: string;
  condition?: string;
}): Promise<ListComputersResponse> {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.append("page", params.page.toString());
  if (params?.limit) searchParams.append("limit", params.limit.toString());
  if (params?.search) searchParams.append("search", params.search);
  if (params?.condition) searchParams.append("condition", params.condition);

  const response = await fetch(`/api/computers?${searchParams}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "เกิดข้อผิดพลาดในการดึงข้อมูล");
  }

  return response.json();
}

// Get single computer by ID
export async function getComputer(id: string): Promise<ApiResponse<Computer>> {
  const response = await fetch(`/api/computers/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "ไม่พบคอมพิวเตอร์");
  }

  return response.json();
}

// Create new computer
export async function createComputer(
  data: ComputerFormValues
): Promise<ApiResponse<Computer>> {
  const response = await fetch("/api/computers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "ไม่สามารถสร้างคอมพิวเตอร์ได้");
  }

  return response.json();
}

// Update existing computer
export async function updateComputer(
  id: string,
  data: ComputerFormValues
): Promise<ApiResponse<Computer>> {
  const response = await fetch(`/api/computers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "ไม่สามารถแก้ไขข้อมูลได้");
  }

  return response.json();
}

// Delete computer
export async function deleteComputer(id: string): Promise<{ message: string }> {
  const response = await fetch(`/api/computers/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "ไม่สามารถลบคอมพิวเตอร์ได้");
  }

  return response.json();
}
