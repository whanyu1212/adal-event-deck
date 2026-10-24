# Build Club Singapore × AdaL × SMUAI × NUS Product Club Build Night deck

The web deck for **Build it. Launch it.** on Friday 30 October 2026, 6:30–9:30pm SGT.
It's built with Astro (static output), one React component for the deck, and Motion for animation.

The live demo runs in a terminal. The deck covers everything around it: doors open, housekeeping,
Build Club, the demo section slides and backup video, the 75-minute build-session screen,
show-and-tell and the close.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:4321.

## Run it offline at the venue

Build once while you have internet, then serve the build locally. Fonts are bundled and QR codes are drawn in the browser, so nothing loads from the network.

```bash
npm run build
```

```bash
npm run preview
```

Use `npm run preview`, not a double-click on `dist/index.html`. The asset paths need a server.

## Present it

| Key | What it does |
|---|---|
| → ↓ Space Enter PageDown | Next step or slide (clickers send PageDown) |
| ← ↑ PageUp Backspace | Previous step or slide |
| Home / End | First / last slide |
| F or double-click | Fullscreen |
| P | Open the presenter window (notes, next slide, clock, buttons) |
| B or . | Blank the screen. Esc or B again brings it back |
| T | Switch between the light and dark theme (both windows follow) |
| S / R / N / Shift+N | Show-and-tell only: start or pause the timer, reset it, next or previous presenter |

**Meet AdaL** (slide 3) steps through seven key presses before the deck moves on: the Ada Lovelace
beat, a run of her Note G program that stops on its bug and then fixes it, then Builds, Launches and
Connects, then a scripted terminal. The presenter window shows "step 2 of 7". Pressing back from the next slide lands on the last step. Any slide can do this by
setting `steps` in `src/slides/index.tsx` and reading the `step` its `render` receives.

The audience and presenter windows stay in step through `localStorage`, so you can drive either one.
Each slide has its own link (`#/9` is the build session), so a reload lands on the same slide.

### Light or dark

The deck opens in the **light** theme: warm paper and ink, made for a brightly lit room.
A projector can't show black darker than the lit screen it lands on, so dark slides wash out to grey under room lights.

For a dim room, open it with `?theme=dark` (for example http://localhost:4321/?theme=dark), press **T**, or use the theme button.
The button sits in the top-left corner of the screen, outside the slide, and fades out with the cursor when the mouse is still, so the room never sees it. The presenter window has one too.
Reloading always goes back to the theme in the URL, so a dark rehearsal never carries over into the night.
Check both on the venue projector during setup and keep whichever reads better from the back row.

### Rehearse the clock

The schedule, build-session countdown and timeline all follow Singapore time on the event date,
whatever time zone your laptop is set to. To rehearse at a different time:

- `?now=20:38` pretends it's 8:38pm on the night (24-hour time).
- `?speed=30` runs the clock 30 times faster.

For example, http://localhost:4321/?now=20:38&speed=10#/9 shows the build session just before the time warning.
The show-and-tell timer always uses real time.

## Edit the content

Almost everything lives in [`src/event.ts`](src/event.ts): Wi-Fi, schedule, build-session times,
track prompts, show-and-tell presenters and links. Text in `[square brackets]` is a placeholder.
An empty link shows a "Link coming" box in place of its QR code.
Keep each track prompt to about 90 characters. The build-session screen fits two lines per prompt, and a third line pushes the list off the bottom.

Still to fill in before the night:

- [ ] Wi-Fi network and password
- [ ] Build Club dashboard link (QR on the Build Club and build-session slides)
- [ ] Feedback survey link and next Build Club event link (close slide)
- [ ] One line about Build Club Singapore
- [ ] AdaL one-liner, confirmed with SylphAI
- [ ] Show-and-tell presenters (fill in at 8:15, then rebuild, or leave the placeholders)
- [ ] Backup recording at `public/demo-backup.mp4` (git ignores it, so copy it onto the presenting laptop)
- [ ] Optional: swap `public/logos/build-club.png` for the horizontal Build Club logo used on the poster. The current file is the stacked logo from buildclub.ai at 488×469.

Logos are in `public/logos/`. The colours and type follow AdaL's site (adalagent.ai) and the Build Night poster. The tokens are at the top of `global.css`.

The slide order and speaker notes are in [`src/slides/index.tsx`](src/slides/index.tsx).
Each slide is its own component in `src/slides/`, and styles are in [`src/styles/global.css`](src/styles/global.css).
Only show AdaL features that are documented on [docs.sylph.ai](https://docs.sylph.ai).

## Deploy

The build is a plain static site in `dist/`, so any static host works:

- **Vercel or Netlify:** import the repo. The build command is `npm run build` and the output directory is `dist`. Both detect Astro automatically.
- **Cloudflare Pages:** framework preset Astro, build command `npm run build`, output `dist`.

The deployed link is for sharing after the event. On the night, present from `npm run preview` on the laptop so venue Wi-Fi can't take the deck down.

## Continuous integration and Vercel

GitHub Actions runs `npm ci`, `npm run check`, and `npm run build` on pull
requests to `main` and pushes to `main`, using Node.js 22. Set `Check and build`
as a required status check in the repository's main-branch rules.

Import `whanyu1212/adal-event-deck` into Vercel with the repository root as the
root directory and `main` as the production branch. Use Node.js 22.x in the
project settings. `vercel.json` selects Astro, runs type checks before the
production build, and publishes `dist/`. Vercel's Git integration provides
branch previews and deploys merged changes to production; no Vercel token is
needed in GitHub Actions.

The backup recording `public/demo-backup.mp4` is intentionally ignored by Git
and is not included in Git-based deployments. The connector GIF and screenshots
are tracked and deploy with the site.
