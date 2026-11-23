import { combos } from '../data/menu';
import { useCart } from '../context/CartContext';
import { FoodImage } from './FoodImage';
import { DietBadge } from './DietBadge';
import { Reveal } from './Reveal';

export function Combos() {
  const { add } = useCart();
  return (
    <section id="combos" className="section section--dark">
      <div className="container">
        <Reveal>
          <header className="section__head section__head--light">
            <p className="eyebrow eyebrow--gold">Meal deals</p>
            <h2>Featured Combos</h2>
            <p>Bundle up and save — every combo comes with a drink.</p>
          </header>
        </Reveal>

        <div className="combo-grid">
          {combos.map((c, i) => (
            <Reveal key={c.id} delay={(i % 3) * 70}>
              <article className="combo">
                <div className="combo__media">
                  <FoodImage imageKey={c.imageKey} alt={`${c.name}: ${c.items.join(', ')}`} />
                  {c.tag && <span className="combo__tag">{c.tag}</span>}
                </div>
                <div className="combo__body">
                  <div className="combo__top">
                    <h3>{c.name}</h3>
                    <DietBadge veg={c.veg} />
                  </div>
                  <ul className="combo__items">
                    {c.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                  <div className="combo__bottom">
                    <span className="price price--lg">₹{c.price}</span>
                    <button
                      className="btn btn--gold btn--sm"
                      onClick={() => add({ id: c.id, name: `${c.name} (${c.items.join(' + ')})`, price: c.price })}
                      aria-label={`Add ${c.name} to order`}
                    >
                      Add to Order
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
