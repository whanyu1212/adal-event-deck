import type { ReactElement } from 'react';
import { Doors } from './Doors';
import { Welcome } from './Welcome';
import { BuildClub } from './BuildClub';
import { MeetAdal } from './MeetAdal';
import { Adal } from './Adal';
import { ModelChoice } from './ModelChoice';
import { Skills } from './Skills';
import { Connectors } from './Connectors';
import { Capabilities } from './Capabilities';
import { DemoPart } from './DemoPart';
import { DemoBackup } from './DemoBackup';
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
    id: 'adal',
    title: 'From first change to first impression',
    steps: 2,
    render: (step) => <Adal step={step} />,
    notes: `Introduce three capabilities: write and check code, research competitors, and create launch content. Spend about one minute here.
In a second AdaL session, start the promo video and competitor research with the prepared prompts so they can run while you demonstrate the code change.`,
  },
  {
    id: 'model-choice',
    title: 'Multimodal. No model vendor lock-in.',
    steps: 7,
    render: (step) => <ModelChoice step={step} />,
    notes: `About one minute. AdaL lets you choose between model providers within the same workflow, so you are not tied to a single model vendor.
Use the next key to advance the illustrated terminal: /model switches among Anthropic, OpenAI and Google, then /model config demonstrates high, low and max effort. After the effort demo, advance once more to reveal the access options. Available effort levels vary by model.
The right side summarizes code, image, video and audio capabilities.
Also mention BYOAK, custom endpoints compatible with the provider API, and local Ollama models (preview). BYOAK does not cover image, video or voice generation; those use AdaL credits. Local models currently have no image input.
References: https://docs.sylph.ai/customize/bring-your-own-api-key/ and https://docs.sylph.ai/customize/local-models/
This is a stylized illustration of the commands, not a live terminal. Next introduce reusable skills.
Command reference: https://docs.sylph.ai/getting-started/models/`,
  },
  {
    id: 'skills',
    title: 'Give AdaL your way of working',
    steps: 2,
    render: (step) => <Skills step={step} />,
    notes: `About 45–60 seconds. Models give you choice; skills let you reuse a way of working.
Explain reuse, share and discover. Invoke your own, your team's or a community skill by its @skills path without installing the skill itself. Some skills still require software, accounts or API keys.
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
    title: 'One request. A whole workflow',
    steps: 3,
    render: (step) => <Capabilities step={step} />,
    notes: `About one minute. Capabilities are built-in tools and instructions that AdaL loads when needed. Several can work in the same conversation. Unlike the community skills slide, these come with AdaL.
Advance to load Research, Images, and Video in sequence. Explain how the request combines these built-in capabilities. Browser use also supports checking real flows; mention it verbally if useful. Video Producer can use supplied footage or generated clips, add audio and captions, and keep revisions you can compare or restore.
The example prompt illustrates a combined workflow; it is not a claim that this output has already been generated. /capabilities shows what is available and active; it is not an on/off switch.
Omit model catalogs, pricing, internal loading details and the autonomy auditor from this short introduction. Mention writing assistance verbally if useful.
Sources: https://docs.sylph.ai/features/capabilities/ ; https://docs.sylph.ai/features/video-producer/ ; https://docs.sylph.ai/features/image-generation/
The image/video page contains older references to agent modes; use the current capabilities page for automatic loading behavior.`,
  },
  {
    id: 'demo-build',
    title: 'Live demo: Build & launch',
    render: () => <DemoPart />,
    notes: `About 15 min. Start in session 1: make a small code change and check it in AdaL's browser.
Then switch to session 2 for competitor research and the promo video. Use prepared results if they are still running. Finish by writing launch copy live.
The backup demo is after the closing slide if needed.`,
  },
  {
    id: 'build-block',
    title: 'Build session',
    bare: true,
    render: () => <BuildBlock />,
    notes: `7:30 to 8:45. Leave this up for the whole build session.
8:15 open show-and-tell sign-ups (5 spots). 8:40 time warning. 8:45 submissions close.
Fill in presenters in src/event.ts, or edit on the night and rebuild.`,
  },
  {
    id: 'show-and-tell',
    title: 'Show-and-tell',
    render: () => <ShowAndTell />,
    notes: `8:45, 30 min, five 5-minute demos.
Keys: S start or pause the timer, R reset it, N next presenter, Shift+N previous.`,
  },
  {
    id: 'close',
    title: 'Close',
    render: () => <Close />,
    notes: `9:15 to 9:30. Survey QR, shout-outs, freebies if confirmed, next Build Club event, group photo.`,
  },
  {
    id: 'demo-backup',
    title: 'Backup demo',
    render: () => <DemoBackup />,
    notes: `Only if the live demo fails. Click the video to play.
Plays from public/demo-backup.mp4, which needs no network.`,
  },
];
