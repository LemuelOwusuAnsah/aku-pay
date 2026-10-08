import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { useWallet } from '../context/WalletContext.jsx';

const DEMO_NAME = 'Lemuel Owusu-Ansah';
const DEMO_PHONE = '0245791297';
const DEMO_EMAIL = 'hello@lemuelowusuansah.org';

export default function Auth() {
  const { accounts, user, signUp, signIn, resetPassword, signOut, formatMoney } = useWallet();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const nextPath = params.get('next') || '/wallet';
  const wantsSignup = params.get('mode') === 'signup';
  const isAddFlow = params.get('add') === '1';

  const isFirstTime = accounts.length === 0;

  const initialMode = useMemo(() => {
    if (wantsSignup) return 'signup';
    if (isFirstTime) return 'signup';
    return 'signin';
  }, [wantsSignup, isFirstTime]);

  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' });
  const [resetForm, setResetForm] = useState({ email: '', password: '', confirm: '' });
  const [resetDone, setResetDone] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [justSignedIn, setJustSignedIn] = useState(null);

  const logoSrc = `${import.meta.env.BASE_URL}logo.svg`;
  const logoWhiteSrc = `${import.meta.env.BASE_URL}logo-white.svg`;

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (user && !justSignedIn) {
      setJustSignedIn(user);
    }
  }, [user, justSignedIn]);

  const update = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setError('');
  };

  const updateReset = (field) => (e) => {
    setResetForm({ ...resetForm, [field]: e.target.value });
    setError('');
  };

  const switchMode = (next) => {
    if (next === mode) return;
    setMode(next);
    setAnimKey((k) => k + 1);
    setForm({ name: '', phone: '', email: '', password: '' });
    setResetForm({ email: '', password: '', confirm: '' });
    setResetDone(false);
    setError('');
  };

  const goToReset = () => {
    setMode('reset');
    setAnimKey((k) => k + 1);
    setForm({ name: '', phone: '', email: '', password: '' });
    setResetForm({ email: '', password: '', confirm: '' });
    setResetDone(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);

    try {
      const result =
        mode === 'signup'
          ? await signUp({
              name: form.name,
              phone: form.phone,
              email: form.email,
              password: form.password,
            })
          : await signIn({ email: form.email, password: form.password });

      if (!result.ok) {
        setError(result.error || 'Something went wrong.');
        setBusy(false);
        return;
      }
      setJustSignedIn(result.user);
      navigate(nextPath, { replace: true });
    } catch (err) {
      setError('Unexpected error. Try again.');
      setBusy(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');

    if (resetForm.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (resetForm.password !== resetForm.confirm) {
      setError("Passwords don't match.");
      return;
    }

    setBusy(true);
    try {
      const result = await resetPassword({
        email: resetForm.email,
        newPassword: resetForm.password,
      });
      if (!result.ok) {
        setError(result.error || 'Could not reset password.');
        setBusy(false);
        return;
      }
      setResetDone(true);
      setBusy(false);
    } catch (err) {
      setError('Unexpected error. Try again.');
      setBusy(false);
    }
  };

  const handleSignOut = () => {
    signOut();
    setForm({ name: '', phone: '', email: '', password: '' });
    setError('');
    setJustSignedIn(null);
  };

  const banner = (() => {
    if (isAddFlow) {
      return {
        tone: 'yellow',
        text: (
          <>
            <strong>Add another account.</strong> Your current session will switch to the new one.
          </>
        ),
      };
    }
    if (isFirstTime) {
      return {
        tone: 'yellow',
        text: (
          <>
            <strong>Welcome to Aku Pay.</strong> Create your first wallet below — it takes under a minute.
          </>
        ),
      };
    }
    return {
      tone: 'blue',
      text: (
        <>
          <strong>Welcome back.</strong> Sign in to continue where you left off.
        </>
      ),
    };
  })();

  if (justSignedIn) {
    return (
      <div>
        <section
          style={{
            position: 'relative',
            minHeight: 380,
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
                Welcome, {justSignedIn.name.split(' ')[0]}
              </h2>
              <p style={{ color: 'var(--aku-muted)', marginTop: 8, fontSize: 14 }}>
                You're signed in. Your wallet is ready.
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
                  <span style={{ fontWeight: 600 }}>{justSignedIn.name}</span>
                </div>
                {justSignedIn.phone && (
                  <div className="d-flex justify-content-between py-1">
                    <span style={{ color: 'var(--aku-muted)' }}>Phone</span>
                    <span style={{ fontWeight: 600 }}>{justSignedIn.phone}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between py-1">
                  <span style={{ color: 'var(--aku-muted)' }}>Email</span>
                  <span style={{ fontWeight: 600 }}>{justSignedIn.email}</span>
                </div>
                <div
                  className="d-flex justify-content-between py-1 mt-2"
                  style={{ borderTop: '1px solid var(--aku-line)', paddingTop: 8 }}
                >
                  <span style={{ color: 'var(--aku-muted)' }}>Balance</span>
                  <span style={{ fontWeight: 700 }}>{formatMoney(0)}</span>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2 justify-content-center mt-4">
                <button className="aku-btn aku-btn-ghost" onClick={handleSignOut}>
                  Sign out
                </button>
                <button
                  className="aku-btn aku-btn-primary"
                  onClick={() => navigate('/wallet')}
                >
                  Continue to wallet
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const showTabs = mode === 'signin' || mode === 'signup';

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
                      <img src={logoWhiteSrc} alt="Aku Pay" width={40} height={40} />
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
                    {mode === 'reset'
                      ? 'Reset your password'
                      : mode === 'signin'
                      ? 'Welcome back'
                      : 'Create your wallet'}
                  </h3>
                  <p style={{ color: 'var(--aku-muted)', marginTop: 6, fontSize: 14 }}>
                    {mode === 'reset'
                      ? 'Set a new password for your account.'
                      : mode === 'signin'
                      ? 'Sign in to continue where you left off.'
                      : 'Takes less than a minute.'}
                  </p>
                </Reveal>

                <Reveal delay={80}>
                  {mode !== 'reset' && (
                    <div
                      className="mt-4 mb-4"
                      style={{
                        background:
                          banner.tone === 'yellow'
                            ? 'var(--aku-yellow-soft)'
                            : 'var(--aku-blue-soft)',
                        borderLeft: `4px solid ${
                          banner.tone === 'yellow' ? 'var(--aku-yellow)' : 'var(--aku-blue)'
                        }`,
                        borderRadius: 'var(--radius-md)',
                        padding: 12,
                        fontSize: 13,
                        color: 'var(--aku-ink)',
                      }}
                    >
                      {banner.text}
                    </div>
                  )}

                  {mode === 'reset' && !resetDone && (
                    <div
                      className="mt-4 mb-4"
                      style={{
                        background: 'var(--aku-blue-soft)',
                        borderLeft: '4px solid var(--aku-blue)',
                        borderRadius: 'var(--radius-md)',
                        padding: 12,
                        fontSize: 13,
                        color: 'var(--aku-ink)',
                      }}
                    >
                      Enter the email on your account and pick a new password. In production, this
                      would send a reset link to your inbox.
                    </div>
                  )}

                  {showTabs && (
                    <div
                      className="d-flex p-1 mb-4"
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
                  )}

                  {nextPath && nextPath !== '/wallet' && mode !== 'reset' && (
                    <div
                      className="mb-4"
                      style={{
                        background: 'var(--aku-yellow-soft)',
                        borderLeft: '4px solid var(--aku-yellow)',
                        borderRadius: 'var(--radius-md)',
                        padding: 12,
                        fontSize: 13,
                        color: 'var(--aku-ink)',
                      }}
                    >
                      Sign in to continue to <strong>{nextPath}</strong>.
                    </div>
                  )}

                  {mode === 'reset' ? (
                    resetDone ? (
                      <div className="text-center aku-fade-up" key={`rd-${animKey}`}>
                        <div
                          style={{
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            background: 'var(--aku-green)',
                            color: 'white',
                            display: 'grid',
                            placeItems: 'center',
                            fontSize: 30,
                            fontWeight: 700,
                            margin: '0 auto 20px',
                          }}
                        >
                          ✓
                        </div>
                        <h4 style={{ fontWeight: 800, color: 'var(--aku-ink)' }}>
                          Password updated
                        </h4>
                        <p style={{ color: 'var(--aku-muted)', marginTop: 8, fontSize: 14 }}>
                          Sign in with your new password.
                        </p>
                        <button
                          className="aku-btn aku-btn-primary w-100 mt-4"
                          onClick={() => switchMode('signin')}
                          style={{ padding: 14 }}
                        >
                          Back to sign in
                        </button>
                      </div>
                    ) : (
                      <form
                        key={`rf-${animKey}`}
                        onSubmit={handleReset}
                        className="aku-slide-right"
                      >
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
                            value={resetForm.email}
                            onChange={updateReset('email')}
                            style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            className="form-label"
                            style={{ fontWeight: 600, color: 'var(--aku-ink)' }}
                          >
                            New password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="At least 8 characters"
                            value={resetForm.password}
                            onChange={updateReset('password')}
                            style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            className="form-label"
                            style={{ fontWeight: 600, color: 'var(--aku-ink)' }}
                          >
                            Confirm new password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Type it again"
                            value={resetForm.confirm}
                            onChange={updateReset('confirm')}
                            style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                          />
                        </div>

                        {error && (
                          <p
                            style={{
                              color: 'var(--aku-danger)',
                              fontSize: 13,
                              marginBottom: 12,
                            }}
                          >
                            {error}
                          </p>
                        )}

                        <button
                          type="submit"
                          className="aku-btn aku-btn-primary w-100"
                          disabled={
                            busy ||
                            !resetForm.email ||
                            !resetForm.password ||
                            !resetForm.confirm
                          }
                          style={{
                            opacity:
                              busy ||
                              !resetForm.email ||
                              !resetForm.password ||
                              !resetForm.confirm
                                ? 0.5
                                : 1,
                            padding: 14,
                          }}
                        >
                          {busy ? 'Updating…' : 'Update password'}
                        </button>

                        <p
                          style={{
                            fontSize: 13,
                            color: 'var(--aku-muted)',
                            textAlign: 'center',
                            marginTop: 20,
                          }}
                        >
                          Remembered it?{' '}
                          <button
                            type="button"
                            onClick={() => switchMode('signin')}
                            style={{
                              color: 'var(--aku-blue)',
                              fontWeight: 600,
                              background: 'none',
                              border: 'none',
                              padding: 0,
                            }}
                          >
                            Back to sign in
                          </button>
                        </p>
                      </form>
                    )
                  ) : (
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
                              style={{
                                padding: '12px 16px',
                                borderRadius: 'var(--radius-md)',
                              }}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              className="form-label"
                              style={{ fontWeight: 600, color: 'var(--aku-ink)' }}
                            >
                              Phone{' '}
                              <span style={{ color: 'var(--aku-muted)', fontWeight: 400 }}>
                                (optional)
                              </span>
                            </label>
                            <input
                              type="tel"
                              className="form-control"
                              placeholder={`e.g. ${DEMO_PHONE}`}
                              value={form.phone}
                              onChange={update('phone')}
                              style={{
                                padding: '12px 16px',
                                borderRadius: 'var(--radius-md)',
                              }}
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
                        <div className="d-flex justify-content-between align-items-center">
                          <label
                            className="form-label"
                            style={{ fontWeight: 600, color: 'var(--aku-ink)' }}
                          >
                            Password
                          </label>
                          {mode === 'signin' && (
                            <button
                              type="button"
                              onClick={goToReset}
                              style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                fontSize: 13,
                                color: 'var(--aku-blue)',
                                fontWeight: 600,
                              }}
                            >
                              Forgot password?
                            </button>
                          )}
                        </div>
                        <input
                          type="password"
                          className="form-control"
                          placeholder={
                            mode === 'signup' ? 'At least 8 characters' : '••••••••'
                          }
                          value={form.password}
                          onChange={update('password')}
                          style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                        />
                        {mode === 'signup' && (
                          <p
                            style={{
                              fontSize: 12,
                              color: 'var(--aku-muted)',
                              marginTop: 6,
                            }}
                          >
                            Minimum 8 characters.
                          </p>
                        )}
                      </div>

                      {error && (
                        <p
                          style={{
                            color: 'var(--aku-danger)',
                            fontSize: 13,
                            marginBottom: 12,
                          }}
                        >
                          {error}
                        </p>
                      )}

                      <button
                        type="submit"
                        className="aku-btn aku-btn-primary w-100"
                        disabled={
                          busy ||
                          !form.email ||
                          !form.password ||
                          (mode === 'signup' && !form.name)
                        }
                        style={{
                          opacity:
                            busy ||
                            !form.email ||
                            !form.password ||
                            (mode === 'signup' && !form.name)
                              ? 0.5
                              : 1,
                          padding: 14,
                        }}
                      >
                        {busy
                          ? 'Please wait…'
                          : mode === 'signin'
                          ? 'Sign in'
                          : 'Create account'}
                      </button>
                    </form>
                  )}

                  {mode !== 'reset' && (
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
                        {mode === 'signin' ? 'Create one' : 'Sign in'}
                      </button>
                    </p>
                  )}
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
            Demo only — accounts are stored locally in your browser. Apps by {DEMO_NAME}.
          </p>
        </div>
      </section>
    </div>
  );
}
