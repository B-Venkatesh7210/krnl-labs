import { NextResponse } from "next/server";
import counter from "./counter"; // Importing the counter (resets on cold starts)

export async function POST() {
  counter.value += 1;
  return NextResponse.json({ counter: counter.value });
}
