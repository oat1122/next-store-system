import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";

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

export const CONDITION_OPTIONS = ["New", "Like New", "Good", "Fair", "Poor"];

export const STORAGE_TYPE_OPTIONS = ["SSD", "HDD", "NVMe", "Hybrid"];

export function useComputerEditDialog({
  initial,
  onSubmit,
}: UseComputerEditDialogProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const defaultValues: ComputerFormValues = useMemo(
    () => ({
      id: initial?.id,
      code: initial?.code ?? "",
      name: initial?.name ?? "",
      brand: initial?.brand ?? "",
      model: initial?.model ?? "",
      cpu: initial?.cpu ?? "",
      gpu: initial?.gpu ?? "",
      ramGb: (initial?.ramGb as number | undefined) ?? undefined,
      storageGb: (initial?.storageGb as number | undefined) ?? undefined,
      storageType: initial?.storageType ?? "",
      condition: initial?.condition ?? "",
      owner: initial?.owner ?? "",
      location: initial?.location ?? "",
      tags: (initial?.tags as string[] | undefined) ?? [],
      images: (initial?.images as ImageItem[] | undefined) ?? [],
    }),
    [initial]
  );

  const form = useForm<ComputerFormValues>({
    defaultValues,
    mode: "onChange",
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    watch,
    setValue,
  } = form;

  const images = watch("images");
  const watchedValues = {
    code: watch("code"),
    name: watch("name"),
    brand: watch("brand"),
    model: watch("model"),
  };

  // Image management functions
  const setPrimary = (idx: number) => {
    const next = (images ?? []).map((img, i) => ({
      ...img,
      isPrimary: i === idx,
    }));
    setValue("images", next, { shouldDirty: true });
    setActiveIndex(idx);
  };

  const removeImage = (idx: number) => {
    const next = (images ?? []).filter((_, i) => i !== idx);
    setValue("images", next, { shouldDirty: true });
    setActiveIndex((p) => Math.max(0, Math.min(p, next.length - 1)));
  };

  const addImageByUrl = () => {
    const url = prompt("ใส่ URL รูปภาพ");
    if (!url) return;
    const next = [
      ...(images ?? []),
      { url, isPrimary: (images?.length ?? 0) === 0 },
    ];
    setValue("images", next, { shouldDirty: true });
    setActiveIndex(next.findIndex((i) => i.isPrimary) ?? 0);
  };

  // Form submission
  const submit = handleSubmit(async (values) => {
    const clean: ComputerFormValues = {
      ...values,
      code: values.code.trim(),
      name: values.name.trim(),
      brand: values.brand?.trim() || null,
      model: values.model?.trim() || null,
      cpu: values.cpu?.trim() || null,
      gpu: values.gpu?.trim() || null,
      storageType: values.storageType?.trim() || null,
      condition: values.condition?.trim() || null,
      owner: values.owner?.trim() || null,
      location: values.location?.trim() || null,
      ramGb:
        values.ramGb === undefined || values.ramGb === null
          ? null
          : Number(values.ramGb),
      storageGb:
        values.storageGb === undefined || values.storageGb === null
          ? null
          : Number(values.storageGb),
      tags: values.tags ?? [],
      images: (values.images ?? []).map((i) => ({
        id: i.id,
        url: i.url,
        isPrimary: !!i.isPrimary,
      })),
    };
    await onSubmit(clean);
  });

  // Computed values
  const hasImages = (images?.length ?? 0) > 0;
  const activeImageUrl = hasImages
    ? images![Math.min(activeIndex, images!.length - 1)].url
    : "";

  return {
    // Form state
    form,
    control,
    register,
    errors,
    isSubmitting,
    isDirty,
    watchedValues,

    // Image state
    images,
    activeIndex,
    hasImages,
    activeImageUrl,

    // Actions
    submit,
    setPrimary,
    removeImage,
    addImageByUrl,
    setActiveIndex,
  };
}
