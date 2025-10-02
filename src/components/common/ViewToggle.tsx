"use client";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ViewList, ViewModule } from "@mui/icons-material";
import { ViewMode } from "@/types/computer";
import { useViewToggle } from "@/hooks/useViewToggle";

interface ViewToggleProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  const { mounted, handleChange } = useViewToggle({ onViewChange });

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 rounded-lg border bg-card p-1 opacity-50">
        <div className="px-4 py-2">Loading...</div>
      </div>
    );
  }

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
