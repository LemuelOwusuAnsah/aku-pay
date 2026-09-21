import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/wallet', label: 'Wallet' },
  { to: '/send', label: 'Send' },
  { to: '/bills', label: 'Bills' },
  { to: '/transactions', label: 'History' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('aku-theme') || 'light';
  });

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

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const headerStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    background: 'var(--aku-white)',
    borderBottom: '1px solid var(--aku-line)',
    transition: 'box-shadow var(--t-med) var(--ease-out), background var(--t-med) var(--ease-out)',
    boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
  };

  const linkStyle = ({ isActive }) => ({
    fontWeight: 500,
    fontSize: 15,
    padding: '6px 4px',
    color: isActive ? 'var(--aku-blue)' : 'var(--aku-muted)',
    borderBottom: isActive ? '2px solid var(--aku-yellow)' : '2px solid transparent',
  });

  return (
    <header style={headerStyle}>
      <div className="aku-container d-flex align-items-center justify-content-between py-3">
        <Link to="/" className="d-flex align-items-center gap-2" onClick={() => setMenuOpen(false)}>
          <img src="/logo.svg" alt="Aku Pay" width={38} height={38} />
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
          </div>
        </div>
      )}
    </header>
  );
}
