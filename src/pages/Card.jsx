import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Eye, EyeOff, Lock, Settings, Copy } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import { useWallet } from '../context/WalletContext.jsx';

export default function Card() {
  const { user, balance, formatMoney, currencyInfo } = useWallet();
  const [revealed, setRevealed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const number = '4539 8821 7744 2039';
  const maskedNumber = '•••• •••• •••• 2039';
  const expiry = '09 / 29';
  const cvv = '427';

  const firstName = user?.name?.split(' ')[0] || 'Card Holder';

  return (
    <div>
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
                  Virtual card
                </span>
                <h1
                  style={{
                    fontSize: 40,
                    fontWeight: 800,
                    color: 'var(--aku-ink)',
                    marginTop: 12,
                    lineHeight: 1.1,
                  }}
                >
                  A card that lives on your phone
                </h1>
                <p style={{ color: 'var(--aku-muted)', marginTop: 16, fontSize: 16, maxWidth: 480 }}>
                  Use your Aku Pay virtual card online and in-app. No plastic, no delivery wait, no fees. Freeze it or hide the details with one tap.
                </p>

                <div className="d-flex flex-wrap gap-3 mt-4">
                  <div
                    style={{
                      background: 'var(--aku-white)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '16px 20px',
                      minWidth: 150,
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: 'var(--aku-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                      }}
                    >
                      Available
                    </div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: 'var(--aku-blue)',
                        marginTop: 6,
                        letterSpacing: -0.3,
                      }}
                    >
                      {formatMoney(balance)}
                    </div>
                  </div>
                  <div
                    style={{
                      background: 'var(--aku-white)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '16px 20px',
                      minWidth: 150,
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: 'var(--aku-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                      }}
                    >
                      Card status
                    </div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: 'var(--aku-green)',
                        marginTop: 6,
                        letterSpacing: -0.3,
                      }}
                    >
                      ● Active
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="col-12 col-lg-6">
              <Reveal direction="right">
                <div
                  style={{
                    background: 'linear-gradient(135deg, var(--aku-blue) 0%, var(--aku-blue-light) 100%)',
                    borderRadius: 'var(--radius-xl)',
                    padding: 28,
                    color: 'white',
                    boxShadow: 'var(--shadow-lg)',
                    maxWidth: 460,
                    margin: '0 auto',
                    aspectRatio: '1.6 / 1',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: 1 }}>
                        AKU PAY · VIRTUAL
                      </div>
                      <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>
                        Aku Pay
                      </div>
                    </div>
                    <div
                      style={{
                        width: 40,
                        height: 28,
                        borderRadius: 6,
                        background: 'var(--aku-yellow)',
                        opacity: 0.9,
                      }}
                    />
                  </div>

                  <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 2.5 }}>
                    {revealed ? number : maskedNumber}
                  </div>

                  <div className="d-flex justify-content-between align-items-end">
                    <div>
                      <div style={{ fontSize: 10, opacity: 0.7, letterSpacing: 1 }}>CARDHOLDER</div>
                      <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>{firstName}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, opacity: 0.7, letterSpacing: 1 }}>EXPIRES</div>
                      <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>{expiry}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="aku-section band-cream">
        <div className="aku-container">
          <div className="mx-auto" style={{ maxWidth: 620 }}>
            <Reveal>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--aku-ink)' }}>
                Card details
              </h2>
              <p style={{ color: 'var(--aku-muted)', marginTop: 4 }}>
                Treat these like cash. Only reveal them on trusted sites.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="aku-card mt-4">
                <div className="d-flex justify-content-between align-items-center py-3" style={{ borderBottom: '1px solid var(--aku-line)' }}>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--aku-muted)' }}>Card number</div>
                    <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: 1.5, marginTop: 4 }}>
                      {revealed ? number : maskedNumber}
                    </div>
                  </div>
                  <button
                    onClick={() => setRevealed((v) => !v)}
                    className="aku-btn aku-btn-ghost"
                    style={{ padding: '8px 14px' }}
                  >
                    {revealed ? <EyeOff size={15} /> : <Eye size={15} />}
                    {revealed ? 'Hide' : 'Show'}
                  </button>
                </div>

                <div className="d-flex justify-content-between align-items-center py-3" style={{ borderBottom: '1px solid var(--aku-line)' }}>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--aku-muted)' }}>Expiry</div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginTop: 4 }}>{expiry}</div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center py-3" style={{ borderBottom: '1px solid var(--aku-line)' }}>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--aku-muted)' }}>CVV</div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginTop: 4 }}>
                      {revealed ? cvv : '•••'}
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() => setRevealed((v) => !v)}
                    className="aku-btn aku-btn-ghost"
                  >
                    {revealed ? <EyeOff size={15} /> : <Eye size={15} />}
                    {revealed ? 'Hide details' : 'Reveal details'}
                  </button>
                  <button
                    onClick={() => setSettingsOpen(true)}
                    className="aku-btn aku-btn-ghost"
                  >
                    <Settings size={15} /> Card settings
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(number);
                      }
                    }}
                    className="aku-btn aku-btn-ghost"
                  >
                    <Copy size={15} /> Copy number
                  </button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <p
                className="mt-4 d-flex align-items-start gap-2"
                style={{ color: 'var(--aku-muted)', fontSize: 14 }}
              >
                <Lock size={15} style={{ marginTop: 2, flexShrink: 0 }} />
                <span>
                  Demo card. No real transactions can be made with it. In production this would be
                  issued by a bank partner with full PCI compliance.
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {settingsOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(11,19,43,0.6)',
            zIndex: 1200,
            display: 'grid',
            placeItems: 'center',
            padding: 16,
          }}
          onClick={() => setSettingsOpen(false)}
        >
          <div
            className="aku-card aku-fade-up"
            style={{ maxWidth: 420, width: '100%', padding: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontWeight: 800, color: 'var(--aku-ink)', fontSize: 20 }}>
              Card settings
            </h3>
            <p style={{ color: 'var(--aku-muted)', fontSize: 14, marginTop: 6 }}>
              Manage how your virtual card behaves.
            </p>

            <div className="mt-4">
              {[
                { label: 'Online payments', on: true },
                { label: 'Contactless (NFC)', on: true },
                { label: 'International transactions', on: false },
                { label: 'ATM withdrawals', on: false },
              ].map((s) => (
                <div
                  key={s.label}
                  className="d-flex justify-content-between align-items-center py-3"
                  style={{ borderBottom: '1px solid var(--aku-line)' }}
                >
                  <span style={{ fontSize: 14, color: 'var(--aku-ink)' }}>{s.label}</span>
                  <span
                    style={{
                      width: 42,
                      height: 24,
                      borderRadius: 999,
                      background: s.on ? 'var(--aku-green)' : 'var(--aku-line)',
                      position: 'relative',
                      transition: 'background var(--t-fast) var(--ease-out)',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        top: 2,
                        left: s.on ? 20 : 2,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: 'white',
                        transition: 'left var(--t-fast) var(--ease-out)',
                      }}
                    />
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSettingsOpen(false)}
              className="aku-btn aku-btn-primary w-100 mt-4"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
