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
02 · Research & produce: walk through the pre-run Deep Research competitor and audience findings, inspect Image Studio visuals, and trace the Video Producer timeline from v1 to v3. Be explicit that these heavy lifts were prepared, not rendered live on stage.
03 · Publish & automate: chain @skills on the same session context for human-sounding launch copy, then connect X, LinkedIn, Slack and Notion for the live finishing steps. Confirm destinations and content before publishing.
Bridge to the next slide: now it is your turn for the 75-minute build session.
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
