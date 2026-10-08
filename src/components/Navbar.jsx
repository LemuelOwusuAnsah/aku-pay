import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Moon, Sun, Menu, X, ChevronDown,
  Send, Receipt, Smartphone, PiggyBank, Clock,
  Wallet as WalletIcon, CreditCard, User as UserIcon, UserPlus, LogOut,
} from 'lucide-react';
import CurrencyPicker from './CurrencyPicker.jsx';
import { useWallet } from '../context/WalletContext.jsx';

const moneyMenu = [
  { to: '/send', label: 'Send money', Icon: Send, desc: 'Transfer to any Aku Pay user' },
  { to: '/bills', label: 'Pay bills', Icon: Receipt, desc: 'Electricity, water, internet, TV' },
  { to: '/airtime', label: 'Airtime & data', Icon: Smartphone, desc: 'Top up any network' },
  { to: '/savings', label: 'Savings goals', Icon: PiggyBank, desc: 'Save with a purpose' },
  { to: '/transactions', label: 'History', Icon: Clock, desc: 'Every transaction' },
];

export default function Navbar() {
  const { user, signOut } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moneyOpen, setMoneyOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('aku-theme') || 'light';
  });

  const userMenuRef = useRef(null);
  const moneyRef = useRef(null);

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
    setMoneyOpen(false);
    setUserMenuOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!userMenuOpen && !moneyOpen) return;
    const onClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
      if (moneyRef.current && !moneyRef.current.contains(e.target)) {
        setMoneyOpen(false);
      }
    };
    const onEsc = (e) => {
      if (e.key === 'Escape') {
        setUserMenuOpen(false);
        setMoneyOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [userMenuOpen, moneyOpen]);

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

  const moneyActive = moneyMenu.some((m) => location.pathname === m.to);
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
          <NavLink to="/" style={linkStyle} end>
            Home
          </NavLink>

          <div ref={moneyRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setMoneyOpen((v) => !v)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'transparent',
                border: 'none',
                padding: '6px 4px',
                fontSize: 15,
                fontWeight: 500,
                color: moneyActive ? 'var(--aku-blue)' : 'var(--aku-muted)',
                borderBottom: moneyActive
                  ? '2px solid var(--aku-yellow)'
                  : '2px solid transparent',
              }}
            >
              Pay & Save
              <ChevronDown
                size={13}
                style={{
                  transform: moneyOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform var(--t-fast) var(--ease-out)',
                }}
              />
            </button>

            {moneyOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 14px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  minWidth: 300,
                  background: 'var(--aku-white)',
                  border: '1px solid var(--aku-line)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: 6,
                  zIndex: 1100,
                }}
              >
                {moneyMenu.map(({ to, label, Icon, desc }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMoneyOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 12px',
                      borderRadius: 10,
                      color: 'var(--aku-ink)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--aku-bg)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        background: 'var(--aku-blue-soft)',
                        color: 'var(--aku-blue)',
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={15} />
                    </span>
                    <span className="d-flex flex-column">
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span>
                      <span style={{ fontSize: 12, color: 'var(--aku-muted)' }}>{desc}</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/about" style={linkStyle}>
            About
          </NavLink>
        </nav>

        <div className="d-flex align-items-center gap-2">
          <CurrencyPicker />

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: 'var(--aku-bg)',
              border: '1px solid var(--aku-line)',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--aku-ink)',
            }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {user ? (
            <div ref={userMenuRef} className="d-none d-sm-block" style={{ position: 'relative' }}>
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  height: 38,
                  padding: '0 10px 0 6px',
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
                <ChevronDown
                  size={14}
                  style={{
                    color: 'var(--aku-muted)',
                    transform: userMenuOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform var(--t-fast) var(--ease-out)',
                  }}
                />
              </button>

              {userMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    minWidth: 230,
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
                    <div style={{ fontSize: 12, color: 'var(--aku-muted)' }}>{user.email}</div>
                  </div>

                  {[
                    { to: '/wallet', label: 'My wallet', Icon: WalletIcon },
                    { to: '/card', label: 'Virtual card', Icon: CreditCard },
                    { to: '/profile', label: 'Profile', Icon: UserIcon },
                  ].map(({ to, label, Icon }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setUserMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 12px',
                        borderRadius: 10,
                        fontSize: 14,
                        color: 'var(--aku-ink)',
                      }}
                    >
                      <Icon size={15} style={{ color: 'var(--aku-muted)' }} />
                      {label}
                    </Link>
                  ))}

                  <Link
                    to="/auth?mode=signup&add=1"
                    onClick={() => setUserMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 12px',
                      borderRadius: 10,
                      fontSize: 14,
                      color: 'var(--aku-ink)',
                    }}
                  >
                    <UserPlus size={15} style={{ color: 'var(--aku-muted)' }} />
                    Add another account
                  </Link>

                  <div style={{ height: 1, background: 'var(--aku-line)', margin: '6px 0' }} />

                  <button
                    onClick={handleSignOut}
                    className="w-100 text-start"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 12px',
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--aku-danger)',
                      background: 'transparent',
                    }}
                  >
                    <LogOut size={15} />
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
              display: 'grid',
              placeItems: 'center',
            }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
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
            <NavLink to="/" onClick={() => setMenuOpen(false)} style={linkStyle} end>
              Home
            </NavLink>

            <div style={{ fontSize: 11, color: 'var(--aku-muted)', textTransform: 'uppercase', letterSpacing: 1, marginTop: 8 }}>
              Pay & Save
            </div>
            {moneyMenu.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                style={linkStyle}
              >
                <span className="d-flex align-items-center gap-2">
                  <Icon size={15} style={{ color: 'var(--aku-muted)' }} />
                  {label}
                </span>
              </NavLink>
            ))}

            <NavLink to="/about" onClick={() => setMenuOpen(false)} style={linkStyle}>
              About
            </NavLink>

            {user ? (
              <>
                <div style={{ fontSize: 11, color: 'var(--aku-muted)', textTransform: 'uppercase', letterSpacing: 1, marginTop: 8 }}>
                  Account
                </div>
                {[
                  { to: '/wallet', label: 'My wallet', Icon: WalletIcon },
                  { to: '/card', label: 'Virtual card', Icon: CreditCard },
                  { to: '/profile', label: 'Profile', Icon: UserIcon },
                ].map(({ to, label, Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    style={linkStyle}
                  >
                    <span className="d-flex align-items-center gap-2">
                      <Icon size={15} style={{ color: 'var(--aku-muted)' }} />
                      {label}
                    </span>
                  </NavLink>
                ))}
                <button
                  onClick={handleSignOut}
                  className="aku-btn aku-btn-ghost w-100"
                  style={{ color: 'var(--aku-danger)' }}
                >
                  Sign out
                </button>
              </>
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
