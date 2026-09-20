import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import Carousel from '../components/Carousel.jsx';

const AUTHOR = {
  name: 'Lemuel Owusu-Ansah',
  phone: '0245791297',
  email: 'hello@lemuelowusuansah.org',
};

const heroImage =
  'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=2000&q=80';

const features = [
  {
    title: 'Send money instantly',
    text: 'Transfer to any Aku Pay user in seconds. No fees, no delays, no stress.',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    cta: 'Send now',
    to: '/send',
  },
  {
    title: 'Pay bills in one tap',
    text: 'Electricity, water, internet, TV — pay every bill from a single wallet.',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    cta: 'Pay a bill',
    to: '/bills',
  },
  {
    title: 'Track every cedi',
    text: 'See exactly where your money goes with clear, real-time transaction history.',
    image:
      'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=800&q=80',
    cta: 'View history',
    to: '/transactions',
  },
];

const carouselSlides = [
  {
    tag: 'Marketplace',
    title: 'Pay the market, your way',
    text: 'From tomatoes to textiles — send money to any Aku Pay user, no cash needed.',
    image:
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1600&q=80',
  },
  {
    tag: 'Everyday bills',
    title: 'Never queue for a bill again',
    text: 'Electricity, water, internet, TV — settle them from your phone in seconds.',
    image:
      'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?auto=format&fit=crop&w=1600&q=80',
  },
  {
    tag: 'Savings',
    title: 'Watch your money grow',
    text: 'Clear history, simple controls, real-time balance. Know where every cedi goes.',
    image:
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1600&q=80',
  },
];

