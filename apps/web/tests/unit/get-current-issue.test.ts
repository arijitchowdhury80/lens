import { describe, it, expect } from 'vitest';
import type { Issue } from '@lens/types';
import { getCurrentIssue, mockIssues } from '@lens/mock-data';

describe('getCurrentIssue', () => {
  it('test_getCurrentIssue_returns_issueObject', () => {
    const issue = getCurrentIssue();
    expect(issue).toBeDefined();
    expect(issue).not.toBeNull();
  });

  it('test_getCurrentIssue_returnsMostRecentPublished_highestIssueNumber', () => {
    const issue = getCurrentIssue();
    const publishedIssues = mockIssues.filter((i) => i.status === 'published');
    const maxIssueNumber = Math.max(...publishedIssues.map((i) => i.issueNumber));
    expect(issue.issueNumber).toBe(maxIssueNumber);
  });

  it('test_getCurrentIssue_status_isPublished', () => {
    const issue = getCurrentIssue();
    expect(issue.status).toBe('published');
  });

  it('test_getCurrentIssue_requiredFields_allPresent', () => {
    const issue = getCurrentIssue();
    expect(issue.issueNumber).toBeTypeOf('number');
    expect(issue.publishDate).toBeTypeOf('string');
    expect(issue.cover).toBeDefined();
    expect(issue.stats).toBeDefined();
    expect(issue.status).toBeDefined();
  });

  it('test_getCurrentIssue_cover_hasLine1AndLine2Strings', () => {
    const issue = getCurrentIssue();
    expect(issue.cover.line1).toBeTypeOf('string');
    expect(issue.cover.line1.length).toBeGreaterThan(0);
    expect(issue.cover.line2).toBeTypeOf('string');
    expect(issue.cover.line2.length).toBeGreaterThan(0);
  });

  it('test_getCurrentIssue_stats_hasNumericFields', () => {
    const issue = getCurrentIssue();
    expect(issue.stats.postsAnalyzed).toBeTypeOf('number');
    expect(issue.stats.postsAnalyzed).toBeGreaterThan(0);
    expect(issue.stats.namedEngagers).toBeTypeOf('number');
    expect(issue.stats.namedEngagers).toBeGreaterThan(0);
    expect(issue.stats.entitiesTracked).toBeTypeOf('number');
    expect(issue.stats.entitiesTracked).toBeGreaterThan(0);
  });

  it('test_getCurrentIssue_satisfiesIssueType_atCompileTime', () => {
    const issue: Issue = getCurrentIssue();
    expect(issue).toBeDefined();
  });
});
