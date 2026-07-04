import db from "@/lib/db";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  description: string | null;
  filename: string | null;
};

export default function ProductsPage() {
  const products = db
    .prepare(
      `
      SELECT
        products.id,
        products.name,
        products.description,
        images.filename
      FROM products
      LEFT JOIN images
      ON products.image_id = images.id
      WHERE products.visible = 1
      ORDER BY products.sort_order ASC,
               products.id DESC
      `
    )
    .all() as Product[];

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold">
          Products
        </h1>

        <p className="mt-4 text-gray-500">
          Explore our product collection.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="rounded border p-12 text-center text-gray-500">
          No products.
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group overflow-hidden rounded-xl border bg-white"
            >
              {product.filename ? (
                <img
                  src={`/uploads/thumbs/${product.filename}`}
                  alt={product.name}
                  className="aspect-square w-full object-cover transition group-hover:scale-105"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center bg-gray-100 text-gray-400">
                  No Image
                </div>
              )}

              <div className="p-5">
                <h2 className="text-xl font-semibold">
                  {product.name}
                </h2>

                <p className="mt-2 line-clamp-2 text-gray-500">
                  {product.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}