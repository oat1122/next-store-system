"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button,
  Box,
  Stack,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Visibility,
  Edit,
  MoreVert,
  Computer,
  Memory,
  Storage,
} from "@mui/icons-material";
import {
  Computer as ComputerType,
  conditionLabels,
  conditionColors,
} from "@/types/computer";
import { useState } from "react";

interface ComputerCardsProps {
  data: ComputerType[];
}

export function ComputerCards({ data }: ComputerCardsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [_selectedId, setSelectedId] = useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const formatStorage = (storageGb?: number, storageType?: string) => {
    if (!storageGb) return "—";
    return `${storageGb}GB ${storageType || ""}`.trim();
  };

  const formatRam = (ramGb?: number) => {
    if (!ramGb) return "—";
    return `${ramGb}GB`;
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 3,
        p: 2,
      }}
    >
      {data.map((computer) => (
        <Box key={computer.id}>
          <Card
            sx={{
              height: "100%", // กำหนดความสูงคงที่
              display: "flex",
              flexDirection: "column",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 4,
              },
            }}
          >
            {/* รูปภาพ */}
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="160"
                image={computer.images[0]?.url || "/images/noimage.svg"}
                alt={computer.name}
                sx={{ objectFit: "cover" }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  (e.target as HTMLImageElement).src = "/images/noimage.svg";
                }}
              />
              {/* Badge สภาพ */}
              <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                <Chip
                  label={
                    conditionLabels[
                      computer.condition as keyof typeof conditionLabels
                    ] || computer.condition
                  }
                  color={
                    (conditionColors[
                      computer.condition as keyof typeof conditionColors
                    ] as
                      | "default"
                      | "primary"
                      | "secondary"
                      | "error"
                      | "info"
                      | "success"
                      | "warning") || "default"
                  }
                  size="small"
                />
              </Box>
            </Box>

            <CardContent
              sx={{
                flexGrow: 1,
                pb: 1,
                minHeight: "200px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* ชื่อและรหัส */}
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  minHeight: "48px",
                  lineHeight: 1.2,
                }}
              >
                {computer.code} - {computer.name}
              </Typography>

              {/* ยี่ห้อและรุ่น */}
              <Typography
                variant="body2"
                color="text.secondary"
                gutterBottom
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  minHeight: "20px",
                }}
              >
                {computer.brand} {computer.model}
              </Typography>

              {/* Tags */}
              <Box sx={{ mb: 2, minHeight: "32px" }}>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip
                    label={computer.owner}
                    variant="outlined"
                    size="small"
                  />
                  <Chip
                    label={computer.location}
                    variant="outlined"
                    size="small"
                  />
                </Stack>
              </Box>

              {/* ข้อมูลฮาร์ดแวร์ */}
              <Box sx={{ mt: "auto" }}>
                <Stack spacing={1}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Computer color="action" sx={{ fontSize: 16 }} />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        flex: 1,
                      }}
                    >
                      {computer.cpu || "—"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Memory color="action" sx={{ fontSize: 16 }} />
                    <Typography variant="body2" color="text.secondary">
                      {formatRam(computer.ramGb)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Storage color="action" sx={{ fontSize: 16 }} />
                    <Typography variant="body2" color="text.secondary">
                      {formatStorage(computer.storageGb, computer.storageType)}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </CardContent>

            {/* ปุ่มจัดการ */}
            <Box sx={{ p: 2, pt: 0 }}>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Visibility />}
                  sx={{ flex: 1 }}
                >
                  ดู
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Edit />}
                  sx={{ flex: 1 }}
                >
                  แก้ไข
                </Button>
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, computer.id)}
                >
                  <MoreVert />
                </IconButton>
              </Stack>
            </Box>
          </Card>
        </Box>
      ))}

      {/* Menu สำหรับตัวเลือกเพิ่มเติม */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>ลบ</MenuItem>
        <MenuItem onClick={handleMenuClose}>ทำซ้ำ</MenuItem>
        <MenuItem onClick={handleMenuClose}>ส่งออก</MenuItem>
      </Menu>
    </Box>
  );
}
