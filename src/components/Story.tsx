import { story } from "../content";
import Illustration from "./ui/Illustration";
import Reveal from "./ui/Reveal";
import { Flourish } from "./Ornaments";

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
          <Flourish className="flourish" />
          {story.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
        <Reveal className="story__art" delay={0.15}>
          <div className="frame">
            <Illustration name="g1-corner" className="frame__corner frame__corner--tl" />
            <Illustration name="g1-corner" className="frame__corner frame__corner--br" />
            <Illustration name="c1-hands" alt="Mains composant un bouquet" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
