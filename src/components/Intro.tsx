import { useCallback, useEffect, useState } from "react";
import { Seal } from "./Ornaments";

const KEY = "sf-intro-seen";

/** Curtain that opens on tap (or by itself after a few seconds), once per session. */
export default function Intro() {
  const [state, setState] = useState<"closed" | "opening" | "gone">(() => {
    try {
      if (typeof window !== "undefined" && (sessionStorage.getItem(KEY) || window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
        return "gone";
      }
    } catch {
      /* ignore */
    }
    return "closed";
  });

  const open = useCallback(() => {
    setState((s) => (s === "closed" ? "opening" : s));
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (state === "closed") {
      document.documentElement.style.overflow = "hidden";
      const t = window.setTimeout(open, 3800);
      return () => window.clearTimeout(t);
    }
    if (state === "opening") {
      const t = window.setTimeout(() => {
        document.documentElement.style.overflow = "";
        setState("gone");
      }, 1700);
      return () => window.clearTimeout(t);
    }
    document.documentElement.style.overflow = "";
  }, [state, open]);

  if (state === "gone") return null;

  return (
    <div className={`intro ${state === "opening" ? "intro--open" : ""}`} role="dialog" aria-label="Bienvenue chez Sam Flowers">
      <div className="intro__half intro__half--l" />
      <div className="intro__half intro__half--r" />
      <button className="intro__seal" onClick={open} aria-label="Ouvrir le site">
        <Seal size={120} />
        <span>Touchez pour ouvrir</span>
      </button>
    </div>
  );
}
