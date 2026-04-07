import type { Issue } from '@lens/types';

export const mockIssues: Issue[] = [
  {
    issueNumber: 14,
    publishDate: '2026-04-07',
    cover: {
      line1: 'Proof beats vision.',
      line2: 'Luxury beats everything.',
    },
    stats: {
      postsAnalyzed: 23,
      namedEngagers: 147,
      entitiesTracked: 6,
    },
    editorsNote:
      "This week, one pattern explains almost everything. Algolia's audience " +
      "rewarded customer proof and ignored vision content — a signal we've seen " +
      'before but never this cleanly. Three posts carried 64% of all engagement, ' +
      'and all three named real customers.',
    status: 'published',
  },
];

/**
 * Returns the most recent published issue. Used by the Editorial Cover and
 * other Editorial screens that show "the current issue".
 *
 * @throws {Error} If no published issues exist in the mock data.
 */
export function getCurrentIssue(): Issue {
  try {
    const published = mockIssues.filter((i) => i.status === 'published');

    if (published.length === 0) {
      throw new Error(
        'getCurrentIssue | no_published_issues | total_issues=' + mockIssues.length,
      );
    }

    return published.sort((a, b) => b.issueNumber - a.issueNumber)[0];
  } catch (error) {
    console.error(
      'getCurrentIssue | error |',
      error instanceof Error ? error.message : String(error),
    );
    throw error;
  }
}
