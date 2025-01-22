import { createRoot } from 'react-dom/client';
import App from './components/app/app.js';
import './index.css';
import { Provider } from 'react-redux';
import store from './services/store.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { WS_CONNECTION_START } from './services/actions/ws-action-types.js';

const rootElement = document.getElementById('root')!;

store.dispatch({type: WS_CONNECTION_START });

createRoot(rootElement).render(
  <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
