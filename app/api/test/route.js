import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("✅ Test API hit");
  return NextResponse.json({ message: "This works!" });
}
