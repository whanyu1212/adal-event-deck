import { useEffect } from 'react';
import { useShared } from './shared';

// Light is the default: the venue is brightly lit, and a projector can't show
// black darker than the lit screen it lands on. Dark is there for a dim room.
//   ?theme=dark   start in the dark theme
//   T             switch theme live (both windows follow)

export type Theme = 'light' | 'dark';

export function themeFromUrl(): Theme {
  const p = new URLSearchParams(typeof location === 'undefined' ? '' : location.search);
  return p.get('theme') === 'dark' ? 'dark' : 'light';
}

/** The current theme, shared between the audience and presenter windows. */
export function useTheme(): [Theme, (t: Theme) => void] {
  const [theme, setTheme] = useShared<Theme>('deck:theme', themeFromUrl());
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return [theme, setTheme];
}
