// Example usage of Computer Edit API

import { useState } from "react";
import { updateComputer, createComputer } from "@/lib/computer-api";
import type { ComputerFormValues } from "@/types/computer/forms";
import type { Computer } from "@/types/computer/core";

// Hook สำหรับการ save computer (create หรือ update)
export function useComputerSave() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveComputer = async (
    data: ComputerFormValues
  ): Promise<Computer | null> => {
    setIsLoading(true);
    setError(null);

    try {
      let result;

      if (data.id) {
        // Update existing computer
        result = await updateComputer(data.id, data);
      } else {
        // Create new computer
        result = await createComputer(data);
      }

      return result.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "เกิดข้อผิดพลาด";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveComputer,
    isLoading,
    error,
  };
}

// ฟังก์ชัน utility สำหรับแปลงข้อมูลจาก Computer ให้เป็น ComputerFormValues
export function computerToFormValues(computer: Computer): ComputerFormValues {
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
    tags: computer.tags?.map((tag) => tag.name) || [],
    images:
      computer.images?.map((img) => ({
        url: img.url,
        isPrimary: img.isPrimary,
      })) || [],
  };
}
