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
      'rewarded customer proof and ignored vision content. It is a signal we ' +
      'have seen before but never this cleanly. Three posts carried 64% of all ' +
      'engagement, and all three named real customers. Read § 2 for who showed ' +
      'up and what they want. Read the Closer if you only have two minutes.',
    thesis: {
      claim: 'Customer proof outperformed vision by more than 2x.',
      visual: {
        customerProof: {
          label: 'Customer proof',
          percentage: 4.8,
        },
        vision: {
          label: 'Vision content',
          percentage: 2.1,
        },
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
        headline: 'How Rimowa cut search abandonment by 43 percent with structured guided discovery',
        format: 'carousel',
        engagementRate: 6.2,
        whyItWorked: 'Named a real customer, gave a real number, and showed the exact flow they built. No vision talk.',
      },
      {
        headline: 'Moncler ships visual search across 12 languages in three months',
        format: 'video',
        engagementRate: 5.1,
        whyItWorked: 'A luxury brand shipping fast is a story. The video showed the actual product, not a mockup.',
      },
      {
        headline: 'What we learned running 800 million searches a day for Lacoste',
        format: 'text',
        engagementRate: 4.3,
        whyItWorked: 'The scale number hooked technical readers. The customer brand anchored it to reality.',
      },
    ],
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
