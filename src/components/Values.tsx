import { values } from "../content";
import Illustration from "./ui/Illustration";
import Reveal from "./ui/Reveal";

export default function Values() {
  return (
    <section className="section values" aria-labelledby="values-title">
      <div className="container">
        <Reveal className="section__head section__head--center">
          <span className="eyebrow">
            <span className="num">03</span>
            {values.eyebrow}
          </span>
          <h2 id="values-title">{values.title}</h2>
        </Reveal>
        <div className="values__grid">
          {values.items.map((v, i) => (
            <Reveal key={v.title} className="value" delay={i * 0.12}>
              <span className="value__ring">
                <Illustration name={v.icon} className="value__icon" alt="" />
              </span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
