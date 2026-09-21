import { useEffect, useRef, useState } from 'react';
import { useWallet } from '../context/WalletContext.jsx';

export default function CurrencyPicker() {
  const { currency, currencyInfo, currencies, setCurrency } = useWallet();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  const list = Object.values(currencies);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change currency"
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          height: 38,
          padding: '0 12px',
          borderRadius: 12,
          background: 'var(--aku-bg)',
          border: '1px solid var(--aku-line)',
          color: 'var(--aku-ink)',
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        <span style={{ fontSize: 15 }}>{currencyInfo.symbol}</span>
        <span>{currency}</span>
        <span
          style={{
            fontSize: 10,
            color: 'var(--aku-muted)',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform var(--t-fast) var(--ease-out)',
          }}
        >
          ▾
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            minWidth: 220,
            background: 'var(--aku-white)',
            border: '1px solid var(--aku-line)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            padding: 6,
            zIndex: 1100,
          }}
        >
          {list.map((c) => {
            const active = c.code === currency;
            return (
              <button
                key={c.code}
                role="option"
                aria-selected={active}
                onClick={() => {
                  setCurrency(c.code);
                  setOpen(false);
                }}
                className="w-100 d-flex align-items-center justify-content-between"
                style={{
                  padding: '10px 12px',
                  borderRadius: 10,
                  background: active ? 'var(--aku-blue-soft)' : 'transparent',
                  color: 'var(--aku-ink)',
                  fontSize: 14,
                  textAlign: 'left',
                  transition: 'background var(--t-fast) var(--ease-out)',
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.background = 'var(--aku-bg)';
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span className="d-flex align-items-center gap-2">
                  <span
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 8,
                      background: 'var(--aku-bg)',
                      color: 'var(--aku-ink)',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {c.symbol}
                  </span>
                  <span className="d-flex flex-column">
                    <span style={{ fontWeight: 600 }}>{c.code}</span>
                    <span style={{ fontSize: 12, color: 'var(--aku-muted)' }}>{c.name}</span>
                  </span>
                </span>
                {active && (
                  <span style={{ color: 'var(--aku-blue)', fontWeight: 700 }}>✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
