import { useMemo } from 'react';
import QRCode from 'qrcode';

/**
 * A QR code drawn as SVG in the browser, so it needs no network.
 * With no link yet, it shows an empty frame saying so.
 */
export function QR({ value, size = 240, caption }: { value: string; size?: number; caption: string }) {
  const path = useMemo(() => {
    if (!value) return null;
    const { modules } = QRCode.create(value, { errorCorrectionLevel: 'M' });
    let d = '';
    for (let y = 0; y < modules.size; y++) {
      for (let x = 0; x < modules.size; x++) {
        if (modules.get(y, x)) d += `M${x} ${y}h1v1h-1z`;
      }
    }
    return { d, n: modules.size };
  }, [value]);

  return (
    <figure className="qr" style={{ width: size }}>
      {path ? (
        <svg
          className="qr-code"
          viewBox={`-2 -2 ${path.n + 4} ${path.n + 4}`}
          width={size}
          height={size}
          role="img"
          aria-label={`QR code for ${value}`}
          shapeRendering="crispEdges"
        >
          <rect x={-2} y={-2} width={path.n + 4} height={path.n + 4} fill="#fff" />
          <path d={path.d} fill="#0D0A17" />
        </svg>
      ) : (
        <div className="qr-missing" style={{ width: size, height: size }}>
          Link coming
        </div>
      )}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
