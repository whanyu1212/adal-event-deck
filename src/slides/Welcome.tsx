import { event } from '../event';
import { Tight } from '../components/Tight';

export function Welcome() {
  return (
    <div className="slide welcome">
      <h1 className="title">
        <Tight text={`Welcome to ${event.name}.`} />
      </h1>
      <dl className="facts">
        <dt>Wi-Fi</dt>
        <dd>
          <span className="mono">{event.wifi.network}</span>
          <span className="facts-aside">password</span>
          <span className="mono">{event.wifi.password}</span>
        </dd>
        <dt>Help</dt>
        <dd>{event.help}</dd>
        <dt>Photos</dt>
        <dd>{event.photography}</dd>
      </dl>
    </div>
  );
}
