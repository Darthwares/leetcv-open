import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '../theme-toggle';
import { useTheme } from 'next-themes';

// Mock the next-themes hook
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeToggle Component', () => {
  it('renders theme toggle button', () => {
    // Mock the useTheme hook
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: jest.fn(),
    });

    render(<ThemeToggle />);
    
    // Check if button is rendered
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    
    // Check for the sr-only text
    expect(screen.getByText('Toggle theme')).toBeInTheDocument();
    
    // Check if it has the correct variant
    expect(button).toHaveClass('inline-flex');
  });

  it('toggles theme from light to dark when clicked', () => {
    // Create a mock function for setTheme
    const setThemeMock = jest.fn();
    
    // Mock the useTheme hook
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);
    
    // Find the button and click it
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Check if setTheme was called with 'dark'
    expect(setThemeMock).toHaveBeenCalledWith('dark');
  });

  it('toggles theme from dark to light when clicked', () => {
    // Create a mock function for setTheme
    const setThemeMock = jest.fn();
    
    // Mock the useTheme hook
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);
    
    // Find the button and click it
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Check if setTheme was called with 'light'
    expect(setThemeMock).toHaveBeenCalledWith('light');
  });
});