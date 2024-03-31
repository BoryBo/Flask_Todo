import { render, screen } from '@testing-library/react';
import App from './App';

test('renders todo list', () => {
  render(<App />);
  const titleElement = screen.getByText(/todo list/i);
  expect(titleElement).toBeInTheDocument();
});
