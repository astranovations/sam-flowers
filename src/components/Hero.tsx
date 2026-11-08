import { useRef } from "react";
import { site } from "../content";
import { useReducedMotion } from "../hooks/useReducedMotion";
import BloomingFlower, { wasBloomed } from "./BloomingFlower";
import Illustration from "./ui/Illustration";

export default function Hero() {
  const track = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const words = site.tagline.split(" ");

  return (
    <section className="hero" ref={track} aria-label="Accueil" data-bloomed={wasBloomed() ? "1" : undefined}>
      <div className="hero__sticky">
        <div className="hero__stage">
          <div className="hero__aurora" aria-hidden="true" />
          <div className="hero__copy">
            <span className="eyebrow hero__eyebrow">Fleuriste · Fait main</span>
            <h1 className="hero__title">
              {words.map((w, i) => (
                <span className="word" key={i} style={{ "--i": i } as React.CSSProperties}>
                  {w}
                </span>
              ))}
            </h1>
            <p className="hero__sub">{site.heroSub}</p>
            <a className="link-arrow hero__cta" href="#histoire">
              Découvrir <span>→</span>
            </a>
          </div>

          <div className="hero__flower">
            <div className="arch">
              <div className="arch__window">
                <BloomingFlower trackRef={track} reduced={reduced} />
              </div>
              <div className="arch__garland" aria-hidden="true">
                <Illustration name="g2-arch-garland" eager priority="low" />
              </div>
            </div>
          </div>

          <div className="hero__rail" aria-hidden="true" />

          <div className="hero__hint" aria-hidden="true">
            <span className="hint hint--go">
              <i className="hint__chev" /> Faites défiler pour la voir éclore
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
