import { event } from '../event';

const asset = (path: string) => `${import.meta.env.BASE_URL}/${path}`.replace(/\/+/g, '/');

const s = event.smuai;
const logo = event.logos.find((l) => l.className === 'logo-smuai');

function SmuaiLogo() {
  if (!logo) return null;
  return (
    <span className="smuai-logo">
      <img src={asset(logo.src)} alt={logo.alt} className="on-light" />
      {'srcOnDark' in logo && <img src={asset(logo.srcOnDark)} alt={logo.alt} className="on-dark" />}
    </span>
  );
}

/** Their laptop art, with the club logo and tagline on its screen as in their deck. */
function Laptop() {
  return (
    <div className="smuai-laptop">
      <img src={asset(s.laptop)} alt="" />
      <div className="smuai-laptop-screen">
        {logo && <img src={asset(logo.src)} alt={logo.alt} />}
        <span className="smuai-pill">{s.tagline}</span>
      </div>
    </div>
  );
}

function Bulb() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M24 3v4M8 9l3 3M40 9l-3 3M3 24h4M41 24h4" />
        <path d="M17 33c0-4-5-6-5-13a12 12 0 0 1 24 0c0 7-5 9-5 13z" />
        <path d="M18 38h12M20 43h8" />
      </g>
    </svg>
  );
}

/** Background shapes from their deck: a big blue circle and two dot grids. */
function Shapes({ variant }: { variant: 'hook' | 'what' | 'events' }) {
  return (
    <div className={`smuai-shapes is-${variant}`} aria-hidden>
      <span className="smuai-circle" />
      <span className="smuai-halo" />
      <span className="smuai-dots is-a" />
      <span className="smuai-dots is-b" />
    </div>
  );
}

export function SmuaiHook() {
  return (
    <div className="slide smuai-hook">
      <Shapes variant="hook" />
      <div className="smuai-hook-main">
        <SmuaiLogo />
        <h1 className="smuai-hook-title">{s.hook[0]}</h1>
        <p className="smuai-hook-sub">{s.hook[1]}</p>
        <p className="smuai-motto">{s.motto}</p>
      </div>
      <Laptop />
    </div>
  );
}

export function SmuaiWhat() {
  return (
    <div className="slide smuai-what">
      <Shapes variant="what" />
      <h1 className="smuai-title">What is SMUAI?</h1>
      <p className="smuai-what-lead">
        {s.what.map((part) => ('strong' in part ? <strong key={part.text}>{part.text}</strong> : part.text))}
      </p>
      <div className="smuai-aim">
        <span className="smuai-bulb">
          <Bulb />
        </span>
        <p>{s.aim}</p>
      </div>
      <span className="smuai-pill">{s.tagline}</span>
    </div>
  );
}

/** Their Featured Events slide, with the photos and names only. */
export function SmuaiEvents() {
  return (
    <div className="slide smuai-events">
      <Shapes variant="events" />
      <h1 className="smuai-title">{s.eventsTitle}</h1>
      <ul>
        {s.events.map((e) => (
          <li key={e.name}>
            <h2>{e.category}</h2>
            <img src={asset(e.photo)} alt={e.name} />
            <p>{e.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
