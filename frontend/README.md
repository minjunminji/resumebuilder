# ResumeForge Frontend

A modern, beautiful resume builder application built with React, TypeScript, and the liquid-glass-react library.

## Features

- **Liquid Glass UI**: Modern, expensive-feeling interface using Apple-style liquid glass effects
- **Experience Database**: Store and manage your professional experiences, projects, and achievements
- **AI-Powered Resume Generation**: Generate tailored resumes for specific job descriptions
- **Bullet Version Control**: Track different versions of resume bullets for each experience
- **Dark Mode Design**: Beautiful gradient backgrounds with glass morphism effects

## Tech Stack

- **React** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **liquid-glass-react** for UI effects
- **React Router** for navigation
- **Supabase** for backend and authentication

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts (Auth, etc.)
├── lib/           # Utility functions and clients
├── pages/         # Page components
└── types/         # TypeScript type definitions
```

## Design Philosophy

The UI follows these principles:
- **Clean**: Minimalistic design with clear hierarchy
- **Expensive**: Premium feel using liquid glass effects
- **Modern**: Contemporary design patterns and interactions
- **Minimalistic**: Focus on content, not clutter
