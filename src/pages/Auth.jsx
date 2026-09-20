import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';

const DEMO_NAME = 'Lemuel Owusu-Ansah';
const DEMO_PHONE = '0245791297';
const DEMO_EMAIL = 'hello@lemuelowusuansah.org';

export default function Auth() {
  const [mode, setMode] = useState('signin');
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' });
  const [done, setDone] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const switchMode = (next) => {
    if (next === mode) return;
    setMode(next);
    setAnimKey((k) => k + 1);
    setForm({ name: '', phone: '', email: '', password: '' });
    setDone(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    if (mode === 'signup' && !form.name) return;
    setDone(true);
  };

  if (done) {
    const displayName = form.name || DEMO_NAME;
    const displayEmail = form.email || DEMO_EMAIL;

    return (
      <div>
        <section
          style={{
            position: 'relative',
            minHeight: 420,
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="img-cover"
            style={{ position: 'absolute', inset: 0, zIndex: 0 }}
          />
          <div className="hero-overlay" style={{ zIndex: 1 }} />
        </section>

        <section
          className="aku-section"
          style={{
            marginTop: -120,
            position: 'relative',
            zIndex: 2,
            background: 'transparent',
            paddingTop: 0,
          }}
        >
          <div className="aku-container">
            <div
              className="aku-card text-center mx-auto aku-fade-up"
              style={{ maxWidth: 520, padding: 40 }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: 'var(--aku-green)',
                  color: 'white',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 34,
                  fontWeight: 700,
                  margin: '0 auto 20px',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                ✓
              </div>
              <h2 style={{ fontWeight: 800, color: 'var(--aku-ink)' }}>
                {mode === 'signin' ? 'Signed in' : 'Account created'}
              </h2>
              <p style={{ color: 'var(--aku-muted)', marginTop: 8, fontSize: 14 }}>
                {mode === 'signin'
                  ? `Welcome back, ${displayEmail}.`
                  : `Welcome to Aku Pay, ${displayName}.`}
              </p>

              <div
                style={{
                  background: 'var(--aku-bg)',
                  borderRadius: 'var(--radius-md)',
                  padding: 20,
                  marginTop: 24,
                  textAlign: 'left',
                  fontSize: 14,
                }}
              >
                <div className="d-flex justify-content-between py-1">
                  <span style={{ color: 'var(--aku-muted)' }}>Name</span>
                  <span style={{ fontWeight: 600 }}>{displayName}</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span style={{ color: 'var(--aku-muted)' }}>Phone</span>
                  <span style={{ fontWeight: 600 }}>{form.phone || DEMO_PHONE}</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span style={{ color: 'var(--aku-muted)' }}>Email</span>
                  <span style={{ fontWeight: 600 }}>{displayEmail}</span>
                </div>
              </div>

              <Link
                to="/wallet"
                className="aku-btn aku-btn-primary w-100 mt-4"
                style={{ padding: 14 }}
              >
                Continue to wallet
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="aku-section" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <div className="aku-container">
          <div
            className="row g-0"
            style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              minHeight: 620,
            }}
          >
            <div className="col-12 col-lg-6 d-none d-lg-block">
              <Reveal direction="left" className="h-100">
                <div style={{ position: 'relative', height: '100%' }}>
                  <img
                    src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1600&q=80"
                    alt="Marketplace"
                    className="img-cover"
                  />
                  <div className="hero-overlay" />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: 48,
                      color: 'white',
                      zIndex: 2,
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src="/logo.svg"
                        alt="Aku Pay"
                        width={40}
                        height={40}
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                      <span style={{ fontWeight: 800, fontSize: 22 }}>
                        Aku<span style={{ color: 'var(--aku-yellow)' }}>Pay</span>
                      </span>
                    </div>

                    <div>
                      <h2
                        style={{
                          fontWeight: 800,
                          fontSize: 40,
                          lineHeight: 1.1,
                          maxWidth: 420,
                        }}
                      >
                        Money that <span style={{ color: 'var(--aku-yellow)' }}>moves</span> with you.
                      </h2>
                      <p
                        style={{
                          marginTop: 16,
                          color: 'rgba(255,255,255,0.85)',
                          maxWidth: 420,
                          fontSize: 15,
                        }}
                      >
                        Join thousands already using Aku Pay to send, receive and pay — all from one simple wallet.
                      </p>
                      <p
                        style={{
                          marginTop: 28,
                          color: 'rgba(255,255,255,0.65)',
                          fontSize: 12,
                          letterSpacing: 0.4,
                        }}
                      >
                        Apps by {DEMO_NAME}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="col-12 col-lg-6" style={{ background: 'var(--aku-white)' }}>
              <div
                className="d-flex flex-column justify-content-center h-100"
                style={{ padding: 48 }}
              >
                <Reveal>
                  <h3 style={{ fontWeight: 800, color: 'var(--aku-ink)' }}>
                    {mode === 'signin' ? 'Welcome back' : 'Create your wallet'}
                  </h3>
                  <p style={{ color: 'var(--aku-muted)', marginTop: 6, fontSize: 14 }}>
                    {mode === 'signin'
                      ? 'Sign in to continue where you left off.'
                      : 'Takes less than a minute.'}
                  </p>
                </Reveal>

                <Reveal delay={80}>
                  <div
                    className="d-flex p-1 my-4"
                    style={{ background: 'var(--aku-bg)', borderRadius: 'var(--radius-pill)' }}
                  >
                    {[
                      { id: 'signin', label: 'Sign in' },
                      { id: 'signup', label: 'Sign up' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => switchMode(t.id)}
                        className="flex-fill aku-btn"
                        style={{
                          padding: '10px 0',
                          background: mode === t.id ? 'var(--aku-blue)' : 'transparent',
                          color: mode === t.id ? 'white' : 'var(--aku-ink)',
                          fontSize: 14,
                        }}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <p
                    style={{
                      fontSize: 12,
                      color: 'var(--aku-muted)',
                      textAlign: 'center',
                      marginBottom: 20,
                    }}
                  >
                    Try it with <strong style={{ color: 'var(--aku-ink)' }}>{DEMO_EMAIL}</strong> · any password
                  </p>

                  <form key={animKey} onSubmit={handleSubmit} className="aku-slide-right">
                    {mode === 'signup' && (
                      <>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            style={{ fontWeight: 600, color: 'var(--aku-ink)' }}
                          >
                            Full name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={`e.g. ${DEMO_NAME}`}
                            value={form.name}
                            onChange={update('name')}
                            style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            className="form-label"
                            style={{ fontWeight: 600, color: 'var(--aku-ink)' }}
                          >
                            Phone <span style={{ color: 'var(--aku-muted)', fontWeight: 400 }}>(optional)</span>
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            placeholder={`e.g. ${DEMO_PHONE}`}
                            value={form.phone}
                            onChange={update('phone')}
                            style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                          />
                        </div>
                      </>
                    )}

                    <div className="mb-3">
                      <label
                        className="form-label"
                        style={{ fontWeight: 600, color: 'var(--aku-ink)' }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder={DEMO_EMAIL}
                        value={form.email}
                        onChange={update('email')}
                        style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        className="form-label"
                        style={{ fontWeight: 600, color: 'var(--aku-ink)' }}
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={update('password')}
                        style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="aku-btn aku-btn-primary w-100"
                      disabled={
                        !form.email || !form.password || (mode === 'signup' && !form.name)
                      }
                      style={{
                        opacity:
                          !form.email || !form.password || (mode === 'signup' && !form.name)
                            ? 0.5
                            : 1,
                        padding: 14,
                      }}
                    >
                      {mode === 'signin' ? 'Sign in' : 'Create account'}
                    </button>
                  </form>

                  <p
                    style={{
                      fontSize: 13,
                      color: 'var(--aku-muted)',
                      textAlign: 'center',
                      marginTop: 20,
                    }}
                  >
                    {mode === 'signin' ? "Don't have an account? " : 'Already registered? '}
                    <button
                      type="button"
                      onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
                      style={{
                        color: 'var(--aku-blue)',
                        fontWeight: 600,
                        background: 'none',
                        border: 'none',
                        padding: 0,
                      }}
                    >
                      {mode === 'signin' ? 'Sign up' : 'Sign in'}
                    </button>
                  </p>
                </Reveal>
              </div>
            </div>
          </div>

          <p
            style={{
              textAlign: 'center',
              color: 'var(--aku-muted)',
              fontSize: 12,
              marginTop: 20,
            }}
          >
            Demo only — no real accounts are created. Apps by {DEMO_NAME}.
          </p>
        </div>
      </section>
    </div>
  );
}
