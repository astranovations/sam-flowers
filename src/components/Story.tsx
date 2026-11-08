import { story } from "../content";
import Illustration from "./ui/Illustration";
import Reveal from "./ui/Reveal";

export default function Story() {
  return (
    <section className="section story" id="histoire">
      <div className="container story__grid">
        <Reveal className="story__text">
          <span className="eyebrow">
            <span className="num">01</span>
            {story.eyebrow}
          </span>
          <h2>{story.title}</h2>
          {story.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
        <Reveal className="story__art" delay={0.15}>
          <Illustration name="c1-hands" alt="Mains composant un bouquet" />
        </Reveal>
      </div>
    </section>
  );
}
