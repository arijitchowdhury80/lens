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
  url: 'https://www.linkedin.com/posts/algolia_rimowa-search-discovery-activity-7300000000000000001',
  publishedAt: '2026-04-02T14:30:00Z',
  impressions: 48230,
  reactions: 2412,
  comments: 187,
  reposts: 391,
  classification: 'customer-proof' as const,
  namedSubject: 'Rimowa' as string | null,
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

  it('test_postCard_renders_namedSubjectBadge', () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText('RIMOWA')).toBeDefined();
  });

  it('test_postCard_doesNotRenderBadge_whenNoNamedSubject', () => {
    const { container } = render(<PostCard {...defaultProps} namedSubject={null} />);
    expect(container.querySelector('[data-testid="named-subject-badge"]')).toBeNull();
  });

  it('test_postCard_renders_impressions', () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText(/48,230/)).toBeDefined();
  });

  it('test_postCard_renders_reactions', () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText(/2,412/)).toBeDefined();
  });

  it('test_postCard_renders_comments', () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText(/187/)).toBeDefined();
  });

  it('test_postCard_renders_reposts', () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText(/391/)).toBeDefined();
  });

  it('test_postCard_renders_publishedDate', () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText(/APRIL 2, 2026/)).toBeDefined();
  });

  it('test_postCard_renders_viewPostLink', () => {
    const { container } = render(<PostCard {...defaultProps} />);
    const link = container.querySelector('a[href*="linkedin.com"]');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toBe(defaultProps.url);
  });

  it('test_postCard_viewPostLink_opensInNewTab', () => {
    const { container } = render(<PostCard {...defaultProps} />);
    const link = container.querySelector('a[href*="linkedin.com"]');
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.getAttribute('rel')).toContain('noopener');
    expect(link?.getAttribute('rel')).toContain('noreferrer');
  });
});
