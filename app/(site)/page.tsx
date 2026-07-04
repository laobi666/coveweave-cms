import Link from "next/link";
import { getContent } from "@/lib/content";

export default function HomePage() {
  const home = getContent("home")?.body;

  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            CoveWeave Textile
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
            Custom Swimwear & Textile Manufacturing Partner
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            {home ||
              "We support growing brands with custom swim shorts, resort wear and textile products. Flexible MOQ, fast sampling and reliable production."}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white"
            >
              View Products
            </Link>

            <Link
              href="/contact"
              className="rounded-lg border px-6 py-3 text-sm font-medium"
            >
              Send Inquiry
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t bg-gray-50">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
          <div>
            <h3 className="font-semibold">Custom Development</h3>
            <p className="mt-2 text-sm text-gray-600">
              Prints, fabrics, trims and packaging according to your brand.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Flexible MOQ</h3>
            <p className="mt-2 text-sm text-gray-600">
              Supporting small and medium brands from sampling to production.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Reliable Supply</h3>
            <p className="mt-2 text-sm text-gray-600">
              Long term manufacturing experience for international customers.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}