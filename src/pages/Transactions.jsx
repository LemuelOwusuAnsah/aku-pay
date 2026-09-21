import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { useWallet } from '../context/WalletContext.jsx';

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

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (e) {
    return iso;
  }
}

export default function Transactions() {
  const { transactions, formatMoney } = useWallet();
  const [filter, setFilter] = useState('all');

  const visible = useMemo(() => {
    if (filter === 'all') return transactions;
    return transactions.filter((t) => t.type === filter);
  }, [transactions, filter]);

  const { totalIn, totalOut } = useMemo(() => {
    let inSum = 0;
    let outSum = 0;
    for (const t of transactions) {
      if (t.amount > 0) inSum += t.amount;
      else outSum += Math.abs(t.amount);
    }
    return { totalIn: inSum, totalOut: outSum };
  }, [transactions]);

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
                  +{formatMoney(totalIn)}
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
                  −{formatMoney(totalOut)}
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
                  {transactions.length}
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
          {transactions.length === 0 ? (
            <Reveal>
              <div
                className="aku-card text-center"
                style={{ padding: 56, maxWidth: 520, margin: '0 auto' }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'var(--aku-bg)',
                    display: 'grid',
                    placeItems: 'center',
                    margin: '0 auto 20px',
                    fontSize: 30,
                  }}
                >
                  🧾
                </div>
                <h3 style={{ fontWeight: 800, color: 'var(--aku-ink)' }}>
                  No transactions yet
                </h3>
                <p style={{ color: 'var(--aku-muted)', marginTop: 8, fontSize: 14 }}>
                  Once you send, receive, or pay a bill, your history will appear here.
                </p>
                <div className="d-flex flex-wrap gap-2 justify-content-center mt-4">
                  <Link to="/wallet" className="aku-btn aku-btn-primary">
                    Go to wallet
                  </Link>
                  <Link to="/send" className="aku-btn aku-btn-ghost">
                    Send money
                  </Link>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="aku-card" style={{ padding: 0, overflow: 'hidden' }}>
              {visible.length === 0 ? (
                <div
                  style={{
                    padding: 48,
                    textAlign: 'center',
                    color: 'var(--aku-muted)',
                  }}
                >
                  No {filter} transactions yet.
                </div>
              ) : (
                visible.map((t, i) => {
                  const ic = icons[t.type] || icons.sent;
                  return (
                    <Reveal key={t.id} delay={i * 40}>
                      <div
                        className="d-flex justify-content-between align-items-center px-4 py-3"
                        style={{
                          borderBottom:
                            i === visible.length - 1 ? 'none' : '1px solid var(--aku-line)',
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
                              {t.title}
                            </div>
                            <div style={{ fontSize: 12, color: 'var(--aku-muted)' }}>
                              {t.subtitle ? `${t.subtitle} · ` : ''}
                              {formatDate(t.date)}
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 16,
                            color: t.amount > 0 ? 'var(--aku-green)' : 'var(--aku-ink)',
                          }}
                        >
                          {t.amount > 0 ? '+' : '−'}
                          {formatMoney(Math.abs(t.amount))}
                        </div>
                      </div>
                    </Reveal>
                  );
                })
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
