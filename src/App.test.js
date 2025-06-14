import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders login or home page', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  // Look for text that actually exists in your component
  const loginText = screen.getByText(/login/i); // or /welcome/i or /medicine/i etc.
  expect(loginText).toBeInTheDocument();
});
