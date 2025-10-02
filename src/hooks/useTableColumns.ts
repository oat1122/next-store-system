"use client";

import { useState } from "react";

export interface ColumnConfig {
  key: string;
  label: string;
  visible: boolean;
  width?: number;
}

interface UseTableColumnsReturn {
  columns: ColumnConfig[];
  toggleColumnVisibility: (key: string) => void;
  resetColumns: () => void;
}

const defaultColumns: ColumnConfig[] = [
  { key: "image", label: "รูป", visible: true, width: 80 },
  { key: "code", label: "รหัส", visible: true, width: 120 },
  { key: "name", label: "ชื่อ", visible: true, width: 180 },
  { key: "brand", label: "ยี่ห้อ/รุ่น", visible: true, width: 150 },
  { key: "cpu", label: "CPU", visible: true, width: 200 },
  { key: "gpu", label: "GPU", visible: false, width: 180 },
  { key: "ram", label: "RAM", visible: true, width: 100 },
  { key: "storage", label: "Storage", visible: true, width: 120 },
  { key: "owner", label: "ผู้ถือครอง", visible: true, width: 120 },
  { key: "location", label: "สถานที่", visible: true, width: 120 },
  { key: "condition", label: "สภาพ", visible: true, width: 100 },
  { key: "updatedAt", label: "อัปเดต", visible: true, width: 120 },
  { key: "actions", label: "จัดการ", visible: true, width: 120 },
];

export function useTableColumns(): UseTableColumnsReturn {
  const [columns, setColumns] = useState<ColumnConfig[]>(defaultColumns);

  const toggleColumnVisibility = (key: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const resetColumns = () => {
    setColumns(defaultColumns);
  };

  return {
    columns,
    toggleColumnVisibility,
    resetColumns,
  };
}
