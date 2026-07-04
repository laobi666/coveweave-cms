import Sidebar from "@/components/dashboard/Sidebar";
import { isLogin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loggedIn = await isLogin();

  if (!loggedIn) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen md:flex">

      <Sidebar />

      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>

    </div>
  );
}