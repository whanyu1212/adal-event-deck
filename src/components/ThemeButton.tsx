import type { MouseEvent } from 'react';
import type { Theme } from '../deck/theme';

const Sun = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

const Moon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
  </svg>
);

/**
 * Switches between the light and dark theme. It names the theme it switches *to*.
 * It hands focus straight back after a click, because the deck ignores keys
 * while a button has focus, and the clicker must keep working.
 */
export function ThemeButton({
  theme,
  setTheme,
  className = '',
}: {
  theme: Theme;
  setTheme: (t: Theme) => void;
  className?: string;
}) {
  const next: Theme = theme === 'light' ? 'dark' : 'light';
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    setTheme(next);
    e.currentTarget.blur();
  };
  return (
    <button
      type="button"
      className={`theme-button ${className}`}
      onMouseDown={(e) => e.preventDefault()}
      // A double-click on the deck goes fullscreen; clicking this twice shouldn't.
      onDoubleClick={(e) => e.stopPropagation()}
      onClick={onClick}
      aria-label={`Switch to the ${next} theme`}
      title={`Switch to the ${next} theme (T)`}
    >
      {next === 'dark' ? <Moon /> : <Sun />}
      <span>{next === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  );
}
