import { NextRequest, NextResponse } from "next/server";
import { login } from "@/lib/auth";

export async function POST(
  request: NextRequest
) {
  const body = await request.json();

  const success = await login(
    body.password
  );

  if (!success) {
    return NextResponse.json(
      {
        error: "Invalid password",
      },
      {
        status: 401,
      }
    );
  }

  return NextResponse.json({
    success: true,
  });
}