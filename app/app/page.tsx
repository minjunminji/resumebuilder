import type { SVGProps } from "react";
import LiquidGlass from "liquid-glass-react";

const ArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const CheckCircle2 = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const Sparkles = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3v4m0 10v4m9-9h-4M7 12H3m12.5-5.5-2 3.5-3.5 2 3.5 2 2 3.5 2-3.5 3.5-2-3.5-2-2-3.5ZM6.5 6.5 5 9 2.5 10.5 5 12l1.5 2.5L8 12l2.5-1.5L8 9 6.5 6.5Z" />
  </svg>
);

const highlights = [
  {
    title: "Concierge-level polish",
    description: "Premium templates, tasteful typography, and guided content to make every line feel curated.",
  },
  {
    title: "Signal-first storytelling",
    description: "Translate experience into clear outcomes with quantified impact and recruiter-friendly structure.",
  },
  {
    title: "Instant tailored versions",
    description: "Clone and adapt resumes for each role with AI suggestions that stay true to your voice.",
  },
];

const stats = [
  { label: "Avg. interview uplift", value: "2.8x" },
  { label: "Roles tailored", value: "24" },
  { label: "Time to first draft", value: "6 min" },
];

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#05060b] text-white">
      <div className="relative isolate overflow-hidden px-4 py-14 sm:px-8 lg:px-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(160,233,255,0.18),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_-10%,rgba(220,191,255,0.18),transparent_30%)]" />

        <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:gap-16">
          <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.4em] text-slate-200/70">
              <Sparkles className="h-4 w-4 text-cyan-200" />
              <span>Resume atelier</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-200/80">
              <span className="h-[1px] w-10 bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
              <span>Built to make your experience unmistakable</span>
            </div>
          </header>

          <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="flex flex-col gap-6">
              <LiquidGlass className="shadow-2xl" cornerRadius={32} blurAmount={0.18} saturation={150}>
                <div className="flex flex-col gap-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-200/70">ResumeBuilder</p>
                  <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                    Make every recruiter interaction feel crafted, confident, and current.
                  </h1>
                  <p className="max-w-2xl text-lg text-slate-200/80">
                    Pair precision phrasing with cinematic presentation. Build a portfolio-ready resume suite that
                    evolves with each role you pursue.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <LiquidGlass
                      cornerRadius={999}
                      padding="0.75rem 1.4rem"
                      className="text-base font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl"
                      blurAmount={0.15}
                      saturation={180}
                    >
                      <span className="flex items-center gap-2">
                        Start designing
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </LiquidGlass>
                    <button className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:text-white">
                      Explore templates
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-6 pt-2 text-sm text-slate-200/70">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-cyan-200" />
                      <span>ATS-friendly & recruiter tested</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-cyan-200" />
                      <span>Built-in versioning for each role</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-cyan-200" />
                      <span>Instant PDF & portfolio exports</span>
                    </div>
                  </div>
                </div>
              </LiquidGlass>
            </div>

            <div className="flex flex-col gap-6">
              <LiquidGlass cornerRadius={28} blurAmount={0.16} saturation={160} className="shadow-2xl">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between text-sm text-slate-200/70">
                    <span>Signature Layout</span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">Live preview</span>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/5 p-5 text-sm text-slate-100/80 shadow-inner">
                    <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-200/60">Profile</p>
                    <h3 className="text-xl font-semibold text-white">Avery Quinn</h3>
                    <p className="text-sm text-slate-200/80">Product Design Lead — designing expressive, measurable experiences.</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl bg-white/5 px-3 py-3">
                        <p className="text-xs uppercase tracking-[0.15em] text-slate-200/60">Highlights</p>
                        <ul className="mt-2 space-y-1 text-sm text-slate-100/80">
                          <li>• Led redesigns across B2B and consumer surfaces.</li>
                          <li>• Indexed design ops to 98% reliability.</li>
                          <li>• Partnered with AI teams for adaptive UX.</li>
                        </ul>
                      </div>
                      <div className="rounded-xl bg-white/5 px-3 py-3">
                        <p className="text-xs uppercase tracking-[0.15em] text-slate-200/60">Impact</p>
                        <ul className="mt-2 space-y-1 text-sm text-slate-100/80">
                          <li>• +28% activation from onboarding rewrite.</li>
                          <li>• -36% drop-off via friction audits.</li>
                          <li>• 3x faster spec cycles with templated rituals.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center text-sm text-slate-100">
                    {stats.map((stat) => (
                      <div key={stat.label} className="rounded-2xl bg-white/5 px-3 py-4">
                        <div className="text-lg font-semibold text-white">{stat.value}</div>
                        <p className="text-xs uppercase tracking-[0.15em] text-slate-200/60">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </LiquidGlass>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            {highlights.map((item) => (
              <LiquidGlass
                key={item.title}
                cornerRadius={22}
                blurAmount={0.14}
                saturation={170}
                className="h-full shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex h-full flex-col gap-3">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-200/80">{item.description}</p>
                  <button className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-cyan-100 transition hover:text-white">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </LiquidGlass>
            ))}
          </section>

          <footer className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-6 text-sm text-slate-200/80 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-200/70 to-purple-200/70 text-slate-900">
                RB
              </div>
              <div>
                <p className="text-base font-semibold text-white">ResumeBuilder</p>
                <p className="text-sm text-slate-200/80">Precise, luxurious documents for ambitious careers.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-200/60">
              <span>Elegance</span>
              <span className="h-[1px] w-8 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <span>Clarity</span>
              <span className="h-[1px] w-8 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <span>Confidence</span>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
