import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { EditorialHeader } from '../components/EditorialHeader';
import { QR } from '../components/QR';
import { Tight } from '../components/Tight';
import { event } from '../event';

/*
  Video Producer, as a four-step how-to before the live demo: ask, AdaL produces it,
  revise by chatting, export. One key press per step. The window on the left shows each
  step with the docs' own example (the "Ember" coffee teaser), so the prompt in step 1
  is the one that made the screenshots in steps 2–4.
  Source: https://docs.sylph.ai/features/video-producer/
*/

const media = (file: string) => `${import.meta.env.BASE_URL}media/video-producer/${file}`;

const steps = [
  {
    title: 'Ask for it',
    desc: 'Describe the video: length, sizes, and the one thing viewers should remember.',
    window: 'AdaL Desktop · Chat',
  },
  {
    title: 'AdaL produces it',
    desc: 'It writes a plan, generates the shots, titles, voice and music, then edits and renders.',
    window: 'ember_16x9.mp4 · ▶ Video',
  },
  {
    title: 'Revise by chatting',
    desc: 'Every message is a new version. Compare them, or say “go back to v4”.',
    window: 'ember_16x9.mp4 · ⑂ Canvas',
  },
  {
    title: 'Export & share',
    desc: 'The .mp4 in your project is always the latest. Export any version in full quality.',
    window: 'ember_16x9.mp4 · Export',
  },
];

// From the docs' example request
const PROMPT =
  'Make a 10-second cinematic teaser for a fictional coffee brand called Ember: a photoreal hero shot of a steaming cup at golden hour, slow push-in, the word EMBER revealed in elegant animated type, subtle sound design, and an end card. Deliver 16:9 and 9:16.';

const WORK = [
  'Writing the plan to project.md',
  'Generating the hero shot',
  'Animating the EMBER title',
  'Adding sound design',
  'Rendering 16:9 and 9:16',
];

const REVISIONS = [
  { ask: 'make the reveal slower', version: 'v5' },
  { ask: 'swap the hero shot for MiniMax', version: 'v6' },
];

const TREE = [
  ['ember-teaser/', ''],
  ['├── project.md', 'the plan'],
  ['├── assets/', 'every clip, image and sound'],
  ['├── scenes/', 'animated titles, end cards'],
  ['└── videos/', ''],
  ['    ├── ember_16x9/', ''],
  ['    │   └── ember_16x9.mp4', 'ready to share'],
  ['    └── ember_9x16/', ''],
];

export function VideoTutorial({ step = 0 }: { step?: number }) {
  const calm = useReducedMotion();
  const current = Math.min(step, steps.length - 1);
  const fade = {
    initial: calm ? false : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: calm ? undefined : { opacity: 0, y: -10 },
    transition: { duration: calm ? 0 : 0.25 },
  };
  const rise = (i: number) => ({
    initial: calm ? false : { opacity: 0, x: -8 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: calm ? 0 : 0.5 + i * 0.45, duration: 0.3 },
  });

  return (
    <div className="slide video-tutorial">
      <EditorialHeader kicker="Video Producer · Built into AdaL" signature={['No plugin, no API key', 'Best in AdaL Desktop']}>
        Make a launch video <span className="welcome-title-accent"><Tight text="by asking." /></span>
      </EditorialHeader>

      <div className="vt-layout">
        <figure className="vt-window">
          <figcaption className="vt-window-bar">
            <span className="model-window-dots" aria-hidden="true">● ● ●</span>
            <span>{steps[current].window}</span>
            <span className="vt-window-step">Step {current + 1} of 4</span>
          </figcaption>

          <div className="vt-window-body">
            <AnimatePresence mode="wait" initial={false}>
              {current === 0 && (
                <motion.div key="ask" className="vt-ask" {...fade}>
                  <p className="vt-bubble">{PROMPT}</p>
                  <ul className="vt-work" aria-label="What AdaL does next">
                    {WORK.map((line, i) => (
                      <motion.li key={line} {...rise(i)}>
                        <span aria-hidden="true">✓</span> {line}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {current === 1 && (
                <motion.div key="produce" className="vt-shot" {...fade}>
                  <img
                    src={media('video-player.webp')}
                    alt="The finished Ember teaser in AdaL's video player, with its timeline of picture, source sound, music and effects tracks."
                  />
                </motion.div>
              )}

              {current === 2 && (
                <motion.div key="revise" className="vt-revise" {...fade}>
                  <div className="vt-revisions">
                    {REVISIONS.map((r, i) => (
                      <motion.p key={r.ask} className="vt-revision" {...rise(i)}>
                        <span className="vt-bubble">“{r.ask}”</span>
                        <span className="vt-arrow" aria-hidden="true">→</span>
                        <span className="vt-version">{r.version}</span>
                      </motion.p>
                    ))}
                  </div>
                  <img
                    src={media('canvas.webp')}
                    alt="The Canvas: six versions of the Ember teaser in a row, the newest marked Current."
                  />
                  <p className="vt-note">Every version stays. Play two side by side, or roll back by asking.</p>
                </motion.div>
              )}

              {current === 3 && (
                <motion.div key="export" className="vt-export" {...fade}>
                  <img
                    src={media('version-inspector.webp')}
                    alt="A version opened from the Canvas, showing what changed and an Export button."
                  />
                  <div className="vt-tree" aria-label="The project folder">
                    {TREE.map(([path, note]) => (
                      <p key={path} className={path.includes('.mp4') && note ? 'is-current' : ''}>
                        <span>{path}</span>
                        {note && <em>{note}</em>}
                      </p>
                    ))}
                    <p className="vt-tree-foot">Everything stays in your project folder.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </figure>

        <ol className="vt-steps">
          {steps.map((s, i) => (
            <li key={s.title} className={i === current ? 'is-current' : i < current ? 'is-done' : ''}>
              <span className="vt-num">0{i + 1}</span>
              <div>
                <h2>{s.title}</h2>
                <p>{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="vt-foot">
        <p className="vt-tips">
          <span className="label">Tips</span>
          <span>Give the facts up front</span>
          <span>Bring your own footage, screen recordings and logo</span>
          <span>Change one thing per message</span>
        </p>

        {/* References for making a promo video (moved here from the live demo slide) */}
        <div className="launch-ref">
          <QR value={event.links.launchLibrary} size={96} caption="Launch library" />
          <div className="launch-ref-copy">
            <p className="label">Video references · Launch library</p>
            <strong>Big-brand launch videos, remade with AdaL.</strong>
            <a
              href={event.links.launchLibrary}
              target="_blank"
              rel="noopener noreferrer"
              onDoubleClick={(e) => e.stopPropagation()}
            >
              {event.links.launchLibrary.replace(/^https?:\/\//, '')} ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
