import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { useWallet } from '../context/WalletContext.jsx';

const quickActions = [
  {
    key: 'send',
    to: '/send',
    label: 'Send money',
    icon: '→',
    image:
      'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?auto=format&fit=crop&w=600&q=80',
  },
  {
    key: 'bills',
    to: '/bills',
    label: 'Pay bill',
    icon: '✓',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
  },
  {
    key: 'receive',
    label: 'Receive money',
    icon: '+',
    image:
      'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=600&q=80',
  },
  {
    key: 'history',
    to: '/transactions',
    label: 'History',
    icon: '↗',
    image:
      'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80',
  },
];

export default function Wallet() {
  const {
    balance,
    transactions,
    formatMoney,
    receiveMoney,
    user,
    currencyInfo,
  } = useWallet();

  const [receiveOpen, setReceiveOpen] = useState(false);
  const [receiveAmount, setReceiveAmount] = useState('');
  const [receiveError, setReceiveError] = useState('');

  const recent = transactions.slice(0, 4);

  const handleReceive = (e) => {
    e.preventDefault();
    const result = receiveMoney({
      amount: receiveAmount,
      from: 'Someone',
    });
    if (!result.ok) {
      setReceiveError(result.error);
      return;
    }
    setReceiveAmount('');
    setReceiveError('');
    setReceiveOpen(false);
  };

  const isZero = balance === 0;

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
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
                {user ? `Hi, ${user.name?.split(' ')[0] || 'there'} 👋` : 'Welcome 👋'}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>
                Available balance
              </div>
              <div style={{ fontSize: 44, fontWeight: 800, marginTop: 4 }}>
                {formatMoney(balance)}
              </div>
              <div className="d-flex flex-wrap gap-2 mt-3">
                <span
                  style={{
                    background: isZero ? 'rgba(255,255,255,0.2)' : 'var(--aku-green)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  ● {isZero ? 'Empty wallet' : 'Active'}
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
                  Currency: {currencyInfo.code} {currencyInfo.symbol}
                </span>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setReceiveOpen(true);
                  setReceiveError('');
                }}
                className="aku-btn aku-btn-yellow"
                style={{ padding: '12px 24px' }}
              >
                Receive money
              </button>
              <Link
                to="/send"
                className="aku-btn"
                style={{
                  padding: '12px 24px',
                  background: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.35)',
                }}
              >
                Send money
              </Link>
            </div>
          </div>
        </div>
      </section>

      {receiveOpen && (
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
          onClick={() => setReceiveOpen(false)}
        >
          <div
            className="aku-card aku-fade-up"
            style={{ maxWidth: 420, width: '100%', padding: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontWeight: 800, color: 'var(--aku-ink)', fontSize: 22 }}>
              Receive money
            </h3>
            <p style={{ color: 'var(--aku-muted)', fontSize: 14, marginTop: 6 }}>
              Enter the amount someone is sending you. For this demo, it's added instantly.
            </p>

            <form onSubmit={handleReceive} className="mt-4">
              <label
                className="form-label"
                style={{ fontWeight: 600, color: 'var(--aku-ink)' }}
              >
                Amount ({currencyInfo.symbol})
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="0.00"
                min="1"
                step="0.01"
                value={receiveAmount}
                onChange={(e) => {
                  setReceiveAmount(e.target.value);
                  setReceiveError('');
                }}
                style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                autoFocus
              />

              {receiveError && (
                <p style={{ color: 'var(--aku-danger)', fontSize: 13, marginTop: 8 }}>
                  {receiveError}
                </p>
              )}

              <div className="d-flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setReceiveOpen(false)}
                  className="aku-btn aku-btn-ghost flex-fill"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="aku-btn aku-btn-primary flex-fill"
                  disabled={!receiveAmount || Number(receiveAmount) <= 0}
                  style={{
                    opacity: !receiveAmount || Number(receiveAmount) <= 0 ? 0.5 : 1,
                  }}
                >
                  Add {receiveAmount ? formatMoney(Number(receiveAmount)) : 'money'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
            {quickActions.map((q) => {
              const content = (
                <>
                  <div style={{ height: 96, overflow: 'hidden', position: 'relative' }}>
                    <img src={q.image} alt="" className="img-cover" loading="lazy" />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(180deg, rgba(10,61,145,0.1), rgba(10,61,145,0.5))',
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
                  <div
                    style={{
                      padding: '16px 12px',
                      fontWeight: 600,
                      color: 'var(--aku-ink)',
                      fontSize: 14,
                    }}
                  >
                    {q.label}
                  </div>
                </>
              );

              return (
                <div className="col-6 col-md-3" key={q.key}>
                  {q.key === 'receive' ? (
                    <button
                      onClick={() => {
                        setReceiveOpen(true);
                        setReceiveError('');
                      }}
                      className="aku-card d-block h-100 w-100 text-center"
                      style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
                    >
                      {content}
                    </button>
                  ) : (
                    <Link
                      to={q.to}
                      className="aku-card d-block h-100 text-center"
                      style={{ padding: 0, overflow: 'hidden' }}
                    >
                      {content}
                    </Link>
                  )}
                </div>
              );
            })}
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

                  {recent.length === 0 ? (
                    <div
                      style={{
                        padding: '40px 20px',
                        textAlign: 'center',
                        color: 'var(--aku-muted)',
                      }}
                    >
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: '50%',
                          background: 'var(--aku-bg)',
                          display: 'grid',
                          placeItems: 'center',
                          margin: '0 auto 16px',
                          fontSize: 24,
                        }}
                      >
                        🧾
                      </div>
                      <p style={{ fontWeight: 600, color: 'var(--aku-ink)', marginBottom: 6 }}>
                        No transactions yet
                      </p>
                      <p style={{ fontSize: 14 }}>
                        Your activity will appear here after your first send or receive.
                      </p>
                    </div>
                  ) : (
                    recent.map((t, i) => (
                      <div
                        key={t.id}
                        className="d-flex justify-content-between align-items-center py-3"
                        style={{
                          borderBottom:
                            i === recent.length - 1 ? 'none' : '1px solid var(--aku-line)',
                        }}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <div
                            style={{
                              width: 42,
                              height: 42,
                              borderRadius: 12,
                              background:
                                t.amount > 0 ? 'var(--aku-green-soft)' : 'var(--aku-blue-soft)',
                              color:
                                t.amount > 0 ? 'var(--aku-green-deep)' : 'var(--aku-blue)',
                              display: 'grid',
                              placeItems: 'center',
                              fontWeight: 700,
                            }}
                          >
                            {t.amount > 0 ? '↓' : '↑'}
                          </div>
                          <div>
                            <div
                              style={{
                                fontWeight: 600,
                                color: 'var(--aku-ink)',
                                fontSize: 14,
                              }}
                            >
                              {t.title}
                            </div>
                            <div style={{ fontSize: 12, color: 'var(--aku-muted)' }}>
                              {new Date(t.date).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            fontWeight: 700,
                            color: t.amount > 0 ? 'var(--aku-green)' : 'var(--aku-ink)',
                          }}
                        >
                          {t.amount > 0 ? '+' : '−'}
                          {formatMoney(Math.abs(t.amount))}
                        </div>
                      </div>
                    ))
                  )}
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
                  Your wallet
                </span>
                <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--aku-ink)', marginTop: 12 }}>
                  {isZero
                    ? 'Your wallet is ready'
                    : `You're holding ${formatMoney(balance)}`}
                </h2>
                <p style={{ color: 'var(--aku-muted)', marginTop: 12 }}>
                  {isZero
                    ? 'No balance yet. Receive money from a friend, or send your first payment to see activity appear here.'
                    : `Everything you receive and spend updates here in real time. Currency: ${currencyInfo.name}.`}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
