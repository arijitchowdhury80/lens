import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { WhatPerformedSection } from '@/components/editorial/sections/what-performed-section';
import type { Issue } from '@lens/types';

afterEach(() => {
  cleanup();
});

const mockIssue = {
  issueNumber: 14,
  publishDate: '2026-04-07',
  cover: { line1: 'Proof beats vision.', line2: 'Luxury beats everything.' },
  stats: { postsAnalyzed: 23, namedEngagers: 147, entitiesTracked: 6 },
  editorsNote: 'Test note.',
  thesis: {
    claim: 'Customer proof outperformed vision by more than 2x.',
    visual: {
      customerProof: { label: 'Customer proof', percentage: 4.8 },
      vision: { label: 'Vision content', percentage: 2.1 },
    },
    supporting: 'Supporting text.',
  },
  topPosts: [
    {
      headline: 'How Rimowa cut search abandonment by 43 percent with structured guided discovery',
      format: 'carousel' as const,
      engagementRate: 6.2,
      whyItWorked: 'Named a real customer, gave a real number, and showed the exact flow they built. No vision talk.',
    },
    {
      headline: 'Moncler ships visual search across 12 languages in three months',
      format: 'video' as const,
      engagementRate: 5.1,
      whyItWorked: 'A luxury brand shipping fast is a story. The video showed the actual product, not a mockup.',
    },
    {
      headline: 'What we learned running 800 million searches a day for Lacoste',
      format: 'text' as const,
      engagementRate: 4.3,
      whyItWorked: 'The scale number hooked technical readers. The customer brand anchored it to reality.',
    },
  ],
  status: 'published' as const,
} satisfies Issue;

describe('WhatPerformedSection component', () => {
  it('test_whatPerformedSection_renders_sectionLabel', () => {
    render(<WhatPerformedSection issue={mockIssue} />);
    expect(screen.getByText(/§ 2/)).toBeDefined();
  });

  it('test_whatPerformedSection_renders_sectionTitle', () => {
    render(<WhatPerformedSection issue={mockIssue} />);
    expect(screen.getByText(/What Performed/)).toBeDefined();
  });

  it('test_whatPerformedSection_renders_allThreePosts', () => {
    render(<WhatPerformedSection issue={mockIssue} />);
    expect(screen.getByText(/Rimowa/)).toBeDefined();
    expect(screen.getByText(/Moncler/)).toBeDefined();
    expect(screen.getByText(/Lacoste/)).toBeDefined();
  });

  it('test_whatPerformedSection_posts_rankedByEngagement', () => {
    const { container } = render(<WhatPerformedSection issue={mockIssue} />);
    const html = container.innerHTML;
    const rimowaPos = html.indexOf('Rimowa');
    const monclerPos = html.indexOf('Moncler');
    const lacostePos = html.indexOf('Lacoste');
    expect(rimowaPos).toBeLessThan(monclerPos);
    expect(monclerPos).toBeLessThan(lacostePos);
  });

  it('test_whatPerformedSection_hasAnchorId', () => {
    const { container } = render(<WhatPerformedSection issue={mockIssue} />);
    expect(container.querySelector('#what-performed')).not.toBeNull();
  });
});
