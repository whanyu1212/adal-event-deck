import { useState } from 'react';
import { useReducedMotion } from 'motion/react';

export function Connectors({ step = 0 }: { step?: number }) {
  const calm = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [playRequested, setPlayRequested] = useState(false);
  const playing = !paused && (!calm || playRequested);
  const base = `${import.meta.env.BASE_URL}media/`;
  return (
    <div className="slide connectors-slide">
      <p className="label">Connectors</p>
      <h1 className="title">Bring your apps into the conversation.</h1>
      <p className="lead">Work across your tools from AdaL—connect once, use them across chats.</p>
      <div className="connectors-layout">
        <figure className="connectors-capture">
          <img src={`${base}${playing ? 'adal-connectors.gif' : 'adal-connectors-poster.png'}`} width={1200} height={686} alt="AdaL Desktop connector catalog walkthrough showing Google apps, Slack, Notion, GitHub, Linear, business services, research tools and social platforms." />
          <figcaption><span>Captured in AdaL Desktop</span><button type="button" onClick={() => { setPaused(playing); setPlayRequested(true); }} onDoubleClick={(event) => event.stopPropagation()}>{playing ? 'Stop animation' : 'Replay walkthrough'}</button></figcaption>
        </figure>
        <aside className="connectors-examples">
          <section className={step === 0 ? 'is-current' : ''}><p className="label">Your workspace</p><h2>Find the context.</h2><p>Gmail · Drive · Notion · Slack</p></section>
          <section className={step === 1 ? 'is-current' : ''}><p className="label">Your projects</p><h2>Move work forward.</h2><p>GitHub · Linear · Jira · Supabase</p></section>
          <section className={step === 2 ? 'is-current' : ''}><p className="label">Your launch</p><h2>Reach your audience.</h2><p>LinkedIn · Instagram · X · HubSpot</p></section>
        </aside>
      </div>
    </div>
  );
}
