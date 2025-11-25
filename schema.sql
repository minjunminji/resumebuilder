-- Core tables
create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  onboarding_complete boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.blobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null check (category in ('work_experience','volunteering','project','school','award','skill_blob')),
  title text not null,
  description text not null,
  tags text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.skills (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  level text, -- optional (e.g., beginner/intermediate/advanced) or null
  created_at timestamptz default now()
);

create table public.bullet_versions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  blob_id uuid not null references public.blobs(id) on delete cascade,
  text text not null,
  job_context text,
  rating int,
  created_at timestamptz default now()
);

create table public.job_descriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,            -- optional job title/company label
  description text not null,
  created_at timestamptz default now()
);

create table public.generated_resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  job_description_id uuid references public.job_descriptions(id) on delete set null,
  selected_blob_ids uuid[] default '{}',   -- blobs included in this resume
  pinned_blob_ids uuid[] default '{}',     -- blobs the user pinned
  excluded_blob_ids uuid[] default '{}',   -- blobs the user excluded
  model_provider text,                     -- e.g., 'openai' | 'anthropic'
  model_name text,                         -- e.g., 'gpt-4o' | 'claude-3.5-sonnet'
  final_pdf_url text,                      -- storage path/URL to the compiled PDF
  created_at timestamptz default now()
);

-- Useful indexes
create index on public.blobs (user_id, category);
create index on public.bullet_versions (blob_id, created_at desc);
create index on public.generated_resumes (user_id, created_at desc);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.blobs enable row level security;
alter table public.skills enable row level security;
alter table public.bullet_versions enable row level security;
alter table public.job_descriptions enable row level security;
alter table public.generated_resumes enable row level security;

-- Basic RLS policies (owner-based)
create policy "profiles_owner" on public.profiles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "blobs_owner" on public.blobs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "skills_owner" on public.skills
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "bullet_versions_owner" on public.bullet_versions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "job_descriptions_owner" on public.job_descriptions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "generated_resumes_owner" on public.generated_resumes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
