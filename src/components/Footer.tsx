import { site } from '../data/site';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt={`${site.name} logo`} width={72} height={72} />
          <div>
            <strong>{site.name}</strong>
            <p>{site.tagline}</p>
          </div>
        </div>
        <nav aria-label="Footer">
          <a href="#menu">Menu</a>
          <a href="#combos">Combos</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <p className="footer__note">
          {site.address}
          <br />
          <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
        </p>
      </div>
      <div className="container footer__legal">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span>Prices in INR. Menu and prices may change without notice.</span>
      </div>
      <div className="container footer__credit">Design and developed by Avora Brands</div>
    </footer>
  );
}
