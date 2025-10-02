import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  ImageList,
  ImageListItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Computer as ComputerIcon,
} from "@mui/icons-material";
import { ImageItem } from "@/hooks/useComputerEditDialog";

interface ImageEditorProps {
  images?: ImageItem[];
  activeIndex: number;
  hasImages: boolean;
  activeImageUrl: string;
  onSetActiveIndex: (index: number) => void;
  onSetPrimary: (index: number) => void;
  onRemoveImage: (index: number) => void;
  onAddImageByUrl: () => void;
}

export function ImageEditor({
  images,
  activeIndex,
  hasImages,
  activeImageUrl,
  onSetActiveIndex,
  onSetPrimary,
  onRemoveImage,
  onAddImageByUrl,
}: ImageEditorProps) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        border: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      {/* Main Image Display */}
      <Box
        sx={{
          aspectRatio: "4 / 3",
          bgcolor: "grey.100",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {hasImages ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={activeImageUrl}
            alt="active"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <ComputerIcon />
        )}
      </Box>

      {/* Image Management */}
      <Box sx={{ p: 1.5 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Typography variant="body2" color="text.secondary">
            รูปภาพ
          </Typography>
          <Button
            size="small"
            startIcon={<AddIcon />}
            onClick={onAddImageByUrl}
          >
            เพิ่มรูปจาก URL
          </Button>
        </Stack>

        {hasImages ? (
          <ImageList cols={5} gap={8} rowHeight={64}>
            {images!.map((img, idx) => (
              <ImageListItem key={`${img.url}-${idx}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={`thumb-${idx}`}
                  loading="lazy"
                  onClick={() => onSetActiveIndex(idx)}
                  style={{
                    width: "100%",
                    height: 64,
                    objectFit: "cover",
                    cursor: "pointer",
                    borderRadius: 6,
                    outline: idx === activeIndex ? "2px solid" : "none",
                  }}
                />
                <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
                  <Tooltip
                    title={img.isPrimary ? "รูปหลัก" : "ตั้งเป็นรูปหลัก"}
                  >
                    <IconButton size="small" onClick={() => onSetPrimary(idx)}>
                      {img.isPrimary ? (
                        <StarIcon fontSize="small" />
                      ) : (
                        <StarBorderIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="ลบรูปนี้">
                    <IconButton size="small" onClick={() => onRemoveImage(idx)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </ImageListItem>
            ))}
          </ImageList>
        ) : (
          <Typography variant="body2" color="text.secondary">
            ยังไม่มีรูปภาพ
          </Typography>
        )}
      </Box>
    </Box>
  );
}
