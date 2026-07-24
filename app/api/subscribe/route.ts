import { NextRequest, NextResponse } from "next/server";
import { hasRecentSubmission, recordSubmission } from "@/lib/submissionThrottle";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
const CONVERTKIT_TIMEOUT_MS = 10000;

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

  if (hasRecentSubmission(email, DUPLICATE_WINDOW_MS)) {
    return NextResponse.json(
      { error: "That email already signed up recently — check your inbox." },
      { status: 409 }
    );
  }

  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;

  if (!apiKey || !formId) {
    console.error(
      "Missing CONVERTKIT_API_KEY or CONVERTKIT_FORM_ID environment variable."
    );
    return NextResponse.json(
      { error: "Signup isn't available right now. Please try again later." },
      { status: 500 }
    );
  }

  let ckResponse: Response;
  try {
    ckResponse = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKey,
          email,
          first_name: name || undefined,
        }),
        signal: AbortSignal.timeout(CONVERTKIT_TIMEOUT_MS),
      }
    );
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "TimeoutError";
    console.error("ConvertKit request failed:", err);
    return NextResponse.json(
      {
        error: timedOut
          ? "That's taking too long. Please try again."
          : "Something went wrong. Please try again.",
      },
      { status: 502 }
    );
  }

  let data: unknown;
  try {
    data = await ckResponse.json();
  } catch {
    data = null;
  }

  const subscriptionId = (data as { subscription?: { id?: number } } | null)
    ?.subscription?.id;

  if (!ckResponse.ok || !subscriptionId) {
    console.error("ConvertKit subscribe failed:", ckResponse.status, data);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 502 }
    );
  }

  recordSubmission(email);

  return NextResponse.json({ success: true });
}
