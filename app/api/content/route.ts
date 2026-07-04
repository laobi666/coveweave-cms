import { NextRequest, NextResponse } from "next/server";
import {
  getContents,
  updateContent,
} from "@/lib/content";

export async function GET() {
  try {
    const contents = getContents();

    return NextResponse.json(contents);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to load content" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const { key, title, content } = body;

    if (!key || !title) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    updateContent(
      key,
      title,
      content || ""
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}