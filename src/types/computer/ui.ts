// UI-only prop types kept separate from domain types
import type { Computer } from "./core";
import type { PageMeta } from "./filters";

// Cards/Table common
export interface ComputerListCommonProps {
  items: Computer[];
  onSelect?: (item: Computer) => void;
  onOpen?: (item: Computer) => void;
  onEdit?: (item: Computer) => void;
  onDelete?: (item: Computer) => void;
}

export interface ComputerTableProps extends ComputerListCommonProps {
  dense?: boolean;
  selectable?: boolean;
}

// Pagination controls
export interface ComputerPaginationProps {
  meta: PageMeta;
  onPageChange: (page: number) => void;
}

// View Dialog subcomponents
export interface DialogHeaderProps {
  computer: Computer;
  onClose?: () => void;
}

export interface DialogFooterProps {
  computer: Computer;
  onClose?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

// Reusable section props for the dialog
export interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export interface SectionsProps {
  computer: Computer;
}
