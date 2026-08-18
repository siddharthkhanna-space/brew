const steps = [
  {
    number: "01",
    title: "Pick your beans",
    description:
      "Single-origin or house blend — choose beans roasted within the last two weeks.",
  },
  {
    number: "02",
    title: "Grind fresh",
    description:
      "We grind to order, dialed in for your brew method, right before it ships.",
  },
  {
    number: "03",
    title: "Brew & enjoy",
    description:
      "Follow our simple guide, or wing it. Either way, it's a good cup.",
  },
];

export default function Home() {
  return (
    <main>
      <header className="nav">
        <div className="nav-inner">
          <span className="brand">
            <span className="brand-mark">☕</span> Brew My Coffee
          </span>
          <a className="nav-link" href="#how-it-works">
            How it works
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow">Small-batch &middot; Fresh roasted</p>
          <h1>Brew My Coffee</h1>
          <p className="hero-subtitle">
            Coffee brewed with intention — sourced, roasted, and shipped so
            it's always at its best in your cup.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#how-it-works">
              Start brewing
            </a>
            <a className="button button-secondary" href="#how-it-works">
              See how it works
            </a>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="steps">
        <h2>How it works</h2>
        <div className="steps-grid">
          {steps.map((step) => (
            <div className="step-card" key={step.number}>
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Brew My Coffee. All rights reserved.</p>
      </footer>
    </main>
  );
}
