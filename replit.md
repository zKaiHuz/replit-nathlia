# replit.md

## Overview

This is a **VSL (Video Sales Letter) landing page** application targeting a Portuguese-speaking audience. It's a lead capture page with a video player, CTA buttons, testimonials, feature lists, and an email collection form. The app collects email leads through a simple form and stores them in a PostgreSQL database.

The project follows a monorepo structure with a React frontend, Express backend, and shared schema/route definitions between them.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Directory Structure
- **`client/`** — React frontend (Vite-powered SPA)
- **`server/`** — Express 5 backend API
- **`shared/`** — Shared TypeScript types, Zod schemas, and route definitions used by both client and server
- **`migrations/`** — Drizzle ORM database migrations
- **`script/`** — Build scripts (esbuild for server, Vite for client)

### Frontend Architecture
- **Framework:** React with TypeScript, bundled by Vite
- **Routing:** Wouter (lightweight client-side router)
- **State/Data Fetching:** TanStack React Query for server state management
- **UI Components:** Shadcn/ui (new-york style) built on Radix UI primitives with Tailwind CSS
- **Forms:** React Hook Form with Zod validation via `@hookform/resolvers`
- **Styling:** Tailwind CSS with CSS variables for theming. Dark theme by default with orange (#ec7c00) as the primary accent color. Custom fonts: Montserrat (headings) and Inter (body).
- **Path aliases:** `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend Architecture
- **Framework:** Express 5 running on Node.js with TypeScript (executed via `tsx`)
- **API Pattern:** RESTful API with route definitions shared between client and server via `shared/routes.ts`. This shared contract uses Zod schemas for input validation and response typing.
- **Storage Layer:** `server/storage.ts` defines an `IStorage` interface with a `DatabaseStorage` implementation, making the storage layer swappable.
- **Development:** Vite dev server runs as middleware inside Express during development (`server/vite.ts`), providing HMR. In production, Express serves the static build from `dist/public/`.

### Data Storage
- **Database:** PostgreSQL via `DATABASE_URL` environment variable
- **ORM:** Drizzle ORM with `drizzle-zod` for schema-to-Zod conversion
- **Schema:** Defined in `shared/schema.ts`. Currently has one table:
  - `leads` — `id` (serial PK), `email` (text, required)
- **Migrations:** Managed via `drizzle-kit push` (`npm run db:push`)

### API Routes
- `POST /api/leads` — Creates a new lead with email validation. Returns 201 with the created lead or 400 with validation errors.

### Build Process
- **Client:** Vite builds to `dist/public/`
- **Server:** esbuild bundles to `dist/index.cjs` with key dependencies bundled (not externalized) for faster cold starts
- **Dev:** `npm run dev` runs both via tsx
- **Prod:** `npm run build` then `npm run start`

### Shared Contract Pattern
The `shared/routes.ts` file defines API contracts with method, path, input schema, and response schemas. Both the server handler and client hook reference the same contract, ensuring type safety across the stack.

## External Dependencies

### Database
- **PostgreSQL** — Required. Connection string must be provided via `DATABASE_URL` environment variable. Used with `pg` (node-postgres) driver and Drizzle ORM.
- **connect-pg-simple** — Listed as dependency (for session storage), though not currently used in visible code.

### Key NPM Packages
- **drizzle-orm / drizzle-kit / drizzle-zod** — ORM, migration tooling, and Zod schema generation
- **express v5** — HTTP server
- **@tanstack/react-query** — Client-side data fetching/caching
- **zod** — Schema validation (shared between client and server)
- **wouter** — Client-side routing
- **Radix UI** — Headless UI primitives (full suite installed)
- **lucide-react** — Icon library
- **react-hook-form** — Form management
- **tailwindcss** — Utility-first CSS

### Replit-specific
- `@replit/vite-plugin-runtime-error-modal` — Runtime error overlay in dev
- `@replit/vite-plugin-cartographer` — Dev tooling (dev only)
- `@replit/vite-plugin-dev-banner` — Dev banner (dev only)

### Google Fonts (CDN)
- Montserrat, Inter, DM Sans, Fira Code, Geist Mono, Architects Daughter — loaded via Google Fonts CDN in `index.html` and `index.css`