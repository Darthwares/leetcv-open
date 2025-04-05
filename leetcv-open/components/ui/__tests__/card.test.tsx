import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '../card';

describe('Card Components', () => {
  it('renders a basic card', () => {
    render(<Card data-testid="card">Card Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('rounded-lg');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('bg-card');
    expect(card).toHaveTextContent('Card Content');
  });

  it('renders card with header, title, description, content, and footer', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test Content</CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Test Footer')).toBeInTheDocument();
  });

  it('applies custom className to Card', () => {
    render(<Card className="custom-class" data-testid="card">Card Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('custom-class');
  });

  it('applies custom className to CardHeader', () => {
    render(<CardHeader className="custom-header" data-testid="header">Header Content</CardHeader>);
    const header = screen.getByTestId('header');
    expect(header).toHaveClass('custom-header');
    expect(header).toHaveClass('flex');
    expect(header).toHaveClass('flex-col');
    expect(header).toHaveClass('space-y-1.5');
    expect(header).toHaveClass('p-6');
  });

  it('applies custom className to CardTitle', () => {
    render(<CardTitle className="custom-title" data-testid="title">Card Title</CardTitle>);
    const title = screen.getByTestId('title');
    expect(title).toHaveClass('custom-title');
    expect(title).toHaveClass('text-2xl');
    expect(title).toHaveClass('font-semibold');
  });

  it('applies custom className to CardDescription', () => {
    render(<CardDescription className="custom-desc" data-testid="desc">Card Description</CardDescription>);
    const desc = screen.getByTestId('desc');
    expect(desc).toHaveClass('custom-desc');
    expect(desc).toHaveClass('text-sm');
    expect(desc).toHaveClass('text-muted-foreground');
  });

  it('applies custom className to CardContent', () => {
    render(<CardContent className="custom-content" data-testid="content">Card Content</CardContent>);
    const content = screen.getByTestId('content');
    expect(content).toHaveClass('custom-content');
    expect(content).toHaveClass('p-6');
    expect(content).toHaveClass('pt-0');
  });

  it('applies custom className to CardFooter', () => {
    render(<CardFooter className="custom-footer" data-testid="footer">Card Footer</CardFooter>);
    const footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('custom-footer');
    expect(footer).toHaveClass('flex');
    expect(footer).toHaveClass('items-center');
    expect(footer).toHaveClass('p-6');
    expect(footer).toHaveClass('pt-0');
  });
});