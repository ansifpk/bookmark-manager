📌 Bookmark Manager

A full-stack Bookmark Manager built with Next.js App Router, Supabase (Google OAuth), and Redux Toolkit.

Users can:

🔐 Login with Google

➕ Add bookmarks

📖 View their bookmarks

✏️ Update bookmarks

🗑 Delete bookmarks

🔒 Access only their own data (RLS enabled)

🚀 Tech Stack

Frontend: Next.js 14+ (App Router)

State Management: Redux Toolkit

Backend/Auth/DB: Supabase

Authentication: Google OAuth via Supabase

Database: PostgreSQL (Supabase)

Validation: Zod

Styling: Tailwind CSS (if applicable)

🏗 Architecture
Authentication Flow

User clicks Login with Google

Supabase redirects to Google

After success → redirects to /auth/callback

exchangeCodeForSession() creates session

User session stored in cookies

Client fetches user → Redux stores user info

Database Structure
users table
Column	Type
id	uuid (PK)
email	text
created_at	timestamp
bookmarks table
Column	Type
id	uuid (PK)
user_id	uuid (FK)
title	text
url	text
created_at	timestamp
🔐 Row Level Security (RLS)
Enable RLS
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

Policies
SELECT
CREATE POLICY "Users can view their bookmarks"
ON bookmarks
FOR SELECT
USING (auth.uid() = user_id);

INSERT
CREATE POLICY "Users can insert their bookmarks"
ON bookmarks
FOR INSERT
WITH CHECK (auth.uid() = user_id);

UPDATE
CREATE POLICY "Users can update their bookmarks"
ON bookmarks
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DELETE
CREATE POLICY "Users can delete their bookmarks"
ON bookmarks
FOR DELETE
USING (auth.uid() = user_id);

📂 Project Structure
app/
 ├── layout.tsx
 ├── page.tsx
 ├── auth/
 │    └── callback/route.ts

components/
 ├── ui/
 │     └── alert-dialog.tsx
 │     └── button.tsx
 │     └── card.tsx
 │     └── dialogue.tsx
 │     └── sonner.tsx
 ├── Header.tsx
 ├── AddDialogue.tsx
 ├── AlertMessage.tsx
 ├── Btn.tsx
 ├── EditDialogue.tsx
 ├── ListBookMark.tsx

store/
 ├── store.ts
 ├── authSlice.ts

lib/
 ├── supabase-client.ts
 ├── supabase-server.ts

⚙️ Environment Variables

Create .env.local:

NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (if needed)

▶️ Getting Started

git clone https://github.com/ansifpk/bookmark-manager
cd bookmark-manager


1️⃣ Install dependencies
npm install

2️⃣ Run development server
npm run dev

3️⃣ Open in browser
http://localhost:3000

🔄 API Endpoints
Get all bookmarks
GET /api/bookmarks

Create bookmark
POST /api/bookmarks

Update bookmark
PUT /api/bookmarks/:id

Delete bookmark
DELETE /api/bookmarks/:id

🧠 Why Redux?

Redux is used to:

Store authenticated user info

Manage UI state globally

Enable scalable state management

Supabase handles:

Session

Token refresh

Auth persistence

🛡 Security

Supabase session stored in HTTP-only cookies

RLS prevents cross-user data access

Server routes validate authenticated user

User ID never trusted from client

✨ Features

Google OAuth Login

Protected Routes

Server Actions

Secure API Routes

RLS-based multi-user isolation

Clean App Router architecture

Scalable state management

📌 Future Improvements

Pagination

Search functionality

Bookmark categories

Tag system

Shareable public bookmarks

Dark mode

Deployment on Vercel

🌍 Deployment

Recommended:

Frontend: Vercel

Backend: Supabase (hosted)

Database: Supabase PostgreSQL

📄 License

MIT License