// Query/filter/pagination types for list views

import type { Condition } from "./core";

export interface ComputerQuery {
  q?: string;                  // free text search
  brand?: string;
  model?: string;
  cpu?: string;
  gpu?: string;
  minRamGb?: number;
  minStorageGb?: number;
  storageType?: string;
  condition?: Condition;
  location?: string;
  tagIds?: string[];
}

export interface PageMeta {
  page: number;       // 1-based
  pageSize: number;   // items per page
  total: number;      // total records across all pages
  totalPages: number; // derived (optional in API responses)
  hasNext?: boolean;
  hasPrev?: boolean;
}

export interface SortSpec {
  field: "name" | "brand" | "model" | "cpu" | "ramGb" | "storageGb" | "createdAt" | "updatedAt";
  direction: "asc" | "desc";
}
