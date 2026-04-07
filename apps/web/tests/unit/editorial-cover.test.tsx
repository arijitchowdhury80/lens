import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';

// Mock @lens/mock-data before importing the component
vi.mock('@lens/mock-data', () => ({
  getCurrentIssue: () => ({
    issueNumber: 14,
    publishDate: '2026-04-07',
    cover: { line1: 'Proof beats vision.', line2: 'Luxury beats everything.' },
    stats: { postsAnalyzed: 23, namedEngagers: 147, entitiesTracked: 6 },
    status: 'published' as const,
  }),
}));

import EditorialCoverPage from '@/app/editorial/page';

afterEach(() => {
  cleanup();
});

describe('EditorialCoverPage component', () => {
  it('test_editorialCover_renders_issueNumber', () => {
    render(<EditorialCoverPage />);
    expect(screen.getByText(/Issue 14/)).toBeDefined();
  });

  it('test_editorialCover_renders_coverClaimLine1', () => {
    render(<EditorialCoverPage />);
    expect(screen.getByText(/Proof beats vision\./)).toBeDefined();
  });

  it('test_editorialCover_renders_coverClaimLine2', () => {
    render(<EditorialCoverPage />);
    expect(screen.getByText(/Luxury beats everything\./)).toBeDefined();
  });

  it('test_editorialCover_renders_formattedDate', () => {
    render(<EditorialCoverPage />);
    expect(screen.getByText(/April 7, 2026/)).toBeDefined();
  });

  it('test_editorialCover_renders_postsAnalyzedStat', () => {
    render(<EditorialCoverPage />);
    expect(screen.getByText(/23 posts/)).toBeDefined();
  });

  it('test_editorialCover_renders_namedEngagersStat', () => {
    render(<EditorialCoverPage />);
    expect(screen.getByText(/147 engagers/)).toBeDefined();
  });

  it('test_editorialCover_renders_entitiesTrackedStat', () => {
    render(<EditorialCoverPage />);
    expect(screen.getByText(/6 entities tracked/)).toBeDefined();
  });

  it('test_editorialCover_renders_scrollCue', () => {
    render(<EditorialCoverPage />);
    expect(screen.getByText(/scroll to read/)).toBeDefined();
  });
});
