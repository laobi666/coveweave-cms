import { NextRequest, NextResponse } from "next/server";
import {
  listProducts,
  createProduct,
  deleteProduct,
} from "@/lib/db/product";

export async function GET() {
  return NextResponse.json(listProducts());
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.name?.trim()) {
    return NextResponse.json(
      {
        error: "Product name is required",
      },
      {
        status: 400,
      }
    );
  }

  const result = createProduct({
    name: body.name.trim(),
    description: body.description ?? "",
    image_id: body.image_id ?? null,
    sort_order: Number(body.sort_order ?? 0),
    visible: Number(body.visible ?? 1),
  });

  return NextResponse.json({
    success: true,
    id: result.lastInsertRowid,
  });
}

export async function DELETE(request: NextRequest) {
  const id = Number(
    new URL(request.url).searchParams.get("id")
  );

  if (!id) {
    return NextResponse.json(
      {
        error: "Invalid product id",
      },
      {
        status: 400,
      }
    );
  }

  deleteProduct(id);

  return NextResponse.json({
    success: true,
  });
}