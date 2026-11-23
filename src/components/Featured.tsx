import { bestSellerIds, menuItems } from '../data/menu';
import { MenuCard } from './MenuCard';
import { Reveal } from './Reveal';

export function Featured() {
  const picks = bestSellerIds
    .map((id) => menuItems.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <section id="best-sellers" className="section section--cream">
      <div className="container">
        <Reveal>
          <header className="section__head">
            <p className="eyebrow">Most loved</p>
            <h2>Best Sellers</h2>
            <p>The dishes our regulars keep coming back for.</p>
          </header>
        </Reveal>
        <div className="grid grid--featured">
          {picks.map((item, i) => (
            <Reveal key={item.id} delay={(i % 4) * 60}>
              <MenuCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
