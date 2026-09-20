import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';

const quickActions = [
  {
    to: '/send',
    label: 'Send money',
    icon: '→',
    image:
      'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?auto=format&fit=crop&w=600&q=80',
  },
  {
    to: '/bills',
    label: 'Pay bill',
    icon: '✓',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
  },
  {
    to: '/wallet',
    label: 'Top up',
    icon: '+',
    image:
      'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=600&q=80',
  },
  {
    to: '/transactions',
    label: 'History',
    icon: '↗',
    image:
      'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80',
  },
];

const recent = [
  { name: 'Sent to Akosua', date: 'Today, 10:24', amount: -120 },
  { name: 'Bill payment — ECG', date: 'Yesterday, 18:02', amount: -85 },
  { name: 'Received from Kofi', date: 'Yesterday, 09:15', amount: 300 },
  { name: 'Airtime top-up', date: 'Mon, 14:30', amount: -20 },
];

export default function Wallet() {
  return (
    <div>
      <section
        style={{
          position: 'relative',
          minHeight: 280,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          color: 'white',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="img-cover"
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        />
        <div className="hero-overlay" style={{ zIndex: 1 }} />

        <div className="aku-container aku-fade-up" style={{ position: 'relative', zIndex: 2, padding: '48px 16px' }}>
          <div className="d-flex flex-wrap justify-content-between align-items-end gap-3">
            <div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>Hi, Lemuel 👋</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>
                Available balance
              </div>
              <div style={{ fontSize: 44, fontWeight: 800, marginTop: 4 }}>
                ₵ 2,450.80
              </div>
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
                    background: 'rgba(255,255,255,0.15)',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  Aku ID: AKU-8842-1190
                </span>
              </div>
            </div>

            <Link to="/send" className="aku-btn aku-btn-yellow" style={{ padding: '12px 24px' }}>
              Send money
            </Link>
          </div>
        </div>
      </section>

      <section className="aku-section band-green">
        <div className="aku-container">
          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--aku-ink)' }}>
              Quick actions
            </h2>
            <p style={{ color: 'var(--aku-muted)', marginTop: 4 }}>
              Everything you need, one tap away.
            </p>
          </Reveal>

          <Reveal group className="row g-4 mt-2">
            {quickActions.map((q) => (
              <div className="col-6 col-md-3" key={q.label}>
                <Link
                  to={q.to}
                  className="aku-card d-block h-100 text-center"
                  style={{ padding: 0, overflow: 'hidden' }}
                >
                  <div style={{ height: 96, overflow: 'hidden', position: 'relative' }}>
                    <img src={q.image} alt="" className="img-cover" loading="lazy" />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(10,61,145,0.1), rgba(10,61,145,0.5))',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: 'var(--aku-yellow)',
                        color: '#0B132B',
                        display: 'grid',
                        placeItems: 'center',
                        fontWeight: 700,
                        fontSize: 16,
                      }}
                    >
                      {q.icon}
                    </div>
                  </div>
                  <div style={{ padding: '16px 12px', fontWeight: 600, color: 'var(--aku-ink)', fontSize: 14 }}>
                    {q.label}
                  </div>
                </Link>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="aku-section band-blue">
        <div className="aku-container">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-7">
              <Reveal direction="left">
                <div className="aku-card">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 style={{ fontWeight: 700, margin: 0, color: 'var(--aku-ink)' }}>
                      Recent activity
                    </h5>
                    <Link
                      to="/transactions"
                      style={{ fontSize: 13, color: 'var(--aku-blue)', fontWeight: 600 }}
                    >
                      View all
                    </Link>
                  </div>

                  {recent.map((t, i) => (
                    <div
                      key={t.name}
                      className="d-flex justify-content-between align-items-center py-3"
                      style={{
                        borderBottom: i === recent.length - 1 ? 'none' : '1px solid var(--aku-line)',
                      }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: 12,
                            background: t.amount > 0 ? 'var(--aku-green-soft)' : 'var(--aku-blue-soft)',
                            color: t.amount > 0 ? 'var(--aku-green-deep)' : 'var(--aku-blue)',
                            display: 'grid',
                            placeItems: 'center',
                            fontWeight: 700,
                          }}
                        >
                          {t.amount > 0 ? '↓' : '↑'}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--aku-ink)', fontSize: 14 }}>
                            {t.name}
                          </div>
                          <div style={{ fontSize: 12, color: 'var(--aku-muted)' }}>{t.date}</div>
                        </div>
                      </div>
                      <div
                        style={{
                          fontWeight: 700,
                          color: t.amount > 0 ? 'var(--aku-green)' : 'var(--aku-ink)',
                        }}
                      >
                        {t.amount > 0 ? '+' : '−'}₵{Math.abs(t.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="col-12 col-lg-5">
              <Reveal direction="right">
                <div className="img-tile" style={{ aspectRatio: '4 / 5' }}>
                  <img
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
                    alt="People managing money"
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
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-5 order-lg-2">
              <Reveal direction="left">
                <div className="img-tile" style={{ aspectRatio: '1 / 1' }}>
                  <img
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80"
                    alt="Coins and savings"
                    className="img-cover"
                    loading="lazy"
                  />
                </div>
              </Reveal>
            </div>

            <div className="col-12 col-lg-7 order-lg-1">
              <Reveal direction="right">
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
                  This month
                </span>
                <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--aku-ink)', marginTop: 12 }}>
                  You've moved ₵1,240 this month
                </h2>
                <p style={{ color: 'var(--aku-muted)', marginTop: 12 }}>
                  Out of that, ₵540 went to bills and ₵700 to friends and family. Keep it up — you're on track.
                </p>

                <div
                  style={{
                    marginTop: 24,
                    background: 'var(--aku-white)',
                    borderRadius: 'var(--radius-md)',
                    padding: 20,
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span style={{ fontSize: 14, color: 'var(--aku-muted)' }}>Spent vs last month</span>
                    <span style={{ fontWeight: 700, color: 'var(--aku-green)' }}>−12%</span>
                  </div>
                  <div
                    style={{
                      height: 10,
                      borderRadius: 999,
                      background: 'var(--aku-line)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: '68%',
                        height: '100%',
                        background: 'var(--aku-blue)',
                        borderRadius: 999,
                      }}
                    />
                  </div>
                  <div className="d-flex justify-content-between mt-2" style={{ fontSize: 12, color: 'var(--aku-muted)' }}>
                    <span>Lower</span>
                    <span>Higher</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
