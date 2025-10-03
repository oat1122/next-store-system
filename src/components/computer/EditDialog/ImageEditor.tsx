import React, { useRef, useState } from "react";
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
  BrokenImage as BrokenImageIcon,
} from "@mui/icons-material";
import { ImageEditorProps } from "@/types/computer";

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
  const [imageError, setImageError] = useState(false);

  // Debug: Log images whenever they change
  React.useEffect(() => {
    console.log("ImageEditor - images changed:", images);
    console.log("ImageEditor - hasImages:", hasImages);
    console.log("ImageEditor - activeIndex:", activeIndex);
  }, [images, hasImages, activeIndex]);

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

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
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
            {imageError ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "error.main",
                  gap: 1,
                }}
              >
                <BrokenImageIcon sx={{ fontSize: 48 }} />
                <Typography variant="caption">
                  ไม่สามารถโหลดรูปภาพได้
                </Typography>
              </Box>
            ) : (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeImageUrl}
                  alt="active"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
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
            )}
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
        </Stack>
        {hasImages ? (
          <ImageList
            cols={5}
            gap={8}
            sx={{
              width: "100%",
              height: "auto",
              overflow: "visible",
            }}
          >
            {images!.map((img, idx) => (
              <ImageListItem
                key={`${img.url}-${idx}`}
                sx={{
                  height: "auto !important",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ position: "relative", mb: 1 }}>
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
                      border:
                        idx === activeIndex
                          ? "2px solid #1976d2"
                          : "2px solid transparent",
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
                  sx={{ justifyContent: "center" }}
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
              คลิก &quot;เพิ่มรูป&quot; เพื่ออัปโหลดรูปภาพ
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
