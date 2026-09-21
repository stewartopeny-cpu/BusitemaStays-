# START HERE

You do not need to understand every file in this project.

## The five places that matter

| What you want to change | Open this file or folder |
| --- | --- |
| Hostel names, prices, services and room details | `app/page.tsx` |
| Website colours, sizes and layout | `app/globals.css` |
| Website title and general page settings | `app/layout.tsx` |
| Booking or room-request behaviour | `app/api/bookings/route.ts` |
| Hostel photos and logo | `public/` |

## Folders you can ignore

- `.openai/` — online hosting settings.
- `build/` and `scripts/` — automatic build helpers.
- `components/`, `hooks/` and `vendor/` — ready-made interface support.
- `db/` — database connection files.
- `tests/` — automatic website checks.

Do not delete these folders. Some are used automatically when the website is built or published.

## How to change a hostel

Open `app/page.tsx`, search for the hostel name, then edit the nearby price, room type, services, phone number or details. Photo names begin with `/` and must match a file inside `public/`.

Example:

```tsx
name: "Precious Executive Hostel",
price: "300,000",
amenities: ["Wi-Fi", "Water", "Security"],
phone: "+256773351738"
```

## How to add a photograph

1. Put the image inside `public/`.
2. Give it a simple name such as `hostel-name-room.jpg`.
3. Find that hostel in `app/page.tsx`.
4. Add `"/hostel-name-room.jpg"` to its `photos` list.

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

