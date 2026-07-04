import Link from "next/link";

const cards = [
  {
    title: "Images",
    description: "Upload and manage website images.",
    href: "/dashboard/images",
  },
  {
    title: "Products",
    description: "Manage product information.",
    href: "/dashboard/products",
  },
  {
    title: "Pages",
    description: "Edit website pages.",
    href: "/dashboard/pages",
  },
  {
    title: "Settings",
    description: "Website settings.",
    href: "/dashboard/settings",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p className="mt-2 text-gray-500">
        Welcome to CoveWeave CMS.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="text-xl font-semibold">
              {card.title}
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              {card.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}