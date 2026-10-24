import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { EditorialHeader } from '../components/EditorialHeader';
import { Tight } from '../components/Tight';

const asset = (path: string) => `${import.meta.env.BASE_URL}/${path}`.replace(/\/+/g, '/');

const features = [
  { title: 'Build.', label: 'Code & browser', caption: 'Make the change. Check it in the browser.' },
  { title: 'Research.', label: 'Competitor context', caption: 'Find the context behind your next move.' },
  { title: 'Launch.', label: 'Story & visuals', caption: 'Give what you built a story and a visual.' },
];

export function Adal({ step = 0 }: { step?: number }) {
  const calm = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(!calm);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (step >= 2 && playing) {
      video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [step, playing]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="slide tour-slide">
      <EditorialHeader kicker="Meet your workflow" signature={['One project, one conversation', 'Build → Research → Launch']}>
        From first change to <span className="welcome-title-accent"><Tight text="first impression." /></span>
      </EditorialHeader>
      <div className="tour-panels">
        {features.map((feature, i) => (
          <section key={feature.title} className={`tour-panel ${step >= i ? 'is-revealed' : ''} ${step === i ? 'is-current' : ''}`}>
            <div className="tour-meta"><span>0{i + 1}</span><p>{feature.label}</p></div>
            <h2>{feature.title}</h2>
            <p className="tour-caption">{feature.caption}</p>
            <div className="tour-visual">
              {i === 0 ? (
                <div className="tour-build-scene">
                  <div className="build-diff-card">
                    <div className="build-diff-head">
                      <span>src/theme.ts</span>
                      <span className="build-diff-stat">+28 −6</span>
                    </div>
                    <code className="diff-minus">− const theme = 'light';</code>
                    <code className="diff-plus">+ const theme = usePreferredTheme();</code>
                  </div>
                  <div className="build-browser-card">
                    <div className="build-browser-bar">
                      <span className="build-dots" aria-hidden="true">● ● ●</span>
                      <span className="build-url">localhost:4321</span>
                      <span className="build-ok">✓ Verified</span>
                    </div>
                    <div className="build-browser-Stage">
                      <div className="build-mock-ui">
                        <div className="build-mock-nav">
                          <span className="build-mock-logo" />
                          <span className="build-mock-pill">Dark mode ✓</span>
                        </div>
                        <div className="build-mock-hero">
                          <span className="build-mock-line is-wide" />
                          <span className="build-mock-line is-accent" />
                        </div>
                      </div>
                      <div className="build-audit-row">
                        <span>DOM &amp; layout checked</span>
                        <span>0 console errors</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : i === 1 ? (
                <div className="tour-research-scene">
                  <div className="research-map-head">
                    <span>POSITIONING LANDSCAPE</span>
                    <span>12 cited sources</span>
                  </div>
                  <div className="research-quadrant">
                    <svg viewBox="0 0 360 156" className="research-chart" aria-hidden="true">
                      <line x1="180" y1="10" x2="180" y2="146" className="rq-axis" />
                      <line x1="16" y1="78" x2="344" y2="78" className="rq-axis" />
                      <text x="24" y="24" className="rq-label">LAUNCH &amp; GTM</text>
                      <text x="248" y="140" className="rq-label">CODE DEPTH →</text>
                      <circle cx="96" cy="48" r="6" className="rq-peer" />
                      <text x="108" y="52" className="rq-peer-text">Video tools</text>
                      <circle cx="242" cy="112" r="6" className="rq-peer" />
                      <text x="254" y="116" className="rq-peer-text">CLI coders</text>
                      <circle cx="144" cy="118" r="6" className="rq-peer" />
                      <text x="156" y="122" className="rq-peer-text"> Point bots</text>
                      <circle cx="284" cy="38" r="16" className="rq-target-halo" />
                      <circle cx="284" cy="38" r="7" className="rq-target" />
                      <text x="210" y="42" className="rq-target-text">Your gap</text>
                    </svg>
                  </div>
                  <div className="research-sources">
                    <span>github.com</span>
                    <span>linkedin.com</span>
                    <span>x.com</span>
                    <span className="research-arrow">→ Brief ready</span>
                  </div>
                </div>
              ) : (
                <div className="tour-launch-video" onDoubleClick={(e) => e.stopPropagation()}>
                  <video
                    ref={videoRef}
                    src={asset('media/adal-launch-video.mp4')}
                    poster={asset('media/adal-launch-poster.jpg')}
                    muted={muted}
                    loop
                    playsInline
                    onClick={togglePlay}
                  />
                  <div className="launch-video-top">
                    <span className="launch-video-badge">AdaL Video · 16:9</span>
                    <div className="launch-video-controls">
                      <button type="button" onClick={togglePlay}>
                        {playing && step >= 2 ? 'Pause' : 'Play'}
                      </button>
                      <button type="button" onClick={() => setMuted((m) => !m)}>
                        {muted ? 'Unmute' : 'Mute'}
                      </button>
                    </div>
                  </div>
                  <div className="launch-video-bottom">
                    <span>Rendered in project folder</span>
                    <span>00:30 · MP4</span>
                  </div>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
