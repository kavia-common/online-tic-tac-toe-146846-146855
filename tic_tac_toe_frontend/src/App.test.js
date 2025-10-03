import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Tic Tac Toe title and Restart button', () => {
  render(<App />);
  expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /restart/i })).toBeInTheDocument();
});
