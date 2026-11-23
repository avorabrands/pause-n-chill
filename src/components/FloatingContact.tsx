import { site } from '../data/site';

export function FloatingContact() {
  const wa = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent('Hi Pause n Chill! I would like to order.')}`;
  return (
    <div className="float-contact" aria-label="Quick contact">
      <a className="float-btn float-btn--call" href={`tel:${site.phoneTel}`} aria-label={`Call ${site.phoneDisplay}`}>
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1z"/></svg>
      </a>
      <a className="float-btn float-btn--wa" href={wa} target="_blank" rel="noopener noreferrer" aria-label="Order on WhatsApp">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.200zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-1.500-.7-2.500-1.300-3.500-3-.3-.4.3-.4.8-1.400.1-.2 0-.3 0-.5l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.200s.9 2.500 1.100 2.700c.1.2 1.800 2.800 4.400 3.900 1.600.7 2.200.7 3 .6.500-.1 1.500-.6 1.700-1.200.2-.6.2-1.100.2-1.200-.1-.1-.2-.2-.5-.3z"/></svg>
      </a>
    </div>
  );
}
