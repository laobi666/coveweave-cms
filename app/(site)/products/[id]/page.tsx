import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/db/product";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const product = getProduct(Number(id));

  if (!product || product.visible !== 1) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <Link
        href="/products"
        className="text-sm text-gray-500"
      >
        ← Back to Products
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
          {product.filename && (
            <Image
              src={`/uploads/${product.filename}`}
              alt={product.name}
              fill
              className="object-cover"
            />
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          {product.description && (
            <p className="mt-6 whitespace-pre-line leading-8 text-gray-600">
              {product.description}
            </p>
          )}

          <Link
            href="/contact"
            className="mt-10 inline-block rounded-lg bg-black px-6 py-3 text-sm font-medium text-white"
          >
            Send Inquiry
          </Link>
        </div>
      </div>
    </main>
  );
}