"use client";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ViewList, ViewModule } from "@mui/icons-material";
import { ViewMode } from "@/types/computer";

interface ViewToggleProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: ViewMode | null
  ) => {
    if (newView !== null) {
      onViewChange(newView);
    }
  };

  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={handleChange}
      size="small"
      sx={{
        backgroundColor: "background.paper",
        "& .MuiToggleButton-root": {
          border: 1,
          borderColor: "divider",
          "&.Mui-selected": {
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          },
        },
      }}
    >
      <ToggleButton value="table" aria-label="table view">
        <ViewList sx={{ mr: { xs: 0, sm: 1 } }} />
        <span className="hidden sm:inline">ตาราง</span>
      </ToggleButton>
      <ToggleButton value="card" aria-label="card view">
        <ViewModule sx={{ mr: { xs: 0, sm: 1 } }} />
        <span className="hidden sm:inline">การ์ด</span>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
