import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../button';

describe('Button Component', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    // Default variant should have the primary background class
    expect(button).toHaveClass('bg-primary');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="destructive">Destructive</Button>);
    let button = screen.getByRole('button', { name: /destructive/i });
    expect(button).toHaveClass('bg-destructive');

    rerender(<Button variant="outline">Outline</Button>);
    button = screen.getByRole('button', { name: /outline/i });
    expect(button).toHaveClass('border-input');

    rerender(<Button variant="secondary">Secondary</Button>);
    button = screen.getByRole('button', { name: /secondary/i });
    expect(button).toHaveClass('bg-secondary');

    rerender(<Button variant="ghost">Ghost</Button>);
    button = screen.getByRole('button', { name: /ghost/i });
    expect(button).not.toHaveClass('bg-primary');

    rerender(<Button variant="link">Link</Button>);
    button = screen.getByRole('button', { name: /link/i });
    expect(button).toHaveClass('text-primary');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="default">Default Size</Button>);
    let button = screen.getByRole('button', { name: /default size/i });
    expect(button).toHaveClass('h-10');

    rerender(<Button size="sm">Small</Button>);
    button = screen.getByRole('button', { name: /small/i });
    expect(button).toHaveClass('h-9');

    rerender(<Button size="lg">Large</Button>);
    button = screen.getByRole('button', { name: /large/i });
    expect(button).toHaveClass('h-11');

    rerender(<Button size="icon">Icon</Button>);
    button = screen.getByRole('button', { name: /icon/i });
    expect(button).toHaveClass('h-10 w-10');
  });

  it('passes className to the button', () => {
    render(<Button className="custom-class">Custom Class</Button>);
    const button = screen.getByRole('button', { name: /custom class/i });
    expect(button).toHaveClass('custom-class');
  });

  it('handles asChild prop correctly', () => {
    const Slot = React.forwardRef<
      HTMLAnchorElement,
      React.AnchorHTMLAttributes<HTMLAnchorElement>
    >(({ children, ...props }, ref) => (
      <a ref={ref} {...props}>
        {children}
      </a>
    ));
    Slot.displayName = 'Slot';

    render(
      <Button asChild>
        <Slot href="#test">Link Button</Slot>
      </Button>
    );
    
    const link = screen.getByRole('link', { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#test');
    expect(link).toHaveClass('bg-primary');
  });
});