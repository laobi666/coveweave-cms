import { getContent } from "@/lib/content";

export default function ContactPage() {
  const contact = getContent("contact");

  return (
    <main className="max-w-3xl mx-auto py-16">
      <h1 className="text-4xl font-bold mb-6">
        {contact?.title}
      </h1>

      <p className="text-gray-600 leading-8">
        {contact?.body}
      </p>
    </main>
  );
}