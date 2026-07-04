import { NextRequest, NextResponse } from "next/server";

import {
  getProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/db/product";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: Context
) {
  const { id } = await params;

  const product = getProduct(Number(id));

  if (!product) {
    return NextResponse.json(
      {
        error: "Product not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: Context
) {
  const { id } = await params;

  const body = await request.json();

  updateProduct(Number(id), {
    name: body.name ?? "",
    description: body.description ?? "",
    image_id: body.image_id ?? null,
    sort_order: Number(body.sort_order ?? 0),
    visible: Number(body.visible ?? 1),
  });

  return NextResponse.json({
    success: true,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: Context
) {
  const { id } = await params;

  deleteProduct(Number(id));

  return NextResponse.json({
    success: true,
  });
}