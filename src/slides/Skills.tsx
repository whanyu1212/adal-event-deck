import { QR } from '../components/QR';
export function Skills({ step = 0 }: { step?: number }) {
  return (
    <div className="slide tour-slide skills-tour">
      <p className="label">ATSkills · Reuse. Share. Discover.</p>
      <h1 className="title">Give AdaL your way of working.</h1>
      <div className="skills-stage">
        <div className="skills-request"><p className="label">01 · Mention a skill</p><code>@skills:gh:SylphAI-Inc/<br />skills/skills/glowmotion</code><p>draw the auth flow</p><small>No skill installation needed.</small></div>
        <div className={`skills-result ${step >= 1 ? 'is-revealed' : ''}`}>
          <div className="skill-loaded"><span>✦</span><div><p className="label">02 · Reuse the workflow</p><strong>glowmotion</strong><p>A skill for your next diagram.</p></div></div>
          <div className={`skills-diagram ${step >= 2 ? 'is-revealed' : ''}`}><p className="label">03 · Example outcome</p><div className="auth-flow"><span>Sign in</span><b>→</b><span>Verify</span><b>→</b><span>Workspace</span></div><small>Illustrative auth flow</small></div>
        </div>
      </div>
      <div className="skills-tour-footer"><p>Yours. Your team’s. The community’s.<br /><strong>Keep the workflow that works.</strong></p><a href="https://atskills.one/" target="_blank" rel="noopener noreferrer" onDoubleClick={(e) => e.stopPropagation()}><QR value="https://atskills.one/" size={150} caption="atskills.one ↗" /></a></div>
    </div>
  );
}
