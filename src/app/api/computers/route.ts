import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const condition = searchParams.get("condition") || "";

    const skip = (page - 1) * limit;

    // สร้างเงื่อนไขสำหรับการค้นหา
    const where: {
      OR?: Array<Record<string, { contains: string }>>;
      condition?: string;
    } = {};

    if (search) {
      where.OR = [
        { code: { contains: search } },
        { name: { contains: search } },
        { brand: { contains: search } },
        { model: { contains: search } },
        { owner: { contains: search } },
        { location: { contains: search } },
      ];
    }

    if (condition) {
      where.condition = condition;
    }

    // ดึงข้อมูลพร้อมความสัมพันธ์
    const [computers, total] = await Promise.all([
      prisma.computer.findMany({
        where,
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
        orderBy: {
          updatedAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.computer.count({ where }),
    ]);

    // Transform ข้อมูลให้ตรงกับ Type definition
    const transformedComputers = computers.map((computer) => ({
      ...computer,
      tags: computer.tags.map((tagRelation) => tagRelation.tag), // Flatten tags
    }));

    return NextResponse.json({
      data: transformedComputers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching computers:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
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

    // Check if code already exists
    const existingComputer = await prisma.computer.findUnique({
      where: { code },
    });

    if (existingComputer) {
      return NextResponse.json(
        { error: "รหัสคอมพิวเตอร์นี้มีอยู่แล้ว" },
        { status: 400 }
      );
    }

    // Create computer with transaction to handle relationships
    const result = await prisma.$transaction(async (tx) => {
      // Create computer
      const computer = await tx.computer.create({
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

      // Handle tags
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
              computerId: computer.id,
              tagId: tag.id,
            },
          });
        });

        await Promise.all(tagPromises.filter(Boolean));
      }

      // Handle images
      if (images && images.length > 0) {
        const imagePromises = images.map((image: any, index: number) => {
          return tx.computerImage.create({
            data: {
              computerId: computer.id,
              url: image.url,
              isPrimary: image.isPrimary || index === 0,
            },
          });
        });

        await Promise.all(imagePromises);
      }

      return computer;
    });

    // Fetch complete computer data with relationships
    const createdComputer = await prisma.computer.findUnique({
      where: { id: result.id },
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
      ...createdComputer!,
      tags: createdComputer!.tags.map((tagRelation) => tagRelation.tag),
    };

    return NextResponse.json({
      data: transformedComputer,
    });
  } catch (error) {
    console.error("Error creating computer:", error);
    return NextResponse.json(
      { error: "ไม่สามารถสร้างคอมพิวเตอร์ได้" },
      { status: 500 }
    );
  }
}
