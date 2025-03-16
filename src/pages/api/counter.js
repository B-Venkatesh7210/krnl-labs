import { NextResponse } from "next/server";

let counter = 0; // This resets on every cold start

export async function GET() {
  return NextResponse.json({ counter });
}
