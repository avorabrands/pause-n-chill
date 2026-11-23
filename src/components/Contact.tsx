import { site } from '../data/site';
import { Reveal } from './Reveal';

export function Contact() {
  const wa = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(`Hi ${site.name}! I have a question.`)}`;
  return (
    <section id="contact" className="section section--cream">
      <div className="container">
        <Reveal>
          <header className="section__head">
            <p className="eyebrow">Find us</p>
            <h2>Visit or Order</h2>
            <p>Drop by for a bite, call ahead, or message us on WhatsApp.</p>
          </header>
        </Reveal>

        <div className="contact-grid">
          <Reveal>
            <ul className="contact-list">
              <li>
                <h3>Address</h3>
                <p>{site.address}</p>
                <a href={site.mapsLink} target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a>
              </li>
              <li>
                <h3>Phone</h3>
                <p><a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a></p>
              </li>
              <li>
                <h3>WhatsApp</h3>
                <p><a className="btn btn--whatsapp btn--sm" href={wa} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></p>
              </li>
              <li>
                <h3>Opening hours</h3>
                <dl className="hours">
                  {site.hours.map((h) => (
                    <div key={h.days}><dt>{h.days}</dt><dd>{h.time}</dd></div>
                  ))}
                </dl>
              </li>
              <li>
                <h3>Follow us</h3>
                <div className="social">
                  {Object.entries(site.social).filter(([, url]) => url).map(([name, url]) => (
                    <a key={name} href={url} target="_blank" rel="noopener noreferrer">{name[0].toUpperCase() + name.slice(1)}</a>
                  ))}
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <div className="map">
              {site.mapsEmbed ? (
                <iframe title="Pause n Chill on Google Maps" src={site.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              ) : (
                <div className="map__placeholder">
                  <p><strong>Map placeholder</strong></p>
                  <p>Add your Google Maps embed link in <code>src/data/site.ts</code>.</p>
                  <a className="btn btn--primary btn--sm" href={site.mapsLink} target="_blank" rel="noopener noreferrer">Get directions</a>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
