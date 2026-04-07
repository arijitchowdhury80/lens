import type { LinkedInPost } from '@lens/types';
import { namedEngagers } from '../engagers/named-engagers';

export const topPosts: LinkedInPost[] = [
  {
    id: 'post-001',
    title: 'The composable search stack: why monoliths are losing',
    url: 'https://linkedin.com/feed/update/urn:li:activity:7100000000001',
    format: 'carousel',
    voice: 'brand',
    engagementRate: 6.4,
    engagementVsAvg: 2.29,
    whyItWorked:
      'Carousel format allowed a slide-by-slide teardown of a real migration from Elasticsearch to a composable API layer. The before/after screenshots in slides 3-5 drove heavy saves and shares.',
    reposters: [namedEngagers[0], namedEngagers[2]],
  },
  {
    id: 'post-002',
    title: 'We measured query understanding across 40 fashion sites',
    url: 'https://linkedin.com/feed/update/urn:li:activity:7100000000002',
    format: 'pdf',
    voice: 'brand',
    engagementRate: 5.1,
    engagementVsAvg: 1.82,
    whyItWorked:
      'Original research with named brands. The PDF format let readers download the full benchmark, and tagging search leads at those brands in the comments created a reply thread with 47 responses.',
    reposters: [namedEngagers[1]],
  },
  {
    id: 'post-003',
    title: 'What our Head of AI learned rebuilding autocomplete from scratch',
    url: 'https://linkedin.com/feed/update/urn:li:activity:7100000000003',
    format: 'video',
    voice: 'Julien Lemoine',
    engagementRate: 3.8,
    engagementVsAvg: 1.36,
    whyItWorked:
      'Personal narrative from a named executive. The 90-second video hit the algorithm sweet spot and the vulnerability about early failures drove high comment depth.',
    reposters: [namedEngagers[3], namedEngagers[4]],
  },
];
