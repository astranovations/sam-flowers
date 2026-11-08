import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { birthday } from "../content";
import { createBirthdayPlayer, karaoke } from "../lib/birthdayMusic";
import Illustration from "./ui/Illustration";
import { Flourish } from "./Ornaments";

const SEEN = "sf-bday-seen";
const INTRO = "sf-intro-seen";

/** True on the birthday itself (day and month from `birthday.date`, every year). */
function isBirthdayToday(): boolean {
  const now = new Date();
  return now.getMonth() + 1 === birthday.date.month && now.getDate() === birthday.date.day;
}

/**
 * Shown once per session while enabled; `?birthday` in the URL forces it.
 * On the birthday date it shows on every visit and refresh.
 */
export function shouldShowBirthday(): boolean {
  if (!birthday.enabled || typeof window === "undefined") return false;
  if (isBirthdayToday()) return true;
  try {
    if (new URLSearchParams(window.location.search).has("birthday")) return true;
    return !sessionStorage.getItem(SEEN);
  } catch {
    return true;
  }
}

const PETALS = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 37 + 8) % 100,
  delay: (i * 0.9) % 7,
  dur: 8 + ((i * 5) % 6),
  size: 10 + ((i * 7) % 12),
  hue: i % 3,
}));

function SoundIcon({ on }: { on: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
      {on ? (
        <>
          <path d="M15.5 9a4 4 0 0 1 0 6" />
          <path d="M18 6.5a7.5 7.5 0 0 1 0 11" />
        </>
      ) : (
        <path d="M16 9.5l5 5m0-5l-5 5" />
      )}
    </svg>
  );
}

export default function Birthday({ onClose }: { onClose: () => void }) {
  const lines = useMemo(() => karaoke(), []);
  const player = useRef(createBirthdayPlayer());
  const [phase, setPhase] = useState<"idle" | "playing" | "ended">("idle");
  const [muted, setMuted] = useState(false);
  const [t, setT] = useState(-1);
  const [leaving, setLeaving] = useState(false);
  const enterRef = useRef<HTMLButtonElement>(null);

  // lock page scroll while open; focus the main button
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    enterRef.current?.focus();
    const p = player.current;
    return () => {
      document.documentElement.style.overflow = prev;
      p.stop();
    };
  }, []);

  // clock for the karaoke while playing (about 12 updates a second)
  useEffect(() => {
    if (phase !== "playing") return;
    let raf = 0;
    let last = -1;
    const tick = () => {
      const now = player.current.now();
      const q = Math.floor(now * 12);
      if (q !== last) {
        last = q;
        setT(now);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const play = useCallback(() => {
    if (phase === "playing") return;
    const ok = player.current.start(muted, () => setPhase("ended"));
    if (ok) setPhase("playing");
  }, [phase, muted]);

  const toggleSound = () => {
    if (phase !== "playing") {
      setMuted(false);
      play();
      return;
    }
    const next = !muted;
    setMuted(next);
    player.current.setMuted(next);
  };

  const close = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    player.current.stop();
    try {
      sessionStorage.setItem(SEEN, "1");
      sessionStorage.setItem(INTRO, "1"); // skip the curtain right after the greeting
    } catch {
      /* ignore */
    }
    window.setTimeout(onClose, 700);
  }, [leaving, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const current = phase === "ended" ? lines.length - 1 : Math.max(0, lines.findIndex((l, i) => t >= l.start && (i === lines.length - 1 || t < lines[i + 1].start)));
  const showLyrics = phase !== "idle";
  const next = lines[current + 1];

  return (
    <div className={`bday ${leaving ? "bday--leaving" : ""}`} role="dialog" aria-modal="true" aria-label={`${birthday.title} ${birthday.name}`}>
      <div className="bday__petals" aria-hidden="true">
        {PETALS.map((p, i) => (
          <i
            key={i}
            className={`bday__petal bday__petal--${p.hue}`}
            style={{ left: `${p.left}%`, width: p.size, height: p.size, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s` }}
          />
        ))}
      </div>

      <button className={`bday__sound ${phase === "playing" && !muted ? "is-on" : ""}`} onClick={toggleSound} aria-label={phase === "playing" && !muted ? "Couper le son" : "Activer le son"}>
        <SoundIcon on={phase === "playing" && !muted} />
      </button>

      <div className="bday__inner">
        <div className="bday__art">
          <div className="bday__arch">
            <div className="bday__window">
              <Illustration name={birthday.image} eager />
            </div>
            <div className="bday__garland" aria-hidden="true">
              <Illustration name="g2-arch-garland" eager />
            </div>
          </div>
        </div>

        <div className="bday__text">
          <span className="eyebrow bday__eyebrow">{birthday.eyebrow}</span>
          <h2 className="bday__title">{birthday.title}</h2>
          <p className="bday__name">{birthday.name}</p>
          <Flourish className="bday__flourish" />
          <p className="bday__msg">{birthday.message}</p>
          <p className="bday__from">— {birthday.from}</p>

          <div className="bday__karaoke" aria-live="off">
            {!showLyrics ? (
              <button className="bday__play" onClick={play}>
                <span aria-hidden="true">♪</span> Écouter la chanson
              </button>
            ) : (
              <>
                <p className="k-line k-line--now" key={current}>
                  {lines[current].words.map((w, i) => {
                    const state = phase === "ended" || t >= w.start + w.dur ? "done" : t >= w.start ? "on" : "";
                    return (
                      <span key={i} className={`k-word ${state}`} style={{ "--dur": `${w.dur}s` } as React.CSSProperties}>
                        {w.text}{" "}
                      </span>
                    );
                  })}
                </p>
                <p className="k-line k-line--next" aria-hidden="true">
                  {next ? next.words.map((w) => w.text).join(" ") : " "}
                </p>
              </>
            )}
          </div>

          <button ref={enterRef} className="btn btn--gold bday__enter" onClick={close}>
            Entrer dans l'atelier →
          </button>
        </div>
      </div>
    </div>
  );
}
