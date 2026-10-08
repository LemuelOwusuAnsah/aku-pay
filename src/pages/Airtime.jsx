import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Wifi, Phone, Zap } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import { useWallet } from '../context/WalletContext.jsx';

const networks = [
  { id: 'mtn', label: 'MTN', color: '#FFCC00', fg: '#0B132B' },
  { id: 'telecel', label: 'Telecel', color: '#E60000', fg: '#FFFFFF' },
  { id: 'airteltigo', label: 'AirtelTigo', color: '#0055A5', fg: '#FFFFFF' },
];

const bundles = [
  { id: 'voice-1', Icon: Phone, label: 'Voice 100min', amount: 5 },
  { id: 'voice-2', Icon: Phone, label: 'Voice 300min', amount: 12 },
  { id: 'data-1', Icon: Wifi, label: 'Data 1GB', amount: 8 },
  { id: 'data-2', Icon: Wifi, label: 'Data 5GB', amount: 30 },
  { id: 'combo-1', Icon: Zap, label: 'Combo 2GB + 200min', amount: 25 },
];

export default function Airtime() {
  const { balance, formatMoney, payBill, currencyInfo } = useWallet();

  const [network, setNetwork] = useState('mtn');
  const [phone, setPhone] = useState('');
  const [selected, setSelected] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [record, setRecord] = useState(null);

  const amount = selected ? selected.amount : Number(customAmount) || 0;
  const canSubmit =
    phone.length >= 9 && amount > 0 && amount <= balance;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone || !amount) {
      setError('Enter a phone number and pick a bundle.');
      return;
    }
    const net = networks.find((n) => n.id === network);
    const result = payBill({
      biller: `${net.label} Airtime`,
      account: phone,
      amount,
      category: 'Airtime',
    });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setRecord({
      network: net.label,
      phone,
      amount,
      bundle: selected ? selected.label : 'Custom amount',
    });
    setDone(true);
  };

  if (done && record) {
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
              <h2 style={{ fontWeight: 800, color: 'var(--aku-ink)' }}>Airtime sent</h2>
              <p style={{ color: 'var(--aku-muted)', marginTop: 8 }}>
                {formatMoney(record.amount)} to {record.phone}.
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
                  <span style={{ color: 'var(--aku-muted)' }}>Network</span>
                  <span style={{ fontWeight: 600 }}>{record.network}</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span style={{ color: 'var(--aku-muted)' }}>Phone</span>
                  <span style={{ fontWeight: 600 }}>{record.phone}</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span style={{ color: 'var(--aku-muted)' }}>Bundle</span>
                  <span style={{ fontWeight: 600 }}>{record.bundle}</span>
                </div>
                <div
                  className="d-flex justify-content-between py-1 mt-2"
                  style={{ borderTop: '1px solid var(--aku-line)', paddingTop: 8 }}
                >
                  <span style={{ color: 'var(--aku-muted)' }}>New balance</span>
                  <span style={{ fontWeight: 700 }}>{formatMoney(balance)}</span>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2 justify-content-center mt-4">
                <button
                  className="aku-btn aku-btn-ghost"
                  onClick={() => {
                    setDone(false);
                    setRecord(null);
                    setSelected(null);
                    setPhone('');
                    setCustomAmount('');
                  }}
                >
                  Buy another
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
                  Airtime & Data
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
                  Top up anyone, anywhere
                </h1>
                <p style={{ color: 'var(--aku-muted)', marginTop: 16, fontSize: 16, maxWidth: 480 }}>
                  Voice and data bundles for MTN, Telecel and AirtelTigo — delivered in seconds, straight from your Aku Pay balance.
                </p>

                <div
                  style={{
                    background: 'var(--aku-white)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '16px 20px',
                    maxWidth: 280,
                    marginTop: 24,
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
                    Balance
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
              </Reveal>
            </div>

            <div className="col-12 col-lg-6">
              <Reveal direction="right">
                <div className="img-tile" style={{ aspectRatio: '4 / 3' }}>
                  <img
                    src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1200&q=80"
                    alt="Airtime top-up"
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
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--aku-ink)', marginBottom: 20 }}>
                Choose network
              </h2>
            </Reveal>

            <Reveal group className="row g-3 mb-4">
              {networks.map((n) => (
                <div className="col-4" key={n.id}>
                  <button
                    type="button"
                    onClick={() => setNetwork(n.id)}
                    className="w-100"
                    style={{
                      padding: '14px 8px',
                      borderRadius: 'var(--radius-md)',
                      background: network === n.id ? n.color : 'var(--aku-white)',
                      color: network === n.id ? n.fg : 'var(--aku-ink)',
                      border:
                        network === n.id
                          ? `2px solid ${n.color}`
                          : '2px solid var(--aku-line)',
                      fontWeight: 700,
                      fontSize: 14,
                      transition: 'all var(--t-fast) var(--ease-out)',
                    }}
                  >
                    {n.label}
                  </button>
                </div>
              ))}
            </Reveal>

            <Reveal>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--aku-ink)', marginBottom: 20 }}>
                Pick a bundle
              </h2>
            </Reveal>

            <Reveal group className="row g-3 mb-4">
              {bundles.map((b) => {
                const active = selected?.id === b.id;
                const { Icon } = b;
                return (
                  <div className="col-6" key={b.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(b);
                        setCustomAmount('');
                        setError('');
                      }}
                      className="aku-card w-100 text-start"
                      style={{
                        padding: 16,
                        border: active
                          ? '2px solid var(--aku-blue)'
                          : '2px solid transparent',
                        transition: 'all var(--t-fast) var(--ease-out)',
                      }}
                    >
                      <Icon size={18} style={{ color: 'var(--aku-blue)' }} />
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: 'var(--aku-ink)',
                          marginTop: 10,
                        }}
                      >
                        {b.label}
                      </div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 800,
                          color: 'var(--aku-blue)',
                          marginTop: 4,
                        }}
                      >
                        {formatMoney(b.amount)}
                      </div>
                    </button>
                  </div>
                );
              })}
            </Reveal>

            <Reveal delay={80}>
              <div className="aku-card">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label
                      className="form-label"
                      style={{ fontWeight: 600, color: 'var(--aku-ink)' }}
                    >
                      Phone number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="0245791297"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setError('');
                      }}
                      style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="form-label"
                      style={{ fontWeight: 600, color: 'var(--aku-ink)' }}
                    >
                      Or enter custom amount ({currencyInfo.symbol})
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="0.00"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelected(null);
                        setError('');
                      }}
                      min="1"
                      step="0.01"
                      style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                    />
                    <div
                      className="d-flex justify-content-between mt-2"
                      style={{ fontSize: 12, color: 'var(--aku-muted)' }}
                    >
                      <span>Balance: {formatMoney(balance)}</span>
                      {amount > balance && balance >= 0 && (
                        <span style={{ color: 'var(--aku-danger)', fontWeight: 600 }}>
                          Insufficient balance
                        </span>
                      )}
                    </div>
                  </div>

                  {error && (
                    <p style={{ color: 'var(--aku-danger)', fontSize: 13, marginBottom: 12 }}>
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="aku-btn aku-btn-primary w-100"
                    disabled={!canSubmit}
                    style={{ opacity: canSubmit ? 1 : 0.5, padding: 14 }}
                  >
                    Buy {formatMoney(amount || 0)}
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
