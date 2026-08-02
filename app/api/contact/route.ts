import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/content";

const MAX_LEN = { name: 120, email: 200, message: 5000 } as const;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * In-memory sliding-window limiter, keyed by client IP. Resets on cold
 * start and isn't shared across instances/regions — a real limitation on
 * serverless, but this route runs on a single low-traffic Node process for
 * now, and this is meaningfully better than no limiting at all. Revisit
 * with a shared store (Upstash/Redis) if traffic or deployment topology
 * changes.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

/** Strips newlines (blocks header-injection-style abuse of the subject
 * line) and hard-caps length so no field can be used to send an
 * arbitrarily large payload through the mail API. */
function clean(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, maxLen);
}

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  needs?: unknown;
  /** Honeypot — real visitors never see this field (ContactForm.tsx keeps
   * it visually hidden and out of tab order). Any real value here means a
   * bot filled every field it could find. */
  company?: unknown;
};

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests — try again in a minute." },
      { status: 429 }
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof body.company === "string" && body.company.trim() !== "") {
    // Honeypot tripped — report success so the bot doesn't learn to skip
    // this field, but never actually send anything.
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, MAX_LEN.name);
  const email = clean(body.email, MAX_LEN.email);
  const message = clean(body.message, MAX_LEN.message);
  const needs = Array.isArray(body.needs)
    ? body.needs.filter((n): n is string => typeof n === "string").slice(0, 10)
    : [];

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Let us know who this is from.";
  if (!email || !EMAIL_PATTERN.test(email)) errors.email = "That email doesn’t look complete.";
  if (!message) errors.message = "Tell us what you’re trying to move.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact form cannot send mail.");
    return NextResponse.json(
      { error: "The contact form isn’t fully configured yet — please email or WhatsApp us directly." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const fromAddress = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  try {
    const { error } = await resend.emails.send({
      from: `AdPro 360 website <${fromAddress}>`,
      to: site.email,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        needs.length > 0 ? `Needs: ${needs.join(", ")}` : null,
        "",
        message,
      ]
        .filter((line): line is string => line !== null)
        .join("\n"),
    });

    if (error) {
      console.error("Resend rejected the send", error);
      return NextResponse.json(
        { error: "Something went wrong sending your message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form send failed", error);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 502 }
    );
  }
}
