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

    return NextResponse.json({
      data: computers,
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
