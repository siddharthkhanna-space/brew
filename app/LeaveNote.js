"use client";

import { useState } from "react";

const MAX_NOTE = 2000;

export default function LeaveNote({ className }) {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = new FormData(event.target);

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "note",
          name: form.get("name"),
          email: form.get("email"),
          note: form.get("note"),
          website: form.get("website"), // honeypot
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setError("Couldn't reach the server. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <section id="note" className="note">
        <div className="note-inner">
          <p className="eyebrow">Leave a note</p>
          <h2 className={className}>note received</h2>
          <p className="note-confirm" role="status">
            Thanks for writing — it landed safely.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="note" className="note">
      <div className="note-inner">
        <p className="eyebrow">Leave a note</p>
        <h2 className={className}>say something</h2>
        <p className="note-copy">
          A thought on the coffee, a lesson we missed, or just how your cup
          turned out this morning.
        </p>

        <form className="note-form" onSubmit={handleSubmit}>
          <div className="note-fields">
            <div className="note-field">
              <label htmlFor="note-name">Name</label>
              <input
                id="note-name"
                name="name"
                type="text"
                maxLength={120}
                placeholder="Optional"
                autoComplete="name"
              />
            </div>
            <div className="note-field">
              <label htmlFor="note-email">Email</label>
              <input
                id="note-email"
                name="email"
                type="email"
                maxLength={254}
                placeholder="Optional, if you'd like a reply"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="note-field">
            <label htmlFor="note-body">Your note</label>
            <textarea
              id="note-body"
              name="note"
              required
              rows={5}
              maxLength={MAX_NOTE}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="However the morning went…"
            />
            <span className="note-count">
              {note.length} / {MAX_NOTE}
            </span>
          </div>

          {/* Honeypot — hidden from people, tempting to bots */}
          <div className="visually-hidden" aria-hidden="true">
            <label htmlFor="note-website">Website</label>
            <input
              id="note-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {error && (
            <p className="note-error" role="alert">
              {error}
            </p>
          )}

          <button
            className="button button-primary"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send note"}
          </button>
        </form>
      </div>
    </section>
  );
}
