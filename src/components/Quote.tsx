import { quote } from "../content";
import Reveal from "./ui/Reveal";
import { Flourish, Seal } from "./Ornaments";

export default function Quote() {
  return (
    <section className="quote" aria-label="Citation">
      <Reveal className="container quote__inner">
        <Seal size={84} className="quote__seal" />
        <p>{quote.text}</p>
        <Flourish className="flourish" />
      </Reveal>
    </section>
  );
}
