import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';

const contacts = [
  { name: 'Akosua Mensah', id: 'AKU-2210-4471', initial: 'A' },
  { name: 'Kofi Boateng', id: 'AKU-8834-1120', initial: 'K' },
  { name: 'Ama Owusu', id: 'AKU-5567-2290', initial: 'A' },
];

export default function SendMoney() {
  const [form, setForm] = useState({ recipient: '', id: '', amount: '', note: '' });
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const pickContact = (c) => {
    setForm({ ...form, recipient: c.name, id: c.id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.recipient || !form.amount) return;
    setSent(true);
  };

  if (sent) {
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

        <section className="aku-section band-green" style={{ marginTop: -120, position: 'relative', zIndex: 2, background: 'transparent' }}>
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
              <h2 style={{ fontWeight: 800, color: 'var(--aku-ink)' }}>Money sent</h2>
              <p style={{ color: 'var(--aku-muted)', marginTop: 8 }}>
                ₵ {form.amount} was sent to {form.recipient}.
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
                  <span style={{ color: 'var(--aku-muted)' }}>Recipient</span>
                  <span style={{ fontWeight: 600 }}>{form.recipient}</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span style={{ color: 'var(--aku-muted)' }}>Aku ID</span>
                  <span style={{ fontWeight: 600 }}>{form.id}</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span style={{ color: 'var(--aku-muted)' }}>Amount</span>
                  <span style={{ fontWeight: 600 }}>₵ {form.amount}</span>
                </div>
                {form.note && (
                  <div className="d-flex justify-content-between py-1">
                    <span style={{ color: 'var(--aku-muted)' }}>Note</span>
                    <span style={{ fontWeight: 600 }}>{form.note}</span>
                  </div>
                )}
              </div>

              <div className="d-flex flex-wrap gap-2 justify-content-center mt-4">
                <button
                  className="aku-btn aku-btn-ghost"
                  onClick={() => {
                    setSent(false);
                    setForm({ recipient: '', id: '', amount: '', note: '' });
                  }}
                >
                  Send another
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
                  Send money
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
                  Move money in seconds
                </h1>
                <p style={{ color: 'var(--aku-muted)', marginTop: 16, fontSize: 16, maxWidth: 480 }}>
                  Transfer to any Aku Pay user — no fees, no wait, no paperwork. Just pick a contact, type an amount, and it's done.
                </p>

                <div className="d-flex flex-wrap gap-3 mt-4">
                  {[
                    { k: '0', v: 'fees' },
                    { k: '<5s', v: 'average send time' },
                    { k: '24/7', v: 'always on' },
                  ].map((s) => (
                    <div
                      key={s.v}
                      className="aku-card"
                      style={{ padding: '14px 18px', minWidth: 130 }}
                    >
                      <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--aku-blue)' }}>
                        {s.k}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--aku-muted)', marginTop: 2 }}>
                        {s.v}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="col-12 col-lg-6">
              <Reveal direction="right">
                <div className="img-tile" style={{ aspectRatio: '4 / 3' }}>
                  <img
                    src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80"
                    alt="Person sending money on phone"
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
          <div className="mx-auto" style={{ maxWidth: 560 }}>
            <Reveal>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: 'var(--aku-ink)',
                  marginBottom: 16,
                }}
              >
                Who are you sending to?
              </h2>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {contacts.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => pickContact(c)}
                    className="d-flex align-items-center gap-2"
                    style={{
                      background: 'var(--aku-white)',
                      padding: '6px 14px 6px 6px',
                      borderRadius: 'var(--radius-pill)',
                      border:
                        form.id === c.id
                          ? '2px solid var(--aku-blue)'
                          : '1px solid var(--aku-line)',
                      transition: 'all var(--t-fast) var(--ease-out)',
                    }}
                  >
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: 'var(--aku-yellow)',
                        color: '#0B132B',
                        display: 'grid',
                        placeItems: 'center',
                        fontWeight: 700,
                        fontSize: 13,
                      }}
                    >
                      {c.initial}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--aku-ink)' }}>
                      {c.name}
                    </span>
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="aku-card">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" style={{ fontWeight: 600, color: 'var(--aku-ink)' }}>
                      Recipient name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Akosua Mensah"
                      value={form.recipient}
                      onChange={update('recipient')}
                      style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" style={{ fontWeight: 600, color: 'var(--aku-ink)' }}>
                      Aku ID or phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="AKU-XXXX-XXXX"
                      value={form.id}
                      onChange={update('id')}
                      style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                    />
                  </div>

                  <div className="mb-3">
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

                  <div className="mb-4">
                    <label className="form-label" style={{ fontWeight: 600, color: 'var(--aku-ink)' }}>
                      Note <span style={{ color: 'var(--aku-muted)', fontWeight: 400 }}>(optional)</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this for?"
                      value={form.note}
                      onChange={update('note')}
                      style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="aku-btn aku-btn-primary w-100"
                    disabled={!form.recipient || !form.amount}
                    style={{
                      opacity: !form.recipient || !form.amount ? 0.5 : 1,
                      padding: 14,
                    }}
                  >
                    Send ₵{form.amount || '0'}
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
