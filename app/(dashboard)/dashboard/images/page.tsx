"use client";

import { useEffect, useState } from "react";
import ImageDropzone from "@/components/dashboard/ImageDropzone";
import ImageGrid, {
  type ImageItem,
} from "@/components/dashboard/ImageGrid";

export default function ImagesPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadImages() {
    setLoading(true);

    try {
      const res = await fetch("/api/images", {
        cache: "no-store",
      });

      const data = await res.json();

      setImages(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadImages();
  }, []);

  function handleUploaded(image: ImageItem) {
    setImages((prev) => [
      image,
      ...prev,
    ]);
  }

  function handleDeleted(id: number) {
    setImages((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Image Management
        </h1>

        <p className="mt-2 text-gray-500">
          Upload, preview and manage website images.
        </p>
      </div>

      <div className="mb-10">
        <ImageDropzone
          onUploaded={handleUploaded}
        />
      </div>

      {loading ? (
        <div className="rounded-lg border bg-white p-12 text-center">
          Loading...
        </div>
      ) : (
        <ImageGrid
          images={images}
          onDeleted={handleDeleted}
        />
      )}
    </main>
  );
}