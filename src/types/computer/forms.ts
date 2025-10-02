// Form value shapes used by React Hook Form / Zod etc.

import type { Condition, StorageType } from "./core";

export type ComputerFormValues = {
  id?: string;
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
  // image URLs only; full ComputerImage handled elsewhere
  images?: string[];
  // tag ids chosen in UI
  tagIds?: string[];
};
