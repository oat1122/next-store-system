"use client";

import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Computer as ComputerType } from "@/types/computer";
import { useMenu } from "@/hooks/useMenu";
import { getImageUrl, handleImageError } from "@/utils/formatters";
import { ComputerSpecs, ComputerConditionChip } from "./Specs";
import { ComputerActions } from "./Actions";
import { ComputerMenu } from "./Menu";

interface ComputerCardsProps {
  data: ComputerType[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onExport?: (id: string) => void;
}

export function ComputerCards({
  data,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
  onExport,
}: ComputerCardsProps) {
  const { anchorEl, selectedId, isOpen, handleMenuOpen, handleMenuClose } =
    useMenu();

  const handleDelete = () => {
    if (selectedId) onDelete?.(selectedId);
  };

  const handleDuplicate = () => {
    if (selectedId) onDuplicate?.(selectedId);
  };

  const handleExport = () => {
    if (selectedId) onExport?.(selectedId);
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
                image={getImageUrl(computer.images)}
                alt={computer.name}
                sx={{ objectFit: "cover" }}
                onError={handleImageError}
              />
              {/* Badge สภาพ */}
              <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                <ComputerConditionChip
                  condition={computer.condition || "unknown"}
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

              <ComputerSpecs computer={computer} />
            </CardContent>

            {/* ปุ่มจัดการ */}
            <Box sx={{ p: 2, pt: 0 }}>
              <ComputerActions
                computerId={computer.id}
                onView={onView}
                onEdit={onEdit}
                onMenuOpen={handleMenuOpen}
                variant="card"
              />
            </Box>
          </Card>
        </Box>
      ))}

      {/* Menu สำหรับตัวเลือกเพิ่มเติม */}
      <ComputerMenu
        anchorEl={anchorEl}
        isOpen={isOpen}
        onClose={handleMenuClose}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
        onExport={handleExport}
      />
    </Box>
  );
}
