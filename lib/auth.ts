import { cookies } from "next/headers";

const COOKIE_NAME = "coveweave_admin";

export async function isLogin() {
  const cookieStore = await cookies();

  return (
    cookieStore.get(COOKIE_NAME)?.value ===
    process.env.ADMIN_SECRET
  );
}

export async function login(password: string) {
  if (password !== process.env.ADMIN_PASSWORD) {
    return false;
  }

  const cookieStore = await cookies();

  cookieStore.set(
    COOKIE_NAME,
    process.env.ADMIN_SECRET || "",
    {
      httpOnly: true,
      sameSite: "strict",
      secure:
        process.env.NODE_ENV === "production",
      path: "/",
    }
  );

  return true;
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAME);
}