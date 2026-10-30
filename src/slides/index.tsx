import type { ReactElement } from 'react';
import { Doors } from './Doors';
import { Welcome } from './Welcome';
import { BuildClub } from './BuildClub';
import { MeetAdal } from './MeetAdal';
import { Changelog } from './Changelog';
import { Adal } from './Adal';
import { ModelChoice } from './ModelChoice';
import { Skills } from './Skills';
import { Connectors } from './Connectors';
import { Capabilities } from './Capabilities';
import { DemoPart } from './DemoPart';
import { Redeem } from './Redeem';
import { BuildBlock } from './BuildBlock';
import { ShowAndTell } from './ShowAndTell';
import { Close } from './Close';

export type Slide = {
  id: string;
  title: string;
  /** Speaker notes, shown in the presenter window. */
  notes: string;
  /** Reveals itself in this many extra key presses before the deck moves on. `render` gets the current step. */
  steps?: number;
  render: (step: number) => ReactElement;
  /** Hide the shared footer (hosts and clock) on slides that carry their own. */
  bare?: boolean;
};

// Order follows the run of show in the event plan.
export const slides: Slide[] = [
  {
    id: 'doors',
    title: 'Doors open',
    bare: true,
    render: () => <Doors />,
    notes: `6:30 to 7:00. Leave this up during check-in and food.
Helpers: install, sign-in, credits. Point non-coders to the browser-based IDE if SylphAI confirms it.`,
  },
  {
    id: 'welcome',
    title: 'Welcome & tonight',
    render: () => <Welcome />,
    notes: `7:00, host, 5 min.
Cover Wi-Fi, how to get help, photography and the opt-out, then walk through tonight's schedule. The highlighted row follows the clock.`,
  },
  {
    id: 'build-club',
    title: 'Build Club Singapore',
    render: () => <BuildClub />,
    notes: `7:05, Build Club, 5 min.
Who we are, and how dashboard submission works. Every project should be submitted by 8:45.`,
  },
  {
    id: 'meet-adal',
    title: 'Why the name AdaL?',
    render: () => <MeetAdal />,
    notes: `About 20–30 seconds. AdaL is named after Ada Lovelace, a pioneer of computer programming. Created by SylphAI. Keep the name story brief, then move to the three capabilities.`,
  },
  {
    id: 'changelog',
    title: 'AdaL has come a long way',
    steps: 4,
    render: (step) => <Changelog step={step} />,
    notes: `About 45 seconds. Keep it humble: this is how AdaL grew from a terminal coding agent into a place to build and launch, one useful feature at a time. Don't quote release counts. Each key press reveals one period; pick one highlight from each instead of reading every bullet.
Dec–Jan: a coding agent in the terminal, with resume, /compact, skills and Plan mode.
Feb–Mar: parallel tool calls, subagents, image generation, headless mode; 1.0 shipped with Deep Research.
Apr–Jun: the Cron agent, the AdaL Desktop preview with Review Agent, and Browser Use.
Jul–Aug: the Agent SDK and custom tools, BYOAK for every provider, the @Skills Hub at atskills.one.
Sep–Oct: capabilities (browser, video, autonomy auditor), social listening, Connectors, Desktop on Windows and Linux, and the full video producer.
Bridge: everything you'll see tonight landed along that path. Source: https://docs.sylph.ai/changelog/`,
  },
  {
    id: 'adal',
    title: 'Build + Launch: AdaL helps with both halves',
    steps: 2,
    render: (step) => <Adal step={step} />,
    notes: `About 1–1.5 minutes. Open with the why: building is easy now; being seen is the skill. GTM (go-to-market) means getting what you built in front of the people it's for.
It isn't only a founder skill (the strip at the bottom): engineers need real users for side projects, open-source repos and internal tools; students and job seekers stand out with a live, explained project; anyone at work uses it to pitch an idea, know the audience and write the post.
Then the how, one key press per panel: Build (write and check code), Research (competitor context), Launch (story and visuals; the video plays on the last step).
Tonight counts too: a landing page, a post or a short video is a valid submission.
In a second AdaL session, start the promo video and competitor research with the prepared prompts so they can run while you demonstrate the code change.`,
  },
  {
    id: 'model-choice',
    title: 'Multimodal. No model vendor lock-in.',
    steps: 2,
    render: (step) => <ModelChoice step={step} />,
    notes: `About one minute. AdaL lets you choose between model providers within the same workflow, so you are not tied to a single model vendor.
Three frames, two advances: step 0 shows /model with Anthropic, OpenAI and Google; step 1 shows /model config with max reasoning effort selected; step 2 highlights the flexible access options. Available effort levels vary by model.
The right side summarizes code, image, video and audio capabilities.
Also mention BYOAK, custom endpoints compatible with the provider API, and local Ollama models (preview). BYOAK does not cover image, video or voice generation; those use AdaL credits. Local models currently have no image input.
References: https://docs.sylph.ai/customize/bring-your-own-api-key/ and https://docs.sylph.ai/customize/local-models/
This is a stylized illustration of the commands, not a live terminal. Next introduce reusable skills.
Command reference: https://docs.sylph.ai/getting-started/models/`,
  },
  {
    id: 'skills',
    title: 'Try any skill. Keep only what works.',
    steps: 2,
    render: (step) => <Skills step={step} />,
    notes: `About 45–60 seconds. Models give you choice; skills let you reuse a way of working.
Land two points: AdaL gives you a skills marketplace (atskills.one, 63,000+ skills) AND skill management (:save, :install, /skills).
Step 0, try once: reference a skill by its @skills path. It loads for that task only, so there's no context bloat, and nothing is installed, so there's nothing to clean up after a one-off try.
Step 1, chain: combine marketplace skills with your repo's own .atskills/ in one prompt.
Step 2, keep & manage: :save versions a copy in the repo, :install auto-triggers it, /skills shows what's loaded.
Some skills still require software, accounts or API keys.
The example is from https://atskills.one/: @skills:gh:SylphAI-Inc/skills/skills/glowmotion draw the auth flow.
This is an example prompt, not a live run. Optionally demonstrate it in AdaL during the live demo. The QR opens the skills hub. Skills are an open standard; do not claim exclusivity to AdaL.`,
  },
  {
    id: 'connectors',
    title: 'Bring your apps into the conversation',
    steps: 2,
    render: (step) => <Connectors step={step} />,
    notes: `About 45 seconds. The GIF is assembled from real AdaL Desktop connector catalog captures, with pans through each captured section. The connected-account email is hidden.
Point out familiar apps: Gmail and Drive for context, GitHub and Linear for project work, and LinkedIn or Instagram for launch work. Connect once and use across chats. Each connector requires its own account access and supports the actions shown in the catalog.
The animation can be stopped or replayed; reduced-motion mode starts with a still image. Then show how capabilities combine in one request.`,
  },
  {
    id: 'capabilities',
    title: 'Terminal speed. Desktop clarity.',
    steps: 0,
    render: () => <Capabilities />,
    notes: `About 45–60 seconds. Show that AdaL fits both terminal-native developers and visual product builders.
On the left: AdaL CLI gives you fast keyboard-first coding, git worktrees, headless mode and the SDK.
On the right: the AdaL Desktop recording shows issue triage in a project chat, with projects, Schedule and Connectors in the visual workspace.
Both recordings play at 10× speed, with native playback controls. Reduced-motion mode starts paused. Advance once to go straight to the live demo.
Type /ide inside the CLI to open the current project in AdaL Desktop. Both share the same account, models, skills and project sessions.
Sources: https://docs.sylph.ai/getting-started/desktop-app and https://docs.sylph.ai/features/video-producer/`,
  },
  {
    id: 'demo-build',
    title: 'Live demo: Build & launch',
    render: () => <DemoPart />,
    notes: `About 15 min. Follow one project through a unified code-to-launch session, not separate Build and Launch tracks. Explain that the multi-minute research and video renders were pre-run so we can inspect the full session without the render wait, then finish the launch live.
01 · Build & verify: update the app, inspect the diff in AdaL with Review Agent, and verify the live UI directly in AdaL's browser.
02 · Research & produce: walk through the pre-run Deep Research competitor and audience findings, inspect Image Studio visuals, and trace the Video Producer timeline from v1 to v3. Be explicit that these heavy lifts were prepared, not rendered live on stage. Point at the Launch library card (adalagent.ai/launch-library): big-brand launch videos (ElevenLabs, Cursor, Supabase, Anthropic and more) remade with AdaL as exact replicas, in AdaL style or rebranded, each tagged with the model used. Good references when people make their own promo video tonight.
03 · Launch: write the launch copy from the same session context (optionally with an @skills writing skill, if it fits on the day), then post through connected X, LinkedIn, Slack and Notion. Confirm destinations and content before publishing.
Bridge to the next slide: now it is your turn for the 75-minute build session.`,
  },
  {
    id: 'redeem',
    title: 'Promo code: 1 month of AdaL Pro',
    render: () => <Redeem />,
    notes: `About 1–2 minutes, right before the build session starts. Give the room a moment to scan before you move on.
Code: BUILDCLUBSINGAPORE-BJEC. One month of AdaL Pro, valid until 13 November. The QR opens adal.sylph.ai/sign-up.
New users: sign up, then enter the code at "Have a promo or referral code?" when picking a plan. Existing users: Settings → Billing → "Have a promo code?" → pick the current plan → "Add promo code to my plan" (applies to the next bill).
Each code can be redeemed once per account, and a subscription can only hold one active promo, so anyone already on a promo (e.g. the student discount) may see it rejected. Helpers can sort those out during the build session.
The code also shows on the Doors slide and in the corner of the build session, so latecomers can still find it. When the room is ready, move on and press Start on the build session if the schedule has slipped.`,
  },
  {
    id: 'build-block',
    title: 'Build session',
    render: () => <BuildBlock />,
    notes: `75 minutes. Leave this up for the whole build session.
It follows the 7:30 schedule by itself. If the demo runs over, press "Start 1:15:00 countdown" (here, or top-right of the audience screen when you move the mouse) when the room actually starts: the full 75 minutes run from that moment, in every window, and survive a reload. Restarting a running session takes a second click. "Back to schedule" undoes it.
Sign-ups open 45 min in, the time warning comes 5 min before the end, and submissions close at the end; the slide shows the actual times.
The rocket flies from Earth to the AdaL planet as the time runs, blasting asteroids; it boosts in the last five minutes and celebrates at the end.`,
  },
  {
    id: 'show-and-tell',
    title: 'Show-and-tell',
    render: () => <ShowAndTell />,
    notes: `8:45, 30 min, five 5-minute demos. Presenters join the Zoom from the QR and share their screen; no fixed line-up.
The QR uses the full join link with the passcode built in, so scanning joins straight away. Typing it in: us04web.zoom.us/j/72913725219, meeting ID 729 1372 5219, passcode 0mz7PB.
Meeting chat: https://us04web.zoom.us/launch/jc/72913725219
Zoom details live in src/event.ts (showAndTell.zoom). Keep time on your phone; there's no on-screen timer.`,
  },
  {
    id: 'close',
    title: 'Close',
    render: () => <Close />,
    notes: `9:15 to 9:30. Survey QR, shout-outs, freebies if confirmed, next Build Club event, group photo.
Survey first, before the photo: "phones out, two minutes", and wait while people scan the left QR. It opens the Build Night Survey: https://docs.google.com/forms/d/e/1FAIpQLSeVleYeD1wS8aA4WdT2tVbiubpeZVk3Fh3uIE7RgKH_DJyfqA/viewform
Plug the AdaL Global Ambassador Program (card on the right): host events, make content, or both. Ambassadors get a free AdaL plan, merch, event budget and codes for their guests. The QR opens the application form; adalagent.ai/community has the details.`,
  },
];
