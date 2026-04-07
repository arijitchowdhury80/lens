import type { ExploreCard } from '@lens/types';

export const cohortGapCards: ExploreCard[] = [
  {
    id: 'cg-001',
    title: 'CS-leader cohort declining',
    subtitle: 'Down 15% over 3 months. No content has targeted this persona since February.',
    href: '/explore/cohort-gap/cs-leader-decline',
    insightCount: 7,
  },
  {
    id: 'cg-002',
    title: 'GTM-leader engagement stalled',
    subtitle: 'Flat for 6 weeks despite 3 new posts. Format mismatch suspected: all text, no carousels.',
    href: '/explore/cohort-gap/gtm-leader-stall',
    insightCount: 5,
  },
  {
    id: 'cg-003',
    title: 'AI-founder cohort outpacing content velocity',
    subtitle: 'Audience grew 28% but only 1 post targeted them this quarter. Risk of losing attention.',
    href: '/explore/cohort-gap/ai-founder-velocity',
    insightCount: 4,
  },
];
