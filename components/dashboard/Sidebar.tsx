export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-gray-50 p-6">
      <h2 className="mb-6 text-xl font-bold">CoveWeave CMS</h2>

      <nav className="space-y-3">
        <a className="block" href="/dashboard">
          Dashboard
        </a>

        <a className="block" href="/dashboard/images">
          Images
        </a>

        <a className="block" href="/dashboard/products">
          Products
        </a>

        <a className="block" href="/dashboard/pages">
          Pages
        </a>

        <a className="block" href="/dashboard/settings">
          Settings
        </a>
      </nav>
    </aside>
  );
}