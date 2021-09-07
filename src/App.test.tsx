import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the navigation links', () => {
  render(<App />);
  const linkElement = screen.getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});
