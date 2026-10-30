import { useEffect, useState } from 'react';
import { BUILD_MS, buildTimes, useBuildStart } from '../deck/buildClock';
import { clockLabel, duration, label, now, useNow } from '../deck/time';
import { event } from '../event';

/**
 * Start the build session by hand. Used in the presenter window and in the audience
 * window's corner (which hides with the idle cursor, like the theme button).
 * Restarting a session that is already running takes a second click, so a stray
 * click can't throw away the room's time.
 */
export function BuildControls({ className = '' }: { className?: string }) {
  const [manual, setManual] = useBuildStart();
  const t = useNow(1000);
  const times = buildTimes(manual, t);
  const running = t >= times.start && t < times.end;
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return;
    const id = setTimeout(() => setConfirming(false), 3000);
    return () => clearTimeout(id);
  }, [confirming]);

  const start = () => {
    if (running && !confirming) {
      setConfirming(true);
      return;
    }
    setConfirming(false);
    setManual(now());
  };

  const total = duration(BUILD_MS);
  const status =
    times.source === 'manual'
      ? `Started ${clockLabel(times.start)}, ends ${clockLabel(times.end)}`
      : `Following the schedule: ${label(event.buildBlock.start)} to ${label(event.buildBlock.submit)}`;

  return (
    <div className={`build-controls ${className}`} onDoubleClick={(e) => e.stopPropagation()}>
      <button type="button" className={`build-start${confirming ? ' is-confirming' : ''}`} onClick={start}>
        {confirming ? `Click again to restart ${total}` : running ? `Restart ${total}` : `Start ${total} countdown`}
      </button>
      {times.source === 'manual' && (
        <button type="button" onClick={() => setManual(null)}>
          Back to schedule
        </button>
      )}
      <span className="build-status">{status}</span>
    </div>
  );
}
