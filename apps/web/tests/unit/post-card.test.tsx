import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { PostCard } from '@/components/editorial/what-performed/post-card';

afterEach(() => {
  cleanup();
});

const defaultProps = {
  rank: 1,
  headline: 'How Rimowa cut search abandonment by 43 percent with structured guided discovery',
  format: 'carousel' as const,
  engagementRate: 6.2,
  whyItWorked: 'Named a real customer, gave a real number, and showed the exact flow they built. No vision talk.',
};

describe('PostCard component', () => {
  it('test_postCard_renders_headline', () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText(/Rimowa cut search abandonment/)).toBeDefined();
  });

  it('test_postCard_renders_format', () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText('carousel')).toBeDefined();
  });

  it('test_postCard_renders_engagementRate', () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText('6.2%')).toBeDefined();
  });

  it('test_postCard_renders_whyItWorked', () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText(/Named a real customer/)).toBeDefined();
  });

  it('test_postCard_hasNoEmDashes', () => {
    const { container } = render(<PostCard {...defaultProps} />);
    const textContent = container.textContent ?? '';
    const emDash = String.fromCharCode(0x2014);
    expect(textContent).not.toContain(emDash);
  });
});
