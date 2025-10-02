/**
 * Utility functions for formatting computer specifications
 */

export const formatStorage = (
  storageGb?: number,
  storageType?: string
): string => {
  if (!storageGb) return "—";
  return `${storageGb}GB ${storageType || ""}`.trim();
};

export const formatRam = (ramGb?: number): string => {
  if (!ramGb) return "—";
  return `${ramGb}GB`;
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("th-TH");
};

export const getImageUrl = (
  images: Array<{ url: string }> | undefined
): string => {
  return images?.[0]?.url || "/images/noimage.svg";
};

export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement>
): void => {
  (e.target as HTMLImageElement).src = "/images/noimage.svg";
};
