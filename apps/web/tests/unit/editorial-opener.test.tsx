import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { OpenerSection } from '@/components/editorial/sections/opener-section';
import type { Issue } from '@lens/types';

afterEach(() => {
  cleanup();
});

const mockIssue = {
  issueNumber: 14,
  publishDate: '2026-04-07',
  cover: { line1: 'Proof beats vision.', line2: 'Luxury beats everything.' },
  stats: { postsAnalyzed: 23, namedEngagers: 147, entitiesTracked: 6 },
  editorsNote:
    "This week, one pattern explains almost everything. Algolia's audience " +
    'rewarded customer proof and ignored vision content. It is a signal we ' +
    'have seen before but never this cleanly. Three posts carried 64% of all ' +
    'engagement, and all three named real customers. Read § 2 for who showed ' +
    'up and what they want. Read the Closer if you only have two minutes.',
  thesis: {
    claim: 'Test claim.',
    visual: {
      customerProof: { label: 'Customer proof', percentage: 4.8 },
      vision: { label: 'Vision content', percentage: 2.1 },
    },
    supporting: 'Test supporting.',
  },
  topPosts: [
    {
      headline: 'Test headline',
      format: 'text' as const,
      engagementRate: 5.0,
      whyItWorked: 'Test reason.',
    },
  ],
  status: 'published' as const,
} satisfies Issue;

describe('OpenerSection component', () => {
  it('test_editorialOpener_renders_sectionHeader', () => {
    render(<OpenerSection issue={mockIssue} />);
    expect(screen.getByText(/editor's note/i)).toBeDefined();
  });

  it('test_editorialOpener_renders_editorsNoteBodyText', () => {
    render(<OpenerSection issue={mockIssue} />);
    expect(screen.getByText(/one pattern explains almost everything/)).toBeDefined();
  });

  it('test_editorialOpener_renders_signOff', () => {
    render(<OpenerSection issue={mockIssue} />);
    expect(screen.getByText(/The Editor/)).toBeDefined();
  });
});
