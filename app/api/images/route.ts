import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import path from "path";
import fs from "fs";

import db from "@/lib/db";
import { ensureUploadDir } from "@/lib/storage";


export async function GET() {
  try {
    const images = db
      .prepare(
        `
        SELECT *
        FROM images
        ORDER BY id DESC
        `
      )
      .all();

    return NextResponse.json(images);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to load images",
      },
      {
        status: 500,
      }
    );
  }
}


export async function POST(
  request: NextRequest
) {
  try {
    const formData =
      await request.formData();

    const file =
      formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          error: "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }


    const uploadDir =
      ensureUploadDir();


    const buffer = Buffer.from(
      await file.arrayBuffer()
    );


    const filename =
      `${Date.now()}.webp`;

    const thumbFilename =
      `${Date.now()}-thumb.webp`;


    const imagePath =
      path.join(
        uploadDir,
        filename
      );


    const thumbPath =
      path.join(
        uploadDir,
        thumbFilename
      );


    await sharp(buffer)
      .webp({
        quality: 85,
      })
      .toFile(imagePath);


    await sharp(buffer)
      .resize(400)
      .webp({
        quality: 80,
      })
      .toFile(thumbPath);


    const result = db
      .prepare(
        `
        INSERT INTO images
        (
          filename,
          url,
          thumbnail
        )
        VALUES (?, ?, ?)
        `
      )
      .run(
        filename,
        `/uploads/${filename}`,
        `/uploads/${thumbFilename}`
      );


    return NextResponse.json({
      id: result.lastInsertRowid,
      filename,
    });


  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}


export async function DELETE(
  request: NextRequest
) {

  try {

    const { searchParams } =
      new URL(request.url);

    const id =
      searchParams.get("id");


    if (!id) {
      return NextResponse.json(
        {
          error: "Missing id",
        },
        {
          status: 400,
        }
      );
    }


    const image =
      db.prepare(
        `
        SELECT *
        FROM images
        WHERE id = ?
        `
      )
      .get(id) as {
        filename: string;
        thumbnail: string;
      };


    if (image) {

      const uploadDir =
        ensureUploadDir();


      const filePath =
        path.join(
          uploadDir,
          image.filename
        );


      const thumbPath =
        path.join(
          process.cwd(),
          "public",
          image.thumbnail
        );


      if (
        fs.existsSync(filePath)
      ) {
        fs.unlinkSync(filePath);
      }


      if (
        fs.existsSync(thumbPath)
      ) {
        fs.unlinkSync(thumbPath);
      }
    }


    db.prepare(
      `
      DELETE FROM images
      WHERE id = ?
      `
    ).run(id);


    return NextResponse.json({
      success: true,
    });


  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "Delete failed",
      },
      {
        status: 500,
      }
    );
  }
}