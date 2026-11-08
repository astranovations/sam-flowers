/**
 * A short original music-box tune, synthesised with the Web Audio API (no audio file).
 * Four phrases of two bars in 3/4, one per lyric line, then a closing chord.
 */
import { birthday } from "../content";

const BPM = 84;
const BEAT = 60 / BPM;
const LINE_BEATS = 6;
const LEAD = 0.2; // seconds before the first note

type Note = [midi: number, beats: number];

const MELODY: Note[][] = [
  [[69, 1], [72, 1], [74, 1], [72, 1], [69, 1], [65, 1]],
  [[74, 1], [77, 1], [76, 1], [74, 1], [72, 1], [69, 1]],
  [[72, 1], [74, 1], [72, 1], [69, 1], [67, 1], [65, 1]],
  [[69, 1], [72, 1], [77, 1.5], [76, 0.5], [74, 1], [72, 1]],
];
const FINAL: Note = [65, 3];

const F = [53, 57, 60];
const Dm = [50, 53, 57];
const Bb = [46, 53, 58];
const C = [48, 52, 55];
const BARS = [F, Dm, Bb, C, Dm, Bb, Bb, C, F];

const freq = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

export type KaraokeWord = { text: string; start: number; dur: number };
export type KaraokeLine = { start: number; end: number; words: KaraokeWord[] };

/** Lyric timing: each line gets the length of its phrase, words share it by length. */
export function karaoke(): KaraokeLine[] {
  return birthday.lines.map((text, i) => {
    const start = i * LINE_BEATS * BEAT;
    const span = (LINE_BEATS - 0.5) * BEAT;
    const words = text.split(" ");
    const weights = words.map((w) => Math.max(2, w.length));
    const total = weights.reduce((a, b) => a + b, 0);
    let acc = 0;
    return {
      start,
      end: start + LINE_BEATS * BEAT,
      words: words.map((w, k) => {
        const s = start + (acc / total) * span;
        acc += weights[k];
        return { text: w, start: s, dur: (weights[k] / total) * span };
      }),
    };
  });
}

export const TOTAL_SECONDS = (MELODY.length * LINE_BEATS + FINAL[1]) * BEAT + 2;

type AC = typeof AudioContext;

function bell(ctx: AudioContext, dest: AudioNode, f: number, t: number, dur: number, vel: number) {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vel, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  ([[1, 1], [2, 0.32], [3.01, 0.1], [4.2, 0.04]] as const).forEach(([m, a]) => {
    const o = ctx.createOscillator();
    const og = ctx.createGain();
    o.type = "sine";
    o.frequency.value = f * m;
    og.gain.value = a;
    o.connect(og).connect(g);
    o.start(t);
    o.stop(t + dur + 0.05);
  });
  g.connect(dest);
}

export function createBirthdayPlayer() {
  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let t0 = 0;
  let endTimer = 0;

  return {
    /** Must be called from a tap/click (browsers block audio otherwise). */
    start(muted: boolean, onEnd: () => void) {
      const Ctor: AC | undefined = window.AudioContext || (window as unknown as { webkitAudioContext?: AC }).webkitAudioContext;
      if (!Ctor) return false;
      ctx = new Ctor();
      void ctx.resume();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.9;
      // a little echo for sparkle
      const delay = ctx.createDelay(1);
      delay.delayTime.value = 0.26;
      const fb = ctx.createGain();
      fb.gain.value = 0.26;
      const wet = ctx.createGain();
      wet.gain.value = 0.35;
      delay.connect(fb).connect(delay);
      delay.connect(wet).connect(master);
      const bus = ctx.createGain();
      bus.connect(master);
      bus.connect(delay);
      master.connect(ctx.destination);

      t0 = ctx.currentTime + LEAD;
      let beat = 0;
      MELODY.forEach((line) =>
        line.forEach(([m, b]) => {
          bell(ctx!, bus, freq(m), t0 + beat * BEAT, Math.max(1.1, b * BEAT * 1.8), 0.22);
          beat += b;
        }),
      );
      bell(ctx, bus, freq(FINAL[0]), t0 + beat * BEAT, 3.2, 0.26);
      bell(ctx, bus, freq(FINAL[0] + 12), t0 + beat * BEAT, 3.2, 0.1);
      BARS.forEach((chord, bar) => {
        const t = t0 + bar * 3 * BEAT;
        bell(ctx!, bus, freq(chord[0]), t, 1.6, 0.16);
        bell(ctx!, bus, freq(chord[1] + 12), t + BEAT, 1.1, 0.08);
        bell(ctx!, bus, freq(chord[2] + 12), t + 2 * BEAT, 1.1, 0.08);
      });
      endTimer = window.setTimeout(onEnd, TOTAL_SECONDS * 1000);
      return true;
    },
    setMuted(m: boolean) {
      if (ctx && master) master.gain.setTargetAtTime(m ? 0 : 0.9, ctx.currentTime, 0.05);
    },
    /** Seconds since the first note (negative during the short lead-in). */
    now() {
      return ctx ? ctx.currentTime - t0 : -1;
    },
    stop() {
      window.clearTimeout(endTimer);
      if (ctx && master) {
        master.gain.setTargetAtTime(0, ctx.currentTime, 0.12);
        const c = ctx;
        window.setTimeout(() => void c.close(), 600);
      }
      ctx = null;
      master = null;
    },
  };
}
