// UI-only prop types kept separate from domain types
import type { Computer, ImageItem } from "./core";
import type { PageMeta } from "./filters";
import type { ComputerFormValues } from "./forms";
import type { UseFormRegister, FieldErrors, Control } from "react-hook-form";

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

// View Dialog subcomponents (original)
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

// Edit Dialog specific types
export interface EditDialogHeaderProps {
  code: string;
  name: string;
  brand?: string;
  model?: string;
  activeImageUrl: string;
  onClose: () => void;
}

export interface EditDialogFooterProps {
  isDirty: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

export interface FormFieldsProps {
  register: UseFormRegister<ComputerFormValues>;
  control: Control<ComputerFormValues>;
  errors: FieldErrors<ComputerFormValues>;
}

export interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface ImageEditorProps {
  images?: ImageItem[];
  activeIndex: number;
  hasImages: boolean;
  activeImageUrl: string;
  onSetActiveIndex: (index: number) => void;
  onSetPrimary: (index: number) => void;
  onRemoveImage: (index: number) => void;
  onAddImageByUrl: () => void;
  onAddImageByFile: (file: File) => Promise<void>;
}

export interface TagsFieldProps {
  control: Control<ComputerFormValues>;
  tagOptions?: string[];
}

// Hook props
export interface UseComputerEditDialogProps {
  initial?: Computer;
  onSubmit?: (values: ComputerFormValues) => void;
}

// Specs component props
export interface ComputerSpecsProps {
  computer: Computer;
}

export interface ComputerConditionChipProps {
  condition?: string | null;
}
