// Core domain types for Computer entities

export type UUID = string;

export type StorageType = "HDD" | "SSD" | "NVMe" | "Hybrid" | string;
export type Condition = "new" | "like-new" | "used" | "refurbished" | "parts" | string;

export interface ComputerImage {
  id: UUID;
  computerId: UUID;
  url: string;
  alt?: string | null;
  order?: number | null;
  createdAt?: string;
  updatedAt?: string;
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
