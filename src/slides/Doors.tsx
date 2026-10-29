import { Fragment } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { event } from '../event';
import { QR } from '../components/QR';
import { Tight } from '../components/Tight';
import { Mascot } from '../components/Mascot';
import { Typewriter } from '../components/Typewriter';

const asset = (path: string) => `${import.meta.env.BASE_URL}/${path}`.replace(/\/+/g, '/');

export function Doors() {
  const calm = useReducedMotion();

  // Each logo rises in a beat after the one before.
  const rise = (i: number) => ({
    initial: calm ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.15 + i * 0.14, duration: 0.5, ease: [0.2, 0.7, 0.2, 1] as const },
  });

  return (
    <div className="slide doors">
      <Mascot height={660} className="doors-mascot" />

      <header className="doors-top">
        <div className="doors-logos">
          {event.logos.map((logo, i) => (
            <Fragment key={logo.src}>
              {i > 0 && (
                <motion.span className="doors-x" aria-hidden {...rise(i * 2 - 1)}>
                  ×
                </motion.span>
              )}
              <motion.span className="doors-logo" {...rise(i * 2)}>
                <img
                  src={asset(logo.src)}
                  alt={logo.alt}
                  className={`${logo.className}${'srcOnDark' in logo ? ' on-light' : ''}`}
                />
                {'srcOnDark' in logo && (
                  <img src={asset(logo.srcOnDark)} alt={logo.alt} className={`${logo.className} on-dark`} />
                )}
              </motion.span>
            </Fragment>
          ))}
        </div>
      </header>

      <div className="doors-hero">
        <p className="doors-city">Singapore {event.name}</p>
        <h1 className="doors-title">
          <motion.span
            className="doors-build"
            initial={calm ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Tight text={event.theme.build} />
          </motion.span>
          <motion.span
            className="doors-launch"
            initial={calm ? false : { opacity: 0, y: 90 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, type: 'spring', stiffness: 90, damping: 16 }}
          >
            <Tight text={event.theme.launch} />
            {/* A band of light that sweeps across the pink line every few seconds */}
            <span className="doors-sheen" aria-hidden>
              <Tight text={event.theme.launch} />
            </span>
          </motion.span>
        </h1>
        <p className="prompt-chip" aria-label={event.doorsPrompts[0]}>
          <span className="prompt-caret">&gt;</span>
          <Typewriter lines={event.doorsPrompts} className="prompt-text" />
        </p>
      </div>

      <section className="doors-bottom">
        <div className="doors-install">
          <h2>Install AdaL while you wait</h2>
          <pre className="command">
            <code>{event.installCommand}</code>
          </pre>
          <p className="doors-promo">
            <span className="doors-promo-offer">{event.promo.offer}, free</span>
            <code>{event.promo.code}</code>
            <span>Sign up at {event.promo.signUpLabel} · valid until {event.promo.validUntil}</span>
          </p>
          <p className="doors-docs">
            Getting started: <a href={event.links.docs} target="_blank" rel="noopener noreferrer" onDoubleClick={(e) => e.stopPropagation()}>docs.sylph.ai ↗</a>
          </p>
        </div>
        <QR value={event.links.discord} size={190} caption="Join the AdaL Discord" />
      </section>
    </div>
  );
}
