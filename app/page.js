import { Caveat } from "next/font/google";
import StickyTitle from "./StickyTitle";
import StartBrewing from "./StartBrewing";

const caveat = Caveat({ subsets: ["latin"], weight: ["700"] });

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

const lessons = [
  {
    stage: "The grind",
    lesson: "Growth needs friction.",
    description:
      "A whole bean keeps its character locked inside. It's only after it's broken down that it can actually share what it's made of.",
  },
  {
    stage: "The bloom",
    lesson: "Give new things room to breathe.",
    description:
      "Before real extraction begins, fresh grounds swell and let trapped gas escape. Skip this pause and everything after it tastes rushed.",
  },
  {
    stage: "The temperature",
    lesson: "Fit matters more than intensity.",
    description:
      "Water too hot scorches the grounds. Water too cool never opens them up. The right result isn't about turning up the heat — it's about matching it.",
  },
  {
    stage: "The steep",
    lesson: "Good things resist shortcuts.",
    description:
      "A few extra unhurried minutes separate a thin cup from a rich one. Patience, here, isn't a virtue — it's a technique.",
  },
  {
    stage: "The first sip",
    lesson: "Attention turns routine into ritual.",
    description:
      "The same cup gulped on the way out the door and the one savored in silence are identical. What changes is whether you actually showed up for it.",
  },
];

export default function Home() {
  return (
    <main>
      <StickyTitle className={caveat.className} />

      <section id="top" className="hero">
        <div className="hero-inner">
          <p className="eyebrow">Small-batch &middot; Fresh roasted</p>
          <h1 className={`hero-title ${caveat.className}`}>brew my coffee</h1>
          <p className="hero-subtitle">
            Coffee brewed with intention — sourced, roasted, and shipped so
            it's always at its best in your cup.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#start">
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

      <section id="lessons" className="lessons">
        <p className="eyebrow eyebrow-dark">Brewed wisdom</p>
        <h2>Life lessons, one stage at a time</h2>
        <p className="lessons-intro">
          Every cup goes through the same five stages. So do most things
          worth doing.
        </p>
        <div className="lessons-list">
          {lessons.map((item, index) => (
            <div className="lesson-row" key={item.stage}>
              <span className="lesson-index">{`0${index + 1}`}</span>
              <div className="lesson-copy">
                <p className="lesson-stage">{item.stage}</p>
                <h3 className={caveat.className}>{item.lesson}</h3>
                <p className="lesson-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <StartBrewing className={caveat.className} />

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Brew My Coffee. All rights reserved.</p>
      </footer>
    </main>
  );
}