export default function Home() {
  return (
    <div>
      <section
        style={{
          position: 'relative',
          minHeight: 560,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src={heroImage}
          alt="Woman in a summer hat at a marketplace"
          className="img-cover"
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        />
        <div className="hero-overlay" style={{ zIndex: 1 }} />

        <div className="aku-container" style={{ position: 'relative', zIndex: 2, padding: '80px 16px' }}>
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-7">
              <p
                className="aku-fade-up"
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: 0.4,
                  marginBottom: 20,
                }}
              >
                Apps by {AUTHOR.name}
              </p>

              <h1
                className="aku-fade-up"
                style={{
                  fontSize: 56,
                  fontWeight: 800,
                  color: 'white',
                  lineHeight: 1.05,
                  maxWidth: 640,
                  animationDelay: '80ms',
                }}
              >
                Money that <span style={{ color: 'var(--aku-yellow)' }}>moves</span> with you.
              </h1>

              <p
                className="aku-fade-up"
                style={{
                  fontSize: 18,
                  color: 'rgba(255,255,255,0.9)',
                  maxWidth: 520,
                  marginTop: 20,
                  animationDelay: '160ms',
                }}
              >
                Aku Pay is a simple wallet for everyday money. Send, receive and pay bills — all in one place.
              </p>

              <div
                className="d-flex flex-wrap gap-3 mt-5 aku-fade-up"
                style={{ animationDelay: '240ms' }}
              >
                <Link to="/auth" className="aku-btn aku-btn-yellow" style={{ padding: '14px 28px' }}>
                  Create free account
                </Link>
                <Link
                  to="/wallet"
                  className="aku-btn"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.35)',
                    padding: '14px 28px',
                  }}
                >
                  See how it works
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="aku-section band-yellow">
        <div className="aku-container">
          <Reveal>
            <h2
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: 'var(--aku-ink)',
                textAlign: 'center',
                maxWidth: 720,
                margin: '0 auto',
              }}
            >
              Everything you need, in one wallet
            </h2>
            <p
              style={{
                color: 'var(--aku-muted)',
                textAlign: 'center',
                marginTop: 12,
                marginBottom: 48,
                maxWidth: 560,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Simple tools for everyday money — no branch visits, no paperwork.
            </p>
          </Reveal>

          <Reveal group className="row g-4">
            {features.map((f) => (
              <div className="col-12 col-md-4" key={f.title}>
                <div className="aku-card h-100 d-flex flex-column" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ height: 180, overflow: 'hidden' }}>
                    <img src={f.image} alt={f.title} className="img-cover" loading="lazy" />
                  </div>
                  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h5 style={{ fontWeight: 700, color: 'var(--aku-ink)' }}>{f.title}</h5>
                    <p style={{ color: 'var(--aku-muted)', marginTop: 8, fontSize: 15, flexGrow: 1 }}>
                      {f.text}
                    </p>
                    <Link
                      to={f.to}
                      className="aku-btn aku-btn-primary mt-4"
                      style={{ alignSelf: 'flex-start' }}
                    >
                      {f.cta}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="aku-section band-green">
        <div className="aku-container">
          <Reveal>
            <span
              style={{
                background: 'var(--aku-green)',
                color: 'white',
                padding: '4px 12px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 12,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              See it in action
            </span>
            <h2
              style={{
                fontSize: 34,
                fontWeight: 800,
                color: 'var(--aku-ink)',
                marginTop: 12,
                marginBottom: 32,
                maxWidth: 620,
              }}
            >
              Three ways Aku Pay fits into your day
            </h2>
          </Reveal>

          <Reveal direction="scale">
            <Carousel slides={carouselSlides} height={440} />
          </Reveal>
        </div>
      </section>

      <section className="aku-section band-blue">
        <div className="aku-container">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-6">
              <Reveal direction="left">
                <span
                  style={{
                    background: 'var(--aku-blue)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  Why Aku Pay
                </span>
                <h2
                  style={{
                    fontSize: 34,
                    fontWeight: 800,
                    color: 'var(--aku-ink)',
                    marginTop: 12,
                  }}
                >
                  Built for how you actually live
                </h2>
                <p style={{ color: 'var(--aku-muted)', marginTop: 12, fontSize: 16, maxWidth: 520 }}>
                  No forms, no queues, no hidden fees. Aku Pay keeps money simple so you can get on with your day.
                </p>

                <ul className="list-unstyled d-flex flex-column gap-3 mt-4">
                  {[
                    'Instant transfers between Aku Pay users',
                    'Pay bills directly from your balance',
                    'Every transaction, clearly listed',
                    'Works on any phone, no app install needed',
                  ].map((t) => (
                    <li key={t} className="d-flex align-items-start gap-3">
                      <span
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          background: 'var(--aku-green)',
                          color: 'white',
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: 12,
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        ✓
                      </span>
                      <span style={{ color: 'var(--aku-ink)', fontSize: 15 }}>{t}</span>
                    </li>
                  ))}
                </ul>

                <p
                  style={{
                    marginTop: 32,
                    paddingTop: 24,
                    borderTop: '1px solid var(--aku-line)',
                    fontSize: 13,
                    color: 'var(--aku-muted)',
                  }}
                >
                  Built with care by{' '}
                  <strong style={{ color: 'var(--aku-ink)' }}>{AUTHOR.name}</strong> ·{' '}
                  <a
                    href={`tel:${AUTHOR.phone}`}
                    style={{ color: 'var(--aku-blue)', fontWeight: 600 }}
                  >
                    {AUTHOR.phone}
                  </a>{' '}
                  ·{' '}
                  <a
                    href={`mailto:${AUTHOR.email}`}
                    style={{ color: 'var(--aku-blue)', fontWeight: 600 }}
                  >
                    {AUTHOR.email}
                  </a>
                </p>
              </Reveal>
            </div>

            <div className="col-12 col-lg-6">
              <Reveal direction="right">
                <div className="img-tile" style={{ aspectRatio: '4 / 3' }}>
                  <img
                    src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=1200&q=80"
                    alt="Person using Aku Pay on a phone"
                    className="img-cover"
                    loading="lazy"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="aku-section band-cream">
        <div className="aku-container">
          <Reveal>
            <div
              style={{
                background: 'var(--aku-green)',
                color: 'white',
                borderRadius: 'var(--radius-xl)',
                padding: '56px 32px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <h2 style={{ fontWeight: 800, fontSize: 34 }}>Ready to get started?</h2>
              <p style={{ marginTop: 12, opacity: 0.9, maxWidth: 520, margin: '12px auto 0' }}>
                Join thousands already using Aku Pay for everyday money.
              </p>
              <Link
                to="/auth"
                className="aku-btn aku-btn-yellow mt-4"
                style={{ padding: '14px 28px', fontSize: 16 }}
              >
                Create your wallet
              </Link>
              <p
                style={{
                  marginTop: 24,
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: 12,
                  letterSpacing: 0.4,
                }}
              >
                Apps by {AUTHOR.name}. All rights reserved.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
