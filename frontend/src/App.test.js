import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
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

describe('Test Routes', () => {
  test('full app rendering/navigating', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    const user = userEvent.setup();

    // verify page content for default route
    expect(screen.getByText('Learn with us.')).toBeInTheDocument();
    expect(screen.getByTestId('location-display')).toBeInTheDocument();
    // get location-display value and verify it is the default route
    expect(screen.getByTestId('location-display').textContent).toBe('/');
    // verify page content for expected route after navigating
    await user.click(screen.getAllByText('Lessons')[0]);

    expect(screen.getByTestId('location-display').textContent).toBe('/login/');

    // expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument();
  });

  test('renders 404 page', () => {
    const badRoute = '/some/bad/route/';
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <Provider store={store}>
          <CookiesProvider>
            <App />
          </CookiesProvider>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByTestId('location-display').textContent).toBe(
      '/some/bad/route/'
    );
  });
});
