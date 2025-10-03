// Core domain types for Computer entities

export type UUID = string;

export type StorageType = "HDD" | "SSD" | "NVMe" | "Hybrid" | string;
export type Condition =
  | "new"
  | "like-new"
  | "used"
  | "refurbished"
  | "parts"
  | "in_use"
  | "repair"
  | "retired"
  | string;

// Constants for form options
export const STORAGE_TYPE_OPTIONS = [
  { value: "HDD", label: "HDD" },
  { value: "SSD", label: "SSD" },
  { value: "NVMe", label: "NVMe" },
  { value: "Hybrid", label: "Hybrid" },
] as const;

export const CONDITION_OPTIONS = [
  { value: "new", label: "ใหม่" },
  { value: "like-new", label: "เหมือนใหม่" },
  { value: "used", label: "ใช้แล้ว" },
  { value: "refurbished", label: "ปรับปรุงแล้ว" },
  { value: "parts", label: "อะไหล่" },
  { value: "in_use", label: "ใช้งาน" },
  { value: "repair", label: "ซ่อม" },
  { value: "retired", label: "เลิกใช้" },
] as const;

// Condition labels and colors for UI
export const conditionLabels = {
  new: "ใหม่",
  "like-new": "เหมือนใหม่",
  used: "ใช้แล้ว",
  refurbished: "ปรับปรุงแล้ว",
  parts: "อะไหล่",
  in_use: "ใช้งาน",
  repair: "ซ่อม",
  retired: "เลิกใช้",
} as const;

export const conditionColors = {
  new: "success",
  "like-new": "primary",
  used: "warning",
  refurbished: "info",
  parts: "error",
  in_use: "success",
  repair: "warning",
  retired: "error",
} as const;

export interface ComputerImage {
  id: UUID;
  computerId: UUID;
  url: string;
  alt?: string | null;
  order?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

// Simplified image item for forms/UI
export interface ImageItem {
  url: string;
  isPrimary?: boolean;
}

export interface ComputerTag {
  id: UUID;
  name: string;
  color?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Computer {
  id: UUID;
  code: string;
  name: string;
  brand?: string | null;
  model?: string | null;
  cpu?: string | null;
  gpu?: string | null;
  ramGb?: number | null;
  storageGb?: number | null;
  storageType?: StorageType | null;
  condition?: Condition | null;
  owner?: string | null;
  location?: string | null;
  images: ComputerImage[];
  tags: ComputerTag[];
  createdAt?: string;
  updatedAt?: string;
}
