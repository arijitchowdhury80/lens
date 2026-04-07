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

  it('test_mockIssues_editorsNote_presentStringNonEmpty', () => {
    for (const issue of mockIssues) {
      expect(issue.editorsNote).toBeTypeOf('string');
      expect(issue.editorsNote.length).toBeGreaterThan(0);
    }
  });

  it('test_mockIssues_satisfiesTypeAtCompileTime', () => {
    const _check: Issue[] = mockIssues satisfies Issue[];
    expect(_check).toBe(mockIssues);
  });

  it('test_mockIssues_thesis_presentAndValid', () => {
    for (const issue of mockIssues) {
      expect(issue.thesis).toBeDefined();
      expect(issue.thesis.claim).toBeDefined();
      expect(issue.thesis.visual).toBeDefined();
      expect(issue.thesis.supporting).toBeDefined();
    }
  });

  it('test_mockIssues_thesisClaim_isNonEmptyString', () => {
    for (const issue of mockIssues) {
      expect(issue.thesis.claim).toBeTypeOf('string');
      expect(issue.thesis.claim.length).toBeGreaterThan(0);
    }
  });

  it('test_mockIssues_thesisVisual_hasValidPercentages', () => {
    for (const issue of mockIssues) {
      expect(issue.thesis.visual.customerProof.percentage).toBeTypeOf('number');
      expect(issue.thesis.visual.customerProof.percentage).toBeGreaterThanOrEqual(0);
      expect(issue.thesis.visual.customerProof.percentage).toBeLessThanOrEqual(100);
      expect(issue.thesis.visual.vision.percentage).toBeTypeOf('number');
      expect(issue.thesis.visual.vision.percentage).toBeGreaterThanOrEqual(0);
      expect(issue.thesis.visual.vision.percentage).toBeLessThanOrEqual(100);
    }
  });

  it('test_mockIssues_thesisSupporting_isNonEmptyString', () => {
    for (const issue of mockIssues) {
      expect(issue.thesis.supporting).toBeTypeOf('string');
      expect(issue.thesis.supporting.length).toBeGreaterThan(0);
    }
  });

  it('test_mockIssues_thesisClaim_hasNoEmDashes', () => {
    const emDash = String.fromCharCode(0x2014);
    for (const issue of mockIssues) {
      expect(issue.thesis.claim).not.toContain(emDash);
    }
  });

  it('test_mockIssues_thesisSupporting_hasNoEmDashes', () => {
    const emDash = String.fromCharCode(0x2014);
    for (const issue of mockIssues) {
      expect(issue.thesis.supporting).not.toContain(emDash);
    }
  });

  it('test_mockIssues_topPosts_isArrayOfThree', () => {
    for (const issue of mockIssues) {
      expect(Array.isArray(issue.topPosts)).toBe(true);
      expect(issue.topPosts.length).toBe(3);
    }
  });

  it('test_mockIssues_topPosts_haveValidFormatEnum', () => {
    const validFormats = ['carousel', 'video', 'text', 'pdf', 'image'];
    for (const issue of mockIssues) {
      for (const post of issue.topPosts) {
        expect(validFormats).toContain(post.format);
      }
    }
  });

  it('test_mockIssues_topPosts_havePositiveEngagementRates', () => {
    for (const issue of mockIssues) {
      for (const post of issue.topPosts) {
        expect(post.engagementRate).toBeGreaterThan(0);
      }
    }
  });

  it('test_mockIssues_topPosts_sortedDescendingByEngagement', () => {
    for (const issue of mockIssues) {
      for (let i = 0; i < issue.topPosts.length - 1; i++) {
        expect(issue.topPosts[i].engagementRate).toBeGreaterThanOrEqual(
          issue.topPosts[i + 1].engagementRate,
        );
      }
    }
  });

  it('test_mockIssues_topPosts_haveNoEmDashes', () => {
    const emDash = String.fromCharCode(0x2014);
    for (const issue of mockIssues) {
      for (const post of issue.topPosts) {
        expect(post.headline).not.toContain(emDash);
        expect(post.whyItWorked).not.toContain(emDash);
      }
    }
  });
});
