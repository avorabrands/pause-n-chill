export type CategoryId = 'veg' | 'nonveg' | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: CategoryId;
  /** Sub-section shown as a chip, e.g. "Pizza" or "Milk Shakes". */
  group: string;
  veg: boolean;
  /** Key of the image in /public/images/menu/<imageKey>.webp */
  imageKey: string;
}

export interface Combo {
  id: string;
  name: string;
  items: string[];
  price: number;
  veg: boolean;
  tag?: string;
  imageKey: string;
}

export interface CartLine {
  id: string;
  name: string;
  price: number;
  qty: number;
}
