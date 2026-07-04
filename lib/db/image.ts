import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGE_DIR = path.join(
  process.cwd(),
  "public",
  "uploads",
  "images"
);

const THUMB_DIR = path.join(
  process.cwd(),
  "public",
  "uploads",
  "thumbs"
);

async function ensureDir(dir: string) {
  await fs.mkdir(dir, {
    recursive: true,
  });
}

export async function ensureUploadDirs() {
  await ensureDir(IMAGE_DIR);
  await ensureDir(THUMB_DIR);
}

export function createFilename() {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}.webp`;
}

export async function saveImage(buffer: Buffer) {
  await ensureUploadDirs();

  const filename = createFilename();

  const imagePath = path.join(
    IMAGE_DIR,
    filename
  );

  const thumbPath = path.join(
    THUMB_DIR,
    filename
  );

  const meta = await sharp(buffer).metadata();

  await sharp(buffer)
    .rotate()
    .resize({
      width: 1600,
      height: 1600,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality: 82,
    })
    .toFile(imagePath);

  await sharp(buffer)
    .rotate()
    .resize({
      width: 400,
      height: 400,
      fit: "cover",
    })
    .webp({
      quality: 80,
    })
    .toFile(thumbPath);

  const stat = await fs.stat(imagePath);

  return {
    filename,
    width: meta.width ?? 0,
    height: meta.height ?? 0,
    size: stat.size,
  };
}

export async function deleteImage(filename: string) {
  await fs.rm(
    path.join(IMAGE_DIR, filename),
    {
      force: true,
    }
  );

  await fs.rm(
    path.join(THUMB_DIR, filename),
    {
      force: true,
    }
  );
}