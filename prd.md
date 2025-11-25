Product Requirements Document: ResumeForge
Overview
Product Name: ResumeForge (placeholder)
Target User: Students and early-career professionals applying to multiple internships/jobs requiring tailored resumes
Core Problem: Managing dozens of applications with different resume versions is chaotic. Users need to manually review job descriptions, edit resumes, and remember which experiences to highlight for each role.
Product Vision
A personal experience database + intelligent resume generator that lets users maintain one comprehensive professional profile, then automatically generates tailored, LaTeX-formatted resumes for each job application with smart LLM-powered content selection and rewriting.

Core Features
1. Experience Database
User Story: As a user, I want to store all my professional experiences in one place so I can reuse them across multiple resumes.
Functionality:

Onboarding / Blob Collection Flow:

- New users go through a multi-step onboarding wizard that walks them through creating their initial experience blobs.
- Steps are ordered as: Work Experience → Volunteering → Projects → School Involvement → Awards & Achievements → Technical Skills.
- For each blob-type step (everything except Technical Skills), the user is prompted for:
  - A concise, descriptive title.
  - A rich, free-form description field.
- The UI explicitly:
  - Encourages users to write at least 50+ words per blob.
  - States that they can format the description however they want (paragraphs, bullet-like lines, etc.).
- Technical Skills is handled as a structured list (not blobs):
  - Users list skills/technologies (e.g., languages, frameworks, tools).
  - Skills are stored as tags/entries attached to the user profile.
- On completion of onboarding, all blobs and skills are saved to the user’s profile and become available in the main dashboard.

Users create "blobs" (title + detailed description) organized into categories:

Projects
Work Experience
Volunteering
School Involvement
Awards & Achievements
Skills/Technical


Each blob contains rich, detailed information about the experience
The UI encourages long-form input (50+ words) and reassures users that more detail and context leads to better generated bullets
The more detail provided, the better the LLM can generate relevant bullets
CRUD operations for all blobs

Success Criteria:

Users can create unlimited blobs across all categories
Search/filter functionality across all blobs
Easy organization and tagging


2. Job-Specific Resume Generation
User Story: As a user, I want to paste a job description and get a tailored resume so I don't have to manually decide which experiences to include.
Functionality:

User pastes job description
LLM analyzes description and suggests relevant blobs from user's database
User can:

Accept/reject suggested blobs
Pin must-include experiences
Exclude irrelevant items


LLM generates resume with:

Strategic selection of experiences
Rewritten bullets emphasizing relevant aspects for that specific job
Proper length constraints (1 page standard, configurable)


Output: LaTeX-rendered PDF resume

Success Criteria:

Generation takes < 30 seconds
Users can preview before finalizing
Clear reasoning for why certain experiences were selected/excluded


3. Bullet Point Version Control
User Story: As a user, I want to see all past versions of bullets written for each experience so I can reuse effective phrasings.
Functionality:

Every generated bullet point is saved to its source blob's version history
Version history shows:

Bullet text
Job/company it was generated for
Date generated


Users can:

Browse version history per blob
Select previous bullets to reuse
Use previous bullet as starting point for modification
Mark favorites
Search across all versions



Success Criteria:

Complete history preserved indefinitely
Fast browsing/searching of past versions
One-click reuse of previous bullets


4. Iterative Refinement
User Story: As a user, I want to give feedback on generated resumes so they better match my vision.
Functionality:

After initial generation, users can:

Comment on specific bullets ("make more technical", "add metrics", "less jargon")
Request rewrites of sections
Swap in version history bullets


LLM processes feedback and regenerates
Changes are saved to version history

Success Criteria:

Feedback system is intuitive
Iterations take < 15 seconds
Clear diff view of what changed


Technical Architecture
Frontend

React-based web app
LaTeX.js or similar for in-browser PDF rendering
Rich text editor for blob creation with guidance around length/formatting
Drag-and-drop interface for blob selection

Backend

Supabase-based backend:

- Supabase Auth for user accounts and authentication.
- Supabase Postgres for all application data (users, blobs, bullet versions, generated resumes, job descriptions, and skills/tags).
- Supabase Edge Functions (or similar backend layer) for secure LLM calls and LaTeX compilation orchestration.

User authentication and account management
Database schema:

Users
Blobs (with categories, tags, metadata)
Bullet_versions (linked to blobs)
Generated_resumes (snapshots of full resumes)


LLM integration:

- Primary support for OpenAI models.
- First-class support for Claude Sonnet 4.5.
- Model provider and model name are configurable per environment (e.g., via env vars) so the system can switch between OpenAI and Claude without code changes to core business logic.
- LLM abstraction layer in backend to:
  - Normalize prompts and responses across providers.
  - Enforce latency and cost constraints.
  - Log which provider/model was used per generation.

LaTeX compilation service

Data Model
User
├── Blobs
│   ├── Category
│   ├── Title
│   ├── Description (detailed)
│   └── Bullet_Versions[]
│       ├── Text
│       ├── Job context
│       ├── Timestamp
│       └── User rating
└── Generated_Resumes[]
    ├── Job description
    ├── Selected blobs
    ├── Final PDF
    └── Timestamp

MVP Scope
Must Have (V1)

User accounts and authentication
Blob creation/editing (all categories)
Job description input
Basic LLM-powered resume generation
LaTeX PDF output
Bullet version history storage and browsing
Manual blob selection (pin/exclude)

Nice to Have (V2)

Iterative refinement via comments
Smart suggestions based on job description
Version history search and filtering
Resume templates (multiple LaTeX styles)
Analytics (which bullets perform best)
Export to other formats (Word, plain text)
Allow uploading existing resume to populate blobs automatically

Future Considerations

Browser extension for one-click job description capture
Integration with job boards (LinkedIn, Indeed)
A/B testing different resume versions
Interview callback tracking to learn what works
Team/university accounts for career centers


Success Metrics

User Engagement: Average blobs created per user
Time Saved: Time to generate resume vs. manual editing
Quality: User satisfaction with generated resumes (survey)
Retention: Weekly active users, resume generation frequency
Conversion: Resumes generated → applications submitted


Open Questions

Pricing model? (Freemium, subscription, one-time purchase)
How many LLM calls per resume generation? (Cost implications)
Should we support multiple resume templates/styles from day one?
Privacy considerations - how do we handle sensitive user data?
Do we need mobile support or is desktop sufficient initially?
