import type { CategoryId, Combo, MenuItem } from './types';

/**
 * ONE FILE TO EDIT: every menu item, price and combo lives here.
 * - `row()` adds one item. `many()` adds several items that share a price.
 * - Each item's photo is /public/images/menu/<slug-of-name>.webp (e.g. "Paneer Pizza" → paneer-pizza.webp);
 *   the photo list lives in scripts/photos.json
 */

export const categories: { id: CategoryId; label: string; blurb: string }[] = [
  { id: 'veg', label: 'Veg Snacks', blurb: 'Pizzas, burgers, rolls & more' },
  { id: 'nonveg', label: 'Non-Veg Snacks', blurb: 'Crispy, juicy, loaded' },
  { id: 'drinks', label: 'Drinks & Ice Cream', blurb: 'Shakes, juices, coffee & scoops' },
];

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const items: MenuItem[] = [];

function row(
  category: CategoryId,
  group: string,
  veg: boolean,
  name: string,
  price: number,
) {
  // every item has its own photo: public/images/menu/<slug-of-name>.webp
  items.push({ id: `${category}-${slug(group)}-${slug(name)}`, name, price, category, group, veg, imageKey: slug(name) });
}

function many(
  category: CategoryId,
  group: string,
  veg: boolean,
  price: number,
  names: string[],
  suffix = '',
) {
  names.forEach((n) => row(category, group, veg, `${n}${suffix}`, price));
}

/* ───────────── VEG SNACKS ───────────── */
many('veg', 'Pizza', true, 180, ['Veg Pizza', 'Cheese Pizza']);
many('veg', 'Pizza', true, 190, ['Paneer Pizza', 'Sweet Corn Pizza']);

row('veg', 'Burgers', true, 'Veg Burger', 70);
many('veg', 'Burgers', true, 80, ['Paneer Burger', 'Cheese Burger']);

row('veg', 'Rolls', true, 'Veg Roll', 70);
row('veg', 'Rolls', true, 'Paneer Roll', 80);

row('veg', 'Sandwich', true, 'Veg Sandwich', 70);
many('veg', 'Sandwich', true, 80, ['Cheese Sandwich', 'Sweet Corn Sandwich']);
row('veg', 'Sandwich', true, 'Paneer Sandwich', 90);

row('veg', 'Momos & Fries', true, 'Veg Fried Momos (5 pcs)', 60);
row('veg', 'Momos & Fries', true, 'Veg Fingers (5 pcs)', 60);
row('veg', 'Momos & Fries', true, 'French Fries', 60);
row('veg', 'Momos & Fries', true, 'Veg Nuggets (5 pcs)', 70);

/* ───────────── NON-VEG SNACKS ───────────── */
row('nonveg', 'Pizza', false, 'Chicken Pizza', 200);

row('nonveg', 'Rolls', false, 'Chicken Roll', 80);
row('nonveg', 'Rolls', false, 'Special Chicken Roll', 90);
row('nonveg', 'Rolls', false, 'Stripe Chicken Roll', 100);

row('nonveg', 'Burgers & Snacks', false, 'Chicken Burger', 90);
row('nonveg', 'Burgers & Snacks', false, 'Chicken Crispy Burger', 100);
row('nonveg', 'Burgers & Snacks', false, 'Chicken Sandwich', 90);
row('nonveg', 'Burgers & Snacks', false, 'Chicken Nuggets', 80);
row('nonveg', 'Burgers & Snacks', false, 'Chicken Fingers', 80);
row('nonveg', 'Burgers & Snacks', false, 'Chicken Popcorn', 100);
row('nonveg', 'Burgers & Snacks', false, 'Chicken Wings (4 pcs)', 100);
row('nonveg', 'Burgers & Snacks', false, 'Chicken Lollipop (3 pcs)', 90);
row('nonveg', 'Burgers & Snacks', false, 'Chicken Lollipop (4 pcs)', 120);

row('nonveg', 'Buckets', false, 'Mini Bucket', 350);
row('nonveg', 'Buckets', false, 'Large Bucket', 700);

/* ───────────── COLD DRINKS, SHAKES & ICE CREAM ───────────── */
many('drinks', 'Fruit Juice', true, 50, [
  'Watermelon', 'Pineapple', 'Banana', 'Papaya', 'Mosambi', 'Orange', 'Muskmelon', 'Grapes',
], ' Juice');
row('drinks', 'Fruit Juice', true, 'Sapota Juice', 60);
many('drinks', 'Fruit Juice', true, 70, ['Apple', 'Pomegranate', 'Kiwi'], ' Juice');

row('drinks', 'Lassi', true, 'Sweet Lassi', 50);
many('drinks', 'Lassi', true, 60, [
  'Banana Lassi', 'Masala Lassi', 'Strawberry Lassi', 'Pineapple Lassi', 'Mango Lassi', 'Green Apple Lassi',
]);
row('drinks', 'Lassi', true, 'Black Currant Lassi', 70);

