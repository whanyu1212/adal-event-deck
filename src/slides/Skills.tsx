import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { QR } from '../components/QR';
import { EditorialHeader } from '../components/EditorialHeader';
import { Tight } from '../components/Tight';

const modes = [
  {
    id: 'reference',
    tab: '01 · Reference',
    suffix: '',
    suffixLabel: 'ephemeral · 0 resident tok',
    lines: ['@skills:gh:SylphAI-Inc/skills/skills/glowmotion'],
    prompt: 'draw our OAuth + JWT auth flow',
    traces: [
      '↳ fetched SKILL.md + scripts/render.py on demand',
      '↳ 0 resident tokens · nothing installed globally',
    ],
    status: '✓ Rendered glowmotion architecture flow (0 violations)',
  },
  {
    id: 'chain',
    tab: '02 · Chain skills',
    suffix: '+2 chained',
    suffixLabel: '3 skills · 1 prompt',
    lines: [
      '@skills:gh:101-skills/competitor-analysis',
      '@skills:gh:SylphAI-Inc/skills/skills/glowmotion',
      '@skills:deploy',
    ],
    prompt: 'compare auth UX, draw the flow & ship docs',
    traces: [
      '↳ resolved 3 skills across GitHub & local .atskills/',
      '↳ combined workflows in one conversation · zero setup',
    ],
    status: '✓ 3 skills composed in sequence · nothing left behind',
  },
  {
    id: 'lifecycle',
    tab: '03 · Save & install',
    suffix: ':save · :install',
    suffixLabel: 'git-tracked or auto-triggered',
    lines: [
      '@skills:gh:SylphAI-Inc/skills/skills/glowmotion:save',
      '@skills:gh:SylphAI-Inc/skills/skills/glowmotion:install',
    ],
    prompt: 'keep in repo (.atskills/) or pin to /skills',
    traces: [
      '↳ :save copies folder to .atskills/ for team git review',
      '↳ :install adds 1 line to .autotrigger (fires automatically)',
    ],
    status: '✓ Manage resident skills & token cost anytime with /skills',
  },
];

const anatomyParts = [
  { file: 'SKILL.md', role: 'Instructions', desc: 'Step-by-step workflow loaded only when relevant' },
  { file: 'scripts/', role: 'Executable tools', desc: 'Deterministic Python/bash scripts run by the agent' },
  { file: 'templates/', role: 'References', desc: 'Schemas, examples & brand tokens read on demand' },
];

const tiers = [
  {
    title: 'Reference on the fly',
    code: '@skills:<path>',
    cost: '0 resident tokens',
    desc: 'Run any of 63,600+ community or GitHub skills for one task without installing.',
  },
  {
    title: 'Chain across sources',
    code: '@skills:a @skills:b',
    cost: 'Compose workflows',
    desc: 'Mix public GitHub skills with your repo’s own .atskills/ in a single prompt.',
  },
  {
    title: 'Save or Auto-trigger',
    code: ':save · :install',
    cost: '.atskills/ & /skills',
    desc: 'Use :save to version a copy in git, or :install to auto-fire on matching tasks.',
  },
];

