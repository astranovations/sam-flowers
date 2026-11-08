import { useState } from "react";
import { creations } from "../content";
import Illustration from "./ui/Illustration";
import Reveal from "./ui/Reveal";

export default function Creations() {
  const [open, setOpen] = useState<string | null>(null);

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
          {creations.items.map((c, i) => {
            const isOpen = open === c.id;
            return (
              <Reveal as="li" key={c.id} className={`card ${isOpen ? "card--open" : ""}`} delay={(i % 3) * 0.1}>
                <button
                  className="card__arch"
                  aria-expanded={isOpen}
                  aria-label={`${c.name} : afficher ce que dit cette fleur`}
                  onClick={() => setOpen(isOpen ? null : c.id)}
                >
                  <span className="card__window">
                    <Illustration name={c.image} alt={`Bouquet de ${c.name.toLowerCase()}`} />
                    <span className="card__reveal">
                          <small>Dans le langage des fleurs</small>
                          <em>{c.meaning}</em>
                    </span>
                  </span>
                  <span className="card__hint" aria-hidden="true">
                    {isOpen ? "Fermer" : "Touchez"}
                  </span>
                </button>
                <div className="card__body">
                  <span className="card__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{c.name}</h3>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
