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
});
