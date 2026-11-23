import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { CartLine } from '../data/types';
import { site } from '../data/site';

interface CartApi {
  lines: CartLine[];
  count: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (line: Omit<CartLine, 'qty'>) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  whatsappUrl: (customerNote?: string) => string;
  /** Last added item name, used for the toast. */
  lastAdded: string | null;
}

const CartContext = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  const add = useCallback((line: Omit<CartLine, 'qty'>) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === line.id);
      if (existing) return prev.map((l) => (l.id === line.id ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { ...line, qty: 1 }];
    });
    setLastAdded(line.name);
    window.setTimeout(() => setLastAdded((cur) => (cur === line.name ? null : cur)), 2200);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) => (qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l))));
  }, []);

  const value = useMemo<CartApi>(() => {
    const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    return {
      lines,
      count,
      total,
      isOpen,
      lastAdded,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add,
      setQty,
      clear: () => setLines([]),
      whatsappUrl: (note) => {
        const body = lines.map((l) => `• ${l.qty} × ${l.name} — ₹${l.price * l.qty}`).join('\n');
        const msg =
          `Hi ${site.name}! I'd like to place an order:\n\n${body}\n\nTotal: ₹${total}` +
          (note?.trim() ? `\n\nNote: ${note.trim()}` : '') +
          `\n\nPlease confirm availability and pickup/delivery time. Thank you!`;
        return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(msg)}`;
      },
    };
  }, [lines, isOpen, lastAdded, add, setQty]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
