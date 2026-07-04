import { getContent } from "@/lib/content";
import Link from "next/link";

export default function HomePage() {
  const home = getContent("home");
  const company = getContent("company");

  return (
    <main className="space-y-16">

      <section className="py-20 text-center space-y-6">

        <h1 className="text-5xl font-bold">
          {home?.title}
        </h1>

        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          {home?.body}
        </p>

        <Link
          href="/products"
          className="inline-block bg-black text-white px-6 py-3 rounded"
        >
          View Products
        </Link>

      </section>


      <section className="border-t py-12 text-center">

        <h2 className="text-2xl font-semibold">
          {company?.title}
        </h2>

        <p className="mt-4 text-gray-600">
          {company?.body}
        </p>

      </section>

    </main>
  );
}
