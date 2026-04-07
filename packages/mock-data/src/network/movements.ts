import type { NetworkMovement } from '@lens/types';

export const networkMovements: NetworkMovement[] = [
  {
    id: 'mv-001',
    type: 'exec-move',
    headline: 'Sophie Durand promoted to VP Engineering at Vestiaire Collective',
    detail:
      'Previously Senior Director of Platform. Now owns search, recommendations, and checkout. Reports directly to CTO.',
    date: '2026-03-28',
    relevance:
      'Vestiaire is a top prospect. Sophie already engages with our content and now controls budget for search infrastructure.',
  },
  {
    id: 'mv-002',
    type: 'exec-move',
    headline: 'ASOS hires new Chief Product Officer from Zalando',
    detail:
      'Katrin Voss joins from Zalando where she led the AI-powered search and personalization overhaul. Starts May 1.',
    date: '2026-04-02',
    relevance:
      'New CPO at an existing customer. Her Zalando background suggests she will push for deeper AI integration in product discovery.',
  },
  {
    id: 'mv-003',
    type: 'partnership',
    headline: 'Reformation partners with Shopify Markets for global expansion',
    detail:
      'Reformation announced multi-region storefronts via Shopify Markets. Search and merchandising localization is a key workstream.',
    date: '2026-04-01',
    relevance:
      'Multi-language search is a known pain point in Shopify Markets. Content opportunity around localized query understanding.',
  },
  {
    id: 'mv-004',
    type: 'event',
    headline: 'Shoptalk Europe 2026 agenda published',
    detail:
      'Search and discovery track confirmed with panels on AI-native merchandising. June 2-4 in Barcelona.',
    date: '2026-03-31',
    relevance:
      'Three of our top engagers are confirmed speakers. Pre-event content series could drive booth traffic and meeting requests.',
  },
];
