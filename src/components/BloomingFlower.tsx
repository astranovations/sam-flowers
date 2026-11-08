import { useCallback, useEffect, useRef, useState } from "react";
import Illustration from "./ui/Illustration";

export const BLOOM_STAGES = ["a1-sprout", "a2-bud", "a3-opening", "a4-half-open", "a5-bloom"];
const LAST = BLOOM_STAGES.length - 1;

type Props = {
  /** Element whose scroll progress drives the bloom (tall section with a sticky child). */
  trackRef: React.RefObject<HTMLElement | null>;
  reduced: boolean;
};

/**
 * Five illustrations stacked on the same canvas, cross-faded by scroll progress,
 * so the flower grows from a sprout to a full bloom.
 *
 * Robust to slow networks: the sprout loads first, the other stages follow, and
 * the cross-fade only uses stages that have actually arrived, so a quick scroller
 * never sees an empty arch.
 */
export default function BloomingFlower({ trackRef, reduced }: Props) {
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const loaded = useRef<boolean[]>(BLOOM_STAGES.map(() => false));
  const progress = useRef(0);
  const lvh = useRef(0);
  const bloomed = useRef(false);
  const [rest, setRest] = useState(false); // stages 2-5 start downloading once the sprout is in

  const paint = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    if (progress.current >= 0.995 && !bloomed.current) {
      // Once fully bloomed it stays open, even if the visitor scrolls back up.
      bloomed.current = true;
      track.dataset.bloomed = "1";
    }
    const t = (bloomed.current ? 1 : progress.current) * LAST;
    const have = loaded.current.map((ok, i) => (ok ? i : -1)).filter((i) => i >= 0);
    const lo = have.filter((i) => i <= t).pop();
    const hi = have.find((i) => i >= t);
    layers.current.forEach((el, i) => {
      if (!el) return;
      let w = 0;
      if (lo !== undefined && hi !== undefined) {
        if (lo === hi) w = i === lo ? 1 : 0;
        else w = i === lo ? (hi - t) / (hi - lo) : i === hi ? (t - lo) / (hi - lo) : 0;
      } else if (lo !== undefined) w = i === lo ? 1 : 0;
      else if (hi !== undefined) w = i === hi ? 1 : 0;
      el.style.opacity = String(w);
    });
    track.style.setProperty("--p", progress.current.toFixed(3));
  }, [trackRef]);

  const onStageLoad = (i: number) => {
    loaded.current[i] = true;
    if (i === 0) setRest(true);
    paint();
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (reduced) {
      progress.current = 1;
      paint();
      return;
    }

    const probe = document.createElement("div");
    probe.style.cssText = "position:fixed;visibility:hidden;pointer-events:none;height:100lvh;width:0";
    document.body.appendChild(probe);
    const measure = () => {
      lvh.current = probe.offsetHeight || window.innerHeight;
    };
    measure();

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      // Stable span: the hero is sized in lvh, so the bar showing/hiding on phones cannot
      // change it (window.innerHeight does), and the bloom always finishes before the sticky releases.
      const span = rect.height - lvh.current;
      progress.current = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 1;
      paint();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => {
      measure();
      onScroll();
    };
    window.addEventListener("resize", onResize);
    return () => {
      probe.remove();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [trackRef, reduced, paint]);

  return (
    <div className="bloom" aria-hidden="true">
      {BLOOM_STAGES.map((name, i) => (
        <div key={name} className="bloom__layer" ref={(el) => { layers.current[i] = el; }} style={{ opacity: 0 }}>
          {(i === 0 || rest) && <Illustration name={name} eager priority={i === 0 ? "high" : undefined} onLoad={() => onStageLoad(i)} />}
        </div>
      ))}
    </div>
  );
}
