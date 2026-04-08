import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { ThesisSection } from '@/components/editorial/sections/thesis-section';
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
    claim: 'Customer proof outperformed vision by more than 2x.',
    visual: {
      customerProof: { label: 'Customer proof', percentage: 4.8 },
      vision: { label: 'Vision content', percentage: 2.1 },
    },
    supporting:
      'Three posts named real customers by name. Three posts talked about ' +
      'the future of search. The first three averaged 4.8 percent engagement. ' +
      'The second three averaged 2.1 percent. The audience this week did not ' +
      'want the pitch. It wanted the receipts. This is the same pattern we ' +
      'have seen in five of the last eight issues, but this week it was the ' +
      'cleanest split yet.',
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

describe('ThesisSection component', () => {
  it('test_editorialThesis_renders_sectionLabel', () => {
    render(<ThesisSection issue={mockIssue} />);
    expect(screen.getByText(/§ 1/)).toBeDefined();
  });

  it('test_editorialThesis_renders_sectionTitle', () => {
    render(<ThesisSection issue={mockIssue} />);
    expect(screen.getByText(/The Thesis/)).toBeDefined();
  });

  it('test_editorialThesis_renders_claimHeadline', () => {
    render(<ThesisSection issue={mockIssue} />);
    expect(
      screen.getByText(/Customer proof outperformed vision by more than 2x/),
    ).toBeDefined();
  });

  it('test_editorialThesis_renders_proofBarVisualization', () => {
    render(<ThesisSection issue={mockIssue} />);
    expect(screen.getByTestId('customer-proof-bar')).toBeDefined();
    expect(screen.getByTestId('vision-bar')).toBeDefined();
  });

  it('test_editorialThesis_renders_supportingProse', () => {
    render(<ThesisSection issue={mockIssue} />);
    expect(
      screen.getByText(/The audience this week did not want the pitch/),
    ).toBeDefined();
  });

  it('test_editorialThesis_hasNoEmDashes', () => {
    const { container } = render(<ThesisSection issue={mockIssue} />);
    const textContent = container.textContent ?? '';
    const emDash = String.fromCharCode(0x2014);
    expect(textContent).not.toContain(emDash);
  });

  it('test_thesisSection_renders_methodologyHeader', () => {
    render(<ThesisSection issue={mockIssue} />);
    expect(screen.getByText('METHODOLOGY')).toBeDefined();
  });

  it('test_thesisSection_renders_methodologyMetric', () => {
    render(<ThesisSection issue={mockIssue} />);
    expect(screen.getByText(/engagement rate/i)).toBeDefined();
  });

  it('test_thesisSection_renders_methodologyFormula', () => {
    render(<ThesisSection issue={mockIssue} />);
    expect(screen.getByText(/reactions \+ comments \+ reposts/)).toBeDefined();
  });

  it('test_thesisSection_renders_methodologyPostCounts', () => {
    const { container } = render(<ThesisSection issue={mockIssue} />);
    const text = container.textContent ?? '';
    expect(text).toContain('7 posts');
    expect(text).toContain('9 posts');
  });

  it('test_thesisSection_renders_methodologyTimeWindow', () => {
    render(<ThesisSection issue={mockIssue} />);
    expect(screen.getByText(/April 1 to April 7, 2026/)).toBeDefined();
  });

  it('test_thesisSection_renders_connectorSentence', () => {
    render(<ThesisSection issue={mockIssue} />);
    expect(screen.getByText(/Read § 2 for the three posts that carried/)).toBeDefined();
  });
});
