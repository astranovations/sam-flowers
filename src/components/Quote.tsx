import { quote } from "../content";
import Reveal from "./ui/Reveal";

export default function Quote() {
  return (
    <section className="quote" aria-label="Citation">
      <Reveal className="container quote__inner">
        <p>{quote.text}</p>
      </Reveal>
    </section>
  );
}
