export default function Hero() {
  return (
    <section className="bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <h1 className="text-5xl font-bold">
          Premium Swim Shorts Manufacturing
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-600">
          OEM & ODM manufacturer specializing in men's swim shorts,
          beachwear and woven apparel.
        </p>

        <div className="mt-10 flex gap-4">
          <a
            href="/products"
            className="rounded bg-blue-600 px-6 py-3 text-white"
          >
            View Products
          </a>

          <a
            href="/contact"
            className="rounded border px-6 py-3"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
