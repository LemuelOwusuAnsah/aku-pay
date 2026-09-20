import { Link } from 'react-router-dom';

const productLinks = [
  { to: '/wallet', label: 'Wallet' },
  { to: '/send', label: 'Send money' },
  { to: '/bills', label: 'Pay bills' },
  { to: '/transactions', label: 'History' },
];

const companyLinks = [
  { to: '/', label: 'About' },
  { to: '/', label: 'Security' },
  { to: '/', label: 'Support' },
  { to: '/auth', label: 'Sign in' },
];

const AUTHOR = {
  name: 'Lemuel Owusu-Ansah',
  phone: '0245791297',
  emailPrimary: 'owusuansahlemuel@gmail.com',
  emailProfessional: 'hello@lemuelowusuansah.org',
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--aku-blue)',
        color: 'rgba(255,255,255,0.85)',
        marginTop: 'auto',
        transition: 'background var(--t-med) var(--ease-out)',
      }}
    >
      <div className="aku-container" style={{ paddingTop: 56, paddingBottom: 32 }}>
        <div className="mb-5">
          <p style={{ color: 'white', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
            Built by {AUTHOR.name}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, marginBottom: 6, maxWidth: 640 }}>
            Need a site like this for your business or company? Get in touch.
          </p>
          <div className="d-flex flex-wrap gap-3" style={{ fontSize: 14 }}>
            <a
              href={`tel:${AUTHOR.phone}`}
              style={{ color: 'white', textDecoration: 'none', fontWeight: 600 }}
            >
              ☎ {AUTHOR.phone}
            </a>
            <a
              href={`mailto:${AUTHOR.emailPrimary}`}
              style={{ color: 'white', textDecoration: 'none', fontWeight: 600 }}
            >
              ✉ {AUTHOR.emailPrimary}
            </a>
            <a
              href={`mailto:${AUTHOR.emailProfessional}`}
              style={{ color: 'var(--aku-yellow)', textDecoration: 'none', fontWeight: 600 }}
            >
              ✉ {AUTHOR.emailProfessional}
            </a>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-md-5">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img
                src="/logo.svg"
                alt="Aku Pay"
                width={36}
                height={36}
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <span style={{ fontWeight: 800, fontSize: 20, color: 'white' }}>
                Aku<span style={{ color: 'var(--aku-yellow)' }}>Pay</span>
              </span>
            </div>
            <p style={{ fontSize: 14, maxWidth: 340, color: 'rgba(255,255,255,0.7)' }}>
              Money that moves with you. Send, receive and pay bills in seconds — built for everyday life.
            </p>
            <div className="d-flex gap-2 mt-3">
              {['f', 'in', 'x'].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.1)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="col-6 col-md-3">
            <h6 style={{ fontWeight: 700, color: 'white', marginBottom: 16 }}>Product</h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: 14 }}>
              {productLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-md-4">
            <h6 style={{ fontWeight: 700, color: 'white', marginBottom: 16 }}>Company</h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: 14 }}>
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: 24,
            marginTop: 40,
            fontSize: 13,
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          <span>
            © {year} <strong style={{ color: 'white' }}>{AUTHOR.name}</strong>. All rights reserved.
          </span>
          <span>Apps by {AUTHOR.name}</span>
        </div>
      </div>
    </footer>
  );
}
