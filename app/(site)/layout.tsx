import type { ReactNode } from "react";
import Header from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";

export default function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
    </>
  );
}