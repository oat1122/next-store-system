"use client";

import { useState } from "react";
import { Container } from "@mui/material";
import { useComputers } from "@/hooks/useComputers";
import { useViewMode } from "@/hooks/useViewMode";
import {
  PageHeader,
  LoadingState,
  ComputerFilters,
  ComputerContent,
  ComputerPagination,
} from "@/components";
import { ComputerViewDialog } from "@/components";
import { ComputerEditDialog } from "@/components/computer";
import { Computer } from "@/types/computer";
import { ComputerFormValues } from "@/hooks/useComputerEditDialog";

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
    refetch,
  } = useComputers();

  // Dialog state
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedComputer, setSelectedComputer] = useState<Computer | null>(
    null
  );

  // Edit dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingComputer, setEditingComputer] = useState<Computer | null>(null);

  // Mock tag options - ในความเป็นจริงอาจมาจาก API
  const tagOptions = [
    "Gaming",
    "Office",
    "Development",
    "Testing",
    "Server",
    "Laptop",
  ];

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
    const found = computers.find((c) => c.id === id) || null;
    setEditingComputer(found);
    setEditDialogOpen(true);
    // Close view dialog if it's open
    setViewDialogOpen(false);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditingComputer(null);
  };

  const handleEditSubmit = async (payload: ComputerFormValues) => {
    try {
      console.log("Submitting computer data:", payload);

      if (payload.id) {
        // Update existing computer
        const response = await fetch(`/api/computers/${payload.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to update computer");
        }

        console.log("Computer updated successfully");
      } else {
        // Create new computer
        const response = await fetch("/api/computers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to create computer");
        }

        console.log("Computer created successfully");
      }

      // Close dialog
      handleCloseEditDialog();

      // Refetch data to update the list
      await refetch();
    } catch (error) {
      console.error("Failed to save computer:", error);
      alert("เกิดข้อผิดพลาด: " + (error as Error).message);
    }
  };

  // Transform Computer to ComputerFormValues
  const transformComputerToFormValues = (
    computer: Computer | null
  ): Partial<ComputerFormValues> | null => {
    if (!computer) return null;

    // Debug: ดูข้อมูล computer.tags
    console.log("Transform - computer.tags:", computer.tags);

    return {
      id: computer.id,
      code: computer.code,
      name: computer.name,
      brand: computer.brand,
      model: computer.model,
      cpu: computer.cpu,
      gpu: computer.gpu,
      ramGb: computer.ramGb,
      storageGb: computer.storageGb,
      storageType: computer.storageType,
      condition: computer.condition,
      owner: computer.owner,
      location: computer.location,
      tags: computer.tags.map((tag) => {
        console.log("Transform - tag:", tag);
        return tag.name;
      }), // แปลง ComputerTag[] เป็น string[]
      images: computer.images.map((img) => ({
        id: img.id,
        url: img.url,
        isPrimary: img.isPrimary,
      })),
    };
  };

  const handleCreateNew = () => {
    setEditingComputer(null); // ไม่มี initial data
    setEditDialogOpen(true);
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
        onAddNew={handleCreateNew}
        addButtonText="เพิ่มคอมพิวเตอร์"
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
        onEdit={handleEdit}
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

      {/* Edit Dialog */}
      <ComputerEditDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        initial={transformComputerToFormValues(editingComputer)}
        tagOptions={tagOptions}
        onSubmit={handleEditSubmit}
      />
    </Container>
  );
}
