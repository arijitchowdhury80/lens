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
  coverFraming: {
    label: 'The week in one line',
    subtitle: 'The pattern explaining 64 percent of this week engagement, in two sentences.',
  },
  thesisMethodology: {
    metric: 'engagement rate',
    formula: '(reactions + comments + reposts) divided by impressions',
    customerProofPostCount: 7,
    visionPostCount: 9,
    timeWindow: 'April 1 to April 7, 2026',
  },
  sectionConnectors: {
    fromOpener: 'See § 1 for the methodology, § 2 for the three posts that proved it.',
    fromThesis: 'Read § 2 for the three posts that carried the customer-proof side.',
    fromWhatPerformed: 'These three posts named the customers. The cohort behind them is in § 3.',
  },
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
      url: 'https://www.linkedin.com/posts/algolia_test-activity-0000000000000000001',
      publishedAt: '2026-04-02T14:30:00Z',
      impressions: 10000,
      reactions: 500,
      comments: 50,
      reposts: 20,
      classification: 'customer-proof' as const,
      namedSubject: null,
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

  it('test_openerSection_renders_connectorSentence', () => {
    render(<OpenerSection issue={mockIssue} />);
    expect(screen.getByText(/See § 1 for the methodology/)).toBeDefined();
  });

  it('test_openerSection_signOff_hasNoDashCharacters', () => {
    const { container } = render(<OpenerSection issue={mockIssue} />);
    const textContent = container.textContent ?? '';
    const emDash = String.fromCharCode(0x2014);
    const enDash = String.fromCharCode(0x2013);
    expect(textContent).not.toContain(emDash);
    expect(textContent).not.toContain(enDash);
  });
});
