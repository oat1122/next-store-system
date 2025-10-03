import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ImageItem,
  ComputerFormValues,
  UseComputerEditDialogProps,
} from "@/types/computer";

export type { UseComputerEditDialogProps };

export function useComputerEditDialog({
  initial,
  onSubmit,
}: UseComputerEditDialogProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const defaultValues: ComputerFormValues = useMemo(() => {
    const processedTags =
      initial?.tags
        ?.map((tag) => {
          if (typeof tag === "string") {
            return tag;
          } else if (tag && typeof tag === "object" && "name" in tag) {
            return tag.name;
          } else {
            return String(tag);
          }
        })
        .filter(Boolean) ?? [];

    return {
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
      tags: processedTags,
      images: (initial?.images as ImageItem[] | undefined) ?? [],
    };
  }, [initial]);

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
    reset,
  } = form;

  // Reset form when initial data changes
  useEffect(() => {
    console.log("useEffect triggered - initial:", initial);

    if (initial) {
      // Get current form values to preserve user changes
      const currentValues = form.getValues();
      console.log("Current form values:", currentValues);

      const newValues: ComputerFormValues = {
        id: initial.id,
        code: initial.code ?? "",
        name: initial.name ?? "",
        brand: initial.brand ?? "",
        model: initial.model ?? "",
        cpu: initial.cpu ?? "",
        gpu: initial.gpu ?? "",
        ramGb: (initial.ramGb as number | undefined) ?? undefined,
        storageGb: (initial.storageGb as number | undefined) ?? undefined,
        storageType: initial.storageType ?? "",
        condition: initial.condition ?? "",
        owner: initial.owner ?? "",
        location: initial.location ?? "",
        tags:
          initial.tags
            ?.map((tag) => (typeof tag === "string" ? tag : tag.name))
            .filter(Boolean) ?? [],
        // Preserve current images if form is dirty, otherwise use initial images
        images:
          form.formState.isDirty && (currentValues.images?.length ?? 0) > 0
            ? currentValues.images
            : (initial.images as ImageItem[] | undefined) ?? [],
      };

      console.log("New form values:", newValues);
      reset(newValues);

      // Set active image index to primary image or first image
      const primaryIndex =
        newValues.images?.findIndex((img) => img.isPrimary) ?? 0;
      setActiveIndex(Math.max(0, primaryIndex));
    } else {
      // Reset to empty form for new computer
      reset({
        code: "",
        name: "",
        brand: "",
        model: "",
        cpu: "",
        gpu: "",
        ramGb: undefined,
        storageGb: undefined,
        storageType: "",
        condition: "",
        owner: "",
        location: "",
        tags: [],
        images: [],
      });
      setActiveIndex(0);
    }
  }, [initial?.id, reset]); // Only depend on initial.id to avoid unnecessary resets

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

  const addImageByFile = async (file: File) => {
    try {
      console.log("Starting image upload:", file.name);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to upload image");
      }

      const result = await response.json();
      console.log("Upload result:", result);

      const currentImages = images ?? [];
      console.log("Current images before add:", currentImages);

      const next = [
        ...currentImages,
        { url: result.url, isPrimary: currentImages.length === 0 },
      ];

      console.log("New images array:", next);

      setValue("images", next, { shouldDirty: true });

      // Set active index to the newly added image
      const newImageIndex = next.length - 1;
      console.log("Setting active index to:", newImageIndex);
      setActiveIndex(newImageIndex);
    } catch (error) {
      console.error("Failed to upload image:", error);
      alert("ไม่สามารถอัปโหลดรูปภาพได้: " + (error as Error).message);
    }
  };

  // Form submission
  const submit = handleSubmit(async (values) => {
    console.log("Form submission - raw values:", values);
    console.log("Form submission - images count:", values.images?.length);

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
        url: i.url,
        isPrimary: !!i.isPrimary,
      })),
    };

    console.log("Form submission - clean data:", clean);
    console.log("Form submission - clean images:", clean.images);

    if (onSubmit) {
      await onSubmit(clean);
    }
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
    addImageByFile,
    setActiveIndex,
  };
}
