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

// Edit Dialog Types
export type ImageItem = {
  id?: string;
  url: string;
  isPrimary?: boolean;
};

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
  storageType?: string | null;
  condition?: string | null;
  owner?: string | null;
  location?: string | null;
  tags?: string[];
  images?: ImageItem[];
};

export interface UseComputerEditDialogProps {
  initial?: Partial<ComputerFormValues> | null;
  onSubmit: (payload: ComputerFormValues) => Promise<void> | void;
}

// Constants
export const CONDITION_OPTIONS = [
  { value: "", label: "—" },
  { value: "in_use", label: "ใช้งาน" },
  { value: "repair", label: "ซ่อม" },
  { value: "retired", label: "เลิกใช้" },
];

export const STORAGE_TYPE_OPTIONS = [
  { value: "", label: "—" },
  { value: "SSD", label: "SSD" },
  { value: "HDD", label: "HDD" },
  { value: "NVMe", label: "NVMe" },
  { value: "Hybrid", label: "Hybrid" },
];

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

// Component Props Interfaces

// Computer ViewDialog Props
export interface ComputerViewDialogProps {
  open: boolean;
  onClose: () => void;
  computer?: Computer | null;
  onEdit?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onExport?: (id: string) => void;
}

// Computer Table Props
export interface ComputerTableProps {
  data: Computer[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onExport?: (id: string) => void;
}

// Computer Filters Props
export interface ComputerFiltersProps {
  mounted: boolean;
  searchTerm: string;
  conditionFilter: string;
  viewMode: ViewMode;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConditionChange: (event: any) => void;
  onViewModeChange: (mode: ViewMode) => void;
}

// Computer Cards Props
export interface ComputerCardsProps {
  data: Computer[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onExport?: (id: string) => void;
}

// Computer Content Props
export interface ComputerContentProps {
  loading: boolean;
  error: string;
  computers: Computer[];
  viewMode: ViewMode;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onExport?: (id: string) => void;
}

// Computer Actions Props
export interface ComputerActionsProps {
  computerId: string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onMenuOpen?: (event: React.MouseEvent<HTMLElement>, id: string) => void;
  variant?: "card" | "table";
}

// Computer Specs Props
export interface ComputerSpecsProps {
  computer: Computer;
  variant?: "detailed" | "compact";
}

// Computer Condition Chip Props
export interface ComputerConditionChipProps {
  condition?: string;
  size?: "small" | "medium";
}

// Computer Menu Props
export interface ComputerMenuProps {
  computer: Computer;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onExport?: (id: string) => void;
}

// Computer Pagination Props
export interface ComputerPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// ViewDialog Sub-Component Props

// Dialog Header/Footer Props
export interface DialogHeaderProps {
  computer: Computer;
  onClose: () => void;
}

export interface DialogFooterProps {
  computer: Computer;
  onEdit?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onExport?: (id: string) => void;
}

// Dialog Section Props
export interface SectionProps {
  title: string;
  children: React.ReactNode;
}

// Image Section Props
export interface ImageSectionProps {
  activeImageUrl: string;
  computerName: string;
  images: Array<{ url: string; isPrimary: boolean }>;
  activeIndex: number;
  onImageSelect: (index: number) => void;
  hasMultipleImages: boolean;
}

// Ownership Section Props
export interface OwnershipSectionProps {
  computer: Computer;
}

// Hardware Section Props
export interface HardwareSectionProps {
  computer: Computer;
}

// Tags Section Props
export interface TagsSectionProps {
  computer: Computer;
}

// Metadata Section Props
export interface MetadataSectionProps {
  computer: Computer;
}

// Spec Row Props
export interface SpecRowProps {
  icon?: React.ReactNode;
  label: string;
  value: string | number | React.ReactNode;
  mono?: boolean;
}

// Common Component Props

// View Toggle Props
export interface ViewToggleProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

// Table Column Controls Props
export interface TableColumnControlsProps {
  columns: Array<{
    key: string;
    label: string;
    visible: boolean;
    width?: number;
  }>;
  onToggleColumn: (key: string) => void;
  onResetColumns: () => void;
}
