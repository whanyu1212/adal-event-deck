import { EditorialHeader } from '../components/EditorialHeader';
import { Tight } from '../components/Tight';

const stages = [
  {
    id: 'build',
    label: '01 · BUILD & VERIFY',
    mode: 'Live + workspace',
    title: 'Ship the product update.',
    steps: ['Update the app & inspect the diff in AdaL', "Verify the live UI directly in AdaL's browser"],
    capabilities: ['Code & Browser Use', 'Review Agent'],
  },
  {
    id: 'produce',
    label: '02 · RESEARCH & PRODUCE',
    mode: 'Pre-run walkthrough',
    title: 'Position it & cut the promo.',
    steps: ['Walk through Deep Research competitor & audience findings', 'Inspect generated visuals & Video Producer timeline (v1 → v3)'],
    capabilities: ['Deep Research', 'Image Studio', 'Video Producer'],
  },
  {
    id: 'publish',
    label: '03 · PUBLISH & AUTOMATE',
    mode: 'Live on stage',
    title: 'Launch it to the world.',
    steps: ['Chain @skills on the session context for human-sounding launch copy', 'Connect your channels (X, LinkedIn, Slack, Notion) to ship it'],
    capabilities: ['@skills', 'Connectors'],
  },
];

export function DemoPart() {
  return (
    <div className="slide demo-part">
      <EditorialHeader kicker="Live walkthrough · End-to-end flow" signature={['Pre-run heavy lifts', 'Live finishing steps']}>
        Let’s take one project <span className="welcome-title-accent"><Tight text="from code to launch." /></span>
      </EditorialHeader>
      <p className="lead">We pre-ran the multi-minute research and video renders so we can walk through the full session and finish the launch live.</p>
      <div className="demo-roadmap" aria-label="One project, from code to launch">{stages.map((stage) => (
        <section key={stage.id} className={`demo-session${stage.id === 'publish' ? ' is-live' : ''}`}>
          <div className="demo-session-head">
            <p className="label">{stage.label}</p>
            <span className="demo-session-mode">{stage.mode}</span>
          </div>
          <h2>{stage.title}</h2>
          <ol>{stage.steps.map((text, i) => <li key={text}><span>0{i + 1}</span>{text}</li>)}</ol>
          <div className="demo-session-capabilities" aria-label="Capabilities used">
            {stage.capabilities.map((capability) => <span key={capability}>{capability}</span>)}
          </div>
        </section>
      ))}</div>
      <div className="demo-part-summary">
        <span>15-minute walkthrough</span>
        <p>Pre-run heavy lifts skip the render wait.</p>
        <strong>Up next → Your 75-minute build session</strong>
      </div>
    </div>
  );
}
