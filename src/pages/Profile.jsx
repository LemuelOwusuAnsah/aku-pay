import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Calendar, Lock, Save } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import { useWallet } from '../context/WalletContext.jsx';

export default function Profile() {
  const { user, formatMoney, currencyInfo, balance, accounts } = useWallet();

  const [form, setForm] = useState({ name: '', phone: '' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || '', phone: user.phone || '' });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="aku-container py-5 aku-fade-up" style={{ maxWidth: 620 }}>
        <div className="aku-card text-center" style={{ padding: 48 }}>
          <User size={32} style={{ color: 'var(--aku-muted)', margin: '0 auto 16px' }} />
          <h2 style={{ fontWeight: 800, color: 'var(--aku-ink)' }}>No account signed in</h2>
          <p style={{ color: 'var(--aku-muted)', marginTop: 8 }}>
            Sign in to view and edit your profile.
          </p>
          <Link to="/auth" className="aku-btn aku-btn-primary mt-4">
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const joined = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '—';

  return (
    <div>
      <section className="aku-section band-green">
        <div className="aku-container">
          <Reveal>
            <div className="d-flex flex-wrap align-items-center gap-4">
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: '50%',
                  background: 'var(--aku-blue)',
                  color: 'white',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 34,
                  fontWeight: 800,
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--aku-ink)' }}>
                  {user.name}
                </h1>
                <p style={{ color: 'var(--aku-muted)', marginTop: 4 }}>{user.email}</p>
                <div className="d-flex flex-wrap gap-2 mt-3">
                  <span
                    style={{
                      background: 'var(--aku-green)',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    ● Active
                  </span>
                  <span
                    style={{
                      background: 'var(--aku-white)',
                      color: 'var(--aku-ink)',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    Member since {joined}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="aku-section band-blue">
        <div className="aku-container">
          <div className="row g-4">
            <div className="col-12 col-lg-7">
              <Reveal direction="left">
                <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--aku-ink)', marginBottom: 16 }}>
                  Account details
                </h2>
                <div className="aku-card">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label" style={{ fontWeight: 600, color: 'var(--aku-ink)' }}>
                        <User size={13} style={{ marginRight: 6, verticalAlign: -2 }} />
                        Full name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" style={{ fontWeight: 600, color: 'var(--aku-ink)' }}>
                        <Phone size={13} style={{ marginRight: 6, verticalAlign: -2 }} />
                        Phone
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" style={{ fontWeight: 600, color: 'var(--aku-ink)' }}>
                        <Mail size={13} style={{ marginRight: 6, verticalAlign: -2 }} />
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        value={user.email}
                        readOnly
                        style={{
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--aku-bg)',
                          cursor: 'not-allowed',
                        }}
                      />
                      <p style={{ fontSize: 12, color: 'var(--aku-muted)', marginTop: 6 }}>
                        Email can't be changed in this demo.
                      </p>
                    </div>

                    {saved && (
                      <p
                        style={{
                          fontSize: 13,
                          color: 'var(--aku-green)',
                          fontWeight: 600,
                          marginBottom: 12,
                        }}
                      >
                        ✓ Saved (demo only — not persisted)
                      </p>
                    )}

                    <button
                      type="submit"
                      className="aku-btn aku-btn-primary w-100"
                      style={{ padding: 14 }}
                    >
                      <Save size={15} /> Save changes
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>

            <div className="col-12 col-lg-5">
              <Reveal direction="right">
                <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--aku-ink)', marginBottom: 16 }}>
                  Wallet summary
                </h2>
                <div className="aku-card">
                  <div className="d-flex justify-content-between py-2">
                    <span style={{ color: 'var(--aku-muted)', fontSize: 14 }}>Balance</span>
                    <span style={{ fontWeight: 700 }}>{formatMoney(balance)}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2">
                    <span style={{ color: 'var(--aku-muted)', fontSize: 14 }}>Currency</span>
                    <span style={{ fontWeight: 700 }}>
                      {currencyInfo.code} {currencyInfo.symbol}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between py-2">
                    <span style={{ color: 'var(--aku-muted)', fontSize: 14 }}>Accounts on this device</span>
                    <span style={{ fontWeight: 700 }}>{accounts.length}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2">
                    <span style={{ color: 'var(--aku-muted)', fontSize: 14 }}>
                      <Calendar size={12} style={{ marginRight: 4, verticalAlign: -1 }} />
                      Joined
                    </span>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{joined}</span>
                  </div>
                </div>

                <p
                  className="mt-4 d-flex align-items-start gap-2"
                  style={{ color: 'var(--aku-muted)', fontSize: 13 }}
                >
                  <Lock size={14} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span>
                    Password and session timeout are managed on the{' '}
                    <Link to="/auth" style={{ color: 'var(--aku-blue)', fontWeight: 600 }}>
                      sign-in page
                    </Link>{' '}
                    via "Forgot password".
                  </span>
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
