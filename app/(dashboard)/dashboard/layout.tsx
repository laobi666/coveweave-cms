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
    <div className="flex min-h-screen">

      <Sidebar />

      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
}