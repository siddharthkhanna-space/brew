"use client";

import { useState } from "react";

export default function StartBrewing({ className }) {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

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
          type: "signup",
          email: form.get("email"),
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

  return (
    <section id="start" className="start">
      <div className="start-inner">
        <p className="eyebrow">Your first bag</p>
        <h2 className={className}>start brewing</h2>
        <p className="start-copy">
          One bag, freshly ground to order, every other week. Pause or stop
          whenever the ritual changes.
        </p>

        {status === "sent" ? (
          <p className="start-confirm" role="status">
            Thanks — we'll be in touch when the next roast lands.
          </p>
        ) : (
          <>
            <form className="start-form" onSubmit={handleSubmit}>
              <label className="visually-hidden" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={254}
                placeholder="you@example.com"
                autoComplete="email"
              />

              {/* Honeypot — hidden from people, tempting to bots */}
              <div className="visually-hidden" aria-hidden="true">
                <label htmlFor="start-website">Website</label>
                <input
                  id="start-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <button
                className="button button-primary"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Get started"}
              </button>
            </form>
            {error && (
              <p className="start-error" role="alert">
                {error}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