export function Skills({ step = 0 }: { step?: number }) {
  const calm = useReducedMotion();
  const [activeMode, setActiveMode] = useState(Math.min(step, 2));

  useEffect(() => {
    setActiveMode(Math.min(step, 2));
  }, [step]);

  const current = modes[activeMode];

  return (
    <div className="slide tour-slide skills-tour">
      <EditorialHeader kicker="ATSkills · Open Agent Skills Protocol" signature={['63,600+ public skills', 'Use · Save · Auto-trigger']}>
        Give AdaL your <span className="welcome-title-accent"><Tight text="way of working." /></span>
      </EditorialHeader>

      <div className="skills-showcase">
        <section className="skills-terminal" aria-label="Animated @skills protocol walkthrough">
          <div className="skills-terminal-bar" onDoubleClick={(e) => e.stopPropagation()}>
            <span className="model-window-dots" aria-hidden="true">● ● ●</span>
            <div className="skills-mode-tabs">
              {modes.map((m, idx) => (
                <button
                  type="button"
                  key={m.id}
                  className={`skills-mode-tab ${activeMode === idx ? 'is-active' : ''}`}
                  onClick={() => setActiveMode(idx)}
                >
                  {activeMode === idx && (
                    <motion.span
                      layoutId="skills-tab-pill"
                      className="skills-tab-bg"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span>{m.tab}</span>
                </button>
              ))}
            </div>
            <span className="model-demo-label">Step {String(activeMode + 1).padStart(2, '0')} / 03</span>
          </div>

          <div className="skills-terminal-body">
            <div className="skills-syntax-bar" aria-label="Skill path anatomy">
              <span className="syntax-chip is-proto">
                <b>@skills:</b>
                <small>protocol</small>
              </span>
              <span className="syntax-chip is-src">
                <b>gh: / hub: / local</b>
                <small>source</small>
              </span>
              <span className="syntax-chip is-path">
                <b>SylphAI-Inc/.../glowmotion</b>
                <small>skill folder</small>
              </span>
              <span className={`syntax-chip is-lifecycle ${activeMode > 0 ? 'is-lit' : ''}`}>
                <b>{current.suffix || '(no suffix)'}</b>
                <small>{current.suffixLabel}</small>
              </span>
            </div>

            <motion.div
              key={current.id}
              className="skills-prompt-box"
              initial={calm ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
            >
              <div className="skills-token-list">
                {current.lines.map((line) => (
                  <code key={line} className="skills-token-pill">{line}</code>
                ))}
              </div>
              <p className="skills-prompt-text">
                <span className="model-prompt-chevron">❯</span> “{current.prompt}”
              </p>
              <div className="skills-trace-list">
                {current.traces.map((tr) => (
                  <div key={tr} className="skills-trace-line">{tr}</div>
                ))}
              </div>
            </motion.div>

            <div className="skills-live-canvas">
              <div className="skills-canvas-head">
                <span>✦ GLOWMOTION OUTPUT · ANIMATED ARCHITECTURE FLOW</span>
                <span>SKILL.md + scripts/render.py</span>
              </div>

              <svg viewBox="0 0 820 132" className="skills-flow-svg" aria-label="Animated authentication flow diagram">
                <defs>
                  <linearGradient id="skillEdgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff5898" stopOpacity="0.35" />
                    <stop offset="50%" stopColor="#ffb1cc" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#9be564" stopOpacity="0.75" />
                  </linearGradient>
                </defs>

                {/* Connector lines */}
                <line x1="236" y1="66" x2="304" y2="66" stroke="url(#skillEdgeGrad)" strokeWidth="2.5" strokeDasharray="5 4" />
                <line x1="516" y1="66" x2="584" y2="66" stroke="url(#skillEdgeGrad)" strokeWidth="2.5" strokeDasharray="5 4" />

                {/* Animated glowing data pulses along connectors */}
                {!calm && (
                  <>
                    <circle r="5" fill="#ff87b5" className="skill-pulse-dot">
                      <animate attributeName="cx" values="236;304" dur="1.6s" repeatCount="indefinite" />
                      <animate attributeName="cy" values="66;66" dur="1.6s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0;1;0" dur="1.6s" repeatCount="indefinite" />
                    </circle>
                    <circle r="5" fill="#9be564" className="skill-pulse-dot">
                      <animate attributeName="cx" values="516;584" dur="1.6s" begin="0.8s" repeatCount="indefinite" />
                      <animate attributeName="cy" values="66;66" dur="1.6s" begin="0.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0;1;0" dur="1.6s" begin="0.8s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}

                {/* Node 1 */}
                <g transform="translate(16, 18)">
                  <rect width="220" height="96" rx="14" className="flow-svg-node" />
                  <text x="20" y="32" className="flow-svg-step">01 · CLIENT</text>
                  <text x="20" y="60" className="flow-svg-title">Sign-In Request</text>
                  <text x="20" y="80" className="flow-svg-sub">OAuth 2.1 / Passkey</text>
                </g>

                {/* Node 2 */}
                <g transform="translate(304, 18)">
                  <rect width="212" height="96" rx="14" className="flow-svg-node is-accent" />
                  <text x="20" y="32" className="flow-svg-step is-pink">02 · EDGE GUARD</text>
                  <text x="20" y="60" className="flow-svg-title">Verify &amp; Mint JWT</text>
                  <text x="20" y="80" className="flow-svg-sub">Signature + rate limit</text>
                </g>

                {/* Node 3 */}
                <g transform="translate(584, 18)">
                  <rect width="220" height="96" rx="14" className="flow-svg-node is-ok" />
                  <text x="20" y="32" className="flow-svg-step is-green">03 · SESSION</text>
                  <text x="20" y="60" className="flow-svg-title">Scoped Workspace</text>
                  <text x="20" y="80" className="flow-svg-sub">RBAC token active ✓</text>
                </g>
              </svg>
            </div>

            <div className="model-footer-row">
              <p className="model-status" aria-live="polite">{current.status}</p>
              <div className="model-progress" aria-hidden="true">
                <span style={{ width: `${((activeMode + 1) / modes.length) * 100}%` }} />
              </div>
            </div>
          </div>
        </section>

        <aside className="skills-explainer">
          <section className="skills-anatomy-card">
            <div className="model-side-head">
              <p className="label">What is a skill? · Just files in git</p>
              <span>On-demand expertise</span>
            </div>
            <div className="skills-anatomy-grid">
              {anatomyParts.map((part) => (
                <div key={part.file} className="skills-anatomy-item">
                  <div className="skills-anatomy-top">
                    <code>{part.file}</code>
                    <span>{part.role}</span>
                  </div>
                  <p>{part.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="skills-tiers-card" onDoubleClick={(e) => e.stopPropagation()}>
            <div className="model-side-head">
              <p className="label">Three lifecycle tiers · One protocol</p>
              <span>No AGENTS.md bloat</span>
            </div>
            <div className="skills-tiers-list">
              {tiers.map((tier, idx) => {
                const active = activeMode === idx;
                return (
                  <div
                    key={tier.title}
                    className={`skills-tier-row ${active ? 'is-active' : ''}`}
                    onClick={() => setActiveMode(idx)}
                  >
                    {active && (
                      <motion.div
                        layoutId="skills-tier-highlight"
                        className="skills-tier-bg"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <div className="skills-tier-main">
                      <div className="skills-tier-head">
                        <strong>0{idx + 1} · {tier.title}</strong>
                        <code>{tier.code}</code>
                        <span className="skills-tier-cost">{tier.cost}</span>
                      </div>
                      <p>{tier.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="skills-hub-bar">
            <div className="skills-hub-copy">
              <p className="label">Skills Hub · Open Standard (MIT)</p>
              <strong>Yours. Your team’s. 63,600+ from the community.</strong>
              <a href="https://atskills.one/" target="_blank" rel="noopener noreferrer" onDoubleClick={(e) => e.stopPropagation()}>
                atskills.one ↗
              </a>
            </div>
            <QR value="https://atskills.one/" size={92} caption="atskills.one" />
          </div>
        </aside>
      </div>
    </div>
  );
}
