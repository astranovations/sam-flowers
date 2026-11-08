/**
 * Birthday song: plays the audio file in /public/audio/birthday.mp3.
 * The karaoke lines are spread evenly across the track length.
 */
import { birthday } from "../content";

const TRACK_URL = "/audio/birthday.mp3";
/** Length of birthday.mp3 (about 28.5 s). */
export const TOTAL_SECONDS = 28.55;

export type KaraokeWord = { text: string; start: number; dur: number };
export type KaraokeLine = { start: number; end: number; words: KaraokeWord[] };

/** Lyric timing: each line gets an equal slice of the track, words share it by length. */
export function karaoke(): KaraokeLine[] {
  const lineSeconds = TOTAL_SECONDS / birthday.lines.length;
  const span = lineSeconds * 0.9; // small pause at the end of each line
  return birthday.lines.map((text, i) => {
    const start = i * lineSeconds;
    const words = text.split(" ");
    const weights = words.map((w) => Math.max(2, w.length));
    const total = weights.reduce((a, b) => a + b, 0);
    let acc = 0;
    return {
      start,
      end: start + lineSeconds,
      words: words.map((w, k) => {
        const s = start + (acc / total) * span;
        acc += weights[k];
        return { text: w, start: s, dur: (weights[k] / total) * span };
      }),
    };
  });
}

export function createBirthdayPlayer() {
  let audio: HTMLAudioElement | null = null;

  return {
    /** Must be called from a tap/click (browsers block audio otherwise). */
    start(muted: boolean, onEnd: () => void) {
      if (typeof Audio === "undefined") return false;
      audio = new Audio(TRACK_URL);
      audio.preload = "auto";
      audio.muted = muted;
      audio.addEventListener("ended", onEnd, { once: true });
      // If the browser blocks playback, the lyrics simply stay on the first line.
      void audio.play().catch(() => {});
      return true;
    },
    setMuted(m: boolean) {
      if (audio) audio.muted = m;
    },
    /** Seconds since the start of the track (-1 before it starts). */
    now() {
      return audio ? audio.currentTime : -1;
    },
    stop() {
      if (audio) {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      }
      audio = null;
    },
  };
}
