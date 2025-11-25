"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type CategoryKey =
  | "work"
  | "volunteering"
  | "projects"
  | "school"
  | "awards"
  | "skills";

type Category = {
  key: CategoryKey;
  title: string;
  helper: string;
  placeholder: string;
};

type Entry = {
  title: string;
  description: string;
};

const categories: Category[] = [
  {
    key: "work",
    title: "Work experience",
    helper: "Roles, internships, and contract gigs.",
    placeholder:
      "Role, company, timeframe, stack, scope of impact, metrics. Aim for 3-5 sentences.",
  },
  {
    key: "volunteering",
    title: "Volunteering",
    helper: "Community, pro-bono, leadership roles.",
    placeholder:
      "What you built/delivered, who benefited, frequency, and measurable outcomes.",
  },
  {
    key: "projects",
    title: "Projects",
    helper: "Solo or team projects that show initiative.",
    placeholder:
      "Problem, solution, tech choices, challenges, metrics or user impact.",
  },
  {
    key: "school",
    title: "School involvement",
    helper: "Clubs, research, TA roles, competitions.",
    placeholder:
      "Responsibilities, achievements, tools used, and any leadership/mentorship.",
  },
  {
    key: "awards",
    title: "Awards & achievements",
    helper: "Scholarships, hackathon wins, publications.",
    placeholder:
      "What the award recognizes, selection criteria, scale (regional/national), year.",
  },
  {
    key: "skills",
    title: "Technical skills",
    helper: "Tech stack as comma or line separated tags.",
    placeholder: "e.g., TypeScript, React, Next.js, PostgreSQL, Supabase, AWS",
  },
];

const emptyEntry: Entry = { title: "", description: "" };

export default function OnboardingPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [entries, setEntries] = useState<Record<CategoryKey, Entry[]>>({
    work: [emptyEntry],
    volunteering: [emptyEntry],
    projects: [emptyEntry],
    school: [emptyEntry],
    awards: [emptyEntry],
    skills: [emptyEntry],
  });
  const [submitted, setSubmitted] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Guard the route; redirect to auth if unauthenticated.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/");
      } else {
        setAuthChecked(true);
      }
    });
  }, [router]);

  const currentCategory = categories[currentIndex];
  const progressPercent = ((currentIndex + 1) / categories.length) * 100;

  const handleEntryChange = (
    key: CategoryKey,
    index: number,
    field: keyof Entry,
    value: string
  ) => {
    setEntries((prev) => {
      const updated = [...prev[key]];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, [key]: updated };
    });
    setSubmitted(false);
  };

  const handleAddEntry = (key: CategoryKey) => {
    setEntries((prev) => ({
      ...prev,
      [key]: [...prev[key], { title: "", description: "" }],
    }));
  };

  const handleRemoveEntry = (key: CategoryKey, index: number) => {
    setEntries((prev) => {
      if (prev[key].length === 1) return prev;
      const updated = prev[key].filter((_, i) => i !== index);
      return { ...prev, [key]: updated };
    });
    setSubmitted(false);
  };

  const handleBack = () => {
    setCurrentIndex((idx) => Math.max(0, idx - 1));
  };

  const handleNext = () => {
    if (currentIndex < categories.length - 1) {
      setCurrentIndex((idx) => idx + 1);
    } else {
      handleSubmitAll();
    }
  };

  const handleSubmitAll = () => {
    setSubmitted(true);
    // TODO: Persist to Supabase tables.
    console.table(entries);
  };

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-slate-800">
        <p className="text-lg font-semibold">Checking your session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-500">
            Onboarding
          </p>
          <h1 className="text-3xl font-semibold leading-tight">
            Capture your experience blobs once.
          </h1>
        </header>

        <div className="mt-8 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-black transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <div className="text-sm font-semibold text-slate-700">
            {currentCategory.title}
          </div>

          <div className="flex flex-col gap-6">
            {entries[currentCategory.key].map((entry, idx) => (
              <div
                key={`${currentCategory.key}-${idx}`}
                className="rounded-[28px] border border-slate-300 bg-white p-6 shadow-sm"
              >
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-slate-800">
                    Title
                    <input
                      type="text"
                      className="mt-2 w-full rounded-full border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                      placeholder="e.g., Software Engineering Intern @ ACME"
                      value={entry.title}
                      onChange={(e) =>
                        handleEntryChange(
                          currentCategory.key,
                          idx,
                          "title",
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <label className="block text-sm font-semibold text-slate-800">
                    Description
                    <textarea
                      className="mt-2 min-h-40 w-full rounded-[24px] border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                      placeholder={currentCategory.placeholder}
                      value={entry.description}
                      onChange={(e) =>
                        handleEntryChange(
                          currentCategory.key,
                          idx,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </label>
                </div>

                {entries[currentCategory.key].length > 1 && (
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveEntry(currentCategory.key, idx)
                      }
                      className="flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-red-400 hover:text-red-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 7h16M9 7v-.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V7m-6 0h6m-7 0v11a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7"
                        />
                        <path d="M10 11v6M14 11v6" strokeLinecap="round" />
                      </svg>
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}

            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => handleAddEntry(currentCategory.key)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-500 text-2xl font-light text-slate-600 transition hover:border-black hover:text-black"
                aria-label="Add another"
              >
                +
              </button>
              <p className="text-sm text-slate-600">Add another</p>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition hover:border-black hover:text-black disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
            >
              {currentIndex === categories.length - 1 ? "Finish" : "Next"}
            </button>
          </div>

          {submitted && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              Saved locally for now - wiring Supabase persistence is next.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
