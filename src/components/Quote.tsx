import { quote } from "../content";
import Reveal from "./ui/Reveal";
import Illustration from "./ui/Illustration";
import { Flourish, Seal } from "./Ornaments";

export default function Quote() {
  return (
    <section className="quote" aria-label="Citation">
      <Illustration name="e3-petals" className="quote__petals" />
      <Reveal className="container quote__inner">
        <Seal size={84} className="quote__seal" />
        <p>{quote.text}</p>
        <Flourish className="flourish" />
      </Reveal>
    </section>
  );
}
