import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../page';

// Mock the components used in the page
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: { children: React.ReactNode }) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock('@/components/ui/card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  ),
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-header">{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-title">{children}</div>
  ),
  CardDescription: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-description">{children}</div>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-content">{children}</div>
  ),
  CardFooter: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-footer">{children}</div>
  ),
}));

jest.mock('@/components/theme-toggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Toggle Theme</button>,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

describe('Home Page', () => {
  it('renders the page with all expected components', () => {
    render(<Home />);
    
    // Check for the Next.js logo
    expect(screen.getByAltText('Next.js logo')).toBeInTheDocument();
    
    // Check for the theme toggle
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    
    // Check for the instructions
    expect(screen.getByText(/Get started by editing/)).toBeInTheDocument();
    expect(screen.getByText(/app\/page.tsx/)).toBeInTheDocument();
    expect(screen.getByText(/Save and see your changes instantly./)).toBeInTheDocument();
    
    // Check for the Shadcn UI Components section
    expect(screen.getByText('Shadcn UI Components')).toBeInTheDocument();
    
    // Check for the buttons
    expect(screen.getByText('Default Button')).toBeInTheDocument();
    expect(screen.getByText('Destructive')).toBeInTheDocument();
    expect(screen.getByText('Outline')).toBeInTheDocument();
    expect(screen.getByText('Secondary')).toBeInTheDocument();
    expect(screen.getByText('Ghost')).toBeInTheDocument();
    expect(screen.getByText('Link Button')).toBeInTheDocument();
    
    // Check for the card
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('card-header')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toBeInTheDocument();
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByTestId('card-description')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
    expect(screen.getByText(/This is a Shadcn UI Card component/)).toBeInTheDocument();
    expect(screen.getByTestId('card-footer')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    
    // Check for footer links
    expect(screen.getByText('Deploy now')).toBeInTheDocument();
    expect(screen.getByText('Read our docs')).toBeInTheDocument();
    expect(screen.getByText('Learn')).toBeInTheDocument();
    expect(screen.getByText('Examples')).toBeInTheDocument();
    expect(screen.getByText('Go to nextjs.org →')).toBeInTheDocument();
  });
});