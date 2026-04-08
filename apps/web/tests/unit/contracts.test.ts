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

  /* ---- coverFraming ---- */

  it('test_mockIssues_coverFraming_presentAndValid', () => {
    for (const issue of mockIssues) {
      expect(issue.coverFraming).toBeDefined();
      expect(issue.coverFraming.label).toBeDefined();
      expect(issue.coverFraming.subtitle).toBeDefined();
    }
  });

  it('test_mockIssues_coverFramingLabel_isNonEmptyString', () => {
    for (const issue of mockIssues) {
      expect(issue.coverFraming.label).toBeTypeOf('string');
      expect(issue.coverFraming.label.length).toBeGreaterThan(0);
    }
  });

  it('test_mockIssues_coverFramingSubtitle_isNonEmptyString', () => {
    for (const issue of mockIssues) {
      expect(issue.coverFraming.subtitle).toBeTypeOf('string');
      expect(issue.coverFraming.subtitle.length).toBeGreaterThan(0);
    }
  });

  /* ---- thesisMethodology ---- */

  it('test_mockIssues_thesisMethodology_presentAndValid', () => {
    for (const issue of mockIssues) {
      expect(issue.thesisMethodology).toBeDefined();
      expect(issue.thesisMethodology.metric).toBeDefined();
      expect(issue.thesisMethodology.formula).toBeDefined();
      expect(issue.thesisMethodology.customerProofPostCount).toBeDefined();
      expect(issue.thesisMethodology.visionPostCount).toBeDefined();
      expect(issue.thesisMethodology.timeWindow).toBeDefined();
    }
  });

  it('test_mockIssues_thesisMethodologyMetric_isNonEmptyString', () => {
    for (const issue of mockIssues) {
      expect(issue.thesisMethodology.metric).toBeTypeOf('string');
      expect(issue.thesisMethodology.metric.length).toBeGreaterThan(0);
    }
  });

  it('test_mockIssues_thesisMethodologyFormula_isNonEmptyString', () => {
    for (const issue of mockIssues) {
      expect(issue.thesisMethodology.formula).toBeTypeOf('string');
      expect(issue.thesisMethodology.formula.length).toBeGreaterThan(0);
    }
  });

  it('test_mockIssues_thesisMethodologyPostCounts_arePositive', () => {
    for (const issue of mockIssues) {
      expect(issue.thesisMethodology.customerProofPostCount).toBeGreaterThan(0);
      expect(issue.thesisMethodology.visionPostCount).toBeGreaterThan(0);
    }
  });

  it('test_mockIssues_thesisMethodologyTimeWindow_isNonEmptyString', () => {
    for (const issue of mockIssues) {
      expect(issue.thesisMethodology.timeWindow).toBeTypeOf('string');
      expect(issue.thesisMethodology.timeWindow.length).toBeGreaterThan(0);
    }
  });

  /* ---- sectionConnectors ---- */

  it('test_mockIssues_sectionConnectors_presentAndValid', () => {
    for (const issue of mockIssues) {
      expect(issue.sectionConnectors).toBeDefined();
      expect(issue.sectionConnectors.fromOpener).toBeDefined();
      expect(issue.sectionConnectors.fromThesis).toBeDefined();
      expect(issue.sectionConnectors.fromWhatPerformed).toBeDefined();
    }
  });

  it('test_mockIssues_sectionConnectorsFromOpener_isNonEmptyString', () => {
    for (const issue of mockIssues) {
      expect(issue.sectionConnectors.fromOpener).toBeTypeOf('string');
      expect(issue.sectionConnectors.fromOpener.length).toBeGreaterThan(0);
    }
  });

  it('test_mockIssues_sectionConnectorsFromThesis_isNonEmptyString', () => {
    for (const issue of mockIssues) {
      expect(issue.sectionConnectors.fromThesis).toBeTypeOf('string');
      expect(issue.sectionConnectors.fromThesis.length).toBeGreaterThan(0);
    }
  });

  it('test_mockIssues_sectionConnectorsFromWhatPerformed_isNonEmptyString', () => {
    for (const issue of mockIssues) {
      expect(issue.sectionConnectors.fromWhatPerformed).toBeTypeOf('string');
      expect(issue.sectionConnectors.fromWhatPerformed.length).toBeGreaterThan(0);
    }
  });

  /* ---- topPosts new metadata ---- */

  it('test_mockIssues_topPostsUrl_isLinkedInUrl', () => {
    for (const issue of mockIssues) {
      for (const post of issue.topPosts) {
        expect(post.url).toBeTypeOf('string');
        expect(post.url).toMatch(/^https:\/\/www\.linkedin\.com\/posts\//);
      }
    }
  });

  it('test_mockIssues_topPostsPublishedAt_isISOString', () => {
    for (const issue of mockIssues) {
      for (const post of issue.topPosts) {
        expect(post.publishedAt).toBeTypeOf('string');
        const parsed = new Date(post.publishedAt);
        expect(parsed.getTime()).not.toBeNaN();
      }
    }
  });

  it('test_mockIssues_topPostsImpressions_isPositiveInteger', () => {
    for (const issue of mockIssues) {
      for (const post of issue.topPosts) {
        expect(Number.isInteger(post.impressions)).toBe(true);
        expect(post.impressions).toBeGreaterThan(0);
      }
    }
  });

  it('test_mockIssues_topPostsReactions_isPositiveInteger', () => {
    for (const issue of mockIssues) {
      for (const post of issue.topPosts) {
        expect(Number.isInteger(post.reactions)).toBe(true);
        expect(post.reactions).toBeGreaterThan(0);
      }
    }
  });

  it('test_mockIssues_topPostsComments_isNonNegativeInteger', () => {
    for (const issue of mockIssues) {
      for (const post of issue.topPosts) {
        expect(Number.isInteger(post.comments)).toBe(true);
        expect(post.comments).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it('test_mockIssues_topPostsReposts_isNonNegativeInteger', () => {
    for (const issue of mockIssues) {
      for (const post of issue.topPosts) {
        expect(Number.isInteger(post.reposts)).toBe(true);
        expect(post.reposts).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it('test_mockIssues_topPostsClassification_isValidEnum', () => {
    const validClassifications = ['customer-proof', 'vision', 'how-to', 'announcement', 'opinion'];
    for (const issue of mockIssues) {
      for (const post of issue.topPosts) {
        expect(validClassifications).toContain(post.classification);
      }
    }
  });

  it('test_mockIssues_allNewFields_haveNoEmDashes', () => {
    const emDash = String.fromCharCode(0x2014);
    const enDash = String.fromCharCode(0x2013);
    for (const issue of mockIssues) {
      // coverFraming
      expect(issue.coverFraming.label).not.toContain(emDash);
      expect(issue.coverFraming.label).not.toContain(enDash);
      expect(issue.coverFraming.subtitle).not.toContain(emDash);
      expect(issue.coverFraming.subtitle).not.toContain(enDash);
      // thesisMethodology
      expect(issue.thesisMethodology.metric).not.toContain(emDash);
      expect(issue.thesisMethodology.metric).not.toContain(enDash);
      expect(issue.thesisMethodology.formula).not.toContain(emDash);
      expect(issue.thesisMethodology.formula).not.toContain(enDash);
      expect(issue.thesisMethodology.timeWindow).not.toContain(emDash);
      expect(issue.thesisMethodology.timeWindow).not.toContain(enDash);
      // sectionConnectors
      expect(issue.sectionConnectors.fromOpener).not.toContain(emDash);
      expect(issue.sectionConnectors.fromOpener).not.toContain(enDash);
      expect(issue.sectionConnectors.fromThesis).not.toContain(emDash);
      expect(issue.sectionConnectors.fromThesis).not.toContain(enDash);
      expect(issue.sectionConnectors.fromWhatPerformed).not.toContain(emDash);
      expect(issue.sectionConnectors.fromWhatPerformed).not.toContain(enDash);
      // topPosts new fields
      for (const post of issue.topPosts) {
        expect(post.url).not.toContain(emDash);
        expect(post.url).not.toContain(enDash);
      }
    }
  });
});
