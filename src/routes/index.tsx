import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CursorRing } from "@/components/CursorRing";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LinkedIn Buddy AI — Your AI Co-pilot for LinkedIn" },
      {
        name: "description",
        content:
          "Write posts that land, engage with intent, and grow on LinkedIn — with an AI co-pilot built for ambitious operators.",
      },
      { property: "og:title", content: "LinkedIn Buddy AI" },
      {
        property: "og:description",
        content: "Your AI co-pilot for LinkedIn growth.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  useScrollReveal();
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <CursorRing />
      <div className="grain-overlay" aria-hidden />
      <AmbientGlow />
      <Hud />
      <main>
        <Hero />
        <SocialProof />
        <Process />
        <Product />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}

function AmbientGlow() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-50 blur-[140px]"
        style={{ background: "radial-gradient(circle, #7b70d855 0%, transparent 70%)" }} />
      <div className="absolute top-1/3 -left-40 h-[420px] w-[420px] rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, #4eccc444 0%, transparent 70%)" }} />
      <div className="absolute top-2/3 -right-32 h-[460px] w-[460px] rounded-full opacity-40 blur-[130px]"
        style={{ background: "radial-gradient(circle, #ffb35c33 0%, transparent 70%)" }} />
    </div>
  );
}

function Hud() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="glass-strong mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-amber text-[oklch(0.18_0.03_60)] font-display text-sm font-bold">
            Lb
          </span>
          <span className="font-display text-base font-semibold tracking-tight">
            LinkedIn Buddy<span className="text-teal">.</span>AI
          </span>
        </a>
        <ul className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70 md:flex">
          <li><a href="#process" className="hover:text-foreground">/ process</a></li>
          <li><a href="#product" className="hover:text-foreground">/ product</a></li>
          <li><a href="#proof" className="hover:text-foreground">/ proof</a></li>
          <li><a href="#waitlist" className="hover:text-foreground">/ waitlist</a></li>
        </ul>
        <a
          href="#waitlist"
          className="btn-scale rounded-full bg-primary px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-primary-foreground"
        >
          Get access
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative z-10 px-4 pt-44 pb-28 md:pt-52 md:pb-36">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/60">
          <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
          v0.4 — private beta opening soon
        </div>
        <h1 className="reveal font-display text-[clamp(3rem,9vw,8.5rem)] font-bold leading-[0.92] tracking-tight">
          Post less.
          <br />
          Grow <span className="font-serif italic font-normal text-amber">louder</span> on
          <br />
          <span className="text-gradient-warm">LinkedIn.</span>
        </h1>
        <p className="reveal mt-10 max-w-2xl font-sans text-lg font-light leading-relaxed text-foreground/70 md:text-xl">
          LinkedIn Buddy is your always-on AI co-pilot. It drafts in your voice, finds the
          posts worth engaging with, and turns scattered ideas into a steady drumbeat of
          content that compounds.
        </p>
        <div className="reveal mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#waitlist"
            className="btn-scale inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-sans text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.82_0.13_70/0.6)]"
          >
            Join the waitlist
            <span aria-hidden>→</span>
          </a>
          <a
            href="#product"
            className="btn-scale glass-strong inline-flex items-center gap-2 rounded-full px-7 py-4 font-sans text-sm font-medium text-foreground"
          >
            See how it works
          </a>
        </div>

        <div className="reveal mt-24 grid grid-cols-2 gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/50 md:grid-cols-4">
          <Tick label="Drafts written" value="142,803" />
          <Tick label="Avg. reply rate" value="4.6×" />
          <Tick label="Voice match" value="97%" />
          <Tick label="Saved / week" value="6h 12m" />
        </div>
      </div>
    </section>
  );
}

function Tick({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-border pt-4">
      <div className="font-display text-2xl font-semibold text-foreground tracking-tight">{value}</div>
      <div className="mt-1">{label}</div>
    </div>
  );
}

