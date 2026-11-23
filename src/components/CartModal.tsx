import { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';

export function CartModal() {
  const { isOpen, close, lines, total, setQty, clear, whatsappUrl, count, lastAdded, open } = useCart();
  const [note, setNote] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // focus management + Escape + scroll lock + simple focus trap
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab' && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>('button, a[href], textarea, input');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [isOpen, close]);

  return (
    <>
      {/* floating order button + add-to-order toast */}
      {!isOpen && count > 0 && (
        <button className="fab" onClick={open} aria-label={`View order, ${count} items, total ₹${total}`}>
          <span>🛒 View Order</span>
          <span className="fab__total">{count} · ₹{total}</span>
        </button>
      )}
      <div className={`toast ${lastAdded ? 'toast--on' : ''}`} role="status" aria-live="polite">
        {lastAdded ? `Added: ${lastAdded.length > 40 ? lastAdded.slice(0, 38) + '…' : lastAdded}` : ''}
      </div>

      {isOpen && (
        <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="cart-title" ref={dialogRef}>
            <header className="modal__head">
              <h2 id="cart-title">Your Order</h2>
              <button ref={closeRef} className="icon-btn" onClick={close} aria-label="Close order">✕</button>
            </header>

            {lines.length === 0 ? (
              <div className="modal__empty">
                <p><strong>Your order is empty.</strong></p>
                <p>Add something tasty from the menu or combos.</p>
                <a className="btn btn--primary btn--sm" href="#menu" onClick={close}>Browse menu</a>
              </div>
            ) : (
              <>
                <ul className="lines">
                  {lines.map((l) => (
                    <li key={l.id}>
                      <div className="lines__name">
                        <span>{l.name}</span>
                        <small>₹{l.price} each</small>
                      </div>
                      <div className="qty" role="group" aria-label={`Quantity for ${l.name}`}>
                        <button onClick={() => setQty(l.id, l.qty - 1)} aria-label={`Decrease ${l.name}`}>−</button>
                        <span aria-live="polite">{l.qty}</span>
                        <button onClick={() => setQty(l.id, l.qty + 1)} aria-label={`Increase ${l.name}`}>+</button>
                      </div>
                      <span className="lines__sum">₹{l.price * l.qty}</span>
                    </li>
                  ))}
                </ul>

                <label className="note">
                  <span>Note for the kitchen (optional)</span>
                  <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Less spicy, extra cheese, pickup time…" />
                </label>

                <div className="modal__total">
                  <span>Total</span>
                  <strong>₹{total}</strong>
                </div>

                <a className="btn btn--whatsapp btn--block" href={whatsappUrl(note)} target="_blank" rel="noopener noreferrer">
                  Send order on WhatsApp
                </a>
                <p className="modal__fine">
                  This opens WhatsApp with your order pre-filled. Payment is made directly with the shop — no online payment here.
                </p>
                <button className="link-btn" onClick={clear}>Clear order</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
