import { useReducedMotion } from 'motion/react';
import { EditorialHeader } from '../components/EditorialHeader';
import { Tight } from '../components/Tight';

export function Capabilities() {
  const calm = useReducedMotion();

  return (
    <div className="slide tour-slide workspace-slide">
      <EditorialHeader kicker="Where you work · CLI & Desktop App" signature={['Same account & sessions', 'Type /ide to switch']}>
        Terminal speed. <span className="welcome-title-accent"><Tight text="Desktop clarity." /></span>
      </EditorialHeader>

      <div className="workspace-grid">
        {/* Left: AdaL CLI */}
        <section className="workspace-card is-cli" aria-label="AdaL CLI terminal interface">
          <div className="workspace-card-head">
            <div>
              <p className="label">01 · ADAL CLI · TERMINAL-NATIVE</p>
              <h2>Fast, scriptable &amp; keyboard-first.</h2>
            </div>
            <span className="workspace-badge">Recommended for devs</span>
          </div>

          <figure className="cli-window cli-recording" onDoubleClick={(e) => e.stopPropagation()}>
            <figcaption className="cli-window-bar">AdaL CLI · Recording · 10× speed</figcaption>
            <video
              src={`${import.meta.env.BASE_URL}media/cli-demo-terminal-10x-muted.mp4`}
              poster={`${import.meta.env.BASE_URL}media/cli-demo-terminal-poster.jpg`}
              aria-label="AdaL CLI terminal demo recording at 10 times speed"
              controls
              muted
              loop
              playsInline
              autoPlay={calm === false}
              preload="metadata"
            />
          </figure>

          <div className="workspace-pills">
            <span>Keyboard-first</span>
            <span>Git worktrees</span>
            <span>Headless CI &amp; SDK</span>
            <span>SSH &amp; remote dev</span>
          </div>
        </section>

        {/* Right: AdaL Desktop */}
        <section className="workspace-card is-desktop" aria-label="AdaL Desktop visual workspace" onDoubleClick={(e) => e.stopPropagation()}>
          <div className="workspace-card-head">
            <div>
              <p className="label">02 · ADAL DESKTOP · VISUAL WORKSPACE</p>
              <h2>Your projects, chats &amp; connected tools.</h2>
            </div>
            <span className="workspace-badge is-pink">macOS · Windows · Linux</span>
          </div>

          <figure className="desktop-window desktop-recording" onDoubleClick={(e) => e.stopPropagation()}>
            <figcaption className="desktop-window-bar">AdaL Desktop · Recording · 10× speed</figcaption>
            <video
              src={`${import.meta.env.BASE_URL}media/adal-demo-233639-10x-muted.mp4`}
              poster={`${import.meta.env.BASE_URL}media/adal-desktop-demo-poster.jpg`}
              aria-label="AdaL Desktop issue triage demo recording at 10 times speed"
              controls
              muted
              loop
              playsInline
              autoPlay={calm === false}
              preload="metadata"
            />
          </figure>

          <div className="workspace-pills">
            <span>Project chats</span>
            <span>Issue triage</span>
            <span>Schedules</span>
            <span>1-click connectors</span>
          </div>
        </section>
      </div>

      <div className="workspace-sync-bar">
        <span className="sync-pill">SHARED EVERYWHERE</span>
        <p>One AdaL account · Same project sessions · <code>/model</code> · <code>@skills</code> · Connectors · <code>/schedule</code></p>
        <span className="sync-cmd">Switch anytime with <code>/ide</code></span>
      </div>
    </div>
  );
}
