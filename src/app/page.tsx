"use client";

import { useState } from "react";
import { Container } from "@mui/material";
import { useComputers } from "@/hooks/useComputers";
import { useViewMode } from "@/hooks/useViewMode";
import { PageHeader, LoadingState } from "@/components/PageComponents";
import { ComputerFilters } from "@/components/ComputerFilters";
import { ComputerContent } from "@/components/ComputerContent";
import { ComputerPagination } from "@/components/ComputerPagination";
import { ComputerViewDialog } from "@/components";
import { Computer } from "@/types/computer";

export default function Home() {
  const { mounted, viewMode, setViewMode } = useViewMode();
  const {
    computers,
    loading,
    error,
    pagination,
    page,
    searchTerm,
    conditionFilter,
    handleSearchChange,
    handleConditionChange,
    handlePageChange,
  } = useComputers();

  // Dialog state
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedComputer, setSelectedComputer] = useState<Computer | null>(
    null
  );

  // Handle view dialog
  const handleView = (id: string) => {
    const found = computers.find((c) => c.id === id) || null;
    setSelectedComputer(found);
    setViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setSelectedComputer(null);
  };

  // Handle actions from dialog
  const handleEdit = (id: string) => {
    console.log("Edit computer:", id);
    // TODO: นำทางไปหน้าแก้ไข
  };

  const handleDuplicate = (id: string) => {
    console.log("Duplicate computer:", id);
    // TODO: ทำซ้ำข้อมูล
  };

  const handleExport = (id: string) => {
    console.log("Export computer:", id);
    // TODO: ส่งออกข้อมูล
  };

  // Prevent hydration mismatch by only rendering after mount
  if (!mounted) {
    return <LoadingState />;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <PageHeader
        title="ระบบจัดการคอมพิวเตอร์"
        subtitle="จัดการและติดตามข้อมูลคอมพิวเตอร์ในองค์กร"
      />

      <ComputerFilters
        mounted={mounted}
        searchTerm={searchTerm}
        conditionFilter={conditionFilter}
        viewMode={viewMode}
        onSearchChange={handleSearchChange}
        onConditionChange={handleConditionChange}
        onViewModeChange={setViewMode}
      />

      <ComputerContent
        loading={loading}
        error={error}
        computers={computers}
        viewMode={viewMode}
        onView={handleView}
      />

      {!loading && !error && computers.length > 0 && (
        <ComputerPagination
          pagination={pagination}
          currentPage={page}
          computersCount={computers.length}
          onPageChange={handlePageChange}
        />
      )}

      {/* View Dialog */}
      <ComputerViewDialog
        open={viewDialogOpen}
        onClose={handleCloseViewDialog}
        computer={selectedComputer}
        onEdit={handleEdit}
        onDuplicate={handleDuplicate}
        onExport={handleExport}
      />
    </Container>
  );
}
