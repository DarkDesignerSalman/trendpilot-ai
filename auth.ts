import { NextRequest, NextResponse } from "next/server";

export function requireAdmin(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;
  const supplied = req.headers.get("x-admin-password");
  if (!expected || !supplied || supplied !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
