import db from "./index";

export type ImageRecord = {
  id: number;
  filename: string;
  width: number;
  height: number;
  size: number;
  created_at: string;
};

export function listImages(): ImageRecord[] {
  return db
    .prepare(
      `
      SELECT
        id,
        filename,
        width,
        height,
        size,
        created_at
      FROM images
      ORDER BY id DESC
      `
    )
    .all() as ImageRecord[];
}

export function getImage(id: number) {
  return db
    .prepare(
      `
      SELECT *
      FROM images
      WHERE id=?
      `
    )
    .get(id) as ImageRecord | undefined;
}

export function createImage(
  filename: string,
  width: number,
  height: number,
  size: number
) {
  return db
    .prepare(
      `
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
      `
    )
    .run(filename, width, height, size);
}

export function deleteImageRecord(id: number) {
  return db
    .prepare(
      `
      DELETE FROM images
      WHERE id=?
      `
    )
    .run(id);
}