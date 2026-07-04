import { getContent } from "@/lib/content";

export default function AboutPage() {
  const about = getContent("about");

  return (
    <main className="max-w-3xl mx-auto py-16">
      <h1 className="text-4xl font-bold mb-6">
        {about?.title}
      </h1>

      <p className="text-gray-600 leading-8">
        {about?.body}
      </p>
    </main>
  );
}