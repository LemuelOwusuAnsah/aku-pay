import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';

const allTransactions = [
  { id: 1, type: 'sent', name: 'Sent to Akosua', date: 'Today, 10:24', amount: -120 },
  { id: 2, type: 'bill', name: 'ECG Ghana', date: 'Yesterday, 18:02', amount: -85 },
  { id: 3, type: 'received', name: 'Kofi Boateng', date: 'Yesterday, 09:15', amount: 300 },
  { id: 4, type: 'bill', name: 'Ghana Water Co.', date: 'Mon, 14:30', amount: -45 },
  { id: 5, type: 'sent', name: 'Sent to Ama Owusu', date: 'Mon, 09:02', amount: -60 },
  { id: 6, type: 'received', name: 'Yaw Darko', date: 'Sun, 20:11', amount: 500 },
  { id: 7, type: 'bill', name: 'Fibre Broadband', date: 'Sun, 12:00', amount: -180 },
  { id: 8, type: 'sent', name: 'Sent to Kwame', date: 'Fri, 16:48', amount: -75 },
];

const filters = [
  { id: 'all', label: 'All', color: 'var(--aku-blue)' },
  { id: 'sent', label: 'Sent', color: 'var(--aku-blue)' },
  { id: 'received', label: 'Received', color: 'var(--aku-green)' },
  { id: 'bill', label: 'Bills', color: 'var(--aku-yellow)' },
];

const icons = {
  sent: { glyph: '↑', bg: 'var(--aku-blue-soft)', color: 'var(--aku-blue)' },
  received: { glyph: '↓', bg: 'var(--aku-green-soft)', color: 'var(--aku-green-deep)' },
  bill: { glyph: '✓', bg: 'var(--aku-yellow-soft)', color: 'var(--aku-yellow-deep)' },
};

export default function Transactions() {
  const [filter, setFilter] = useState('all');

  const visible =
    filter === 'all'
      ? allTransactions
      : allTransactions.filter((t) => t.type === filter);

  const totalIn = allTransactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOut = allTransactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div>
      <section className="aku-section band-green">
        <div className="aku-container">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-7">
              <Reveal direction="left">
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
                  History
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
                  Every cedi, accounted for
                </h1>
                <p
                  style={{
                    color: 'var(--aku-muted)',
                    marginTop: 16,
                    fontSize: 16,
                    maxWidth: 480,
                  }}
                >
                  Every transfer, payment, and top-up in one clear list. Filter it, scan it, and always know where you stand.
                </p>
              </Reveal>
            </div>

            <div className="col-12 col-lg-5">
              <Reveal direction="right">
                <div className="img-tile" style={{ aspectRatio: '4 / 3' }}>
                  <img
                    src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80"
                    alt="Person reviewing transactions"
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
          <Reveal group className="row g-3 mb-5">
            <div className="col-6 col-md-4">
              <div className="aku-card" style={{ borderLeft: '4px solid var(--aku-green)' }}>
                <div style={{ fontSize: 13, color: 'var(--aku-muted)' }}>Money in</div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: 'var(--aku-green)',
                    marginTop: 4,
                  }}
                >
                  +₵{totalIn}
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="aku-card" style={{ borderLeft: '4px solid var(--aku-blue)' }}>
                <div style={{ fontSize: 13, color: 'var(--aku-muted)' }}>Money out</div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: 'var(--aku-ink)',
                    marginTop: 4,
                  }}
                >
                  −₵{totalOut}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="aku-card" style={{ borderLeft: '4px solid var(--aku-yellow)' }}>
                <div style={{ fontSize: 13, color: 'var(--aku-muted)' }}>Transactions</div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: 'var(--aku-blue)',
                    marginTop: 4,
                  }}
                >
                  {allTransactions.length}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="d-flex flex-wrap gap-2">
              {filters.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className="aku-btn"
                    style={{
                      padding: '8px 20px',
                      background: active ? f.color : 'var(--aku-white)',
                      color: active
                        ? f.id === 'bill'
                          ? '#0B132B'
                          : 'white'
                        : 'var(--aku-ink)',
                      border: '1px solid var(--aku-line)',
                      fontSize: 14,
                      transition: 'all var(--t-fast) var(--ease-out)',
                    }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="aku-section band-cream">
        <div className="aku-container">
          <div className="aku-card" style={{ padding: 0, overflow: 'hidden' }}>
            {visible.length === 0 ? (
              <div style={{ padding: 60, textAlign: 'center', color: 'var(--aku-muted)' }}>
                No transactions in this view.
              </div>
            ) : (
              visible.map((t, i) => {
                const ic = icons[t.type];
                return (
                  <Reveal key={t.id} delay={i * 40}>
                    <div
                      className="d-flex justify-content-between align-items-center px-4 py-3"
                      style={{
                        borderBottom:
                          i === visible.length - 1 ? 'none' : '1px solid var(--aku-line)',
                        transition: 'background var(--t-fast) var(--ease-out)',
                      }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 12,
                            background: ic.bg,
                            color: ic.color,
                            display: 'grid',
                            placeItems: 'center',
                            fontWeight: 700,
                            fontSize: 17,
                          }}
                        >
                          {ic.glyph}
                        </div>
                        <div>
                          <div
                            style={{
                              fontWeight: 600,
                              color: 'var(--aku-ink)',
                              fontSize: 15,
                            }}
                          >
                            {t.name}
                          </div>
                          <div style={{ fontSize: 12, color: 'var(--aku-muted)' }}>{t.date}</div>
                        </div>
                      </div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 16,
                          color: t.amount > 0 ? 'var(--aku-green)' : 'var(--aku-ink)',
                        }}
                      >
                        {t.amount > 0 ? '+' : '−'}₵{Math.abs(t.amount)}
                      </div>
                    </div>
                  </Reveal>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
