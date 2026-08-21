"use client";

import { useState } from "react";

export default function StartBrewing({ className }) {
  const [submitted, setSubmitted] = useState(false);

  // NOTE: no backend yet — this only confirms locally.
  // Wire handleSubmit to a real endpoint before launch.
  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
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

        {submitted ? (
          <p className="start-confirm" role="status">
            Thanks — we'll be in touch when the next roast lands.
          </p>
        ) : (
          <form className="start-form" onSubmit={handleSubmit}>
            <label className="visually-hidden" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              autoComplete="email"
            />
            <button className="button button-primary" type="submit">
              Get started
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
