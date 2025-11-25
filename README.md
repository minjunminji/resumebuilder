# ResumeForge

A modern, AI-powered resume builder with a beautiful liquid glass UI. Built with Next.js, TypeScript, and Supabase.

## Features

- **Liquid Glass UI**: Premium, modern interface using Apple-style liquid glass effects
- **Experience Database**: Store and manage your professional experiences, projects, and achievements
- **AI-Powered Resume Generation**: Generate tailored resumes for specific job descriptions
- **Bullet Version Control**: Track different versions of resume bullets for each experience
- **Dark Mode Design**: Beautiful gradient backgrounds with glass morphism effects

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **liquid-glass-react** for UI effects
- **Supabase** for backend, auth, and database

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase project

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd resumebuilder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Add your Supabase credentials to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Set up the database:
   - Run the SQL in `schema.sql` in your Supabase SQL editor

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication page
│   ├── dashboard/         # Dashboard
│   ├── blobs/             # Experience management
│   ├── generate/          # Resume generation
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── GlassCard.tsx     # Liquid glass card component
│   ├── GlassButton.tsx   # Liquid glass button
│   └── Navigation.tsx    # Navigation bar
├── lib/                   # Utility functions
│   └── supabase/         # Supabase client setup
└── types/                 # TypeScript type definitions
```

## Design Philosophy

The UI follows these principles:
- **Clean**: Minimalistic design with clear hierarchy
- **Expensive**: Premium feel using liquid glass effects
- **Modern**: Contemporary design patterns and interactions
- **Minimalistic**: Focus on content, not clutter

## Features Roadmap

- [x] Authentication (login/signup)
- [x] Dashboard with stats
- [x] Experience database management
- [ ] AI-powered resume generation
- [ ] LaTeX PDF compilation
- [ ] Bullet version history UI
- [ ] Resume templates
- [ ] Export to multiple formats

## License

MIT
