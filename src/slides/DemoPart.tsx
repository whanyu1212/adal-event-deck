import { EditorialHeader } from '../components/EditorialHeader';
import { Tight } from '../components/Tight';

const stages = [
  {
    id: 'build',
    name: 'Build',
    live: true,
    title: 'Ship the product update.',
    steps: ['Update the app & review the diff', "Check the live UI in AdaL's browser"],
    tools: ['Code & Browser Use', 'Review Agent'],
  },
  {
    id: 'produce',
    name: 'Research & produce',
    live: false,
    title: 'Position it & cut the promo.',
    steps: ['Competitor & audience research', 'Generated visuals & promo video'],
    tools: ['Deep Research', 'Image Studio', 'Video Producer'],
  },
  {
    id: 'publish',
    name: 'Launch',
    live: true,
    title: 'Launch it to the world.',
    steps: ['Write the launch copy', 'Post via X, LinkedIn, Slack & Notion'],
    tools: ['Connectors'],
  },
];

export function DemoPart() {
  return (
    <div className="slide demo-part">
      <EditorialHeader kicker="Live demo · 15 min · Code to launch">
        Let’s take one project <span className="welcome-title-accent"><Tight text="from code to launch." /></span>
      </EditorialHeader>
      <p className="lead">Research and video renders take minutes, so we pre-ran those. Everything else is live.</p>

      <ol className="demo-track" aria-label="One project, from code to launch">
        {stages.map((stage, idx) => (
          <li key={stage.id} className={`demo-stop ${stage.live ? 'is-live' : 'is-prerun'}`}>
            <div className="demo-stop-top">
              <span className="demo-stop-num" aria-hidden="true">0{idx + 1}</span>
              <span className="demo-stop-name">{stage.name}</span>
            </div>
            <div className="demo-stop-rail" aria-hidden="true">
              <span className="demo-stop-dot" />
            </div>
            <p className="demo-stop-mode">{stage.live ? 'Live' : 'Pre-run'}</p>
            <h2>{stage.title}</h2>
            <ul className="demo-stop-steps">
              {stage.steps.map((text) => <li key={text}>{text}</li>)}
            </ul>
            <p className="demo-stop-tools">{stage.tools.join(' · ')}</p>
          </li>
        ))}
      </ol>

      <p className="demo-next">
        Up next <span aria-hidden="true">→</span> <strong>Your 75-minute build session</strong>
      </p>
    </div>
  );
}
