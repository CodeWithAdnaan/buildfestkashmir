# BuildFest Kashmir

The official web platform for BuildFest Kashmir, a student run developer community in Srinagar. 

We started BuildFest to build real systems, foster open source culture, and bring developers together across Kashmir. This codebase powers our main platform, event registrations, student profiles, open source blogs, and community applications.

## Tech Stack

* Next.js 16 (App Router, Server Actions, React Server Components)
* TypeScript
* Tailwind CSS v4 (design tokens configured in `src/app/globals.css`)
* Supabase (Database, Auth, Row Level Security, Storage Buckets)
* Framer Motion & Lenis (Smooth scrolling and subtle UI reveals)
* Zod & React Hook Form (Type safe form validation)
* Geist Sans & Geist Mono (Self hosted local fonts)

## Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/CodeWithAdnaan/buildfestkashmir.git
cd buildfestkashmir
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
RESEND_API_KEY=re_your_optional_resend_key
```

### 3. Database Migrations

Apply the 4 SQL migration files located in `supabase/migrations/` to your Supabase project using the SQL Editor or CLI:

```bash
npx supabase db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Project Features

* **Events & Registrations**: Interactive event pages with live countdowns, schedule details, registration forms, Zod validation, and QR code tickets.
* **Supabase Auth & Profiles**: Email sign up and sign in flows, protected user profile pages, personal details editing, and avatar image uploads.
* **Blogs & Technical Essays**: Markdown rendered technical articles, live search bar, category tag filtering, reading progress bar, table of contents, author bios, and social sharing.
* **Team Applications**: Student role application dialogs connected to Supabase database tables.
* **Partner Directory**: Partner tiers showcase and prefilled partnership contact forms.
* **Security & RLS**: Strict Row Level Security policies on database tables and media storage buckets.

## Folder Architecture

```text
src/
  app/           Route pages, layouts, server actions, and auth routes
  components/    UI primitives, site header/footer, and section components
  lib/           Supabase clients, constant data, validation schemas, and helpers
  types/         Shared TypeScript interfaces
supabase/
  migrations/    SQL database schema, RLS policies, and storage buckets
```

## Contributing

BuildFest Kashmir is open source and community driven. If you want to fix a bug, add a feature, or improve documentation, open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
