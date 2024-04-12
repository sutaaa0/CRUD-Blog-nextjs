import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await db.post.findMany();
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json( { message: "coudl not fetch posts", status: 500 });
  }
}
