# FundFlow — Investor Frontend

React + Redux + Tailwind investor platform.

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env and set VITE_API_URL to your backend

# 3. Start dev server
npm run dev
```

## Integrating your existing auth pages

1. Replace `src/pages/Login.jsx` and `src/pages/Register.jsx` with your own.
2. After a successful login, dispatch:
   ```js
   import { setCredentials } from "./store/authSlice";
   dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
   ```
3. The token is saved to `localStorage` automatically and attached to every API request.

## Seeding wallet balance

After login, call your `/me` or `/profile` endpoint and seed the wallet:
```js
import { setWallet } from "./store/walletSlice";
dispatch(setWallet({ balance: user.walletBalance, history: user.transactions }));
```

## File structure

```
src/
  api/
    axios.js          — Axios instance with JWT interceptor
    projectsApi.js    — listMyProjects fallback
    investorApi.js    — all investor API calls + search/filter helpers
  store/
    index.js          — configureStore
    authSlice.js      — user, token (reads from localStorage)
    projectSlice.js   — projects list + selected project
    investmentSlice.js — portfolio + invest action
    walletSlice.js    — balance + top-up + history
  components/
    Layout.jsx        — sidebar layout + auth guard
    Sidebar.jsx       — navigation sidebar
    DashboardStats.jsx
    ProjectCard.jsx
    ProjectList.jsx   — search + filter + card grid
    InvestmentForm.jsx
    PortfolioTable.jsx
    WalletCard.jsx
  pages/
    Dashboard.jsx     — /
    Projects.jsx      — /projects
    ProjectDetails.jsx — /projects/:id
    Portfolio.jsx     — /portfolio
    Wallet.jsx        — /wallet
    Login.jsx         — /login  (placeholder — replace with yours)
    Register.jsx      — /register (placeholder — replace with yours)
  App.jsx             — Provider + BrowserRouter + Routes
  main.jsx            — ReactDOM entry
  index.css           — Tailwind directives
```
