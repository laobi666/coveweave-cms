import Link from "next/link";

type Props = {
  id: number;
  name: string;
  filename: string | null;
  visible: number;
};

export default function ProductCard({
  id,
  name,
  filename,
  visible,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      {filename ? (
        <img
          src={`/uploads/thumbs/${filename}`}
          alt={name}
          className="aspect-square w-full object-cover"
        />
      ) : (
        <div className="flex aspect-square items-center justify-center bg-gray-100 text-gray-400">
          No Image
        </div>
      )}

      <div className="space-y-3 p-4">
        <div className="font-semibold">
          {name}
        </div>

        <div
          className={
            visible
              ? "text-green-600"
              : "text-gray-400"
          }
        >
          {visible ? "Online" : "Hidden"}
        </div>

        <Link
          href={`/dashboard/products/${id}`}
          className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}