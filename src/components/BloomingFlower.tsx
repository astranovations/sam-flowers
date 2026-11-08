import { useEffect, useRef } from "react";
import Illustration from "./ui/Illustration";

export const BLOOM_STAGES = ["a1-sprout", "a2-bud", "a3-opening", "a4-half-open", "a5-bloom"];

type Props = {
  /** Element whose scroll progress drives the bloom (tall section with a sticky child). */
  trackRef: React.RefObject<HTMLElement | null>;
  reduced: boolean;
};

/**
 * Five illustrations stacked on the same canvas, cross-faded by scroll progress,
 * so the flower grows from a sprout to a full bloom.
 */
export default function BloomingFlower({ trackRef, reduced }: Props) {
  const imgs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Once the flower has fully bloomed it stays open, even if the visitor scrolls back up.
    let bloomed = false;
    const apply = (p: number) => {
      if (p >= 0.995) bloomed = true;
      const t = (bloomed ? 1 : p) * (BLOOM_STAGES.length - 1);
      imgs.current.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = String(Math.max(0, 1 - Math.abs(t - i)));
      });
      track.style.setProperty("--p", p.toFixed(3));
    };

    if (reduced) {
      apply(1);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 1;
      apply(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [trackRef, reduced]);

  return (
    <div className="bloom" aria-hidden="true">
      {BLOOM_STAGES.map((name, i) => (
        <div key={name} className="bloom__layer" ref={(el) => { imgs.current[i] = el; }} style={{ opacity: i === 0 ? 1 : 0 }}>
          <Illustration name={name} eager />
        </div>
      ))}
    </div>
  );
}
