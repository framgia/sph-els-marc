import DashboardPage from './DashboardPage';
import { MemoryRouter } from 'react-router-dom';
import store from '../../store';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';

describe('Renders the Dashboard Page', () => {
  test('Renders the Dashboard Page', async () => {
    render(
      <Provider store={store}>
        <CookiesProvider>
          <MemoryRouter>
            <DashboardPage />
          </MemoryRouter>
        </CookiesProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('News Feed')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
    // This ensures that the page is rendered with the correct data
    await waitFor(() => {
      expect(screen.getByText('From Mock Service')).toBeInTheDocument();
    });
  });
});
