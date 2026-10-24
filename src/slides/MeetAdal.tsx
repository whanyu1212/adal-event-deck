import { event } from '../event';
import { Tight } from '../components/Tight';

export function MeetAdal() {
  return (
    <div className="slide meet-adal">
      <div className="meet-main">
        <header className="meet-header">
          <h1 className="title welcome-title">
            <span className="welcome-kicker">Why the name</span>
            <span className="welcome-name"><span className="welcome-title-accent"><Tight text="AdaL?" /></span></span>
          </h1>
          <div className="welcome-signature meet-byline">
            <div><span>{event.adal.byline.made}</span><span>{event.adal.byline.named}</span></div>
          </div>
        </header>
        <p className="meet-lead">Named after <em>Ada Lovelace</em>, a pioneer of computer programming.</p>
        <section className="ada-beat meet-origin" aria-label="The origin of AdaL’s name">
          <figure className="origin-card">
            <svg viewBox="0 0 360 330" role="img" aria-label="Illustrated Analytical Engine punch card inspired by Ada Lovelace’s 1843 Note G">
              <path d="M24 18H310L338 46V312H24Z" fill="var(--bg)" stroke="var(--rule)" strokeWidth="2" />
              <text x="46" y="54" fill="var(--muted)" fontFamily="var(--mono)" fontSize="13" letterSpacing="3">ANALYTICAL ENGINE</text>
              <text x="46" y="88" fill="var(--ink)" fontFamily="var(--display)" fontSize="22">Note G / Operation cards</text>
              {Array.from({ length: 8 }, (_, row) => Array.from({ length: 12 }, (_, col) => {
                const lit = (row * 7 + col * 3) % 11 < 3;
                return <rect key={`${row}-${col}`} x={47 + col * 23} y={117 + row * 20} width="10" height="7" rx="1" fill={lit ? 'var(--launch)' : 'var(--rule)'} />;
              }))}
              <path d="M46 292H314" stroke="var(--rule)" />
            </svg>
            <figcaption>NOTE G · 1843<br />BERNOULLI NUMBERS · 25 OPS</figcaption>
          </figure>
          <div className="origin-timeline">
            <section>
              <h2><span>1843</span> The First Published Algorithm</h2>
              <p>In Note G, she set out step by step how Babbage's Analytical Engine could compute Bernoulli numbers—an early vision of what computers could do.</p>
            </section>
            <section>
              <h2><span>Today</span> A Name for What We Build Next</h2>
              <p>Every coding agent can write code. AdaL carries that vision forward: building the product and launching it from one place.</p>
            </section>
          </div>
        </section>
      </div>
      <figure className="ada-portrait">
        <img src={`${import.meta.env.BASE_URL}media/ada-lovelace.jpg`} alt="Ada Lovelace in Alfred Edward Chalon’s portrait, wearing a white dress and holding a fan." />
        <figcaption>Ada Lovelace (1815–1852) · Portrait c. 1840</figcaption>
      </figure>
    </div>
  );
}
