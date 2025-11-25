'use client';

import type { FormEvent, SVGProps } from "react";
import { useMemo, useState } from "react";
import LiquidGlass from "liquid-glass-react";
import { supabase } from "@/lib/supabaseClient";

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
    title: "Structured narratives",
    description: "Guided prompts keep every bullet concise, outcome-oriented, and easy to scan.",
  },
  {
    title: "Version discipline",
    description: "Save role-specific cuts and keep a living history of what shipped to each hiring manager.",
  },
  {
    title: "Evidence-forward",
    description: "Attach artifacts, quantify impact, and export lean case studies alongside the resume.",
  },
];

const stats = [
  { label: "Avg. interview uplift", value: "2.8x" },
  { label: "Roles tailored", value: "24" },
  { label: "Time to first draft", value: "6 min" },
];

const onboardingTasks = [
  {
    title: "Set up workspace",
    detail: "Create your profile, upload an existing resume, and pick a structure template.",
  },
  {
    title: "Connect signal",
    detail: "Add role targets and track which version shipped to each recruiter.",
  },
  {
    title: "Export with intent",
    detail: "Generate PDF, web, and portfolio views from the same source of truth.",
  },
];

export default function Home() {
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const statusCopy = useMemo(
    () => (mode === "signup" ? "Create access" : "Return to workspace"),
    [mode],
  );

  const handleAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!email || !password) {
      setMessage("Email and password are required.");
      setLoading(false);
      return;
    }

    if (!supabase) {
      setMessage("Supabase is not configured yet. Add your environment keys and retry.");
      setLoading(false);
      return;
    }

    try {
      const { error } =
        mode === "signup"
          ? await supabase.auth.signUp({ email, password })
          : await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage(
        mode === "signup"
          ? "Check your inbox to confirm your account."
          : "Signed in. Redirecting to your workspace…",
      );
    } catch {
      setMessage("Unable to reach authentication. Verify your Supabase keys.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#0b0b0d] text-gray-50">
      <div className="relative isolate overflow-hidden px-4 py-14 sm:px-8 lg:px-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_32%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_-8%,rgba(255,255,255,0.04),transparent_28%)]" />

        <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:gap-16">
          <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.4em] text-gray-200/80">
              <Sparkles className="h-4 w-4" />
              <span>Monochrome atelier</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300/70">
              <span className="h-[1px] w-10 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <span>Built to make your experience unmistakable</span>
            </div>
          </header>

          <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="flex flex-col gap-6">
              <LiquidGlass className="shadow-2xl" cornerRadius={32} blurAmount={0.18} saturation={0}>
                <div className="flex flex-col gap-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-300/70">ResumeBuilder</p>
                  <h1 className="text-4xl font-semibold leading-tight text-gray-50 sm:text-5xl">
                    Make every recruiter interaction feel curated, confident, and current.
                  </h1>
                  <p className="max-w-2xl text-lg text-gray-200/80">
                    Pair precise phrasing with a restrained, monochrome system. Build a portfolio-ready resume suite
                    that evolves with every role you pursue.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <LiquidGlass
                      cornerRadius={999}
                      padding="0.75rem 1.4rem"
                      className="text-base font-semibold text-gray-50 transition hover:-translate-y-0.5 hover:shadow-xl"
                      blurAmount={0.15}
                      saturation={0}
                    >
                      <span className="flex items-center gap-2">
                        Start designing
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </LiquidGlass>
                    <button className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-gray-200 transition hover:border-white/30 hover:text-gray-50">
                      Explore templates
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-6 pt-2 text-sm text-gray-300/70">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>ATS-friendly & recruiter tested</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Built-in versioning for each role</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Instant PDF & portfolio exports</span>
                    </div>
                  </div>
                </div>
              </LiquidGlass>
            </div>

            <div className="flex flex-col gap-6">
              <LiquidGlass cornerRadius={28} blurAmount={0.16} saturation={0} className="shadow-2xl">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between text-sm text-gray-300/70">
                    <span>Signature layout</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-50">Live preview</span>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/5 p-5 text-sm text-gray-200/80 shadow-inner">
                    <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-300/60">Profile</p>
                    <h3 className="text-xl font-semibold text-gray-50">Avery Quinn</h3>
                    <p className="text-sm text-gray-200/80">Product Design Lead — designing expressive, measurable experiences.</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl bg-white/5 px-3 py-3">
                        <p className="text-xs uppercase tracking-[0.15em] text-gray-300/60">Highlights</p>
                        <ul className="mt-2 space-y-1 text-sm text-gray-200/80">
                          <li>• Led redesigns across B2B and consumer surfaces.</li>
                          <li>• Indexed design ops to 98% reliability.</li>
                          <li>• Partnered with AI teams for adaptive UX.</li>
                        </ul>
                      </div>
                      <div className="rounded-xl bg-white/5 px-3 py-3">
                        <p className="text-xs uppercase tracking-[0.15em] text-gray-300/60">Impact</p>
                        <ul className="mt-2 space-y-1 text-sm text-gray-200/80">
                          <li>• +28% activation from onboarding rewrite.</li>
                          <li>• -36% drop-off via friction audits.</li>
                          <li>• 3x faster spec cycles with templated rituals.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center text-sm text-gray-100">
                    {stats.map((stat) => (
                      <div key={stat.label} className="rounded-2xl bg-white/5 px-3 py-4">
                        <div className="text-lg font-semibold text-gray-50">{stat.value}</div>
                        <p className="text-xs uppercase tracking-[0.15em] text-gray-300/60">{stat.label}</p>
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
                saturation={0}
                className="h-full shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex h-full flex-col gap-3">
                  <h3 className="text-xl font-semibold text-gray-50">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-200/80">{item.description}</p>
                  <button className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-gray-100 transition hover:text-white">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </LiquidGlass>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <LiquidGlass cornerRadius={26} blurAmount={0.16} saturation={0} className="shadow-2xl">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-sm text-gray-300/70">
                  <span className="uppercase tracking-[0.25em]">Supabase auth</span>
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-200">
                    <button
                      className={`rounded-full border border-white/15 px-3 py-1 transition ${mode === "signup" ? "bg-white/10 text-gray-50" : "text-gray-200 hover:bg-white/5"}`}
                      onClick={() => setMode("signup")}
                    >
                      Sign up
                    </button>
                    <button
                      className={`rounded-full border border-white/15 px-3 py-1 transition ${mode === "signin" ? "bg-white/10 text-gray-50" : "text-gray-200 hover:bg-white/5"}`}
                      onClick={() => setMode("signin")}
                    >
                      Sign in
                    </button>
                  </div>
                </div>

                <form onSubmit={handleAuth} className="flex flex-col gap-3 text-sm text-gray-200">
                  <label className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-300/70">Email</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-gray-100 outline-none transition focus:border-white/30"
                      placeholder="you@example.com"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-300/70">Password</span>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-gray-100 outline-none transition focus:border-white/30"
                      placeholder="Strong and memorable"
                    />
                  </label>
                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-50 transition hover:border-white/35 hover:bg-white/10"
                    disabled={loading}
                  >
                    {loading ? "Working…" : statusCopy}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  {message && <p className="text-xs text-gray-300/80">{message}</p>}
                  <p className="text-xs text-gray-400">
                    Supabase uses secure email-based confirmation. Configure NEXT_PUBLIC_SUPABASE_URL and
                    NEXT_PUBLIC_SUPABASE_ANON_KEY to activate.
                  </p>
                </form>
              </div>
            </LiquidGlass>

            <LiquidGlass cornerRadius={22} blurAmount={0.14} saturation={0} className="shadow-xl">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-sm text-gray-300/70">
                  <span className="uppercase tracking-[0.2em]">Onboarding</span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-200">3 guided steps</span>
                </div>
                <div className="space-y-3">
                  {onboardingTasks.map((task, index) => (
                    <div key={task.title} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-gray-200">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-gray-50">
                        {index + 1}
                      </div>
                      <div className="space-y-1">
                        <p className="text-base font-semibold text-gray-50">{task.title}</p>
                        <p className="text-gray-200/80">{task.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </LiquidGlass>
          </section>

          <footer className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-6 text-sm text-gray-200/80 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-gray-50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-gray-50">
                RB
              </div>
              <div>
                <p className="text-base font-semibold text-gray-50">ResumeBuilder</p>
                <p className="text-sm text-gray-200/80">Precise, monochrome documents for ambitious careers.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-gray-300/70">
              <span>Discipline</span>
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
