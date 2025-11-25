"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type AuthMode = "sign-in" | "sign-up";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  const routeByOnboarding = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("onboarding_complete")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      // Fall back to onboarding if we cannot read profile.
      router.replace("/onboarding");
      return;
    }

    if (data?.onboarding_complete) {
      router.replace("/dashboard");
    } else {
      router.replace("/onboarding");
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session?.user?.id) {
        await routeByOnboarding(data.session.user.id);
      }
      setCheckingSession(false);
    });
    // routeByOnboarding intentionally excluded to avoid reruns when router changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ctaLabel = useMemo(
    () => (mode === "sign-in" ? "Sign in" : "Create account"),
    [mode]
  );

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please enter an email and password.");
      setLoading(false);
      return;
    }

    const authResult =
      mode === "sign-in"
        ? await supabase.auth.signInWithPassword({
            email: trimmedEmail,
            password: trimmedPassword,
          })
        : await supabase.auth.signUp({
            email: trimmedEmail,
            password: trimmedPassword,
          });

    if (authResult.error) {
      setError(authResult.error.message);
      setLoading(false);
      return;
    }

    if (mode === "sign-up") {
      setInfo("Check your inbox to confirm your account, then continue.");
    }

    await routeByOnboarding(authResult.data.session!.user.id);
    setLoading(false);
  };

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <p className="text-lg font-semibold">Checking session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16 lg:flex-row lg:items-start lg:gap-16 lg:px-12">
        <section className="flex-1 space-y-6">
          <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-medium uppercase tracking-tight text-slate-100">
            ResumeForge
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Build one experience vault, generate tailored resumes in minutes.
          </h1>
          <p className="max-w-2xl text-lg text-slate-200">
            Sign in with email and password to start your onboarding. We{" "}
            <span className="font-semibold text-teal-200">
              collect detailed blobs
            </span>{" "}
            once, then generate application-ready resumes for every role.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Centralized projects, work, volunteering, and achievements.",
              "LLM-powered selection and rewriting tuned to each JD.",
              "Version history for every bullet you generate.",
              "LaTeX-quality exports without manual editing.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-white/5 px-4 py-3 text-sm font-medium text-slate-100 ring-1 ring-white/10"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="w-full max-w-md rounded-2xl bg-white/5 p-8 shadow-2xl shadow-slate-950/30 ring-1 ring-white/10 backdrop-blur">
          <header className="mb-6 space-y-2">
            <p className="text-sm font-medium uppercase tracking-wide text-slate-200">
              Sign in to continue
            </p>
            <h2 className="text-2xl font-semibold text-white">
              Supabase email/password
            </h2>
            <p className="text-sm text-slate-300">
              Use a password manager and keep it at least 8 characters to meet
              Supabase requirements.
            </p>
          </header>

          <form className="space-y-4" onSubmit={handleAuth}>
            <label className="block space-y-2 text-sm font-medium text-slate-100">
              <span>Email</span>
              <input
                type="email"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white outline-none transition focus:border-teal-300/80 focus:bg-white/10"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </label>

            <label className="block space-y-2 text-sm font-medium text-slate-100">
              <span>Password</span>
              <input
                type="password"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white outline-none transition focus:border-teal-300/80 focus:bg-white/10"
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
                required
                minLength={8}
              />
            </label>

            {error && (
              <div className="rounded-xl border border-red-300/70 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {error}
              </div>
            )}

            {info && (
              <div className="rounded-xl border border-teal-200/80 bg-teal-400/10 px-4 py-3 text-sm text-teal-50">
                {info}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-400 px-4 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-teal-900/30 transition hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:bg-teal-500/60"
            >
              {loading ? "Working..." : ctaLabel}
            </button>
          </form>

          <div className="mt-4 text-sm text-slate-200">
            {mode === "sign-in" ? (
              <>
                Need an account?{" "}
                <button
                  type="button"
                  className="font-semibold text-teal-200 hover:text-teal-100"
                  onClick={() => setMode("sign-up")}
                >
                  Create one
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="font-semibold text-teal-200 hover:text-teal-100"
                  onClick={() => setMode("sign-in")}
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
