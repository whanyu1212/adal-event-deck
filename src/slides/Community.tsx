import { event } from '../event';
import { QR } from '../components/QR';

const asset = (path: string) => `${import.meta.env.BASE_URL}/${path}`.replace(/\/+/g, '/');

const c = event.community;

export function Community() {
  return (
    <div className="slide community">
      <div className="community-main">
        <p className="label">Build Club × Singapore</p>
        <h1 className="title">AI for everyone in Singapore</h1>
        <p className="lead">{c.lead}</p>

        <figure className="community-training">
          <img src={asset(c.training.image)} alt={c.training.alt} />
          <figcaption>
            <strong>{c.training.title}</strong>
            <span>{c.training.detail}</span>
          </figcaption>
        </figure>
      </div>

      <figure className="ai-pass">
        <img className="ai-pass-shot" src={asset(c.aiPass.screenshot)} alt={c.aiPass.alt} />
        <figcaption className="ai-pass-foot">
          <p>{c.aiPass.how}</p>
          <QR value={c.aiPass.url} size={120} />
        </figcaption>
      </figure>
    </div>
  );
}
