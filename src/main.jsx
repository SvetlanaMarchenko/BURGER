// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './components/app/app.jsx'
// import './index.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import { createRoot } from 'react-dom/client';
import App from './components/app/app.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './services/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);