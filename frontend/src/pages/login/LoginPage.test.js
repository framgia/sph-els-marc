import authService from '../../services/auth.service';
import userService from '../../services/user.service';
import categoryService from '../../services/category.service';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';
import { MemoryRouter } from 'react-router-dom';
import store from '../../store';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';

describe('Under login page', () => {
  test('renders login page', async () => {
    render(
      <Provider store={store}>
        <CookiesProvider>
          <MemoryRouter>
            <LoginPage />
          </MemoryRouter>
        </CookiesProvider>
      </Provider>
    );
    const textElement = screen.getByText(
      'Please enter your details to proceed.'
    );
    expect(textElement).toBeInTheDocument();

    const username = screen.getByTestId('login-username');
    const password = screen.getByTestId('login-password');
    const submitButton = screen.getByTestId('login-submit');

    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Username is required')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });
});

describe('Test Auth and User Service for login', () => {
  test('login should store user details in localStorage', async () => {
    const [status, response] = await authService.login(
      'elearning-admin',
      'wsx123'
    );
    expect(localStorage.setItem).toHaveBeenCalled();

    expect(response['status']).toBe(200);
    expect(response['data']['key']).toBe('12345');
    expect(localStorage.getItem('token')).toBe('12345');

    const user = JSON.parse(localStorage.getItem('user'));

    expect(status['pk']).toBe(1);

    expect(user['username']).toBe('elearning-admin');
    expect(user['email']).toBe('elearning-admin@elearning.dev');
    expect(user['first_name']).toBe('From Mock Service');
    expect(user['last_name']).toBe('Administrator');
    expect(user['is_admin']).toBe(true);
  });

  test('Get user details using getLoggedInUser', async () => {
    // expect valid login response
    expect(localStorage.getItem('token')).toBe('12345');
    // get user details using getLoggedInUser
    const { data } = await authService.getLoggedInUser();
    // expect to have user details (username, email, pk, first_name, last_name)
    expect(data['pk']).toBe(1);
    expect(data['username']).toBe('elearning-admin');
    expect(data['email']).toBe('elearning-admin@elearning.dev');
    expect(data['first_name']).toBe('From Mock Service');
    expect(data['last_name']).toBe('Administrator');
  });

  test('After logging in... The profile should be accessible.', async () => {
    // mock login
    // expect valid login response
    const user = JSON.parse(localStorage.getItem('user'));
    expect(user['username']).toBe('elearning-admin');
    expect(user['email']).toBe('elearning-admin@elearning.dev');

    // get profile details using userService
    const { data } = await userService.getUserProfile(user['pk']);

    expect(data['id']).toBe(1);
    expect(data['user']['username']).toBe('elearning-admin');
    expect(data['user']['email']).toBe('elearning-admin@elearning.dev');
    expect(data['user']['first_name']).toBe('From Mock Service');
    expect(data['user']['last_name']).toBe('Administrator');
    expect(data['user']['is_superuser']).toBe(true);

    expect(data['bio']).toBe("I'm admin");
    expect(data['follower_count']).toBe(0);
    expect(data['following_count']).toBe(0);
    expect(data['profile_picture']).not.toBe(null);
    expect(data['lessons_learned']).toBe(1);
    expect(data['words_learned']).toBe(2);
  });

  test("After logging in... The user's activities should be accessible.", async () => {
    // mock login
    // expect valid login response
    const user = JSON.parse(localStorage.getItem('user'));
    expect(localStorage.getItem('token')).toBe('12345');
    // get user activities using userService
    const { data } = await categoryService.getAllActivities(user['pk'], 0);

    // based on mock data, there should be 1 activity
    expect(data['user_id']).toBe(1);
    expect(data['activities'].length).toBe(1);
    expect(data['activities'][0]['activity_type']).toBe('quiz');
    expect(data['activities'][0]['user_name']).toBe('elearning-admin');
    expect(data['activities'][0]['category_taken']).toBe('Basic 3 Words');
  });
});
