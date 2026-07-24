import { NextRequest, NextResponse } from "next/server";
import { addLead, findRecentLeadByEmail } from "@/lib/leads";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

export async function POST(request: NextRequest) {
  let body: { name?: string; email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  if (findRecentLeadByEmail(email, DUPLICATE_WINDOW_MS)) {
    return NextResponse.json(
      { error: "That email already signed up recently — check your inbox." },
      { status: 409 }
    );
  }

  addLead({ name, email, submittedAt: new Date().toISOString() });

  return NextResponse.json({ success: true });
}
