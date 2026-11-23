import { Reveal } from './Reveal';

const points = [
  {
    title: 'Fresh Ingredients Everyday',
    text: 'Vegetables, fruit and dairy are sourced daily, so every shake, roll and pizza tastes the way it should.',
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21c-4.5 0-8-3.4-8-8 0-4 3-7.5 8-10 5 2.5 8 6 8 10 0 4.6-3.5 8-8 8Z" />
        <path d="M12 21V9" /><path d="M12 14c-2 0-3.5-1-4-2.5M12 12c2 0 3.5-1 4-2.5" />
      </svg>
    ),
  },
  {
    title: 'Made with Hygiene & Care',
    text: 'A clean kitchen, gloved prep and freshly cooked orders — food you can feel good about.',
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3 4 6v6c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V6l-8-3Z" />
        <path d="m8.5 12 2.5 2.5 4.5-5" />
      </svg>
    ),
  },
];

export function Why() {
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal>
          <header className="section__head">
            <p className="eyebrow">About us</p>
            <h2>Why Pause n Chill?</h2>
            <p>
              We started with a simple idea: everyone deserves a little break in the day. Good food, cold drinks and a relaxed
              vibe — that’s the whole recipe.
            </p>
          </header>
        </Reveal>
        <div className="why-grid">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="why">
                <span className="why__icon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
