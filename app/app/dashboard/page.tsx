"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type ResumeRow = {
  id: string;
  created_at: string;
  job_description: {
    title: string | null;
    created_at: string | null;
  } | null;
};

export default function DashboardPage() {
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [resumes, setResumes] = useState<ResumeRow[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(true);
  const [search, setSearch] = useState("");

  const fetchResumes = async () => {
    setLoadingResumes(true);
    const { data, error: resumesError } = await supabase
      .from("generated_resumes")
      .select("id, created_at, job_description:job_description_id(title, created_at)")
      .order("created_at", { ascending: false })
      .limit(25);

    if (!resumesError && data) {
      setResumes(data as ResumeRow[]);
    }
    setLoadingResumes(false);
  };

  // Ensure authenticated; fetch resumes; if not onboarded, send to onboarding.
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        router.replace("/");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_complete")
        .eq("user_id", data.session.user.id)
        .maybeSingle();

      if (!profile?.onboarding_complete) {
        router.replace("/onboarding");
        return;
      }

      void fetchResumes();
    });
  }, [router]);

  const handleSubmit = async () => {
    const text = jobDescription.trim();
    if (!text) {
      setError("Please paste a job description before submitting.");
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);

    const firstLine = text.split("\n").find((line) => line.trim().length > 0);
    const title =
      (firstLine && firstLine.trim().slice(0, 120)) || "Untitled job description";

    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      setError("Session expired. Please sign in again.");
      setSaving(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("job_descriptions")
      .insert({
        user_id: sessionData.session.user.id,
        title,
        description: text,
      });

    if (insertError) {
      setError("Could not save this job description. Please try again.");
      setSaving(false);
      return;
    }

    setJobDescription("");
    setSuccess("Job description saved. Ready to generate a resume.");
    setSaving(false);
    void fetchResumes();
  };

  const filteredResumes = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return resumes;
    return resumes.filter((row) => {
      const title = row.job_description?.title || "Untitled";
      return title.toLowerCase().includes(term);
    });
  }, [resumes, search]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-500">
              ResumeForge
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 text-lg font-semibold">
            RF
          </div>
        </header>

        <div className="flex flex-1 items-center">
          <div className="grid w-full items-start gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl border border-slate-300 bg-white shadow-sm">
                <textarea
                  className="h-64 w-full rounded-2xl px-4 py-3 text-base text-slate-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                <div className="absolute bottom-3 right-3">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={saving}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-lg font-semibold text-slate-700 transition hover:border-black hover:text-black disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300"
                    aria-label="Submit job description"
                  >
                    ↵
                  </button>
                </div>
              </div>
              {error && (
                <p className="mt-3 text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
              {success && (
                <p className="mt-3 text-sm text-green-600" role="status">
                  {success}
                </p>
              )}
            </div>

            <div className="rounded-3xl border border-slate-300 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 rounded-full border border-slate-300 px-3 py-2">
                <input
                  type="text"
                  placeholder="Search past resumes"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-900 outline-none"
                />
                <span className="text-slate-500">🔍</span>
              </div>

              <div className="mt-3 h-[420px] overflow-y-auto rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <span>Company / Title</span>
                  <span>Date</span>
                </div>
                {loadingResumes ? (
                  <div className="px-4 py-6 text-sm text-slate-500">Loading...</div>
                ) : filteredResumes.length === 0 ? (
                  <div className="px-4 py-6 text-sm text-slate-500">
                    No past resumes yet.
                  </div>
                ) : (
                  <ul className="divide-y divide-slate-200">
                    {filteredResumes.map((row) => {
                      const title = row.job_description?.title || "Untitled";
                      const date = row.created_at
                        ? new Date(row.created_at).toLocaleDateString()
                        : "";
                      return (
                        <li key={row.id} className="px-4 py-3 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-800">
                              {title}
                            </span>
                            <span className="text-xs text-slate-500">{date}</span>
                          </div>
                          <p className="mt-1 text-xs text-slate-500">
                            Resume ID: {row.id.slice(0, 8)}...
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
