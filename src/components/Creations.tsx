import { creations } from "../content";
import Illustration from "./ui/Illustration";
import Reveal from "./ui/Reveal";

export default function Creations() {
  return (
    <section className="section creations" id="creations">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">
            <span className="num">02</span>
            {creations.eyebrow}
          </span>
          <h2>{creations.title}</h2>
        </Reveal>
        <ul className="cards">
          {creations.items.map((c, i) => (
            <Reveal as="li" key={c.id} className="card" delay={(i % 3) * 0.1}>
              <div className="card__art">
                <Illustration name={c.image} alt={`Bouquet de ${c.name.toLowerCase()}`} />
              </div>
              <div className="card__body">
                <span className="card__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{c.name}</h3>
                <p>
                  <em>{c.meaning}</em>
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
