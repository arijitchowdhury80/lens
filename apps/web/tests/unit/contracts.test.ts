import { describe, it, expect } from 'vitest';
import type { Issue } from '@lens/types';
import { mockIssues } from '@lens/mock-data';

const VALID_ISSUE_STATUS = ['draft', 'approved', 'published'] as const;

/* ------------------------------------------------------------------ */
/*  mockIssues satisfies Issue[]                                      */
/* ------------------------------------------------------------------ */

describe('contract: mockIssues satisfies Issue[]', () => {
  it('test_mockIssues_exported_nonEmpty', () => {
    expect(Array.isArray(mockIssues)).toBe(true);
    expect(mockIssues.length).toBeGreaterThan(0);
  });

  it('test_mockIssues_requiredFields_presentAndCorrectTypes', () => {
    for (const issue of mockIssues) {
      expect(issue.issueNumber).toBeTypeOf('number');
      expect(issue.publishDate).toBeTypeOf('string');
      expect(issue.publishDate.length).toBeGreaterThan(0);
      expect(issue.cover).toBeDefined();
      expect(issue.cover.line1).toBeTypeOf('string');
      expect(issue.cover.line2).toBeTypeOf('string');
      expect(issue.stats).toBeDefined();
      expect(issue.stats.postsAnalyzed).toBeTypeOf('number');
      expect(issue.stats.namedEngagers).toBeTypeOf('number');
      expect(issue.stats.entitiesTracked).toBeTypeOf('number');
      expect(VALID_ISSUE_STATUS).toContain(issue.status);
    }
  });

  it('test_mockIssues_satisfiesTypeAtCompileTime', () => {
    const _check: Issue[] = mockIssues satisfies Issue[];
    expect(_check).toBe(mockIssues);
  });
});
