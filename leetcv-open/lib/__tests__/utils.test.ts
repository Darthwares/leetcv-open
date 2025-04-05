import { cn } from '../utils';

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
    expect(cn('foo', null)).toBe('foo');
    expect(cn('foo', undefined, 'bar')).toBe('foo bar');
    expect(cn('foo', false && 'bar')).toBe('foo');
    expect(cn('foo', true && 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    const condition = true;
    expect(cn('foo', condition && 'bar')).toBe('foo bar');
    expect(cn('foo', !condition && 'bar')).toBe('foo');
  });

  it('handles tailwind conflicts correctly', () => {
    // The tailwind-merge functionality should handle conflicting classes
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    expect(cn('p-4', 'p-8')).toBe('p-8');
    expect(cn('m-2', 'mx-4')).toBe('my-2 mx-4');
    expect(cn('rounded-md', 'rounded-lg')).toBe('rounded-lg');
  });

  it('handles object syntax from clsx', () => {
    expect(cn('foo', { bar: true })).toBe('foo bar');
    expect(cn('foo', { bar: false })).toBe('foo');
    expect(cn({ foo: true, bar: false })).toBe('foo');
    expect(cn({ foo: true, bar: true })).toBe('foo bar');
  });

  it('handles array syntax from clsx', () => {
    expect(cn('foo', ['bar', 'baz'])).toBe('foo bar baz');
    expect(cn('foo', ['bar', null])).toBe('foo bar');
    expect(cn(['foo', 0, false, 'bar'])).toBe('foo bar');
  });
});