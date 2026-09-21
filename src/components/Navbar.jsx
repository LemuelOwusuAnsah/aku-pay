import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import CurrencyPicker from './CurrencyPicker.jsx';
import { useWallet } from '../context/WalletContext.jsx';

const links = [
  { to: '/', label: 'Home' },
  { to: '/wallet', label: 'Wallet' },
  { to: '/send', label: 'Send' },
  { to: '/bills', label: 'Bills' },
  { to: '/transactions', label: 'History' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const { user, signOut } = useWallet();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('aku-theme') || 'light';
  });

  const userMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    try {
      localStorage.setItem('aku-theme', theme);
    } catch (e) {}
  }, [theme]);

  useEffect(() => {
    if (!userMenuOpen) return;
    const onClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    const onEsc = (e) => {
      if (e.key === 'Escape') setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [userMenuOpen]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleSignOut = () => {
    signOut();
    setUserMenuOpen(false);
    setMenuOpen(false);
    navigate('/');
  };

  const headerStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    background: 'var(--aku-white)',
    borderBottom: '1px solid var(--aku-line)',
    transition:
      'box-shadow var(--t-med) var(--ease-out), background var(--t-med) var(--ease-out)',
    boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
  };

  const linkStyle = ({ isActive }) => ({
    fontWeight: 500,
    fontSize: 15,
    padding: '6px 4px',
    color: isActive ? 'var(--aku-blue)' : 'var(--aku-muted)',
    borderBottom: isActive ? '2px solid var(--aku-yellow)' : '2px solid transparent',
  });

  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <header style={headerStyle}>
      <div className="aku-container d-flex align-items-center justify-content-between py-3">
        <Link
          to="/"
          className="d-flex align-items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src={`${import.meta.env.BASE_URL}logo.svg`}
            alt="Aku Pay"
            width={38}
            height={38}
          />
          <span style={{ fontWeight: 800, fontSize: 20, color: 'var(--aku-blue)' }}>
            Aku<span style={{ color: 'var(--aku-green)' }}>Pay</span>
          </span>
        </Link>

        <nav className="d-none d-md-flex align-items-center gap-4">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} style={linkStyle} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="d-flex align-items-center gap-2">
          <CurrencyPicker />

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: 'var(--aku-bg)',
              border: '1px solid var(--aku-line)',
              display: 'grid',
              placeItems: 'center',
              fontSize: 16,
              color: 'var(--aku-ink)',
            }}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>

          {user ? (
            <div ref={userMenuRef} className="d-none d-sm-block" style={{ position: 'relative' }}>
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                aria-label="Account menu"
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  height: 38,
                  padding: '0 12px 0 6px',
                  borderRadius: 12,
                  background: 'var(--aku-bg)',
                  border: '1px solid var(--aku-line)',
                  color: 'var(--aku-ink)',
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: 'var(--aku-blue)',
                    color: 'white',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  {firstName.charAt(0).toUpperCase()}
                </span>
                <span>Hi, {firstName}</span>
                <span
                  style={{
                    fontSize: 10,
                    color: 'var(--aku-muted)',
                    transform: userMenuOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform var(--t-fast) var(--ease-out)',
                  }}
                >
                  ▾
                </span>
              </button>

              {userMenuOpen && (
                <div
                  role="menu"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    minWidth: 200,
                    background: 'var(--aku-white)',
                    border: '1px solid var(--aku-line)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    padding: 6,
                    zIndex: 1100,
                  }}
                >
                  <div
                    style={{
                      padding: '10px 12px',
                      borderBottom: '1px solid var(--aku-line)',
                      marginBottom: 6,
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--aku-ink)' }}>
                      {user.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--aku-muted)' }}>
                      {user.email}
                    </div>
                  </div>

                  <Link
                    to="/wallet"
                    onClick={() => setUserMenuOpen(false)}
                    role="menuitem"
                    style={{
                      display: 'block',
                      padding: '10px 12px',
                      borderRadius: 10,
                      fontSize: 14,
                      color: 'var(--aku-ink)',
                    }}
                  >
                    My wallet
                  </Link>

                  <Link
                    to="/transactions"
                    onClick={() => setUserMenuOpen(false)}
                    role="menuitem"
                    style={{
                      display: 'block',
                      padding: '10px 12px',
                      borderRadius: 10,
                      fontSize: 14,
                      color: 'var(--aku-ink)',
                    }}
                  >
                    History
                  </Link>

                  <button
                    onClick={handleSignOut}
                    role="menuitem"
                    className="w-100 text-start"
                    style={{
                      padding: '10px 12px',
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--aku-danger)',
                      background: 'transparent',
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/auth"
                className="aku-btn aku-btn-ghost d-none d-sm-inline-flex"
                style={{ padding: '8px 16px' }}
              >
                Sign in
              </Link>
              <Link
                to="/auth"
                className="aku-btn aku-btn-primary d-none d-sm-inline-flex"
                style={{ padding: '8px 16px' }}
              >
                Get started
              </Link>
            </>
          )}

          <button
            className="d-md-none"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: 'var(--aku-bg)',
              border: '1px solid var(--aku-line)',
              color: 'var(--aku-ink)',
              fontSize: 18,
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="d-md-none aku-slide-right"
          style={{
            borderTop: '1px solid var(--aku-line)',
            background: 'var(--aku-white)',
            padding: '12px 0',
          }}
        >
          <div className="aku-container d-flex flex-column gap-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                style={linkStyle}
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            ))}

            {user ? (
              <div className="d-flex flex-column gap-2 pt-2">
                <div
                  style={{
                    background: 'var(--aku-bg)',
                    borderRadius: 'var(--radius-md)',
                    padding: 12,
                    fontSize: 13,
                  }}
                >
                  <div style={{ fontWeight: 700, color: 'var(--aku-ink)' }}>{user.name}</div>
                  <div style={{ color: 'var(--aku-muted)' }}>{user.email}</div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="aku-btn aku-btn-ghost w-100"
                  style={{ color: 'var(--aku-danger)' }}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="d-flex gap-2 pt-2">
                <Link
                  to="/auth"
                  onClick={() => setMenuOpen(false)}
                  className="aku-btn aku-btn-ghost flex-fill"
                >
                  Sign in
                </Link>
                <Link
                  to="/auth"
                  onClick={() => setMenuOpen(false)}
                  className="aku-btn aku-btn-primary flex-fill"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
