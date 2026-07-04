"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  async function submit() {
    const res = await fetch(
      "/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      }
    );

    if (!res.ok) {
      setError(
        "Wrong password"
      );
      return;
    }

    router.push(
      "/dashboard"
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center">

      <div className="border rounded p-8 w-96 space-y-5">

        <h1 className="text-2xl font-bold">
          CoveWeave CMS Login
        </h1>

        <input
          className="border rounded p-2 w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        <button
          onClick={submit}
          className="bg-black text-white rounded px-4 py-2 w-full"
        >
          Login
        </button>

      </div>

    </main>
  );
}