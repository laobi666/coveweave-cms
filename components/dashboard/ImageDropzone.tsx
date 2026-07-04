"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type ImageItem = {
  id: number;
  filename: string;
  width: number;
  height: number;
  size: number;
  created_at: string;
};

type Props = {
  onUploaded?: (image: ImageItem) => void;
};

export default function ImageDropzone({ onUploaded }: Props) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      setUploading(true);

      try {
        for (const file of acceptedFiles) {
          const form = new FormData();
          form.append("file", file);

          const res = await fetch("/api/images", {
            method: "POST",
            body: form,
          });

          const data = await res.json();

          if (!res.ok) {
            alert(data.error ?? "Upload failed");
            continue;
          }

          if (onUploaded) {
            onUploaded({
              id: Number(data.id),
              filename: data.image.filename,
              width: data.image.width,
              height: data.image.height,
              size: data.image.size,
              created_at: new Date().toISOString(),
            });
          }
        }
      } finally {
        setUploading(false);
      }
    },
    [onUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-10 text-center transition hover:border-blue-500 hover:bg-blue-50 cursor-pointer"
    >
      <input {...getInputProps()} />

      {uploading ? (
        <p className="text-gray-500">Uploading...</p>
      ) : isDragActive ? (
        <p className="text-blue-600 font-medium">
          Release to upload images
        </p>
      ) : (
        <>
          <p className="text-lg font-semibold">
            Drag images here
          </p>

          <p className="mt-2 text-sm text-gray-500">
            or click to choose files
          </p>

          <p className="mt-4 text-xs text-gray-400">
            Images will be converted to WEBP automatically.
          </p>
        </>
      )}
    </div>
  );
}