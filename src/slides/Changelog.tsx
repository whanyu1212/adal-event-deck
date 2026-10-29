import { EditorialHeader } from '../components/EditorialHeader';
import { Tight } from '../components/Tight';

// High-level summary of https://docs.sylph.ai/changelog/, grouped into eras.
// Update when a new major or minor release lands.
const eras = [
  {
    when: 'Dec – Jan',
    versions: 'v0.2 → v0.5',
    title: 'A coding agent in your terminal',
    points: ['Session resume & /compact', 'Skills, plugins & marketplace', 'Plan mode & a flicker-free UI'],
  },
  {
    when: 'Feb – Mar',
    versions: 'v0.6 → v1.0',
    title: 'Faster, multimodal, 1.0',
    points: ['Parallel tool calls & subagents', 'Image generation & headless mode', 'Deep Research ships with 1.0'],
  },
  {
    when: 'Apr – Jun',
    versions: 'v1.0.3 → v1.2',
    title: 'Beyond the terminal',
    points: ['Cron agent for scheduled work', 'AdaL Desktop & Review Agent', 'Browser Use mode'],
  },
  {
    when: 'Jul – Aug',
    versions: 'v1.3 → v1.7',
    title: 'Open it up',
    points: ['Agent SDK & custom tools', 'Bring your own key, every provider', '@Skills Hub at atskills.one'],
  },
  {
    when: 'Sep – Oct',
    versions: 'v1.8 → v1.10',
    title: 'From code to launch',
    points: ['Capabilities: browser, video, research', 'Connectors for Gmail, Slack, Notion…', 'Video producer in Desktop'],
  },
];

export function Changelog({ step = eras.length - 1 }: { step?: number }) {
  return (
    <div className="slide changelog-slide">
      <EditorialHeader kicker="How AdaL has grown" signature={['From terminal agent', 'to build & launch']}>
        AdaL has come <span className="welcome-title-accent"><Tight text="a long way." /></span>
      </EditorialHeader>
      <ol className="changelog-rail" aria-label="AdaL release history">
        {eras.map((era, i) => (
          <li
            key={era.versions}
            className={`changelog-era ${step >= i ? 'is-revealed' : ''} ${step === i ? 'is-current' : ''}`}
          >
            <span className="changelog-dot" aria-hidden="true" />
            <p className="changelog-when">{era.when}</p>
            <p className="changelog-version">{era.versions}</p>
            <h2>{era.title}</h2>
            <ul>
              {era.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </li>
        ))}
      </ol>
      <p className="changelog-source">Full history at docs.sylph.ai/changelog</p>
    </div>
  );
}
