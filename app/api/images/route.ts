import { NextRequest, NextResponse } from "next/server";
import { getImage, deleteImageRecord } from "@/lib/db/image";
import { deleteImage } from "@/lib/image";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  const image = getImage(Number(id));

  if (!image) {
    return NextResponse.json(
      { error: "Not Found" },
      { status: 404 }
    );
  }

  return NextResponse.json(image);
}

export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  const image = getImage(Number(id));

  if (!image) {
    return NextResponse.json(
      { error: "Not Found" },
      { status: 404 }
    );
  }

  await deleteImage(image.filename);

  deleteImageRecord(Number(id));

  return NextResponse.json({
    success: true,
  });
}