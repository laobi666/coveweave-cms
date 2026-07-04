"use client";

import { useEffect, useState } from "react";

export type ImageItem = {
  id: number;
  filename: string;
};

type Props = {
  value: number | null;
  onChange: (id: number | null) => void;
};

export default function ImagePicker({
  value,
  onChange,
}: Props) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/images", {
        cache: "no-store",
      });

      const data = await res.json();

      setImages(data);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="rounded border p-4">
        Loading images...
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="rounded border p-4 text-gray-500">
        No uploaded images.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
      {images.map((image) => (
        <button
          key={image.id}
          type="button"
          onClick={() => onChange(image.id)}
          className={`overflow-hidden rounded-lg border transition ${
            value === image.id
              ? "border-blue-600 ring-2 ring-blue-300"
              : "border-gray-200 hover:border-blue-500"
          }`}
        >
          <img
            src={`/uploads/thumbs/${image.filename}`}
            alt=""
            className="aspect-square w-full object-cover"
          />

          <div className="truncate border-t p-2 text-xs">
            {image.filename}
          </div>
        </button>
      ))}
    </div>
  );
}