function SocialProof() {
  const chips = [
    "Founders", "VCs", "Product leads", "Recruiters", "Sales", "Designers",
    "Operators", "Creators", "Engineering managers", "Marketers", "Solo consultants", "Agencies",
  ];
  return (
    <section id="proof" className="relative z-10 px-4 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <p className="reveal font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/60">
          / 02 — the signal
        </p>
        <div className="reveal mt-10 grid grid-cols-1 gap-12 md:grid-cols-3">
          <Stat value="3.2M+" label="Impressions driven for early users in private beta" />
          <Stat value="11k" label="Operators on the waitlist this quarter" />
          <Stat value="92%" label="Say it sounds exactly like them after 2 weeks" />
        </div>

        <div className="reveal mt-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
            Built for
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {chips.map((c) => (
              <span
                key={c}
                className="hover-target glass rounded-full px-4 py-2 text-sm text-foreground/85 transition-colors hover:border-amber/40 hover:text-amber"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-none text-gradient-warm">
        {value}
      </div>
      <p className="mt-4 max-w-xs text-base font-light text-foreground/65">{label}</p>
    </div>
  );
}

function Process() {
  const steps = [
    {
      n: "01",
      title: "Learns your voice",
      body: "Drop a few past posts. Buddy maps your cadence, vocabulary, and the way you land a punchline — then writes inside it.",
      color: "#ffb35c",
    },
    {
      n: "02",
      title: "Surfaces the right rooms",
      body: "It scans the conversations your audience is actually in and tells you exactly where a thoughtful reply will compound.",
      color: "#4eccc4",
    },
    {
      n: "03",
      title: "Drafts on demand",
      body: "Turn a Slack rant, a meeting note, or a single sentence into three sharp drafts — ready to ship or iterate on.",
      color: "#7b70d8",
    },
    {
      n: "04",
      title: "Ships on schedule",
      body: "Queue, approve, and let Buddy publish at the windows your audience is most awake. Track what's working in plain language.",
      color: "#f6efe4",
    },
  ];
  return (
    <section id="process" className="relative z-10 px-4 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/60">
              / 03 — the loop
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(2.25rem,5vw,4rem)] font-bold tracking-tight">
              A quiet, <span className="font-serif italic font-normal text-teal">repeatable</span> way to show up.
            </h2>
          </div>
          <p className="max-w-sm text-base font-light text-foreground/65">
            Four steps. No persona swap, no content factory — just your taste, amplified.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.n}
              className="reveal card-border-top glass lift rounded-2xl p-6"
              style={{ ["--accent-color" as never]: s.color }}
            >
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/50">
                {s.n}
              </div>
              <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/65">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Product() {
  return (
    <section id="product" className="relative z-10 px-4 py-28 md:py-40">
      <div className="mx-auto max-w-6xl text-center">
        <p className="reveal font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/60">
          / 04 — meet buddy
        </p>
        <h2 className="reveal mx-auto mt-5 max-w-3xl font-display text-[clamp(2.25rem,5vw,4.25rem)] font-bold tracking-tight">
          Your <span className="font-serif italic font-normal text-purple">co-pilot</span>, in your pocket.
        </h2>
        <p className="reveal mx-auto mt-6 max-w-xl text-base font-light text-foreground/65">
          A focused mobile-first surface for capturing ideas, approving drafts, and watching your network respond — wherever you are.
        </p>

        <div className="reveal mt-20 flex justify-center">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-16 -z-10 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, #7b70d855, transparent 60%)" }} />
      <div className="relative mx-auto h-[640px] w-[320px] rounded-[44px] border border-white/10 bg-[oklch(0.16_0.02_270)] p-3 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.7)]">
        <div className="absolute left-1/2 top-3 h-6 w-32 -translate-x-1/2 rounded-full bg-[oklch(0.08_0.02_270)]" />
        <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-gradient-to-b from-[oklch(0.18_0.03_270)] to-[oklch(0.1_0.02_270)] p-5">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/60">
            <span>9:41</span>
            <span>buddy</span>
            <span>●●●</span>
          </div>

          <div className="mt-8 text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal">
              draft / morning
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold leading-tight">
              Stop polishing posts no one asked for.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/70">
              Three thoughts I keep coming back to after shipping for a year on LinkedIn — none of them are about hooks.
            </p>
          </div>

          <div className="mt-6 space-y-2">
            {[
              { label: "Voice match", v: 97, c: "#4eccc4" },
              { label: "Hook strength", v: 84, c: "#ffb35c" },
              { label: "Reach forecast", v: 71, c: "#7b70d8" },
            ].map((m) => (
              <div key={m.label} className="glass rounded-xl p-3">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/60">
                  <span>{m.label}</span>
                  <span style={{ color: m.c }}>{m.v}%</span>
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full" style={{ width: `${m.v}%`, background: m.c }} />
                </div>
              </div>
            ))}
          </div>

          <div className="absolute inset-x-5 bottom-5 flex gap-2">
            <button className="hover-target flex-1 rounded-full bg-primary py-3 font-sans text-xs font-semibold text-primary-foreground">
              Approve & queue
            </button>
            <button className="hover-target glass-strong rounded-full px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em]">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Waitlist() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section id="waitlist" className="relative z-10 px-4 py-32 md:py-44">
      <div className="mx-auto max-w-3xl text-center">
        <p className="reveal font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/60">
          / 05 — early access
        </p>
        <h2 className="reveal mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight">
          Be the first to <br />
          <span className="font-serif italic font-normal text-amber">sound like you</span>, faster.
        </h2>
        <p className="reveal mx-auto mt-6 max-w-lg text-base font-light text-foreground/65">
          We're letting in 50 operators a week. No noise, no spam — just a note when your seat opens.
        </p>

        <form
          className="reveal mx-auto mt-12 flex max-w-xl flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setSent(true);
          }}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="glass-strong flex-1 rounded-full px-6 py-4 font-sans text-sm text-foreground placeholder:text-foreground/40 focus:border-amber focus:outline-none"
          />
          <button
            type="submit"
            className="btn-scale rounded-full bg-primary px-7 py-4 font-sans text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.82_0.13_70/0.6)]"
          >
            {sent ? "You're on the list ✓" : "Get early access"}
          </button>
        </form>

        <p className="reveal mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">
          no credit card · unsubscribe anytime
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-border px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/50 md:flex-row md:items-center">
        <span>© 2026 LinkedIn Buddy AI · all rights reserved</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}
