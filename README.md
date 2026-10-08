# Aku Pay

> A simple fintech wallet for everyday money. Send, receive and pay bills in seconds.

**Live:** [akupay.lemuelowusuansah.org](https://akupay.lemuelowusuansah.org)

---

## What it is

Aku Pay is a mobile-first web wallet built for real-world use on any phone — no app install required. It handles the three things people actually open a wallet for: sending money, paying bills, and knowing their balance is correct.

Built as a full production-shaped single-page app: real session management, per-user wallets, currency detection, dark mode, and a complete sign-up / sign-in / password-reset flow — all without a backend, using encrypted local storage as a stand-in.

---

## Features

### Money
- **Send money** to any Aku Pay user, with a recipient quick-pick
- **Pay bills** across 4 categories (electricity, water, internet, TV)
- **Airtime & data** top-ups for MTN, Telecel, AirtelTigo
- **Savings goals** — separate savings buckets with progress tracking
- **Virtual card** — masked/revealable card details, settings panel
- **Full transaction history** — filterable by sent / received / bills

### Account
- **Sign up + sign in** with SHA-256 + per-account salt hashing
- **Forgot password** reset flow
- **Multi-account** on one device — each with its own wallet
- **Session persistence** with 15-minute inactivity timeout
- **Profile** — view account details, wallet summary

### Experience
- **Auto currency detection** (locale + IP fallback) with a manual picker — GHS, USD, EUR, GBP, NGN
- **Dark mode** — persists across refreshes
- **Scroll-reveal animations** and slide-in route transitions
- **Responsive** — mobile-first with a grouped hamburger menu
- **Accessible** — keyboard nav, ARIA roles, reduced-motion support

---

## Tech stack

| Layer | What |
|---|---|
| Framework | React 19 |
| Build | Vite 8 |
| Routing | React Router 7 |
| Styling | Custom CSS variables + Bootstrap 5 grid |
| Icons | Lucide React |
| State | React Context + localStorage |
| Hashing | Web Crypto API (SubtleCrypto) |
| Deploy | GitHub Pages + Cloudflare DNS |

No backend. No database. No external APIs beyond currency detection and image CDN. Everything runs client-side.

---

## Project structure

src/
├── components/ Reusable UI (Navbar, Footer, Carousel, Reveal, CurrencyPicker, SessionGuard)
├── context/ WalletContext — the single source of truth
├── pages/ One file per route
│ ├── Home.jsx
│ ├── Wallet.jsx
│ ├── SendMoney.jsx
│ ├── PayBills.jsx
│ ├── Airtime.jsx
│ ├── Savings.jsx
│ ├── Card.jsx
│ ├── Profile.jsx
│ ├── Transactions.jsx
│ ├── Auth.jsx
│ └── About.jsx
├── styles/
│ ├── global.css Design tokens, layout, utilities
│ └── animations.css
├── App.jsx Routes
└── main.jsx Entry point + providers

text

---

## Run locally

```bash
git clone https://github.com/LemuelOwusuAnsah/aku-pay.git
cd aku-pay
npm install
npm run dev
Open http://localhost:5173/.

Build
bash
npm run build      # outputs to dist/
npm run preview    # serves the built version locally
Deploy
bash
npm run deploy     # builds and pushes dist/ to gh-pages
Design system
Colour tokens live in src/styles/global.css under :root and [data-theme="dark"].

Token	Light	Dark
--aku-yellow	#FFD100	#FFD100
--aku-blue	#0A3D91	#4E8AF5
--aku-green	#00A86B	#2BD991
--aku-ink	#0B132B	#F1F5FB
--aku-bg	#F7F9FC	#0A0F1E
Every colour change is a single-token edit. The whole site flips themes automatically.

Security notes
This is a demonstration app. It stores accounts, hashed passwords, and wallet data in browser localStorage and session in a cookie.

Passwords are hashed with SHA-256 + per-account salt via the Web Crypto API — never stored in plaintext

Session tokens are cryptographically random (crypto.getRandomValues)

Cookie is SameSite=Lax, Secure on HTTPS

15-minute inactivity timeout with auto sign-out

Not for real money. A production version would move all of this to a backend (Node + PostgreSQL) with bcrypt/argon2 hashing, proper HTTP-only session cookies, and a real payments provider.

Author
Lemuel Owusu-Ansah — Founder & Developer
Accra, Ghana

Phone: 0245791297

Personal: owusuansahlemuel@gmail.com

Work: hello@lemuelowusuansah.org

Building simple, fast fintech products for real people.

License
© 2026 Lemuel Owusu-Ansah. All rights reserved.

Built for the everyday. Send, receive, pay — all in one place.
