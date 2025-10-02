"use client";

import { Container } from "@mui/material";
import { useComputers } from "@/hooks/useComputers";
import { useViewMode } from "@/hooks/useViewMode";
import { PageHeader, LoadingState } from "@/components/PageComponents";
import { ComputerFilters } from "@/components/ComputerFilters";
import { ComputerContent } from "@/components/ComputerContent";
import { ComputerPagination } from "@/components/ComputerPagination";

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
      />

      {!loading && !error && computers.length > 0 && (
        <ComputerPagination
          pagination={pagination}
          currentPage={page}
          computersCount={computers.length}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
}
