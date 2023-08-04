import { render } from '@testing-library/react';
import App from './app';

test('renders app title', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/Hello!/i);
  expect(titleElement).toBeInTheDocument;
});
