import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Globe, Mail } from "lucide-react";
import { useWallet } from '../context/WalletContext.jsx';

const productLinks = [
  { to: '/wallet', label: 'Wallet' },
  { to: '/send', label: 'Send money' },
  { to: '/bills', label: 'Pay bills' },
  { to: '/transactions', label: 'History' },
];

const companyLinks = [
  { to: '/about', label: 'About' },
  { to: '/', label: 'Security' },
  { to: '/', label: 'Support' },
  { to: '/auth', label: 'Sign in' },
];

const socials = [
  { Icon: Users, label: "Community" },
  { Icon: Globe, label: "Website" },
  { Icon: Mail, label: "Email" },
];

const AUTHOR = {
  name: 'Lemuel Owusu-Ansah',
  phone: '0245791297',
  emailPrimary: 'owusuansahlemuel@gmail.com',
  emailProfessional: 'hello@lemuelowusuansah.org',
};

export default function Footer() {
  const { user, signOut, resetDemo } = useWallet();
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const logoSrc = `${import.meta.env.BASE_URL}logo.svg`;
  const [resetOpen, setResetOpen] = useState(false);

  const confirmReset = () => {
    resetDemo();
    setResetOpen(false);
    navigate('/');
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <>
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
              <a href={`tel:${AUTHOR.phone}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 600 }}>
                ☎ {AUTHOR.phone}
              </a>
              <a href={`mailto:${AUTHOR.emailPrimary}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 600 }}>
                ✉ {AUTHOR.emailPrimary}
              </a>
              <a href={`mailto:${AUTHOR.emailProfessional}`} style={{ color: 'var(--aku-yellow)', textDecoration: 'none', fontWeight: 600 }}>
                ✉ {AUTHOR.emailProfessional}
              </a>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-5">
              <div className="d-flex align-items-center gap-2 mb-3">
                <img src={logoSrc} alt="Aku Pay" width={36} height={36} />
                <span style={{ fontWeight: 800, fontSize: 20, color: 'white' }}>
                  Aku<span style={{ color: 'var(--aku-yellow)' }}>Pay</span>
                </span>
              </div>
              <p style={{ fontSize: 14, maxWidth: 340, color: 'rgba(255,255,255,0.7)' }}>
                Money that moves with you. Send, receive and pay bills in seconds — built for everyday life.
              </p>
              <div className="d-flex gap-2 mt-3">
                {socials.map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.1)',
                      display: 'grid',
                      placeItems: 'center',
                      color: 'white',
                      transition: 'background var(--t-fast) var(--ease-out)',
                    }}
                  >
                    <Icon size={16} strokeWidth={2} />
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
            className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3"
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

            <div className="d-flex flex-wrap align-items-center gap-3">
              <span>Apps by {AUTHOR.name}</span>

              {user && (
                <button
                  onClick={handleSignOut}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: 'underline',
                    padding: 0,
                    cursor: 'pointer',
                  }}
                >
                  Sign out
                </button>
              )}

              <button
                onClick={() => setResetOpen(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: 13,
                  padding: 0,
                  cursor: 'pointer',
                }}
              >
                Reset demo data
              </button>
            </div>
          </div>
        </div>
      </footer>

      {resetOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(11,19,43,0.65)',
            zIndex: 1300,
            display: 'grid',
            placeItems: 'center',
            padding: 16,
          }}
          onClick={() => setResetOpen(false)}
        >
          <div
            className="aku-card aku-fade-up"
            style={{ maxWidth: 440, width: '100%', padding: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'var(--aku-yellow-soft)',
                color: 'var(--aku-yellow-deep)',
                display: 'grid',
                placeItems: 'center',
                fontSize: 24,
                fontWeight: 800,
                marginBottom: 20,
              }}
            >
              !
            </div>
            <h3 style={{ fontWeight: 800, color: 'var(--aku-ink)', fontSize: 22 }}>
              Reset demo data?
            </h3>
            <p style={{ color: 'var(--aku-muted)', marginTop: 8, fontSize: 14 }}>
              This will remove all accounts, balances, transactions and sessions stored in this
              browser. The app returns to a first-time state. This can't be undone.
            </p>

            <div className="d-flex gap-2 mt-4">
              <button
                className="aku-btn aku-btn-ghost flex-fill"
                onClick={() => setResetOpen(false)}
              >
                Cancel
              </button>
              <button
                className="aku-btn aku-btn-primary flex-fill"
                onClick={confirmReset}
                style={{ background: 'var(--aku-danger)', borderColor: 'var(--aku-danger)' }}
              >
                Reset everything
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
