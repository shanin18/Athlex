import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ status: "ok", service: "athllo", time: new Date().toISOString() });
}
