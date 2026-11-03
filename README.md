# Mireya Bertolli — A Winter Wonderland

A complete Next.js website invitation with mobile layout, snowfall, sparkling lights, scroll reveals, countdown, venue directions, photo gallery, and an optional song player.

## Deploy using GitHub + Vercel

1. Create a new GitHub repository (for example `mireya-quince`).
2. Upload all files from this folder **including the `app` and `public` folders** to the repository root.
3. Go to https://vercel.com/new, import the repository, select Next.js if prompted, and click Deploy.
4. Share the Vercel URL with guests after checking all information and photos.

## Add Mireya's real photos

Put these photos in `public/photos/` using the exact filenames:
- `mireya-main.jpg` — portrait in the elegant arched frame
- `mireya-1.jpg`, `mireya-2.jpg`, `mireya-3.jpg` — gallery

Photos are displayed without AI modification. Before photos are uploaded, the website shows tasteful placeholders.

## Add Blue Velvet by Bobby Vinton

The original copyrighted recording is **not included**. Obtain the right to use the recording on a public website and put your authorized MP3 at `public/music/blue-velvet.mp3`. The music player is ready to play, pause, mute, and loop that file. Browser autoplay restrictions mean visitors must press Play themselves.

Do not use a streaming service download or embed a recording without permission. If you cannot license the recording, leave the file absent and remove the music player or substitute licensed music.

## Run locally

Install Node.js 20 or newer. Then:

```bash
npm install
npm run dev
```

Visit http://localhost:3000. For a production test run `npm run build`.

## Edit the invitation

- Event date, address, links, text, and photos are in `app/page.tsx`.
- Colors, layout, snowfall, and animation styles are in `app/globals.css`.
- Countdown uses El Paso's January UTC-7 offset.
- No reception section is included.
- No RSVP link is included until you provide one.
