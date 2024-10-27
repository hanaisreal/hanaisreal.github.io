import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

describe('App Component', () => {
  test('renders portfolio page', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    
    // Test for the footer text which we know exists
    const footerText = screen.getByText(/2024 Hana Oh/i);
    expect(footerText).toBeInTheDocument();
  });
});