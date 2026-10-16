/** Countdown numerals with a fixed slot per digit, so the clock never jitters as it ticks. */
export function Digits({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`digits ${className}`} aria-label={text} role="timer">
      {[...text].map((ch, i) =>
        ch === ':' ? (
          <span key={i} className="digits-colon" aria-hidden>
            :
          </span>
        ) : (
          <span key={i} className="digits-slot" aria-hidden>
            {ch}
          </span>
        ),
      )}
    </span>
  );
}
