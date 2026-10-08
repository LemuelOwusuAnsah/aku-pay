import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Target, PiggyBank, ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import { useWallet } from '../context/WalletContext.jsx';

const seedGoals = [
  { id: 'g1', name: 'New phone', target: 1500, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80' },
  { id: 'g2', name: 'Emergency fund', target: 5000, image: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=600&q=80' },
  { id: 'g3', name: 'Trip to Cape Coast', target: 800, image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80' },
];

export default function Savings() {
  const { balance, formatMoney, payBill } = useWallet();

  const [goals, setGoals] = useState(
    seedGoals.map((g) => ({ ...g, saved: 0 }))
  );
  const [modalGoal, setModalGoal] = useState(null);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [newOpen, setNewOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: '', target: '' });

  const totalSaved = goals.reduce((s, g) => s + g.saved, 0);

  const handleSave = (e) => {
    e.preventDefault();
    const value = Number(amount);
    if (!value || value <= 0) {
      setError('Enter an amount.');
      return;
    }
    if (value > balance) {
      setError('Insufficient balance.');
      return;
    }

    const result = payBill({
      biller: `Savings · ${modalGoal.name}`,
      account: modalGoal.id,
      amount: value,
      category: 'Savings',
    });
    if (!result.ok) {
      setError(result.error);
      return;
    }

    setGoals((prev) =>
      prev.map((g) => (g.id === modalGoal.id ? { ...g, saved: g.saved + value } : g))
    );
    setModalGoal(null);
    setAmount('');
    setError('');
  };

  const handleNewGoal = (e) => {
    e.preventDefault();
    if (!newGoal.name || !Number(newGoal.target)) return;
    setGoals((prev) => [
      ...prev,
      {
        id: `g-${Date.now()}`,
        name: newGoal.name,
        target: Number(newGoal.target),
        saved: 0,
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
      },
    ]);
    setNewGoal({ name: '', target: '' });
    setNewOpen(false);
  };

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
                  Savings goals
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
                  Save with a purpose
                </h1>
                <p style={{ color: 'var(--aku-muted)', marginTop: 16, fontSize: 16, maxWidth: 480 }}>
                  Set a target, add money when you can, and watch it grow. Every goal gets its own tally — separate from your spendable balance.
                </p>

                <div className="d-flex flex-wrap gap-3 mt-4">
                  <div className="aku-card" style={{ padding: '14px 18px', minWidth: 130 }}>
                    <div style={{ fontSize: 12, color: 'var(--aku-muted)' }}>Wallet</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--aku-blue)', marginTop: 2 }}>
                      {formatMoney(balance)}
                    </div>
                  </div>
                  <div className="aku-card" style={{ padding: '14px 18px', minWidth: 130 }}>
                    <div style={{ fontSize: 12, color: 'var(--aku-muted)' }}>Saved total</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--aku-green)', marginTop: 2 }}>
                      {formatMoney(totalSaved)}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="col-12 col-lg-6">
              <Reveal direction="right">
                <div className="img-tile" style={{ aspectRatio: '4 / 3' }}>
                  <img
                    src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80"
                    alt="Savings"
                    className="img-cover"
                    loading="lazy"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="aku-section band-green">
        <div className="aku-container">
          <Reveal>
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--aku-ink)' }}>Your goals</h2>
                <p style={{ color: 'var(--aku-muted)', marginTop: 4 }}>
                  Tap "Add money" to move funds from your wallet into a goal.
                </p>
              </div>
              <button
                onClick={() => setNewOpen(true)}
                className="aku-btn aku-btn-primary"
                style={{ padding: '10px 20px' }}
              >
                <Plus size={16} /> New goal
              </button>
            </div>
          </Reveal>

          <Reveal group className="row g-4">
            {goals.map((g) => {
              const pct = Math.min(100, Math.round((g.saved / g.target) * 100));
              return (
                <div className="col-12 col-md-6 col-lg-4" key={g.id}>
                  <div className="aku-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ height: 120, overflow: 'hidden' }}>
                      <img src={g.image} alt={g.name} className="img-cover" loading="lazy" />
                    </div>
                    <div style={{ padding: 20 }}>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <Target size={16} style={{ color: 'var(--aku-blue)' }} />
                        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--aku-ink)' }}>
                          {g.name}
                        </span>
                      </div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--aku-green)' }}>
                        {formatMoney(g.saved)}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--aku-muted)', marginTop: 2 }}>
                        of {formatMoney(g.target)} target
                      </div>

                      <div
                        style={{
                          height: 8,
                          borderRadius: 999,
                          background: 'var(--aku-line)',
                          marginTop: 14,
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${pct}%`,
                            height: '100%',
                            background: 'var(--aku-green)',
                            transition: 'width var(--t-med) var(--ease-out)',
                          }}
                        />
                      </div>
                      <div
                        className="d-flex justify-content-between"
                        style={{ fontSize: 11, color: 'var(--aku-muted)', marginTop: 6 }}
                      >
                        <span>{pct}%</span>
                        <span>{formatMoney(Math.max(0, g.target - g.saved))} to go</span>
                      </div>

                      <button
                        onClick={() => {
                          setModalGoal(g);
                          setAmount('');
                          setError('');
                        }}
                        className="aku-btn aku-btn-primary w-100 mt-4"
                        style={{ padding: 10 }}
                      >
                        Add money
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {modalGoal && (
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
          onClick={() => setModalGoal(null)}
        >
          <div
            className="aku-card aku-fade-up"
            style={{ maxWidth: 420, width: '100%', padding: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex align-items-center gap-2 mb-2">
              <PiggyBank size={20} style={{ color: 'var(--aku-blue)' }} />
              <h3 style={{ fontWeight: 800, color: 'var(--aku-ink)', fontSize: 20, margin: 0 }}>
                {modalGoal.name}
              </h3>
            </div>
            <p style={{ color: 'var(--aku-muted)', fontSize: 14 }}>
              Wallet balance: {formatMoney(balance)}
            </p>

            <form onSubmit={handleSave} className="mt-4">
              <label className="form-label" style={{ fontWeight: 600, color: 'var(--aku-ink)' }}>
                Amount to add
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="0.00"
                min="1"
                step="0.01"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError('');
                }}
                style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                autoFocus
              />

              {error && (
                <p style={{ color: 'var(--aku-danger)', fontSize: 13, marginTop: 8 }}>{error}</p>
              )}

              <div className="d-flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setModalGoal(null)}
                  className="aku-btn aku-btn-ghost flex-fill"
                >
                  Cancel
                </button>
                <button type="submit" className="aku-btn aku-btn-primary flex-fill">
                  Add {amount ? formatMoney(Number(amount)) : 'money'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {newOpen && (
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
          onClick={() => setNewOpen(false)}
        >
          <div
            className="aku-card aku-fade-up"
            style={{ maxWidth: 420, width: '100%', padding: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontWeight: 800, color: 'var(--aku-ink)', fontSize: 20 }}>
              New savings goal
            </h3>

            <form onSubmit={handleNewGoal} className="mt-4">
              <div className="mb-3">
                <label className="form-label" style={{ fontWeight: 600, color: 'var(--aku-ink)' }}>
                  Goal name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. New laptop"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <label className="form-label" style={{ fontWeight: 600, color: 'var(--aku-ink)' }}>
                  Target amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="0.00"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                  min="1"
                  step="1"
                  style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)' }}
                />
              </div>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  onClick={() => setNewOpen(false)}
                  className="aku-btn aku-btn-ghost flex-fill"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="aku-btn aku-btn-primary flex-fill"
                  disabled={!newGoal.name || !Number(newGoal.target)}
                  style={{
                    opacity: !newGoal.name || !Number(newGoal.target) ? 0.5 : 1,
                  }}
                >
                  Create goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
