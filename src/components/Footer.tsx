import { footer, site } from "../content";
import { Flourish } from "./Ornaments";

export default function Footer() {
  return (
    <footer className="footer">
      <Flourish className="flourish footer__flourish" />
      <div className="container footer__inner">
        <span className="footer__logo">
          Sam <em>Flowers</em>
        </span>
        <span>{footer.note}</span>
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
      </div>
    </footer>
  );
}
