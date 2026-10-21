import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

const models = [
  { name: 'Claude Opus 5.5', provider: 'Anthropic' },
  { name: 'GPT-6.1 Sol', provider: 'OpenAI' },
  { name: 'Gemini 3.8 Flash', provider: 'Google' },
];
const efforts = ['low', 'medium', 'high', 'max'];
const frames = [
  { command: '/model', selected: 0, config: false, effort: 2, message: 'Choose a model for the task.' },
  { command: '/model', selected: 1, config: false, effort: 2, message: 'Switch provider. Stay in the same project.' },
  { command: '/model', selected: 2, config: false, effort: 2, message: 'Your workflow comes with you.' },
  { command: '/model', selected: 0, config: false, effort: 2, message: 'Claude Opus 5.5 selected.' },
  { command: '/model config', selected: 0, config: true, effort: 2, message: 'Tune the reasoning effort for your task.' },
  { command: '/model config', selected: 0, config: true, effort: 0, message: 'Low effort for quick, simple tasks.' },
  { command: '/model config', selected: 0, config: true, effort: 3, message: 'Max effort for deeper reasoning.' },
];

export function ModelChoice({ step = 0 }: { step?: number }) {
  const calm = useReducedMotion();
  const frame = Math.min(step, frames.length - 1);
  const [typed, setTyped] = useState('');
  const current = frames[frame];

  useEffect(() => {
    if (calm) { setTyped(current.command); return; }
    setTyped('');
    let count = 0;
    const timer = setInterval(() => {
      count += 1;
      setTyped(current.command.slice(0, count));
      if (count >= current.command.length) clearInterval(timer);
    }, 65);
    return () => clearInterval(timer);
  }, [current.command, calm]);

  return (
    <div className="slide model-choice">
      <header>
        <h1 className="title">Multimodal. No model vendor lock-in.</h1>
        <p className="lead">Choose the model. Tune the thinking. Build and launch in one place.</p>
      </header>
      <div className="model-showcase">
        <section className="model-terminal" aria-label="Illustrated AdaL command demo">
          <div className="model-terminal-bar"><span className="model-window-dots" aria-hidden="true">● ● ●</span><span>AdaL / your-project</span><span className="model-demo-label">Illustrated demo</span></div>
          <div className="model-terminal-body">
            <div className="model-command"><span aria-hidden="true">❯</span> <span aria-label={current.command}>{typed}<span className="model-cursor" aria-hidden="true">▌</span></span></div>
            <p className="model-terminal-label">{current.config ? 'REASONING EFFORT · CLAUDE OPUS 5.5' : 'SELECT MODEL'}</p>
            <div className="model-options">
              {models.map((model, index) => <div key={model.name} className={`model-option ${current.selected === index ? 'is-selected' : ''}`}><span>{current.selected === index ? '●' : '○'}</span><strong>{model.name}</strong><span>{model.provider}</span></div>)}
            </div>
            <div className={`model-effort ${current.config ? 'is-active' : ''}`}>
              <div className="model-effort-heading"><span>Reasoning effort</span><code>/model config</code></div>
              <div className="model-effort-levels">{efforts.map((effort, index) => <span key={effort} className={current.effort === index ? 'is-selected' : ''}>{effort}</span>)}</div>
              <p>Available levels depend on the selected model.</p>
            </div>
            <p className="model-status">✓ {current.message}</p>
          </div>
          <div className="model-playback" onDoubleClick={(event) => event.stopPropagation()}>
            <span>{String(step + 1).padStart(2, '0')} / 08</span>
            <div className="model-progress" aria-hidden="true"><span style={{ width: `${((step + 1) / (frames.length + 1)) * 100}%` }} /></div>
            <span>→ to continue</span>
          </div>
        </section>
        <aside className="model-capabilities">
          <p className="label">Beyond code</p>
          <h2>One agent.<br /><em>Many mediums.</em></h2>
          <div className="model-media-grid">
            <div><span aria-hidden="true">&lt;/&gt;</span><strong>Code</strong><small>Build & check</small></div>
            <div><span aria-hidden="true">◈</span><strong>Images</strong><small>Generate & edit</small></div>
            <div><span aria-hidden="true">▷</span><strong>Video</strong><small>Create promos</small></div>
            <div><span aria-hidden="true">≋</span><strong>Audio</strong><small>Voice & music</small></div>
          </div>
          <div aria-hidden={step < 7} className={`model-own tour-access ${step >= 7 ? 'is-revealed' : ''}`}><p className="label">Your choice of access</p><p>Bring your own API key.<br />Use a custom endpoint.<br />Run locally with Ollama.</p><small>Local models are in preview.</small></div>
        </aside>
      </div>
    </div>
  );
}
