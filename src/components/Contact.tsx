import { contact } from "../content";
import Illustration from "./ui/Illustration";
import Reveal from "./ui/Reveal";

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <Reveal className="contact__card">
          <Illustration name="g1-corner" className="frame__corner frame__corner--tl" />
          <Illustration name="g1-corner" className="frame__corner frame__corner--br" />
          <div className="contact__inner">
            <div className="contact__intro">
              <span className="eyebrow">
                <span className="num">04</span>
                {contact.eyebrow}
              </span>
              <h2>{contact.title}</h2>
              <p className="contact__text">{contact.text}</p>
            </div>
            <div className="contact__links">
              {contact.links.map((l) => (
                <a key={l.label} className="contact__link" href={l.href} target="_blank" rel="noreferrer">
                  <small>{l.label}</small>
                  <span>{l.value}</span>
                </a>
              ))}
              <p className="contact__place">{contact.place}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
