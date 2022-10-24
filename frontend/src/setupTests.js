// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { server } from './mocks/server';

// This configures a request mocking server with the given request handlers.
beforeAll(() => {
  // Enable the mocking in tests.
  server.listen();
  // Enable mocking localStorage
  jest.spyOn(Storage.prototype, 'setItem');
  localStorage.setItem('token', '12345');
  localStorage.setItem(
    'user',
    '{"pk":1,"username":"elearning-admin","email":"elearning-admin@elearning.dev","first_name":"From Mock Service","last_name":"Administrator","accessToken":"12345","is_admin":true}'
  );
});
// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());
// Clean up once the tests are done.
afterAll(() => server.close());
