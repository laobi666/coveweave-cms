"use client";

import { useEffect, useState } from "react";

type ContentItem = {
  id: number;
  key: string;
  title: string;
  body: string;
};

export default function ContentPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [saving, setSaving] = useState(false);

  async function loadContent() {
    const res = await fetch("/api/content");
    const data = await res.json();

    setItems(data);
  }

  useEffect(() => {
    loadContent();
  }, []);

  async function save(item: ContentItem) {
    setSaving(true);

    await fetch("/api/content", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: item.key,
        title: item.title,
        content: item.body,
      }),
    });

    setSaving(false);

    await loadContent();
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Website Content
        </h1>

        <p className="text-gray-500">
          Edit website text content
        </p>
      </div>

      <div className="space-y-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="rounded border p-4 space-y-3"
          >
            <div className="uppercase text-sm text-gray-400">
              {item.key}
            </div>

            <input
              className="w-full border rounded p-2"
              value={item.title}
              onChange={(e) => {
                const copy = [...items];

                copy[index].title =
                  e.target.value;

                setItems(copy);
              }}
            />

            <textarea
              className="w-full border rounded p-2 min-h-32"
              value={item.body}
              onChange={(e) => {
                const copy = [...items];

                copy[index].body =
                  e.target.value;

                setItems(copy);
              }}
            />

            <button
              onClick={() => save(item)}
              disabled={saving}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}