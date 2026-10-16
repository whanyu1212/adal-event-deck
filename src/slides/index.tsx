import type { ReactElement } from 'react';
import { Doors } from './Doors';
import { Welcome } from './Welcome';
import { BuildClub } from './BuildClub';
import { Adal } from './Adal';
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
  render: () => ReactElement;
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
    id: 'adal',
    title: 'What is AdaL',
    render: () => <Adal />,
    notes: `7:10, about 2 min.
WHILE TALKING: in a second AdaL session, start the promo video and competitor research with the pre-written prompts.
Only mention features documented on docs.sylph.ai.`,
  },
  {
    id: 'demo-build',
    title: 'Demo: Build',
    render: () => <DemoPart track="build" />,
    notes: `About 7 min, switch to the terminal.
Session 1: a small feature in the demo repo, then AdaL checks it in its own browser.`,
  },
  {
    id: 'demo-launch',
    title: 'Demo: Launch',
    render: () => <DemoPart track="launch" />,
    notes: `About 8 min. Switch to session 2.
Show the video and research results. If still running, switch to the prepared versions. Never watch a spinner for more than a minute.
Then one fast task live, such as launch copy, then the 1-minute clip of the other launch features.`,
  },
  {
    id: 'demo-backup',
    title: 'Backup demo',
    render: () => <DemoBackup />,
    notes: `Only if the live demo fails. Click the video to play.
Plays from public/demo-backup.mp4, which needs no network.`,
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
];
