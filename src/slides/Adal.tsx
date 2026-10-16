import { event } from '../event';

// Public, documented features only (docs.sylph.ai).
const build = [
  'Writes and edits code in your repo',
  'Checks its work in its own browser',
  'Connects to MCP servers and your own tools',
  'Runs headless, or from the SDK',
  'Takes custom skills, prompts and hooks',
];
const launch = [
  'Launch images and short promo videos',
  "Copy that doesn't sound like AI",
  'Competitor research with search and the browser',
  "What's trending in your space",
  'Scheduled prompts, like a daily digest',
];

export function Adal() {
  return (
    <div className="slide adal">
      <h1 className="title">What is AdaL?</h1>
      <p className="lead adal-lead">{event.adal.oneLiner}</p>
      <div className="tracks">
        <section className="track track-build">
          <h2>{event.tracks.build.title}</h2>
          <ul>{build.map((f) => <li key={f}>{f}</li>)}</ul>
        </section>
        <section className="track track-launch">
          <h2>{event.tracks.launch.title}</h2>
          <ul>{launch.map((f) => <li key={f}>{f}</li>)}</ul>
        </section>
      </div>
    </div>
  );
}
