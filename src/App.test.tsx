import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders wowlink page', () => {
  render(<App />);
  const linkElement = screen.getByText(/wowlink/i);
  expect(linkElement).toBeInTheDocument();
});
