import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';

// Mock next/navigation before importing the component
vi.mock('next/navigation', () => ({
  usePathname: () => '/editorial',
}));

// Mock next/link to render a plain anchor
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) =>
    React.createElement('a', { href, ...props }, children),
}));

import { TopBar } from '@/components/shell/top-bar';

afterEach(() => {
  cleanup();
});

describe('TopBar component', () => {
  it('test_topBar_renders_lensWordmark', () => {
    render(<TopBar />);
    expect(screen.getByText('LENS')).toBeDefined();
  });

  it('test_topBar_renders_editorialNavLink', () => {
    render(<TopBar />);
    expect(screen.getByText('Editorial')).toBeDefined();
  });

  it('test_topBar_renders_exploreNavLink', () => {
    render(<TopBar />);
    expect(screen.getByText('Explore')).toBeDefined();
  });

  it('test_topBar_renders_algoliaEntitySelector', () => {
    render(<TopBar />);
    expect(screen.getByText('Algolia')).toBeDefined();
  });

  it('test_topBar_renders_profileAvatar', () => {
    render(<TopBar />);
    expect(screen.getByText('AC')).toBeDefined();
  });

  it('test_topBar_editorialLink_hasCorrectHref', () => {
    render(<TopBar />);
    const editorialLink = screen.getByText('Editorial');
    expect(editorialLink.closest('a')?.getAttribute('href')).toBe('/editorial');
  });

  it('test_topBar_exploreLink_hasCorrectHref', () => {
    render(<TopBar />);
    const exploreLink = screen.getByText('Explore');
    expect(exploreLink.closest('a')?.getAttribute('href')).toBe('/explore');
  });

  it('test_topBar_wordmarkLink_hasCorrectHref', () => {
    render(<TopBar />);
    const wordmark = screen.getByText('LENS');
    expect(wordmark.closest('a')?.getAttribute('href')).toBe('/');
  });
});
