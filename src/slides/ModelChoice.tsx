import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EditorialHeader } from '../components/EditorialHeader';
import { Tight } from '../components/Tight';

const models = [
  {
    name: 'Claude Opus 5.5',
    provider: 'Anthropic',
    ctx: '1M',
    tag: 'Recommended',
    blurb: 'Long-running agentic coding & review',
  },
  {
    name: 'GPT-6.1 Sol',
    provider: 'OpenAI',
    ctx: '1.1M',
    tag: 'Recommended',
    blurb: 'Near-Astra coding & agentic workflows',
  },
  {
    name: 'Gemini 4 Argon',
    provider: 'Google',
    ctx: '1M',
    tag: '50% OFF · New',
    blurb: "Google's flagship reasoning model",
  },
  {
    name: 'Gemini 3.8 Flash',
    provider: 'Google',
    ctx: '1M',
    tag: '50% OFF',
    blurb: 'Fast multimodal agentic workflows',
  },
  {
    name: 'MiniMax M3',
    provider: 'MiniMax',
    ctx: '1M',
    tag: 'Browser-use',
    blurb: 'Visual & web verification specialist',
  },
];

const efforts = [
  { id: 'low', label: 'low', bars: 1, note: 'Fastest · lowest token cost' },
  { id: 'medium', label: 'medium', bars: 2, note: 'Balanced everyday coding' },
  { id: 'high', label: 'high', bars: 3, note: 'Deep thinking (default)' },
  { id: 'max', label: 'max', bars: 4, note: 'Unconstrained architecture & debug' },
];

const modalities = [
  {
    title: 'Code & Agents',
    sub: '1M+ context & browser check',
    glyph: '</>',
    chips: ['Claude Opus 5.5', 'GPT-6.1 Sol', 'Gemini 4 Argon'],
  },
  {
    title: 'Image Studio',
    sub: 'Up to 4K & 14 reference images',
    glyph: '◈',
    chips: ['GPT Image 2.5 Flare', 'Nano Banana Pro', 'Sunburst'],
  },
  {
    title: 'Video Producer',
    sub: '4K clips, lip-sync & stereo audio',
    glyph: '▷',
    chips: ['Veo 3.1', 'Seedance 2.5', 'MiniMax H3'],
  },
  {
    title: 'Voice & Music',
    sub: 'Narration, SFX & soundtrack',
    glyph: '≋',
    chips: ['ElevenLabs v2', 'ElevenLabs Music', 'Gemini 3.8 TTS'],
  },
];

const accessOptions = [
  { title: 'AdaL Credits', badge: 'All-in-one', detail: '40+ chat, image, video & audio models ready immediately' },
  { title: 'BYOAK + Custom URL', badge: 'API Keys', detail: 'Bring Anthropic, OpenAI, Google keys or a custom proxy' },
  { title: 'ChatGPT Subscription', badge: 'OAuth', detail: 'Use your existing ChatGPT Plus or Pro plan directly' },
  { title: 'Local via Ollama', badge: 'Offline', detail: 'Run GPT-OSS 20B or Qwen3-Coder 30B on your machine' },
];

const frames = [
  { command: '/model', message: 'Switch across 40+ frontier models in the same project.' },
  { command: '/model config effort=max', message: 'Adaptive thinking scales depth automatically or on command.' },
  { command: '/model', message: 'Use included credits, BYOAK, ChatGPT OAuth, or local Ollama.' },
];

