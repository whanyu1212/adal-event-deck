const features = [
  { title: 'Build.', caption: 'Make the change. Check it in the browser.' },
  { title: 'Research.', caption: 'Find the context behind your next move.' },
  { title: 'Launch.', caption: 'Give what you built a story and a visual.' },
];

export function Adal({ step = 0 }: { step?: number }) {
  return (
    <div className="slide tour-slide">
      <p className="label">Meet your workflow</p>
      <h1 className="title">From first change to first impression.</h1>
      <div className="tour-panels">
        {features.map((feature, i) => <section key={feature.title} className={`tour-panel ${step >= i ? 'is-revealed' : ''}`}>
          <p className="label">0{i + 1}</p><h2>{feature.title}</h2>
          <div className="tour-visual">
            {i === 0 ? <div className="tour-code"><small>theme.ts · illustrative diff</small><code className="diff-minus">− theme: 'light'</code><code className="diff-plus">+ theme: preference</code><div className="tour-check">✓ Browser check complete</div></div> : i === 1 ? <div className="tour-research"><small>Example research brief</small><strong>What makes us different?</strong><p>Compare positioning.<br />Check the evidence.</p><span>Source links → Findings → Decision</span></div> : <div className="tour-launch"><span>YOUR NEXT BIG THING</span><strong>Made.<br /><em>For the world.</em></strong><small>Illustrative launch concept</small></div>}
          </div><p className="tour-caption">{feature.caption}</p>
        </section>)}
      </div>
      <p className="tour-hint">One project. One conversation. <span>Build → Research → Launch</span></p>
    </div>
  );
}
