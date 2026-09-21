import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Wallet from './pages/Wallet.jsx';
import SendMoney from './pages/SendMoney.jsx';
import PayBills from './pages/PayBills.jsx';
import Transactions from './pages/Transactions.jsx';
import Auth from './pages/Auth.jsx';
import About from './pages/About.jsx';

export default function App() {
  const location = useLocation();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <div key={location.pathname} className="aku-slide-right">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/send" element={<SendMoney />} />
            <Route path="/bills" element={<PayBills />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}
