import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';

const AUTHOR = {
  name: 'Lemuel Owusu-Ansah',
  role: 'Founder & Developer',
  phone: '0245791297',
  emailPrimary: 'owusuansahlemuel@gmail.com',
  emailProfessional: 'hello@lemuelowusuansah.org',
  location: 'Accra, Ghana',
};

const stats = [
  { k: '9', v: 'pages shipped' },
  { k: '100%', v: 'mobile-ready' },
  { k: '0', v: 'fees on sends' },
];

export default function About() {
  const logoSrc = `${import.meta.env.BASE_URL}logo.svg`;

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'About — Aku Pay';

    let meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta ? meta.getAttribute('content') : '';
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      'About Aku Pay — a simple fintech wallet for everyday money. Built by Lemuel Owusu-Ansah in Accra, Ghana.'
    );

    return () => {
      document.title = prevTitle;
      if (meta) meta.setAttribute('content', prevDesc);
    };
  }, []);

  return (
    <div>
      <section className="aku-section band-blue">
        <div className="aku-container">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-7">
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
                  About
                </span>
                <h1
                  style={{
                    fontSize: 44,
                    fontWeight: 800,
                    color: 'var(--aku-ink)',
                    marginTop: 12,
                    lineHeight: 1.1,
                  }}
                >
                  Money tools that respect your time.
                </h1>
                <p style={{ color: 'var(--aku-muted)', marginTop: 16, fontSize: 17, maxWidth: 560 }}>
                  Aku Pay is a simple fintech wallet built for everyday money. Send, receive, and pay bills in seconds — no queues, no paperwork, no surprises.
                </p>
              </Reveal>
            </div>

            <div className="col-12 col-lg-5">
              <Reveal direction="right">
                <div className="img-tile" style={{ aspectRatio: '4 / 3' }}>
                  <img
                    src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80"
                    alt="Everyday marketplace life"
                    className="img-cover"
                    loading="lazy"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="aku-section band-yellow">
        <div className="aku-container">
          <div className="row g-5">
            <div className="col-12 col-lg-7">
              <Reveal>
                <span
                  style={{
                    background: 'var(--aku-yellow)',
                    color: '#0B132B',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  Our mission
                </span>
                <h2
                  style={{
                    fontSize: 30,
                    fontWeight: 800,
                    color: 'var(--aku-ink)',
                    marginTop: 12,
                  }}
                >
                  Everyday money should feel effortless.
                </h2>
                <p style={{ color: 'var(--aku-muted)', marginTop: 16, fontSize: 16 }}>
                  Most people don't want a bank branch. They want to send money to a friend, pay their electricity bill, and know their balance is correct. Aku Pay focuses on exactly those three things — nothing more, nothing less.
                </p>
                <p style={{ color: 'var(--aku-muted)', marginTop: 12, fontSize: 16 }}>
                  We started with a mobile-first web app because it works on any phone, no download required. Whether you're on a market stall in Accra or a laptop in Kumasi, it just works.
                </p>
              </Reveal>
            </div>

            <div className="col-12 col-lg-5">
              <Reveal group className="d-flex flex-column gap-3">
                {stats.map((s) => (
                  <div key={s.v} className="aku-card">
                    <div
                      style={{
                        fontSize: 34,
                        fontWeight: 800,
                        color: 'var(--aku-blue)',
                      }}
                    >
                      {s.k}
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--aku-muted)', marginTop: 2 }}>
                      {s.v}
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
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
              Who built this
            </span>
            <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--aku-ink)', marginTop: 12 }}>
              Built by {AUTHOR.name}
            </h2>
          </Reveal>

          <div className="row g-5 mt-2 align-items-center">
            <div className="col-12 col-md-5">
              <Reveal direction="left">
                <div className="aku-card text-center" style={{ padding: 32 }}>
                  <img
                    src={logoSrc}
                    alt="Aku Pay"
                    width={72}
                    height={72}
                    style={{ margin: '0 auto 16px' }}
                  />
                  <h3 style={{ fontWeight: 800, color: 'var(--aku-ink)', fontSize: 22 }}>
                    {AUTHOR.name}
                  </h3>
                  <p style={{ color: 'var(--aku-muted)', marginTop: 4, fontSize: 14 }}>
                    {AUTHOR.role}
                  </p>
                  <p style={{ color: 'var(--aku-muted)', marginTop: 2, fontSize: 13 }}>
                    {AUTHOR.location}
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="col-12 col-md-7">
              <Reveal direction="right">
                <p style={{ color: 'var(--aku-ink)', fontSize: 16 }}>
                  I'm a developer focused on simple, fast fintech products for real people — the kind that work on any phone and don't need a manual to use.
                </p>
                <p style={{ color: 'var(--aku-muted)', marginTop: 12, fontSize: 15 }}>
                  If you're building something similar — a wallet, a payments tool, or anything that moves money — I'd love to hear about it.
                </p>

                <div className="d-flex flex-column flex-sm-row flex-wrap gap-2 mt-4" style={{ fontSize: 14 }}>
                  <a href={`tel:${AUTHOR.phone}`} className="aku-btn aku-btn-ghost" style={{ padding: '10px 20px' }}>
                    ☎ {AUTHOR.phone}
                  </a>
                  <a href={`mailto:${AUTHOR.emailPrimary}`} className="aku-btn aku-btn-ghost" style={{ padding: '10px 20px' }}>
                    ✉ {AUTHOR.emailPrimary}
                  </a>
                  <a href={`mailto:${AUTHOR.emailProfessional}`} className="aku-btn aku-btn-primary" style={{ padding: '10px 20px' }}>
                    Get in touch
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="aku-section band-blue-solid">
        <div className="aku-container">
          <Reveal>
            <div className="text-center" style={{ maxWidth: 640, margin: '0 auto' }}>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: 'white' }}>
                Ready to try Aku Pay?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', marginTop: 12, fontSize: 16 }}>
                Create a free wallet and move your first cedi in under a minute.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
                <Link to="/auth" className="aku-btn aku-btn-yellow" style={{ padding: '14px 28px' }}>
                  Create free account
                </Link>
                <Link
                  to="/wallet"
                  className="aku-btn"
                  style={{
                    padding: '14px 28px',
                    background: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.35)',
                  }}
                >
                  Explore the app
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
