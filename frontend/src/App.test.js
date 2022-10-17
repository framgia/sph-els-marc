import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import store from './store';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';

describe('Under App Component', () => {
  test('renders App component', () => {
    render(
      <Provider store={store}>
        <CookiesProvider>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </CookiesProvider>
      </Provider>
    );
    const textElement = screen.getByText('Learn with us.');
    expect(textElement).toBeInTheDocument();
  });
});
