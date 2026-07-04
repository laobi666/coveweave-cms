import Image from "next/image";
import Link from "next/link";
import { listProducts } from "@/lib/db/product";

export default function ProductsPage() {
  const products = listProducts().filter(
    (product) => product.visible === 1
  );

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold">
          Products
        </h1>

        <p className="mt-4 max-w-2xl text-gray-600">
          Explore our custom textile and garment manufacturing capabilities.
          We support brands with flexible MOQ, sampling and production.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl border p-10 text-center text-gray-500">
          Products will be updated soon.
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="overflow-hidden rounded-xl border bg-white transition hover:shadow-md"
            >
              <div className="relative aspect-[4/3] bg-gray-100">
                {product.filename && (
                  <Image
                    src={`/uploads/${product.filename}`}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="p-5">
                <h2 className="font-semibold">
                  {product.name}
                </h2>

                {product.description && (
                  <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                    {product.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}