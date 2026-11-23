import type { MenuItem } from '../data/types';
import { categories } from '../data/menu';
import { useCart } from '../context/CartContext';
import { FoodImage } from './FoodImage';
import { DietBadge } from './DietBadge';

const glyphByGroup: Record<string, string> = {
  Pizza: '🍕', Burgers: '🍔', 'Burgers & Snacks': '🍗', Rolls: '🌯', Sandwich: '🥪', 'Momos & Fries': '🍟', Buckets: '🍗',
  'Fruit Juice': '🍹', Lassi: '🥛', 'Milk Shakes': '🥤', 'Special Milk Shakes': '🥤', 'Thick Shakes': '🥤',
  'Cold Coffee': '☕', Mocktails: '🍸', 'Ice Cream': '🍦',
};

export function MenuCard({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const categoryLabel = categories.find((c) => c.id === item.category)?.label ?? '';
  return (
    <article className="card">
      <div className="card__media">
        <FoodImage imageKey={item.imageKey} alt={item.name} glyph={glyphByGroup[item.group]} />
        <span className="card__diet"><DietBadge veg={item.veg} /></span>
      </div>
      <div className="card__body">
        <p className="card__cat">{categoryLabel} · {item.group}</p>
        <h3 className="card__name">{item.name}</h3>
        <div className="card__foot">
          <span className="price">₹{item.price}</span>
          <button
            className="btn btn--primary btn--sm"
            onClick={() => add({ id: item.id, name: item.name, price: item.price })}
            aria-label={`Add ${item.name} to order`}
          >
            Add to Order
          </button>
        </div>
      </div>
    </article>
  );
}
