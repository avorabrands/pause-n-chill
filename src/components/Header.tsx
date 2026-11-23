import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { site } from '../data/site';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#menu', label: 'Menu' },
  { href: '#combos', label: 'Combos' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, open } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="#home" className="brand" aria-label={`${site.name} – home`}>
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" width={52} height={52} />
          <span className="brand__text">
            <strong>{site.name}</strong>
            <small>{site.tagline}</small>
          </span>
        </a>

        <nav
          id="primary-nav"
          className={`nav ${menuOpen ? 'nav--open' : ''}`}
          aria-label="Primary"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <button className="btn btn--primary btn--sm" onClick={open} aria-label={`Order now, ${count} items in order`}>
            Order Now
            {count > 0 && <span className="badge">{count}</span>}
          </button>
          <button
            className="burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
