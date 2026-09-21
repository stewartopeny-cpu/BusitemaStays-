# Busitema Stays

This is the complete source code for the Busitema Stays website.

Start with **START_HERE.md**. It explains the few files you may need to edit and which technical folders you can safely ignore.

## Quick start

1. Install Node.js 22 or newer.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local address shown in the terminal.

## Manager sign-in

The manager dashboard uses private accounts and does not require ChatGPT. Add these environment variables before hosting:

- `MANAGER_PASSWORD` — your private password (at least 8 characters).
- `MANAGER_AUTH_SECRET` — a separate long random phrase used to protect the login session.

Students do not need an account to browse hostels, request rooms or track bookings.

## Main commands

- `npm run dev` — open the website locally.
- `npm run build` — check that it is ready for hosting.
- `npm test` — run the project checks.

## Important files

- `app/page.tsx` — home page, hostel listings, search and filters.
- `app/globals.css` — colours, spacing and website design.
- `app/layout.tsx` — website name and general page settings.
- `app/api/bookings/route.ts` — student room-request handling.
- `public/` — hostel photographs and the logo.

The remaining files support building, testing, database connections and online hosting. They normally do not need to be changed.
