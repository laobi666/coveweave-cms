import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-60 min-h-screen border-r bg-white p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold">
          CoveWeave CMS
        </h2>

        <p className="text-sm text-gray-500">
          Admin Panel
        </p>
      </div>

      <nav className="space-y-3">

        <Link
          href="/dashboard"
          className="block hover:underline"
        >
          Dashboard
        </Link>

        <Link
          href="/dashboard/products"
          className="block hover:underline"
        >
          Products
        </Link>

        <Link
          href="/dashboard/images"
          className="block hover:underline"
        >
          Images
        </Link>

        <Link
          href="/dashboard/content"
          className="block hover:underline"
        >
          Content
        </Link>

      </nav>
    </aside>
  );
}
