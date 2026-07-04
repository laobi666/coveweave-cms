"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import ImagePicker from "@/components/dashboard/ImagePicker";

type Props = {
  id?: number;
  defaultValues?: {
    name: string;
    description: string;
    image_id: number | null;
    sort_order: number;
    visible: number;
  };
};

export default function ProductForm({
  id,
  defaultValues,
}: Props) {
  const router = useRouter();

  const [name, setName] = useState(
    defaultValues?.name ?? ""
  );

  const [description, setDescription] = useState(
    defaultValues?.description ?? ""
  );

  const [imageId, setImageId] = useState<number | null>(
    defaultValues?.image_id ?? null
  );

  const [sortOrder, setSortOrder] = useState(
    defaultValues?.sort_order ?? 0
  );

  const [visible, setVisible] = useState(
    (defaultValues?.visible ?? 1) === 1
  );

  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();

    setSaving(true);

    const body = {
      name,
      description,
      image_id: imageId,
      sort_order: sortOrder,
      visible: visible ? 1 : 0,
    };

    const url = id
      ? `/api/products/${id}`
      : "/api/products";

    const method = id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    setSaving(false);

    if (!res.ok) {
      alert("Save failed.");
      return;
    }

    router.push("/dashboard/products");
    router.refresh();
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-8 rounded-xl border bg-white p-8"
    >
      <div>
        <label className="mb-2 block font-medium">
          Product Name
        </label>

        <input
          className="w-full rounded border p-3"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          rows={6}
          className="w-full rounded border p-3"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />
      </div>

      <div>
        <label className="mb-3 block font-medium">
          Product Image
        </label>

        <ImagePicker
          value={imageId}
          onChange={setImageId}
        />

        {imageId && (
          <p className="mt-3 text-sm text-green-600">
            Selected Image ID: {imageId}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Sort Order
        </label>

        <input
          type="number"
          className="w-full rounded border p-3"
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(Number(e.target.value))
          }
        />
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={visible}
          onChange={(e) =>
            setVisible(e.target.checked)
          }
        />

        Visible
      </label>

      <button
        type="submit"
        disabled={saving}
        className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
}