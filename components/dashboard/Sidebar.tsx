import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="border-b bg-white p-4 md:min-h-screen md:w-60 md:border-b-0 md:border-r md:p-6">
      <div className="mb-4 md:mb-8">
        <h2 className="text-lg font-bold md:text-xl">
          CoveWeave CMS
        </h2>

        <p className="text-sm text-gray-500">
          Admin Panel
        </p>
      </div>

      <nav className="flex gap-4 overflow-x-auto text-sm md:block md:space-y-3">

        <Link
          href="/dashboard"
          className="block whitespace-nowrap hover:underline"
        >
          Dashboard
        </Link>

        <Link
          href="/dashboard/products"
          className="block whitespace-nowrap hover:underline"
        >
          Products
        </Link>

        <Link
          href="/dashboard/images"
          className="block whitespace-nowrap hover:underline"
        >
          Images
        </Link>

        <Link
          href="/dashboard/content"
          className="block whitespace-nowrap hover:underline"
        >
          Content
        </Link>

      </nav>
    </aside>
  );
}