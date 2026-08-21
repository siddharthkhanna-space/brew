import { Resend } from "resend";

// Where notes and signups are delivered.
const TO_ADDRESS = "siddjan0801@gmail.com";

// Resend's shared sender works without domain verification, but only
// delivers to the address that owns the Resend account. Once
// siddharthkhanna.com is verified, set MAIL_FROM to notes@siddharthkhanna.com.
const FROM_ADDRESS = process.env.MAIL_FROM || "onboarding@resend.dev";

const MAX_NOTE = 2000;
const MAX_NAME = 120;
const MAX_EMAIL = 254;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= MAX_EMAIL;
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { type, name = "", email = "", note = "", website = "" } = payload;

  // Honeypot: real people leave this hidden field empty. Accept silently
  // so bots get no signal that they were caught.
  if (website) {
    return Response.json({ ok: true });
  }

  if (type !== "note" && type !== "signup") {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (email && !isValidEmail(email)) {
    return Response.json(
      { error: "That email address doesn't look right." },
      { status: 400 }
    );
  }

  if (type === "signup" && !email) {
    return Response.json(
      { error: "An email address is required." },
      { status: 400 }
    );
  }

  const trimmedNote = note.trim();
  if (type === "note") {
    if (!trimmedNote) {
      return Response.json({ error: "The note is empty." }, { status: 400 });
    }
    if (trimmedNote.length > MAX_NOTE) {
      return Response.json(
        { error: `Please keep notes under ${MAX_NOTE} characters.` },
        { status: 400 }
      );
    }
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return Response.json(
      { error: "Email is not configured yet." },
      { status: 500 }
    );
  }

  const safeName = escapeHtml(name.trim().slice(0, MAX_NAME)) || "Anonymous";
  const safeEmail = escapeHtml(email.trim());
  const safeNote = escapeHtml(trimmedNote).replace(/\n/g, "<br>");

  const subject =
    type === "note"
      ? `New note from ${safeName}`
      : `New signup: ${safeEmail}`;

  const html =
    type === "note"
      ? `<h2>New note from brew my coffee</h2>
         <p><strong>From:</strong> ${safeName}</p>
         <p><strong>Email:</strong> ${safeEmail || "not provided"}</p>
         <hr>
         <p>${safeNote}</p>`
      : `<h2>New signup from brew my coffee</h2>
         <p><strong>Email:</strong> ${safeEmail}</p>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: `brew my coffee <${FROM_ADDRESS}>`,
      to: TO_ADDRESS,
      subject,
      html,
      ...(email && isValidEmail(email) ? { replyTo: email } : {}),
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { error: "Couldn't send that just now. Please try again." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Unexpected send failure:", err);
    return Response.json(
      { error: "Couldn't send that just now. Please try again." },
      { status: 500 }
    );
  }
}
