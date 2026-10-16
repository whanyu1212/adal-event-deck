import { event } from '../event';
import { QR } from '../components/QR';
import { Tight } from '../components/Tight';

export function Close() {
  return (
    <div className="slide close">
      <h1 className="title">
        <Tight text="Thanks for building with us." />
      </h1>
      <p className="lead">Group photo at the front in a few minutes. Stay close.</p>
      <div className="close-codes">
        <QR value={event.links.survey} size={260} caption="Tell us how tonight went" />
        <QR value={event.links.discord} size={260} caption="Keep building in the AdaL Discord" />
        <QR value={event.links.nextEvent} size={260} caption="Come to the next Build Club" />
      </div>
    </div>
  );
}
