import type { CSSProperties } from 'react';
import { event } from '../event';
import { at, label, useNow } from '../deck/time';

export function Schedule() {
  const t = useNow(5000);
  const items = event.schedule;
  const current = items.findLastIndex((item) => at(item.time) <= t);

  return (
    <section className="schedule" aria-labelledby="welcome-tonight">
      <h2 className="label welcome-section-title" id="welcome-tonight">Tonight</h2>
      <ol className="timeline">
        {items.map((item, i) => (
          <li
            key={item.time}
            style={{ '--agenda-order': i } as CSSProperties}
            className={i > 0 && i === current ? 'is-now' : i < current ? 'is-past' : undefined}
            aria-current={i === current ? 'time' : undefined}
          >
            <time>{label(item.time)}</time>
            <span>{item.title}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
