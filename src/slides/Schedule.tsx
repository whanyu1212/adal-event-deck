import { event } from '../event';
import { at, label, useNow } from '../deck/time';

export function Schedule() {
  const t = useNow(5000);
  const items = event.schedule;
  const current = items.findLastIndex((item) => at(item.time) <= t);

  return (
    <div className="slide schedule">
      <h1 className="title">Tonight</h1>
      <ol className="timeline">
        {items.map((item, i) => (
          <li
            key={item.time}
            className={i === current ? 'is-now' : i < current ? 'is-past' : undefined}
            aria-current={i === current ? 'time' : undefined}
          >
            <time>{label(item.time)}</time>
            <span>{item.title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
