import ProductForm from "@/components/dashboard/ProductForm";

export default function NewProductPage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        New Product
      </h1>

      <ProductForm />
    </main>
  );
}