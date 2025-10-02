export interface Computer {
  id: string;
  code: string;
  name: string;
  brand?: string;
  model?: string;
  cpu?: string;
  gpu?: string;
  ramGb?: number;
  storageGb?: number;
  storageType?: string;
  condition?: string;
  owner?: string;
  location?: string;
  images: ComputerImage[];
  tags: ComputerTag[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ComputerImage {
  id: string;
  computerId: string;
  url: string;
  isPrimary: boolean;
}

export interface Tag {
  id: string;
  name: string;
}

export interface ComputerTag {
  computerId: string;
  tagId: string;
  computer: Computer;
  tag: Tag;
}

export type ViewMode = "table" | "card";

export type ComputerCondition = "in_use" | "repair" | "retired";

export const conditionLabels = {
  in_use: "ใช้งาน",
  repair: "ซ่อม",
  retired: "เลิกใช้",
} as const;

export const conditionColors = {
  in_use: "success",
  repair: "warning",
  retired: "error",
} as const;
