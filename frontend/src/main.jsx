import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initSentry } from './sentry.js'
import { CurrencyProvider } from './contexts/CurrencyContext.jsx'

// Apply the persisted theme on startup
(function() {
  try {
    const persisted = localStorage.getItem('cafm-theme');
    if (persisted) {
      const state = JSON.parse(persisted).state;
      if (state?.theme) {
        document.documentElement.setAttribute('data-theme', state.theme);
        document.documentElement.className = state.theme;
      }
    }
  } catch (e) {}
})();

initSentry();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CurrencyProvider>
      <App />
    </CurrencyProvider>
  </React.StrictMode>,
)

