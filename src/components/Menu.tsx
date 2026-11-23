import { useEffect, useMemo, useState } from 'react';
import { categories, menuItems } from '../data/menu';
import type { CategoryId } from '../data/types';
import { MenuCard } from './MenuCard';
import { Reveal } from './Reveal';

type Tab = 'all' | CategoryId;
type Diet = 'any' | 'veg' | 'nonveg';

export function Menu() {
  const [tab, setTab] = useState<Tab>('all');
  const [group, setGroup] = useState<string>('All');
  const [diet, setDiet] = useState<Diet>('any');
  const [query, setQuery] = useState('');
  const [ready, setReady] = useState(false);

  // brief skeleton state so the grid never pops in abruptly
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 350);
    return () => window.clearTimeout(t);
  }, []);

  const groups = useMemo(() => {
    const source = tab === 'all' ? menuItems : menuItems.filter((i) => i.category === tab);
    return ['All', ...Array.from(new Set(source.map((i) => i.group)))];
  }, [tab]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menuItems.filter((i) => {
      if (tab !== 'all' && i.category !== tab) return false;
      if (group !== 'All' && i.group !== group) return false;
      if (diet === 'veg' && !i.veg) return false;
      if (diet === 'nonveg' && i.veg) return false;
      if (q && !`${i.name} ${i.group}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [tab, group, diet, query]);

  const selectTab = (t: Tab) => {
    setTab(t);
    setGroup('All');
  };

  const tabs: { id: Tab; label: string }[] = [{ id: 'all', label: 'All' }, ...categories.map((c) => ({ id: c.id as Tab, label: c.label }))];

  return (
    <section id="menu" className="section">
      <div className="container">
        <Reveal>
          <header className="section__head">
            <p className="eyebrow">Our menu</p>
            <h2>Pick Your Pause</h2>
            <p>Browse by category, search for a favourite, or filter by veg / non-veg.</p>
          </header>
        </Reveal>

        <div className="menu-controls">
          <div className="tabs" role="tablist" aria-label="Menu categories">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls="menu-panel"
                className={`tab ${tab === t.id ? 'tab--active' : ''}`}
                onClick={() => selectTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="menu-tools">
            <label className="search">
              <span className="sr-only">Search menu</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              <input
                type="search"
                placeholder="Search pizza, mango, wings…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <div className="seg" role="group" aria-label="Dietary filter">
              {(
                [
                  ['any', 'All'],
                  ['veg', 'Veg'],
                  ['nonveg', 'Non-Veg'],
                ] as [Diet, string][]
              ).map(([v, l]) => (
                <button key={v} aria-pressed={diet === v} className={`seg__btn ${diet === v ? 'seg__btn--on' : ''}`} onClick={() => setDiet(v)}>
                  {v !== 'any' && <span className={`dot dot--${v}`} aria-hidden="true" />}
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="chips" role="group" aria-label="Sub-categories">
            {groups.map((g) => (
              <button key={g} className={`chip ${group === g ? 'chip--on' : ''}`} aria-pressed={group === g} onClick={() => setGroup(g)}>
                {g}
              </button>
            ))}
          </div>
        </div>

        <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} aria-live="polite">
          {!ready ? (
            <div className="grid" aria-busy="true">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="card card--skeleton"><div className="skeleton" /><div className="skeleton skeleton--line" /><div className="skeleton skeleton--line short" /></div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty">
              <p><strong>Nothing matches “{query}”.</strong></p>
              <p>Try a different word, or clear the filters.</p>
              <button className="btn btn--ghost btn--sm" onClick={() => { setQuery(''); setDiet('any'); setGroup('All'); setTab('all'); }}>Clear filters</button>
            </div>
          ) : (
            <>
              <p className="result-count">{filtered.length} item{filtered.length === 1 ? '' : 's'}</p>
              <div className="grid">
                {filtered.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
