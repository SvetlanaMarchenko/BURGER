import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/app.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './services/store.js';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
