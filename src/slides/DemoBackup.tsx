import { useState } from 'react';

const src = `${import.meta.env.BASE_URL}demo-backup.mp4`.replace('//', '/');

export function DemoBackup() {
  const [missing, setMissing] = useState(false);
  return (
    <div className="slide demo-backup">
      {missing ? (
        <div className="demo-missing">
          <h1 className="title">Backup demo</h1>
          <p className="lead">
            No recording found. Put it at <span className="mono">public/demo-backup.mp4</span> and
            rebuild.
          </p>
        </div>
      ) : (
        <video src={src} controls preload="auto" playsInline onError={() => setMissing(true)} />
      )}
    </div>
  );
}
