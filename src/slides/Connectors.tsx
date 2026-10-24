import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EditorialHeader } from '../components/EditorialHeader';
import { Tight } from '../components/Tight';

const workflows = [
  {
    tag: '01 · Workflow automation',
    title: 'Turn context into shipped work.',
    desc: 'Pull specs and meeting notes, triage issues, open PRs, and post team updates automatically.',
    prompt: '“Read #bugs in Slack, link the Notion spec, and open a fix PR.”',
    chain: ['Slack / Granola', 'Linear + Notion', 'GitHub PR'],
    apps: ['Slack', 'Notion', 'Gmail', 'Drive', 'GitHub', 'Linear', 'Supabase'],
  },
  {
    tag: '02 · Social listening & signals',
    title: 'Listen to your market in real time.',
    desc: 'Monitor brand mentions, community threads, and competitor launches across social and web search.',
    prompt: '“Scan Reddit, X & LinkedIn for user pain points and rank top opportunities.”',
    chain: ['Reddit + X + LinkedIn', 'Exa / Firecrawl', 'Signal brief'],
    apps: ['Reddit', 'X', 'LinkedIn', 'Discord', 'Exa', 'Firecrawl', 'Tavily'],
  },
  {
    tag: '03 · Launch & scheduled loops',
    title: 'Publish & run daily digests on autopilot.',
    desc: 'Cross-post launch campaigns, track product metrics, and schedule recurring digests.',
    prompt: '“Every morning at 9am, send a Slack digest of X mentions & PostHog sign-ups.”',
    chain: ['Scheduled prompt', 'PostHog + Socials', 'Slack / HubSpot'],
    apps: ['LinkedIn', 'Instagram', 'X', 'HubSpot', 'PostHog', 'Apollo', 'YouTube'],
  },
];

export function Connectors({ step = 0 }: { step?: number }) {
  const calm = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [playRequested, setPlayRequested] = useState(false);
  const [active, setActive] = useState(Math.min(step, workflows.length - 1));

  useEffect(() => {
    setActive(Math.min(step, workflows.length - 1));
  }, [step]);

  const playing = !paused && (!calm || playRequested);
  const base = `${import.meta.env.BASE_URL}media/`;
  const current = workflows[active];

  return (
    <div className="slide connectors-slide">
      <EditorialHeader kicker="Connectors · Connect once, use across chats" signature={['30+ connected apps', 'Automate & listen']}>
        Bring your apps into <span className="welcome-title-accent"><Tight text="the conversation." /></span>
      </EditorialHeader>

      <div className="connectors-layout">
        <figure className="connectors-capture">
          <figcaption className="connectors-window-bar">
            <span className="model-window-dots" aria-hidden="true">● ● ●</span>
            <span>AdaL Desktop · Connector Catalog</span>
            <span className="connectors-count-pill">OAuth &amp; API key · 1-click setup</span>
            <button
              type="button"
              onClick={() => {
                setPaused(playing);
                setPlayRequested(true);
              }}
              onDoubleClick={(event) => event.stopPropagation()}
            >
              {playing ? 'Pause capture' : 'Replay walkthrough'}
            </button>
          </figcaption>

          <div className="connectors-frame-body">
            <img
              src={`${base}${playing ? 'adal-connectors.gif' : 'adal-connectors-poster.png'}`}
              width={1200}
              height={686}
              alt="AdaL Desktop connector catalog walkthrough showing Google apps, Slack, Notion, GitHub, Linear, business services, research tools and social platforms."
            />
          </div>

          <div className="connectors-live-pipeline">
            <span className="pipeline-badge">ACTIVE WORKFLOW</span>
            <div className="pipeline-steps">
              <span>{current.chain[0]}</span>
              <b aria-hidden="true">→</b>
              <span>{current.chain[1]}</span>
              <b aria-hidden="true">→</b>
              <span className="is-final">{current.chain[2]}</span>
            </div>
            <p className="pipeline-prompt">{current.prompt}</p>
          </div>
        </figure>

        <aside className="connectors-examples" onDoubleClick={(e) => e.stopPropagation()}>
          {workflows.map((wf, i) => {
            const isCurrent = active === i;
            return (
              <section
                key={wf.tag}
                className={isCurrent ? 'is-current' : ''}
                onClick={() => setActive(i)}
              >
                {isCurrent && (
                  <motion.div
                    layoutId="connector-card-highlight"
                    className="connector-card-bg"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <div className="connector-card-content">
                  <div className="connector-card-head">
                    <p className="label">{wf.tag}</p>
                    <span className="connector-step-chip">Step 0{i + 1}</span>
                  </div>
                  <h2>{wf.title}</h2>
                  <p className="connector-desc">{wf.desc}</p>
                  <div className="connector-pills">
                    {wf.apps.map((app) => (
                      <span key={app} className="connector-pill">{app}</span>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </aside>
      </div>
    </div>
  );
}
