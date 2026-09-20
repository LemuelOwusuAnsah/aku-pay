import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';

const categories = [
  {
    id: 'electricity',
    label: 'Electricity',
    icon: '⚡',
    biller: 'ECG Ghana',
    image:
      'https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'water',
    label: 'Water',
    icon: '💧',
    biller: 'Ghana Water Co.',
    image:
      'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'internet',
    label: 'Internet',
    icon: '🌐',
    biller: 'Fibre Broadband',
    image:
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'tv',
    label: 'TV',
    icon: '📺',
    biller: 'DSTV Ghana',
    image:
      'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=600&q=80',
  },
];

export default function PayBills() {
  const [category, setCategory] = useState(null);
  const [form, setForm] = useState({ biller: '', account: '', amount: '' });
  const [paid, setPaid] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const pickCategory = (c) => {
    setCategory(c.id);
    setForm({ ...form, biller: c.biller });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.biller || !form.account || !form.amount) return;
    setPaid(true);
  };

  if (paid) {
    const cat = categories.find((c) => c.id === category);
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
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2000&q=80"
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
              <h2 style={{ fontWeight: 800, color: 'var(--aku-ink)' }}>Bill paid</h2>
              <p style={{ color: 'var(--aku-muted)', marginTop: 8 }}>
                ₵ {form.amount} paid to {form.biller}.
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
                  <span style={{ color: 'var(--aku-muted)' }}>Category</span>
                  <span style={{ fontWeight: 600 }}>{cat ? cat.label : '—'}</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span style={{ color: 'var(--aku-muted)' }}>Biller</span>
                  <span style={{ fontWeight: 600 }}>{form.biller}</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span style={{ color: 'var(--aku-muted)' }}>Account</span>
                  <span style={{ fontWeight: 600 }}>{form.account}</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span style={{ color: 'var(--aku-muted)' }}>Amount</span>
                  <span style={{ fontWeight: 600 }}>₵ {form.amount}</span>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2 justify-content-center mt-4">
                <button
                  className="aku-btn aku-btn-ghost"
                  onClick={() => {
                    setPaid(false);
                    setCategory(null);
                    setForm({ biller: '', account: '', amount: '' });
                  }}
                >
                  Pay another bill
                </button>
                <Link to="/wallet" className="aku-btn aku-btn-primary">
                  Back to wallet
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="aku-section band-yellow">
        <div className="aku-container">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-6">
              <Reveal direction="left">
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
                  Pay bills
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
                  Bills, settled in seconds
                </h1>
                <p style={{ color: 'var(--aku-muted)', marginTop: 16, fontSize: 16, maxWidth: 480 }}>
                  Electricity, water, internet, TV — pay every bill straight from your Aku Pay balance. No queues, no cash, no missing receipts.
                </p>

                <div className="d-flex flex-wrap gap-3 mt-4">
                  {[
                    { k: '4', v: 'bill types' },
                    { k: 'Instant', v: 'confirmation' },
                    { k: '24/7', v: 'always available' },
                  ].map((s) => (
                    <div key={s.v} className="aku-card" style={{ padding: '14px 18px', minWidth: 130 }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--aku-blue)' }}>{s.k}</div>
                      <div style={{ fontSize: 12, color: 'var(--aku-muted)', marginTop: 2 }}>{s.v}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="col-12 col-lg-6">
              <Reveal direction="right">
                <div className="img-tile" style={{ aspectRatio: '4 / 3' }}>
                  <img
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"
                    alt="Paying bills with a calculator and receipts"
                    className="img-cover"
                    loading="lazy"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="aku-section band-blue">
        <div className="aku-container">
          <Reveal>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--aku-ink)', textAlign: 'center' }}>
              What do you want to pay?
            </h2>
            <p
              style={{
                color: 'var(--aku-muted)',
                textAlign: 'center',
                marginTop: 8,
                marginBottom: 40,
              }}
            >
              Pick a category to start.
            </p>
          </Reveal>

          <Reveal group className="row g-4">
            {categories.map((c) => (
              <div className="col-6 col-md-3" key={c.id}>
                <button
                  type="button"
                  onClick={() => pickCategory(c)}
                  className="aku-card w-100 h-100 text-center"
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    border:
                      category === c.id
                        ? '3px solid var(--aku-blue)'
                        : '3px solid transparent',
                    transition: 'all var(--t-fast) var(--ease-out)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ height: 110, overflow: 'hidden' }}>
                    <img src={c.image} alt={c.label} className="img-cover" loading="lazy" />
                  </div>
                  <div style={{ padding: '14px 10px' }}>
                    <div style={{ fontSize: 22 }}>{c.icon}</div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        marginTop: 4,
                        color: 'var(--aku-ink)',
                      }}
                    >
                      {c.label}
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="aku-section band-cream">
        <div className="aku-container">
          <div className="mx-auto" style={{ maxWidth: 560 }}>
            <Reveal>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--aku-ink)', marginBottom: 16 }}>
                Bill details
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <div className="aku-card">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" style={{ fontWeight: 600, color: 'var(--aku-ink)' }}>
                      Biller
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. ECG Ghana"
                      value={form.biller}
                      onChange={update('biller')}
                      style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" style={{ fontWeight: 600, color: 'var(--aku-ink)' }}>
                      Account / meter number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 0451-8890-231"
                      value={form.account}
                      onChange={update('account')}
                      style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label" style={{ fontWeight: 600, color: 'var(--aku-ink)' }}>
                      Amount (₵)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="0.00"
                      value={form.amount}
                      onChange={update('amount')}
                      min="1"
                      step="0.01"
                      style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="aku-btn aku-btn-primary w-100"
                    disabled={!form.biller || !form.account || !form.amount}
                    style={{
                      opacity: !form.biller || !form.account || !form.amount ? 0.5 : 1,
                      padding: 14,
                    }}
                  >
                    Pay ₵{form.amount || '0'}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
