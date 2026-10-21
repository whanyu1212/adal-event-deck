const stages = [
  { name: 'Research', action: 'Find the evidence.', detail: 'Research + social listening', result: 'Sources → Findings', glyph: '◎' },
  { name: 'Images', action: 'Shape the visual.', detail: 'Generate + edit + iterate', result: 'References → Launch image', glyph: '◈' },
  { name: 'Video', action: 'Tell the story.', detail: 'Clips + voice + captions', result: 'Edit → Compare → Export', glyph: '▷' },
];
export function Capabilities({ step = 0 }: { step?: number }) {
  return (
    <div className="slide tour-slide capability-tour">
      <p className="label">Built-in capabilities</p><h1 className="title">One request. A whole workflow.</h1>
      <div className="capability-request"><span className="label">You</span><p>“Research our competitors, create a launch image,<br />then make a 30-second promo with captions.”</p></div>
      <div className="capability-chain">{stages.map((stage,i) => <section key={stage.name} className={step > i ? 'is-revealed' : ''}><span className="chain-glyph" aria-hidden="true">{stage.glyph}</span><p className="label">{step > i ? 'Capability loaded' : 'Ready when needed'}</p><h2>{stage.name}</h2><strong>{stage.action}</strong><p>{stage.detail}</p><div>{stage.result}</div></section>)}</div>
      <p className="tour-hint">AdaL loads the capabilities as the task needs them.<span>Illustrated workflow</span></p>
    </div>
  );
}
