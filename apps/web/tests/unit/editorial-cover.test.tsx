import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { CoverSection } from '@/components/editorial/sections/cover-section';
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

describe('CoverSection component', () => {
  it('test_editorialCover_renders_issueNumber', () => {
    render(<CoverSection issue={mockIssue} />);
    expect(screen.getByText(/Issue 14/)).toBeDefined();
  });

  it('test_editorialCover_renders_coverClaimLine1', () => {
    render(<CoverSection issue={mockIssue} />);
    expect(screen.getByText(/Proof beats vision\./)).toBeDefined();
  });

  it('test_editorialCover_renders_coverClaimLine2', () => {
    render(<CoverSection issue={mockIssue} />);
    expect(screen.getByText(/Luxury beats everything\./)).toBeDefined();
  });

  it('test_editorialCover_renders_formattedDate', () => {
    render(<CoverSection issue={mockIssue} />);
    expect(screen.getByText(/April 7, 2026/)).toBeDefined();
  });

  it('test_editorialCover_renders_postsAnalyzedStat', () => {
    render(<CoverSection issue={mockIssue} />);
    expect(screen.getByText(/23 posts/)).toBeDefined();
  });

  it('test_editorialCover_renders_namedEngagersStat', () => {
    render(<CoverSection issue={mockIssue} />);
    expect(screen.getByText(/147 engagers/)).toBeDefined();
  });

  it('test_editorialCover_renders_entitiesTrackedStat', () => {
    render(<CoverSection issue={mockIssue} />);
    expect(screen.getByText(/6 entities tracked/)).toBeDefined();
  });

  it('test_editorialCover_renders_scrollCue', () => {
    render(<CoverSection issue={mockIssue} />);
    expect(screen.getByText(/scroll to read/)).toBeDefined();
  });

  it('test_coverSection_renders_framingLabel', () => {
    render(<CoverSection issue={mockIssue} />);
    expect(screen.getByText(/the week in one line/i)).toBeDefined();
  });

  it('test_coverSection_renders_subtitle', () => {
    render(<CoverSection issue={mockIssue} />);
    expect(screen.getByText(/The pattern explaining 64 percent/)).toBeDefined();
  });

  it('test_coverSection_renders_subtitleConnectsToBigNumber', () => {
    render(<CoverSection issue={mockIssue} />);
    expect(screen.getByText(/64 percent/)).toBeDefined();
  });
});
