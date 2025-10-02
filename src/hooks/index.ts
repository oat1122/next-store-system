// Hooks
export { useComputers } from "./useComputers";
export { useViewMode } from "./useViewMode";
export { useMenu } from "./useMenu";
export { useViewToggle } from "./useViewToggle";
export { useTableColumns } from "./useTableColumns";
export { useComputerViewDialog } from "./useComputerViewDialog";
export { useComputerEditDialog } from "./useComputerEditDialog";
export type { ColumnConfig } from "./useTableColumns";
export type { UseComputerViewDialogProps } from "./useComputerViewDialog";
export type { UseComputerEditDialogProps } from "./useComputerEditDialog";

// Re-export types and constants from computer.ts for convenience
export type { ComputerFormValues, ImageItem } from "../types/computer";
export { CONDITION_OPTIONS, STORAGE_TYPE_OPTIONS } from "../types/computer";
