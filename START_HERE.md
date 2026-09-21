# START HERE

You do not need to understand every file in this project.

## The five places that matter

| What you want to change | Open this file or folder |
| --- | --- |
| Hostel names, prices, services and room details | Manager dashboard → Hostel listing editor |
| Website colours, sizes and layout | `app/globals.css` |
| Website title and general page settings | `app/layout.tsx` |
| Booking or room-request behaviour | `app/api/bookings/route.ts` |
| Hostel photo links | Manager dashboard → Hostel listing editor |
| Logo and lightweight placeholder | `public/` |

## Folders you can ignore

- `.openai/` — online hosting settings.
- `build/` and `scripts/` — automatic build helpers.
- `components/`, `hooks/` and `vendor/` — ready-made interface support.
- `db/` — database connection files.
- `tests/` — automatic website checks.

Do not delete these folders. Some are used automatically when the website is built or published.

## How to change a hostel without editing code

1. Go to `/manager/login` on the published website and sign in.
2. Open **Hostel listing editor**.
3. Change the price, location, room types, services, availability, contact,
   descriptions or photo links.
4. Select **Save listing**. The public website reads the saved information from
   the database immediately.

The owner account can edit every hostel and create manager accounts. Each
manager account can edit only the hostel assigned to it, and cannot change
another manager's listing.

## How to add photographs later

The source package does not include hostel photographs, so it stays small and
easy to upload. Every hostel displays the lightweight “Photo coming soon” image
until you add its photos.

1. Upload a photo to an image-hosting service and copy its public link.
2. Sign in to the website manager dashboard.
3. Open **Hostel listing editor** and select the hostel.
4. Paste one link into **Main photo link**.
5. Paste any extra links into **More photo links**, one link per line.
6. Select **Save listing**. Students will see the photos immediately.

Direct uploads from your phone can be connected later using Cloudflare R2.

## How to run the website

Install Node.js 22 or newer, open a terminal in this project folder, and run:

```bash
npm install
npm run dev
```

The terminal will display a local address. Open it in your browser.

## Before publishing

Run:

```bash
npm run build
```

If the build finishes successfully, the source is ready for hosting.
