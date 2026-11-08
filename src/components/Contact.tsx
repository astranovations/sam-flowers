import { contact } from "../content";
import Reveal from "./ui/Reveal";

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container contact__inner">
        <Reveal>
          <span className="eyebrow">
            <span className="num">04</span>
            {contact.eyebrow}
          </span>
          <h2>{contact.title}</h2>
          <p className="contact__text">{contact.text}</p>
        </Reveal>
        <Reveal className="contact__links" delay={0.15}>
          {contact.links.map((l) => (
            <a key={l.label} className="contact__link" href={l.href} target="_blank" rel="noreferrer">
              <small>{l.label}</small>
              <span>{l.value}</span>
            </a>
          ))}
          <p className="contact__place">{contact.place}</p>
        </Reveal>
      </div>
    </section>
  );
}
