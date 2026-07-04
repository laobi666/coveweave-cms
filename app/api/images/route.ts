import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { saveImage, deleteImage } from "@/lib/image";

export async function GET() {
  const images = db.prepare(`
    SELECT *
    FROM images
    ORDER BY id DESC
  `).all();

  return NextResponse.json(images);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "No file" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(
    await file.arrayBuffer()
  );

  const image = await saveImage(buffer);

  const result = db.prepare(`
    INSERT INTO images
    (
      filename,
      width,
      height,
      size
    )
    VALUES
    (
      ?,
      ?,
      ?,
      ?
    )
  `).run(
    image.filename,
    image.width,
    image.height,
    image.size
  );

  return NextResponse.json({
    success: true,
    id: result.lastInsertRowid,
    image,
  });
}

export async function DELETE(request: NextRequest) {
  const id = Number(
    new URL(request.url).searchParams.get("id")
  );

  const image = db.prepare(`
    SELECT *
    FROM images
    WHERE id=?
  `).get(id) as
    | { filename: string }
    | undefined;

  if (!image) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  await deleteImage(image.filename);

  db.prepare(`
    DELETE FROM images
    WHERE id=?
  `).run(id);

  return NextResponse.json({
    success: true,
  });
}