"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  filename: string | null;
  visible: number;
  sort_order: number;
};

export default function ProductsPage() {
  const [products, setProducts] =
    useState<Product[]>([]);

  async function load() {
    const res = await fetch(
      "/api/products",
      {
        cache: "no-store",
      }
    );

    setProducts(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function toggle(id: number) {
    await fetch(
      `/api/products/${id}/toggle`,
      {
        method: "PUT",
      }
    );

    load();
  }

  async function remove(id: number) {
    if (!confirm("Delete?")) {
      return;
    }

    await fetch(
      `/api/products?id=${id}`,
      {
        method: "DELETE",
      }
    );

    load();
  }

  return (
    <main className="p-8">
      <div className="mb-8 flex justify-between">
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <Link
          href="/dashboard/products/new"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          New Product
        </Link>
      </div>

      <div className="rounded-xl border bg-white">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-6 border-b p-4"
          >
            {p.filename ? (
              <img
                src={`/uploads/thumbs/${p.filename}`}
                className="h-20 w-20 rounded object-cover"
                alt=""
              />
            ) : (
              <div className="h-20 w-20 rounded bg-gray-100" />
            )}

            <div className="flex-1">
              <div className="font-bold">
                {p.name}
              </div>

              <div className="text-sm text-gray-500">
                Sort: {p.sort_order}
              </div>
            </div>

            <button
              onClick={() => toggle(p.id)}
              className="rounded bg-gray-700 px-3 py-2 text-white"
            >
              {p.visible
                ? "Online"
                : "Hidden"}
            </button>

            <Link
              href={`/dashboard/products/${p.id}`}
              className="rounded bg-blue-600 px-3 py-2 text-white"
            >
              Edit
            </Link>

            <button
              onClick={() => remove(p.id)}
              className="rounded bg-red-600 px-3 py-2 text-white"
            >
              Delete
            </button>
          </div>
        ))}

        {products.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            No products.
          </div>
        )}
      </div>
    </main>
  );
}