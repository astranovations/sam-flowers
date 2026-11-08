import { useEffect, useState } from "react";
import { site } from "../content";

export default function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`header ${solid ? "header--solid" : ""}`}>
      <div className="header__inner">
        <a className="header__logo" href="#top" aria-label={site.name}>
          Sam <em>Flowers</em>
        </a>
        <nav className="header__nav" aria-label="Navigation principale">
          {site.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
