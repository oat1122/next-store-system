import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const computer = await prisma.computer.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: {
            isPrimary: "desc",
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!computer) {
      return NextResponse.json({ error: "ไม่พบคอมพิวเตอร์" }, { status: 404 });
    }

    // Transform data
    const transformedComputer = {
      ...computer,
      tags: computer.tags.map((tagRelation) => tagRelation.tag),
    };

    return NextResponse.json({
      data: transformedComputer,
    });
  } catch (error) {
    console.error("Error fetching computer:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการดึงข้อมูล" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      code,
      name,
      brand,
      model,
      cpu,
      gpu,
      ramGb,
      storageGb,
      storageType,
      condition,
      owner,
      location,
      tags = [],
      images = [],
    } = body;

    // Validate required fields
    if (!code || !name) {
      return NextResponse.json(
        { error: "รหัสและชื่อคอมพิวเตอร์จำเป็นต้องกรอก" },
        { status: 400 }
      );
    }

    // Check if computer exists
    const existingComputer = await prisma.computer.findUnique({
      where: { id },
    });

    if (!existingComputer) {
      return NextResponse.json(
        { error: "ไม่พบคอมพิวเตอร์ที่ต้องการแก้ไข" },
        { status: 404 }
      );
    }

    // Check if code is already used by another computer
    if (code !== existingComputer.code) {
      const duplicateComputer = await prisma.computer.findUnique({
        where: { code },
      });

      if (duplicateComputer) {
        return NextResponse.json(
          { error: "รหัสคอมพิวเตอร์นี้มีอยู่แล้ว" },
          { status: 400 }
        );
      }
    }

    // Update computer with transaction to handle relationships
    const result = await prisma.$transaction(async (tx) => {
      // Update computer basic info
      const computer = await tx.computer.update({
        where: { id },
        data: {
          code: code.trim(),
          name: name.trim(),
          brand: brand?.trim() || null,
          model: model?.trim() || null,
          cpu: cpu?.trim() || null,
          gpu: gpu?.trim() || null,
          ramGb: ramGb ? Number(ramGb) : null,
          storageGb: storageGb ? Number(storageGb) : null,
          storageType: storageType?.trim() || null,
          condition: condition?.trim() || null,
          owner: owner?.trim() || null,
          location: location?.trim() || null,
        },
      });

      // Handle tags - Remove all existing tags and add new ones
      await tx.computerTag.deleteMany({
        where: { computerId: id },
      });

      if (tags && tags.length > 0) {
        const tagPromises = tags.map(async (tagName: string) => {
          const trimmedTagName = tagName.trim();
          if (!trimmedTagName) return null;

          // Find or create tag
          const tag = await tx.tag.upsert({
            where: { name: trimmedTagName },
            update: {},
            create: { name: trimmedTagName },
          });

          // Create computer-tag relationship
          return tx.computerTag.create({
            data: {
              computerId: id,
              tagId: tag.id,
            },
          });
        });

        await Promise.all(tagPromises.filter(Boolean));
      }

      // Handle images - Remove all existing images and add new ones
      await tx.computerImage.deleteMany({
        where: { computerId: id },
      });

      if (images && images.length > 0) {
        const imagePromises = images.map((image: any, index: number) => {
          return tx.computerImage.create({
            data: {
              computerId: id,
              url: image.url,
              isPrimary: image.isPrimary || index === 0,
            },
          });
        });

        await Promise.all(imagePromises);
      }

      return computer;
    });

    // Fetch complete updated computer data with relationships
    const updatedComputer = await prisma.computer.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: {
            isPrimary: "desc",
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    // Transform data
    const transformedComputer = {
      ...updatedComputer!,
      tags: updatedComputer!.tags.map((tagRelation) => tagRelation.tag),
    };

    return NextResponse.json({
      data: transformedComputer,
    });
  } catch (error) {
    console.error("Error updating computer:", error);
    return NextResponse.json(
      { error: "ไม่สามารถแก้ไขข้อมูลคอมพิวเตอร์ได้" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    // Check if computer exists
    const existingComputer = await prisma.computer.findUnique({
      where: { id },
    });

    if (!existingComputer) {
      return NextResponse.json(
        { error: "ไม่พบคอมพิวเตอร์ที่ต้องการลบ" },
        { status: 404 }
      );
    }

    // Delete computer (cascade will handle related records)
    await prisma.computer.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "ลบคอมพิวเตอร์เรียบร้อยแล้ว",
    });
  } catch (error) {
    console.error("Error deleting computer:", error);
    return NextResponse.json(
      { error: "ไม่สามารถลบคอมพิวเตอร์ได้" },
      { status: 500 }
    );
  }
}
