import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx';
import { WalletProvider } from './context/WalletContext.jsx';
import SessionGuard from './components/SessionGuard.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/aku-pay">
      <WalletProvider>
        <SessionGuard>
          <App />
        </SessionGuard>
      </WalletProvider>
    </BrowserRouter>
  </React.StrictMode>
);
