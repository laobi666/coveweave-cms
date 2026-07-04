import { getContent } from "@/lib/content";

export default function ContactPage() {
  const contact = getContent("contact");

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <section className="rounded-2xl bg-gray-50 p-10">
        <h1 className="text-4xl font-bold">
          {contact?.title || "Contact Us"}
        </h1>

        <p className="mt-6 max-w-2xl leading-8 text-gray-600">
          {contact?.body ||
            "Tell us about your next collection. We will support you from fabric development, sampling to bulk production."}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6">
            <h2 className="font-semibold">
              Product Inquiry
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Send us your designs, reference samples or ideas.
              We support custom swim shorts, apparel and textile products.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6">
            <h2 className="font-semibold">
              Cooperation
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Flexible MOQ, fast sampling and reliable production
              for growing international brands.
            </p>
          </div>
        </div>

        <a
          href="mailto:info@example.com"
          className="mt-10 inline-block rounded-lg bg-black px-8 py-3 text-sm font-medium text-white"
        >
          Send Inquiry
        </a>
      </section>
    </main>
  );
}