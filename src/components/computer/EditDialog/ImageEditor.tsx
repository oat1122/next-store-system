import React, { useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  ImageList,
  ImageListItem,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Computer as ComputerIcon,
  Upload as UploadIcon,
  Link as LinkIcon,
  MoreVert as MoreVertIcon,
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
  onAddImageByFile: (file: File) => Promise<void>;
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
  onAddImageByFile,
}: ImageEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onAddImageByFile(file);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
    handleMenuClose();
  };

  const handleUrlClick = () => {
    onAddImageByUrl();
    handleMenuClose();
  };
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
          aspectRatio: "3 / 2", // เปลี่ยนจาก 4:3 เป็น 3:2 ให้กว้างขึ้น
          bgcolor: "grey.100",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {hasImages ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImageUrl}
              alt="active"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            {/* Image counter overlay */}
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                bgcolor: "rgba(0,0,0,0.7)",
                color: "white",
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                fontSize: "0.75rem",
              }}
            >
              {activeIndex + 1} / {images!.length}
            </Box>
          </>
        ) : (
          <ComputerIcon sx={{ fontSize: 48, color: "grey.400" }} />
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

          <div>
            <Button
              size="small"
              startIcon={<AddIcon />}
              onClick={handleMenuOpen}
              endIcon={<MoreVertIcon fontSize="small" />}
            >
              เพิ่มรูป
            </Button>

            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleUploadClick}>
                <UploadIcon sx={{ mr: 1 }} fontSize="small" />
                อัปโหลดไฟล์
              </MenuItem>
              <MenuItem onClick={handleUrlClick}>
                <LinkIcon sx={{ mr: 1 }} fontSize="small" />
                เพิ่มจาก URL
              </MenuItem>
            </Menu>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
        </Stack>{" "}
        {hasImages ? (
          <ImageList cols={3} gap={12} rowHeight={96}>
            {" "}
            {/* เปลี่ยนจาก 5 cols เป็น 3 cols และขนาด 96px */}
            {images!.map((img, idx) => (
              <ImageListItem key={`${img.url}-${idx}`}>
                <Box sx={{ position: "relative" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={`thumb-${idx}`}
                    loading="lazy"
                    onClick={() => onSetActiveIndex(idx)}
                    style={{
                      width: "100%",
                      height: 96, // เพิ่มจาก 64px เป็น 96px
                      objectFit: "cover",
                      cursor: "pointer",
                      borderRadius: 8, // เพิ่ม border radius
                      outline:
                        idx === activeIndex
                          ? "3px solid #1976d2"
                          : "1px solid #e0e0e0",
                      transition: "all 0.2s ease",
                    }}
                  />

                  {/* Primary badge */}
                  {img.isPrimary && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 4,
                        left: 4,
                        bgcolor: "primary.main",
                        color: "white",
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        boxShadow: 1,
                      }}
                    >
                      หลัก
                    </Box>
                  )}
                </Box>

                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{ mt: 1, justifyContent: "center" }}
                >
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
          <Box sx={{ textAlign: "center", py: 4 }}>
            <ComputerIcon sx={{ fontSize: 48, color: "grey.400", mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              ยังไม่มีรูปภาพ
            </Typography>
            <Typography variant="caption" color="text.secondary">
              คลิก "เพิ่มรูป" เพื่ออัปโหลดรูปภาพ
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
