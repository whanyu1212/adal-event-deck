import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/*
  AdaL, the mascot from the Build Night poster, standing on the slide's rule line.
  She breathes and sways a little, blinks now and then, and holds a spinning
  AdaL hologram over her open palm, with sparks rising into it.

  Art: public/mascot/adal.webp (cut out from a render matched to the poster) and
  adal-blink.png, an eyes-closed patch that sits exactly over her eyes.
  The numbers below are percentages of the figure image.
*/

const asset = (path: string) => `${import.meta.env.BASE_URL}/${path}`.replace(/\/+/g, '/');

const ASPECT = 0.50463; // width / height of adal.webp
const EYES = { left: 41.657, top: 6.222, width: 11.86 };
const PALM = { left: 8.6, top: 22.4 };

function useBlink(enabled: boolean) {
  const [shut, setShut] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    let timer: ReturnType<typeof setTimeout>;
    const blink = (twice: boolean) => {
      setShut(true);
      timer = setTimeout(() => {
        setShut(false);
        timer = twice ? setTimeout(() => blink(false), 220) : setTimeout(next, 2600 + Math.random() * 3400);
      }, 130);
    };
    // Mostly single blinks, sometimes a quick double, like a person.
    const next = () => blink(Math.random() < 0.2);
    timer = setTimeout(next, 1800);
    return () => clearTimeout(timer);
  }, [enabled]);
  return shut;
}

export function Mascot({ height, className = '' }: { height: number; className?: string }) {
  const calm = useReducedMotion();
  const shut = useBlink(!calm);
  const width = Math.round(height * ASPECT);

  return (
    <motion.div
      className={`mascot ${className}`}
      style={{ width, height }}
      initial={calm ? false : { opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
      aria-hidden
    >
      <div className="mascot-halo" />
      <div className="mascot-shadow" />

      <div className="mascot-figure">
        <img className="mascot-img" src={asset('mascot/adal.webp')} alt="" draggable={false} />
        <img
          className={`mascot-blink${shut ? ' is-shut' : ''}`}
          src={asset('mascot/adal-blink.png')}
          alt=""
          draggable={false}
          style={{ left: `${EYES.left}%`, top: `${EYES.top}%`, width: `${EYES.width}%` }}
        />

        {/* The hologram rides with her hand, so it lives inside the swaying figure */}
        <div className="holo" style={{ left: `${PALM.left}%`, top: `${PALM.top}%` }}>
          <div className="holo-beam" />
          <div className="holo-ring holo-ring-a" />
          <div className="holo-ring holo-ring-b" />
          <div className="holo-mark">
            <img src={asset('logos/adal-icon.svg')} alt="" draggable={false} />
          </div>
          {Array.from({ length: 9 }, (_, i) => (
            <span
              key={i}
              className="holo-spark"
              style={{
                left: `${-34 + ((i * 37) % 68)}px`,
                animationDelay: `${(i * 0.37) % 2.6}s`,
                animationDuration: `${2.2 + ((i * 0.53) % 1.4)}s`,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
