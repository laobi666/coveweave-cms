"use client";

import { useState } from "react";

export type ImageItem = {
  id: number;
  filename: string;
  width: number;
  height: number;
  size: number;
  created_at: string;
};

type Props = {
  images: ImageItem[];
  onDeleted?: (id: number) => void;
};

export default function ImageGrid({
  images,
  onDeleted,
}: Props) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function handleDelete(id: number) {
    if (!confirm("Delete this image?")) return;

    setDeletingId(id);

    try {
      const res = await fetch(`/api/images?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Delete failed");
        return;
      }

      onDeleted?.(id);
    } finally {
      setDeletingId(null);
    }
  }

  async function copyUrl(filename: string) {
    const url = `${window.location.origin}/uploads/images/${filename}`;

    await navigator.clipboard.writeText(url);

    alert("Image URL copied.");
  }

  if (images.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-12 text-center text-gray-500">
        No images uploaded.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {images.map((image) => (
        <div
          key={image.id}
          className="overflow-hidden rounded-xl border bg-white shadow-sm"
        >
          <a
            href={`/uploads/images/${image.filename}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={`/uploads/thumbs/${image.filename}`}
              alt=""
              className="aspect-square w-full object-cover transition hover:scale-105"
            />
          </a>

          <div className="space-y-2 p-4 text-sm">
            <div className="truncate font-medium">
              {image.filename}
            </div>

            <div className="text-gray-500">
              {image.width} × {image.height}
            </div>

            <div className="text-gray-500">
              {(image.size / 1024).toFixed(1)} KB
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                onClick={() => copyUrl(image.filename)}
              >
                Copy URL
              </button>

              <button
                className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                disabled={deletingId === image.id}
                onClick={() => handleDelete(image.id)}
              >
                {deletingId === image.id
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}