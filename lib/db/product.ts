import db from "./index";

export type Product = {
  id: number;
  name: string;
  description: string | null;
  image_id: number | null;
  filename?: string | null;
  sort_order: number;
  visible: number;
  created_at: string;
};

export function listProducts(): Product[] {
  return db
    .prepare(
      `
      SELECT
        products.id,
        products.name,
        products.description,
        products.image_id,
        images.filename,
        products.sort_order,
        products.visible,
        products.created_at
      FROM products
      LEFT JOIN images
      ON products.image_id = images.id
      ORDER BY 
        products.sort_order ASC,
        products.id DESC
      `
    )
    .all() as Product[];
}

export function getProduct(id: number) {
  return db
    .prepare(
      `
      SELECT
        products.id,
        products.name,
        products.description,
        products.image_id,
        images.filename,
        products.sort_order,
        products.visible,
        products.created_at
      FROM products
      LEFT JOIN images
      ON products.image_id = images.id
      WHERE products.id=?
      `
    )
    .get(id) as Product | undefined;
}

export function createProduct(data: {
  name: string;
  description: string;
  image_id: number | null;
  sort_order: number;
  visible: number;
}) {
  return db
    .prepare(
      `
      INSERT INTO products
      (
        name,
        description,
        image_id,
        sort_order,
        visible
      )
      VALUES
      (
        ?,
        ?,
        ?,
        ?,
        ?
      )
      `
    )
    .run(
      data.name,
      data.description,
      data.image_id,
      data.sort_order,
      data.visible
    );
}

export function updateProduct(
  id: number,
  data: {
    name: string;
    description: string;
    image_id: number | null;
    sort_order: number;
    visible: number;
  }
) {
  return db
    .prepare(
      `
      UPDATE products
      SET
        name=?,
        description=?,
        image_id=?,
        sort_order=?,
        visible=?
      WHERE id=?
      `
    )
    .run(
      data.name,
      data.description,
      data.image_id,
      data.sort_order,
      data.visible,
      id
    );
}

export function deleteProduct(id: number) {
  return db
    .prepare(
      `
      DELETE FROM products
      WHERE id=?
      `
    )
    .run(id);
}