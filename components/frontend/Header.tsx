export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="text-xl font-bold">CoveWeave</div>

        <nav className="flex gap-6 text-sm">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/capabilities">Capabilities</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
