import { footer, site } from "../content";
import Illustration from "./ui/Illustration";

export default function Footer() {
  return (
    <footer className="footer">
      <Illustration name="e1-divider" className="footer__divider" alt="" />
      <div className="container footer__inner">
        <span className="footer__logo">
          Sam <em>Flowers</em>
        </span>
        <span>{footer.note}</span>
        <span>© {new Date().getFullYear()} {site.name}</span>
      </div>
    </footer>
  );
}
