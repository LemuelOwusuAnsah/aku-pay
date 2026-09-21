import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext.jsx';

const PUBLIC_ROUTES = ['/', '/about', '/auth'];

function isPublic(pathname) {
  if (PUBLIC_ROUTES.includes(pathname)) return true;
  if (pathname.startsWith('/about')) return true;
  return false;
}

export default function SessionGuard({ children }) {
  const { user, checkSession } = useWallet();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const result = checkSession();
    if (!result.valid && !isPublic(location.pathname)) {
      navigate(`/auth?next=${encodeURIComponent(location.pathname)}`, { replace: true });
    }
  }, [location.pathname, user, checkSession, navigate]);

  return children;
}
