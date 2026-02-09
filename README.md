# Seam - AI Digital Wardrobe

**Seam** is an intelligent digital closet application that helps you organize your wardrobe and discover new outfits using AI.

This project is a **turborepo** monorepo containing:
-   **`apps/web`**: Next.js 14 frontend (React, Tailwind CSS, Lucide).
-   **`apps/api`**: FastAPI backend (Python 3.11, AI/ML processing).
-   **`packages/ui`**: Shared UI component library.

---

## Prerequisites

Before you begin, ensure you have the following installed:
-   **[Bun](https://bun.sh/)** (v1.0+)
-   **Python 3.11+**
-   **Docker** (Optional, for containerized deployment)
-   A **[Supabase](https://supabase.com/)** project

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/seam.git
cd seam
```

### 2. Install Dependencies

Install the frontend and shared dependencies using Bun:

```bash
bun install
```

### 3. Setup Backend (Python)

The backend requires a Python virtual environment.

```bash
cd apps/api
python3.11 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a file named `.env.local` in `apps/web`:

```bash
# apps/web/.env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 5. Database Setup (Supabase)

Run the SQL contained in `supabase_schema.sql` in your Supabase SQL Editor. This will:
-   Create the `profiles` table.
-   Set up Row Level Security (RLS) policies.
-   Create a trigger to auto-generate usernames from email addresses.

### 6. Run the Development Server

From the root of the monorepo, run:

```bash
bun run dev
```

This commands uses Turborepo to fast-start both:
-   **Frontend**: http://localhost:3000
-   **Backend**: http://localhost:8000

---

## Features

-   **Authentication**: Secure passwordless login via Supabase Magic Links.
-   **Wardrobe Management**: Organize your clothes (Tops, Bottoms, Shoes, etc.).
-   **Profile System**: customizable user profiles with auto-generated usernames.
-   **AI Integration**: (In Progress) Background removal and outfit recommendations.

## Deployment

-   **Frontend (Vercel)**: Connects to `apps/web`. The `vercel-ignore` script optimizes builds.
-   **Backend (Railway/Render)**: Deploys `apps/api` using the included `Dockerfile`.
