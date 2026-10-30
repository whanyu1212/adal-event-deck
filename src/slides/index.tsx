import type { ReactElement } from 'react';
import { Doors } from './Doors';
import { Welcome } from './Welcome';
import { BuildClub } from './BuildClub';
import { BuildClubIntro } from './BuildClubIntro';
import { Hosts } from './Hosts';
import { Community } from './Community';
import { MeetAdal } from './MeetAdal';
import { Changelog } from './Changelog';
import { Adal } from './Adal';
import { ModelChoice } from './ModelChoice';
import { Skills } from './Skills';
import { Connectors } from './Connectors';
import { Capabilities } from './Capabilities';
import { VideoTutorial } from './VideoTutorial';
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
    id: 'hosts',
    title: "Meet tonight's speakers",
    render: () => <Hosts />,
    notes: `About a minute, straight after the welcome. Each speaker says one line about themselves, left to right: Wu Hanyu (AdaL), Haorui Chen (Build Club), Darrius Ng (SMU AI Club), Sharan Balaji Manickamoorthy (NUS Product Club).
Then a quick shout-out to the people behind the scenes who aren't on the slide: "Big thanks to Jax from AdaL and the Build Club city leads, and the SMU AI Club and NUS Product Club teams, for making tonight happen."
The QR codes open each speaker's LinkedIn, so leave it up a few seconds for people to scan.`,
  },
  {
    id: 'build-club-intro',
    title: 'Build Club Singapore',
    render: () => <BuildClubIntro />,
    notes: `7:05, Build Club, about 2 minutes of the 5.
Who we are: the most collaborative AI learning community, 70K+ members in 60+ cities. In Singapore we run build nights, VC firesides and industry roundtables.
Three to point at: The Great AI Showcase in May, our Singapore launch hosted at Singtel, with an industry roundtable (Lightspeed SEA, AI Collective, Singtel, Build Club) and startup speed demos; the Go-to-Market Builders AI Build Lab in June, where 200+ people built with Singtel, SMU AI Club and four tool partners (Manus, Exa, Mem0, Vapi); and the sold-out VC Fireside with Aspire in September (Golden Gate, Openspace, GHARAGE, Monk's Hill).
Then move on to tonight's challenge.`,
  },
  {
    id: 'community',
    title: 'AI for everyone in Singapore',
    render: () => <Community />,
    notes: `About a minute, light touch, straight after the Build Club intro.
This year Build Club has been working closely with Singapore enterprises to bring AI adoption to the public, not just the tech crowd. Singtel is one of the main partners: with Singtel we've run Train-the-Trainer sessions for the trainers of the SkillsFuture AI courses, and there are more training sessions, community events and AI building sessions coming.
One practical thing to take home: Singtel AI Pass. Sign up for a selected SkillsFuture AI course (SWDA-supported) and you get about S$600 of premium AI tools free: Manus, Canva, Hailuo AI, Otter.ai, MiniMax and Akool. All of them for 3 months, then keep your favourite for 3 more. The QR has the details and the list of eligible courses.`,
  },
  {
    id: 'build-club',
    title: "Tonight's Build Club challenge",
    render: () => <BuildClub />,
    notes: `About 3 minutes, straight after the Build Club intro.
How the Build Club challenge works: scan, enrol, submit by 8:45. Every project should be submitted by 8:45.
Prizes from AdaL: 1 year of Pro for 1st (also featured on AdaL's channels), 6 months for 2nd, 3 months for 3rd. Everyone who posts a video tagging @adalagent and drops the link in the AdaL Discord gets +1 month. Stress that a post tagging @adalagent is required to claim any credits.
7:10: hand over to SMU AI Club for 5 minutes, then NUS Product Club at 7:15 for 5 minutes, then AdaL from 7:20.`,
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
Both recordings play at 10× speed, with native playback controls. Reduced-motion mode starts paused. Advance once to move on to the Video Producer how-to.
Type /ide inside the CLI to open the current project in AdaL Desktop. Both share the same account, models, skills and project sessions.
Sources: https://docs.sylph.ai/getting-started/desktop-app and https://docs.sylph.ai/features/video-producer/`,
  },
  {
    id: 'video-producer',
    title: 'Video Producer: make a launch video by asking',
    steps: 3,
    render: (step) => <VideoTutorial step={step} />,
    notes: `About 1.5–2 minutes, right before the live demo. Teach the four steps so people can make their own launch video in the build session; the demo then shows a real project going through them. One key press per step. The example is the Ember coffee teaser from the docs, so the prompt in step 1 is the one that made the screenshots in steps 2–4.
01 Ask: say what you want in plain words. Give the facts up front: length, sizes (16:9, 9:16, 1:1), language, and the one thing viewers should remember. Nothing to install, no plugin, no API key.
02 AdaL produces it: it writes a plan (project.md), generates or cuts the clips (shots, voice-over, music, sound effects, animated titles), edits and renders. Titles are drawn with code (Remotion), so text stays sharp. Each generated clip is short (roughly 3–30 s depending on the model); AdaL edits clips into the full video.
03 Revise by chatting: "make the reveal slower", "swap the hero shot". Each message makes a new version, shown as a card on the Canvas. Compare two versions side by side, or ask "go back to v4".
04 Export & share: the .mp4 in videos/ is always the current version; Export on the Canvas gives a full-quality render of any version. Everything lives in the project folder (default ~/AdaL/Videos/).
Tips strip: give the facts up front; bring your own footage, screen recordings and logo (drop them in the project folder and mention them); change one thing per message so each version is one clear change.
Point at the Launch library card: big-brand launch videos (ElevenLabs, Cursor, Supabase, Anthropic and more) remade with AdaL as exact replicas, in AdaL style or rebranded, each tagged with the model used. Good starting points for their own prompts.
Worth knowing if asked: the Files panel, Canvas, Media tab and Videos sidebar are in AdaL Desktop. Video, image and voice generation use AdaL credits, even with your own API keys (BYOAK). Default video model is Gemini Omni Flash; ask for "minimax-h3" or "seedance-2.5" by name. Renders take minutes, so start the video early in the build session.
Source: https://docs.sylph.ai/features/video-producer/`,
  },
  {
    id: 'demo-build',
    title: 'Live demo: Build & launch',
    render: () => <DemoPart />,
    notes: `About 15 min. Follow one project through a unified code-to-launch session, not separate Build and Launch tracks. Explain that the multi-minute research and video renders were pre-run so we can inspect the full session without the render wait, then finish the launch live.
01 · Build & verify: update the app, inspect the diff in AdaL with Review Agent, and verify the live UI directly in AdaL's browser.
02 · Research & produce: walk through the pre-run Deep Research competitor and audience findings, inspect Image Studio visuals, and trace the Video Producer timeline from v1 to v3. Be explicit that these heavy lifts were prepared, not rendered live on stage. The room has just seen the four Video Producer steps on the previous slide, so point back to them as you open the project: the plan, the timeline, the versions on the Canvas.
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
    notes: `9:15 to 9:30. Survey QR, shout-outs, freebies if confirmed, Build Club SG Volunteer Group, group photo.
The right-hand QR joins the Build Club SG Volunteers WhatsApp group: invite anyone who'd like to help run the next events.
Survey first, before the photo: "phones out, two minutes", and wait while people scan the left QR. It opens the Build Night Survey: https://docs.google.com/forms/d/e/1FAIpQLSeVleYeD1wS8aA4WdT2tVbiubpeZVk3Fh3uIE7RgKH_DJyfqA/viewform
Plug the AdaL Global Ambassador Program (card on the right): host events, make content, or both. Ambassadors get a free AdaL plan, merch, event budget and codes for their guests. The QR opens the application form; adalagent.ai/community has the details.`,
  },
];