export function ModelChoice({ step = 0 }: { step?: number }) {
  const calm = useReducedMotion();
  const frame = Math.min(step, frames.length - 1);
  const current = frames[frame];
  const [typed, setTyped] = useState(current.command);
  const [selectedModel, setSelectedModel] = useState(0);
  const [selectedEffort, setSelectedEffort] = useState(3);

  useEffect(() => {
    if (calm) {
      setTyped(current.command);
      return;
    }
    setTyped('');
    let count = 0;
    const timer = setInterval(() => {
      count += 1;
      setTyped(current.command.slice(0, count));
      if (count >= current.command.length) clearInterval(timer);
    }, 45);
    return () => clearInterval(timer);
  }, [current.command, calm]);

  // Smoothly cycle through the frontier models on step 0 so the selector feels alive
  useEffect(() => {
    if (calm || step !== 0) return;
    const timer = setInterval(() => {
      setSelectedModel((prev) => (prev + 1) % models.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [calm, step]);

  // Cycle effort on step 1 between high (2) and max (3)
  useEffect(() => {
    if (step === 0) {
      setSelectedEffort(2);
      return;
    }
    setSelectedEffort(3);
  }, [step]);

  return (
    <div className="slide model-choice">
      <EditorialHeader kicker="Models & modalities" signature={['40+ models · 10 providers', 'Code · Image · Video · Audio']}>
        Multimodal. <span className="welcome-title-accent"><Tight text="No vendor lock-in." /></span>
      </EditorialHeader>

      <div className="model-showcase">
        <section className="model-terminal" aria-label="Illustrated AdaL model selector">
          <div className="model-terminal-bar">
            <span className="model-window-dots" aria-hidden="true">● ● ●</span>
            <span>AdaL / your-project</span>
            <span className="model-catalog-pill">40 models · 1M context</span>
            <span className="model-demo-label">Step {String(frame + 1).padStart(2, '0')} / 03</span>
          </div>

          <div className="model-terminal-body">
            <div className="model-command-row">
              <div className="model-command">
                <span className="model-prompt-chevron" aria-hidden="true">❯</span>
                <span aria-label={current.command}>
                  {typed}
                  <span className="model-cursor" aria-hidden="true">▌</span>
                </span>
              </div>
              <span className="model-cache-badge">Prompt cache · 50–90% off</span>
            </div>

            <div className="model-section-head">
              <span>SELECT PLANNER MODEL</span>
              <span>Anthropic · OpenAI · Google · MiniMax · DeepSeek · Kimi · GLM</span>
            </div>

            <div className="model-options" onDoubleClick={(e) => e.stopPropagation()}>
              {models.map((model, index) => {
                const active = selectedModel === index;
                return (
                  <div
                    key={model.name}
                    className={`model-option ${active ? 'is-selected' : ''}`}
                    onClick={() => setSelectedModel(index)}
                  >
                    {active && (
                      <motion.div
                        layoutId="model-highlight"
                        className="model-option-bg"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="model-radio">{active ? '●' : '○'}</span>
                    <div className="model-option-main">
                      <strong>{model.name}</strong>
                      <span className="model-option-blurb">{model.blurb}</span>
                    </div>
                    <span className={`model-tag ${model.tag.includes('OFF') ? 'is-promo' : ''}`}>{model.tag}</span>
                    <span className="model-ctx">{model.ctx}</span>
                    <span className="model-provider">{model.provider}</span>
                  </div>
                );
              })}
            </div>

            <div className={`model-effort ${step >= 1 ? 'is-active' : ''}`} onDoubleClick={(e) => e.stopPropagation()}>
              <div className="model-effort-heading">
                <div>
                  <span>Adaptive thinking &amp; effort</span>
                  <small>{efforts[selectedEffort].note}</small>
                </div>
                <code>/model config</code>
              </div>
              <div className="model-effort-levels">
                {efforts.map((effort, index) => {
                  const active = selectedEffort === index;
                  return (
                    <button
                      type="button"
                      key={effort.id}
                      className={`effort-pill ${active ? 'is-selected' : ''}`}
                      onClick={() => setSelectedEffort(index)}
                    >
                      {active && (
                        <motion.span
                          layoutId="effort-highlight"
                          className="effort-pill-bg"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="effort-pill-label">{effort.label}</span>
                      <span className="effort-bars" aria-hidden="true">
                        {Array.from({ length: 4 }, (_, b) => (
                          <i key={b} className={b < effort.bars ? 'is-on' : ''} />
                        ))}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="model-footer-row">
              <p className="model-status" aria-live="polite">✓ {current.message}</p>
              <div className="model-progress" aria-hidden="true">
                <span style={{ width: `${((frame + 1) / frames.length) * 100}%` }} />
              </div>
            </div>
          </div>
        </section>

        <aside className="model-capabilities">
          <div className="model-side-group">
            <div className="model-side-head">
              <p className="label">Four senses · Built-in tool models</p>
              <span>Routed automatically</span>
            </div>
            <div className="model-media-grid">
              {modalities.map((m) => (
                <div key={m.title} className="model-media-card">
                  <div className="model-media-top">
                    <span className="model-media-glyph" aria-hidden="true">{m.glyph}</span>
                    <div>
                      <strong>{m.title}</strong>
                      <small>{m.sub}</small>
                    </div>
                  </div>
                  <div className="model-media-chips">
                    {m.chips.map((chip) => (
                      <span key={chip}>{chip}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <section className={`model-own ${step >= 2 ? 'is-current' : ''}`}>
            <div className="model-side-head">
              <p className="label">Zero lock-in · Your choice of access</p>
              <span>Switch anytime</span>
            </div>
            <div className="model-access-grid">
              {accessOptions.map((item) => (
                <div key={item.title} className="model-access-card">
                  <div className="model-access-top">
                    <strong>{item.title}</strong>
                    <span>{item.badge}</span>
                  </div>
                  <small>{item.detail}</small>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
