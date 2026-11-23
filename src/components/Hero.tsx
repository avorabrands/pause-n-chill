import { FoodImage } from './FoodImage';
import { site } from '../data/site';
import { menuItems } from '../data/menu';

export function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <img
            className="hero__logo"
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt={`${site.name} – ${site.tagline}`}
            width={150}
            height={150}
          />
          <p className="eyebrow">Café · Fast food · Ice cream</p>
          <h1>
            Your Perfect <span className="hl">Pause</span> Starts Here
          </h1>
          <p className="lede">
            Crispy snacks, thick shakes and creamy scoops — made fresh, served fast. Take a break, grab a bite and chill.
          </p>
          <div className="hero__cta">
            <a href="#menu" className="btn btn--primary">Explore Menu</a>
            <a href="#combos" className="btn btn--ghost">View Combos</a>
          </div>
          <ul className="hero__facts" aria-label="Highlights">
            <li><strong>{menuItems.length}+</strong> menu items</li>
            <li><strong>Fresh</strong> daily ingredients</li>
            <li><strong>From ₹50</strong> sips & snacks</li>
          </ul>
        </div>

        <div className="hero__visual" aria-hidden={false}>
          <div className="hero__blob" />
          <FoodImage imageKey="hero-main" folder="" glyph="🍔" alt="A tray of burgers and fries" eager className="hero__img hero__img--main" />
          <FoodImage imageKey="hero-shake" folder="" glyph="🥤" alt="A chilled chocolate milkshake" eager className="hero__img hero__img--a" />
          <FoodImage imageKey="hero-icecream" folder="" glyph="🍦" alt="Ice cream in a cup" eager className="hero__img hero__img--b" />
        </div>
      </div>
    </section>
  );
}