many('drinks', 'Milk Shakes', true, 80, ['Vanilla', 'Banana'], ' Milk Shake');
many('drinks', 'Milk Shakes', true, 90, ['Apple', 'Pineapple', 'Cherry Vanilla', 'Mango'], ' Milk Shake');
many('drinks', 'Milk Shakes', true, 100, [
  'Strawberry', 'Butterscotch', 'Pista', 'Black Currant', 'Blue Berry', 'Chocolate',
], ' Milk Shake');
row('drinks', 'Milk Shakes', true, 'Dry Fruit Milk Shake', 110);

many('drinks', 'Special Milk Shakes', true, 110, [
  'Oreo', 'Kit Kat', 'Snickers', 'Dairy Milk', '5 Star', 'Munch',
], ' Shake');
many('drinks', 'Special Milk Shakes', true, 120, ['Belgian Chips', 'Belgium Chocolate'], ' Shake');

row('drinks', 'Thick Shakes', true, 'Vanilla Thick Shake', 100);
many('drinks', 'Thick Shakes', true, 120, [
  'Mango', 'Oreo', 'Butterscotch', 'Blue Berry', 'Chocolate', 'Black Currant',
], ' Thick Shake');
row('drinks', 'Thick Shakes', true, 'Pista Thick Shake', 130);
row('drinks', 'Thick Shakes', true, 'Dry Fruits Thick Shake', 140);

row('drinks', 'Cold Coffee', true, 'Cold Coffee', 60);
row('drinks', 'Cold Coffee', true, 'Cold Coffee with Ice', 80);
row('drinks', 'Cold Coffee', true, 'Almond Coffee', 80);
row('drinks', 'Cold Coffee', true, 'Chocolate Coffee', 80);

many('drinks', 'Mocktails', true, 50, ['Lemon Sambath', 'Sweet & Salt', 'Blue Curacao', 'Lemon Soda']);
many('drinks', 'Mocktails', true, 60, ['Blue Ocean', 'Classic Mojito']);
row('drinks', 'Mocktails', true, 'Mojito Curacao', 70);

many('drinks', 'Ice Cream', true, 90, [
  'Gud Bud', 'Banana Split', 'Arabian Fantasy', 'Mango', 'Chocolate', 'Butterscotch',
]);
many('drinks', 'Ice Cream', true, 120, ['Brownie & Cream Delight', 'Honey Moon', 'Death by Chocolate']);

export const menuItems: MenuItem[] = items;

/** Ids shown in the "Best Sellers" section. Edit freely. */
export const bestSellerIds: string[] = [
  'veg-pizza-paneer-pizza',
  'nonveg-pizza-chicken-pizza',
  'nonveg-burgers-and-snacks-chicken-crispy-burger',
  'nonveg-burgers-and-snacks-chicken-wings-4-pcs',
  'drinks-special-milk-shakes-oreo-shake',
  'drinks-lassi-mango-lassi',
  'drinks-mocktails-classic-mojito',
  'drinks-ice-cream-death-by-chocolate',
];

/* ───────────── COMBOS ───────────── */
export const combos: Combo[] = [
  {
    id: 'combo-1',
    name: 'Veg Roll Combo',
    items: ['Veg Roll', 'French Fries', 'Coke'],
    price: 139,
    veg: true,
    tag: 'Budget pick',
    imageKey: 'combo-1',
  },
  {
    id: 'combo-2',
    name: 'Roll & Pizza Combo',
    items: ['Chicken Roll', 'Chicken Pizza', 'Coke'],
    price: 279,
    veg: false,
    imageKey: 'combo-2',
  },
  {
    id: 'combo-3',
    name: 'Triple Treat Combo',
    items: ['Chicken Roll', 'Chicken Burger', 'Chicken Wings (3 pcs)', '2 Cokes'],
    price: 279,
    veg: false,
    tag: 'Best value',
    imageKey: 'combo-3',
  },
  {
    id: 'combo-4',
    name: 'Wings & Roll Combo',
    items: ['Chicken Wings (6)', 'French Fries', 'Chicken Roll', 'Coke'],
    price: 299,
    veg: false,
    imageKey: 'combo-4',
  },
  {
    id: 'combo-5',
    name: 'Wings & Pizza Combo',
    items: ['Chicken Wings (8)', 'Chicken Pizza', 'Sprite'],
    price: 399,
    veg: false,
    tag: 'Crowd favourite',
    imageKey: 'combo-5',
  },
  {
    id: 'combo-6',
    name: 'The Party Feast',
    items: ['Chicken Wings (8)', 'Chicken Mini Bucket', 'Chicken Pizza', '2 Cokes'],
    price: 739,
    veg: false,
    tag: 'Feeds the gang',
    imageKey: 'combo-6',
  },
];
