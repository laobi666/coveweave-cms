import db from "@/lib/db";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

type Product = {
  id: number;
  name: string;
  description: string | null;
  filename: string | null;
};

export default async function ProductDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const product = db
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
      WHERE products.id=?
      AND products.visible=1
      `
    )
    .get(Number(id)) as Product | undefined;

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2">
      <div>
        {product.filename ? (
          <img
            src={`/uploads/images/${product.filename}`}
            alt={product.name}
            className="rounded-xl border"
          />
        ) : (
          <div className="flex aspect-square items-center justify-center rounded-xl bg-gray-100 text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div>
        <h1 className="text-4xl font-bold">
          {product.name}
        </h1>

        <div className="mt-8 whitespace-pre-line text-gray-600">
          {product.description}
        </div>
      </div>
    </main>
  );
}