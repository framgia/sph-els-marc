import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@sweetalert2/theme-material-ui/material-ui.css';
import store from './store';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
const container = document.getElementById('root');
const root = createRoot(container);

if (process.env.REACT_APP_USE_MSW_MOCK_API === 'yes') {
  const { worker } = require('./mocks/browser');
  worker.start();
}

root.render(
  <CookiesProvider>
    <Provider store={store}>
      <BrowserRouter forceRefresh={true}>
        <App />
      </BrowserRouter>
    </Provider>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
