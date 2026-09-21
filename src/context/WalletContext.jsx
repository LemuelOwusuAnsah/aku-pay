import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

const WalletContext = createContext(null);

const SESSION_TIMEOUT_MS = 15 * 60 * 1000;
const INACTIVITY_CHECK_MS = 30 * 1000;
const STORAGE_KEY = 'aku-wallet-v1';
const SESSION_COOKIE = 'aku_session';

const CURRENCIES = {
  GHS: { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi', locale: 'en-GH' },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', locale: 'de-DE' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', locale: 'en-GB' },
  NGN: { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', locale: 'en-NG' },
};

const DEFAULT_CURRENCY = 'USD';

const COUNTRY_TO_CURRENCY = {
  GH: 'GHS',
  US: 'USD',
  GB: 'GBP',
  NG: 'NGN',
  DE: 'EUR',
  FR: 'EUR',
  ES: 'EUR',
  IT: 'EUR',
  NL: 'EUR',
  PT: 'EUR',
  IE: 'EUR',
  AT: 'EUR',
  BE: 'EUR',
  FI: 'EUR',
  GR: 'EUR',
};

function localeToCurrency(locale) {
  if (!locale) return null;
  const parts = locale.split('-');
  const region = (parts[1] || '').toUpperCase();
  return COUNTRY_TO_CURRENCY[region] || null;
}

function detectCurrencySync() {
  if (typeof window === 'undefined') return null;
  const langs = [...(navigator.languages || []), navigator.language].filter(Boolean);
  for (const lang of langs) {
    const guess = localeToCurrency(lang);
    if (guess) return guess;
  }
  return null;
}

async function detectCurrencyFromIP() {
  try {
    const res = await fetch('https://ipapi.co/json/', { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    const code = (data.country_code || '').toUpperCase();
    return COUNTRY_TO_CURRENCY[code] || null;
  } catch (e) {
    return null;
  }
}

function randomToken() {
  const bytes = new Uint8Array(32);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

function randomSalt() {
  const bytes = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
  }
  let hash = 0;
  for (let i = 0; i < data.length; i++) hash = (hash * 31 + data[i]) >>> 0;
  return `fallback-${hash.toString(16)}`;
}

function readCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.split('; ').find((c) => c.startsWith(`${name}=`));
  return match ? match.split('=')[1] : null;
}

function writeCookie(name, value, maxAgeSeconds) {
  if (typeof document === 'undefined') return;
  const secure =
    typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${value}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secure}`;
}

function clearCookie(name) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
}

function loadStored() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function WalletProvider({ children }) {
  const stored = useMemo(loadStored, []);

  const [currency, setCurrencyState] = useState(
    stored?.currency && CURRENCIES[stored.currency] ? stored.currency : null
  );
  const [accounts, setAccounts] = useState(
    Array.isArray(stored?.accounts) ? stored.accounts : []
  );
  const [session, setSession] = useState(() => {
    if (!stored?.session) return null;
    const age = Date.now() - (stored.session.lastActivity || 0);
    if (age > SESSION_TIMEOUT_MS) return null;
    if (stored.session.token !== readCookie(SESSION_COOKIE)) return null;
    return stored.session;
  });
  const [wallets, setWallets] = useState(
    stored?.wallets && typeof stored.wallets === 'object' ? stored.wallets : {}
  );
  const [detecting, setDetecting] = useState(!stored?.currency);

  const activityTimer = useRef(null);
  const checkingTimer = useRef(null);

  useEffect(() => {
    if (currency) return;

    const sync = detectCurrencySync();
    if (sync) {
      setCurrencyState(sync);
      setDetecting(false);
      return;
    }

    let cancelled = false;
    detectCurrencyFromIP().then((code) => {
      if (cancelled) return;
      setCurrencyState(code || DEFAULT_CURRENCY);
      setDetecting(false);
    });

    return () => {
      cancelled = true;
    };
  }, [currency]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ currency, accounts, session, wallets })
      );
    } catch (e) {}
  }, [currency, accounts, session, wallets]);

  useEffect(() => {
    if (!session) {
      clearCookie(SESSION_COOKIE);
      return;
    }
    writeCookie(SESSION_COOKIE, session.token, Math.floor(SESSION_TIMEOUT_MS / 1000));
  }, [session]);

  useEffect(() => {
    if (!session) return;

    const refreshActivity = () => {
      setSession((prev) => {
        if (!prev) return prev;
        if (Date.now() - prev.lastActivity < 5000) return prev;
        return { ...prev, lastActivity: Date.now() };
      });
    };

    const events = ['click', 'keydown', 'mousemove', 'scroll', 'touchstart'];
    events.forEach((e) => window.addEventListener(e, refreshActivity, { passive: true }));

    return () => {
      events.forEach((e) => window.removeEventListener(e, refreshActivity));
    };
  }, [session?.userId]);

  useEffect(() => {
    if (!session) return;

    checkingTimer.current = setInterval(() => {
      if (Date.now() - session.lastActivity > SESSION_TIMEOUT_MS) {
        setSession(null);
        clearCookie(SESSION_COOKIE);
      }
    }, INACTIVITY_CHECK_MS);

    return () => {
      if (checkingTimer.current) clearInterval(checkingTimer.current);
    };
  }, [session]);

  useEffect(() => {
    return () => {
      if (activityTimer.current) clearTimeout(activityTimer.current);
      if (checkingTimer.current) clearInterval(checkingTimer.current);
    };
  }, []);

  const activeCurrency = CURRENCIES[currency] || CURRENCIES[DEFAULT_CURRENCY];
  const currentUser = session ? accounts.find((a) => a.id === session.userId) || null : null;
  const currentWallet = currentUser
    ? wallets[currentUser.id] || { balance: 0, transactions: [] }
    : { balance: 0, transactions: [] };

  const formatMoney = (amount) => {
    const value = Number.isFinite(amount) ? amount : 0;
    try {
      return new Intl.NumberFormat(activeCurrency.locale, {
        style: 'currency',
        currency: activeCurrency.code,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    } catch (e) {
      return `${activeCurrency.symbol}${value.toFixed(2)}`;
    }
  };

  const setCurrency = (code) => {
    if (!CURRENCIES[code]) return;
    setCurrencyState(code);
  };

  const updateWallet = (userId, updater) => {
    setWallets((prev) => {
      const current = prev[userId] || { balance: 0, transactions: [] };
      return { ...prev, [userId]: updater(current) };
    });
  };

  const startSession = (userId) => {
    const newSession = {
      userId,
      token: randomToken(),
      createdAt: Date.now(),
      lastActivity: Date.now(),
    };
    writeCookie(SESSION_COOKIE, newSession.token, Math.floor(SESSION_TIMEOUT_MS / 1000));
    setSession(newSession);
    return newSession;
  };

  const signUp = async ({ name, phone, email, password }) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!name || !cleanEmail || !password) {
      return { ok: false, error: 'Please fill in all required fields.' };
    }
    if (password.length < 8) {
      return { ok: false, error: 'Password must be at least 8 characters.' };
    }
    if (accounts.some((a) => a.email === cleanEmail)) {
      return { ok: false, error: 'An account with this email already exists.' };
    }

    const salt = randomSalt();
    const passwordHash = await hashPassword(password, salt);
    const id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `acc-${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const account = {
      id,
      name: name.trim(),
      phone: (phone || '').trim(),
      email: cleanEmail,
      salt,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    setAccounts((prev) => [...prev, account]);
    setWallets((prev) => ({ ...prev, [id]: { balance: 0, transactions: [] } }));
    startSession(id);
    return { ok: true, user: account };
  };

  const signIn = async ({ email, password }) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail || !password) {
      return { ok: false, error: 'Enter your email and password.' };
    }
    const account = accounts.find((a) => a.email === cleanEmail);
    if (!account) {
      return { ok: false, error: 'No account found with that email.' };
    }
    const attempt = await hashPassword(password, account.salt);
    if (attempt !== account.passwordHash) {
      return { ok: false, error: 'Incorrect password.' };
    }

    startSession(account.id);
    return { ok: true, user: account };
  };

  const resetPassword = async ({ email, newPassword }) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail || !newPassword) {
      return { ok: false, error: 'Enter your email and a new password.' };
    }
    if (newPassword.length < 8) {
      return { ok: false, error: 'Password must be at least 8 characters.' };
    }
    const account = accounts.find((a) => a.email === cleanEmail);
    if (!account) {
      return { ok: false, error: 'No account found with that email.' };
    }

    const salt = randomSalt();
    const passwordHash = await hashPassword(newPassword, salt);

    setAccounts((prev) =>
      prev.map((a) => (a.id === account.id ? { ...a, salt, passwordHash } : a))
    );
    return { ok: true };
  };

  const signOut = () => {
    setSession(null);
    clearCookie(SESSION_COOKIE);
  };

  const checkSession = () => {
    if (!session) return { valid: false, reason: 'no-session' };
    const age = Date.now() - session.lastActivity;
    if (age > SESSION_TIMEOUT_MS) {
      signOut();
      return { valid: false, reason: 'timeout' };
    }
    const cookie = readCookie(SESSION_COOKIE);
    if (cookie && cookie !== session.token) {
      signOut();
      return { valid: false, reason: 'cookie-mismatch' };
    }
    return { valid: true };
  };

  const sendMoney = ({ recipient, amount, note, recipientId }) => {
    if (!currentUser) return { ok: false, error: 'You must be signed in.' };
    const value = Number(amount);
    if (!recipient || !value || value <= 0) {
      return { ok: false, error: 'Enter a recipient and an amount.' };
    }
    if (value > currentWallet.balance) {
      return { ok: false, error: 'Insufficient balance.' };
    }
    updateWallet(currentUser.id, (w) => ({
      balance: w.balance - value,
      transactions: [
        {
          id:
            typeof crypto !== 'undefined' && crypto.randomUUID
              ? crypto.randomUUID()
              : `tx-${Date.now()}`,
          date: new Date().toISOString(),
          type: 'sent',
          title: `Sent to ${recipient}`,
          subtitle: note || recipientId || '',
          amount: -value,
        },
        ...w.transactions,
      ],
    }));
    return { ok: true };
  };

  const payBill = ({ biller, account, amount, category }) => {
    if (!currentUser) return { ok: false, error: 'You must be signed in.' };
    const value = Number(amount);
    if (!biller || !account || !value || value <= 0) {
      return { ok: false, error: 'Fill in biller, account and amount.' };
    }
    if (value > currentWallet.balance) {
      return { ok: false, error: 'Insufficient balance.' };
    }
    updateWallet(currentUser.id, (w) => ({
      balance: w.balance - value,
      transactions: [
        {
          id:
            typeof crypto !== 'undefined' && crypto.randomUUID
              ? crypto.randomUUID()
              : `tx-${Date.now()}`,
          date: new Date().toISOString(),
          type: 'bill',
          title: biller,
          subtitle: category ? `${category} · ${account}` : account,
          amount: -value,
        },
        ...w.transactions,
      ],
    }));
    return { ok: true };
  };

  const receiveMoney = ({ amount, from }) => {
    if (!currentUser) return { ok: false, error: 'You must be signed in.' };
    const value = Number(amount);
    if (!value || value <= 0) {
      return { ok: false, error: 'Enter an amount.' };
    }
    updateWallet(currentUser.id, (w) => ({
      balance: w.balance + value,
      transactions: [
        {
          id:
            typeof crypto !== 'undefined' && crypto.randomUUID
              ? crypto.randomUUID()
              : `tx-${Date.now()}`,
          date: new Date().toISOString(),
          type: 'received',
          title: from ? `Received from ${from}` : 'Received',
          subtitle: '',
          amount: value,
        },
        ...w.transactions,
      ],
    }));
    return { ok: true };
  };

  const resetDemo = () => {
    setAccounts([]);
    setWallets({});
    setSession(null);
    clearCookie(SESSION_COOKIE);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  const value = {
    currency: activeCurrency.code,
    currencyInfo: activeCurrency,
    accounts,
    currencies: CURRENCIES,
    setCurrency,
    formatMoney,
    balance: currentWallet.balance,
    transactions: currentWallet.transactions,
    user: currentUser,
    signUp,
    signIn,
    resetPassword,
    signOut,
    checkSession,
    sendMoney,
    payBill,
    receiveMoney,
    resetDemo,
    detecting,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error('useWallet must be used inside <WalletProvider>');
  }
  return ctx;
}
