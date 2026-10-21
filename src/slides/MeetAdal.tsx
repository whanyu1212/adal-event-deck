import { event } from '../event';
import { Mascot } from '../components/Mascot';
import { Tight } from '../components/Tight';

export function MeetAdal() {
  return (
    <div className="slide meet-adal">
      <Mascot height={760} className="meet-mascot" />
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
        <div className="name-story">
          <p className="label">Ada Lovelace · 1843</p>
          <p className="meet-lead">Named after <em>Ada Lovelace</em>, a pioneer of computer programming.</p>
          <p className="lead">An early vision of what computers could do.<br />A name for what we can build next.</p>
        </div>
      </div>
    </div>
  );
}
