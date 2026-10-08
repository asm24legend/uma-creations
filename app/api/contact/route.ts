import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, message, website } = body;

  // Honeypot filled in = bot. Pretend success and do nothing.
  if (website) return NextResponse.json({ ok: true });

  if (!name?.trim() || !message?.trim() || !/^\S+@\S+\.\S+$/.test(email ?? "")) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "Uma Creations <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL!,
    replyTo: email,
    subject: `New message from ${name.slice(0, 100)}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message.slice(0, 2000)}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Could not send" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}