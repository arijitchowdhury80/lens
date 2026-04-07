import type { Engager } from '@lens/types';

export const namedEngagers: Engager[] = [
  {
    id: 'eng-001',
    name: 'Sophie Durand',
    role: 'VP of Engineering',
    company: 'Vestiaire Collective',
    linkedinUrl: 'https://linkedin.com/in/sophie-durand-vc',
    whyTheyMatter:
      'Owns the search and discovery stack at a top luxury resale marketplace. Active commenter on composable commerce posts.',
    tag: 'prospect',
  },
  {
    id: 'eng-002',
    name: 'Marcus Chen',
    role: 'Head of Search & Relevance',
    company: 'ASOS',
    linkedinUrl: 'https://linkedin.com/in/marcus-chen-asos',
    whyTheyMatter:
      'Leads a 12-person search team and regularly shares benchmarks on query understanding and NLP ranking.',
    tag: 'customer',
  },
  {
    id: 'eng-003',
    name: 'Priya Kapoor',
    role: 'Staff ML Engineer',
    company: 'Levi Strauss',
    linkedinUrl: 'https://linkedin.com/in/priya-kapoor-ml',
    whyTheyMatter:
      'Published two papers on visual search embeddings for fashion. Highly cited in the AI-practitioner cohort.',
    tag: 'tech-voice',
  },
  {
    id: 'eng-004',
    name: 'James Whitfield',
    role: 'CTO',
    company: 'Reformation',
    linkedinUrl: 'https://linkedin.com/in/james-whitfield-ref',
    whyTheyMatter:
      'Former Algolia customer who migrated to an in-house solution. Vocal about build-vs-buy tradeoffs.',
    tag: 'alumni',
  },
  {
    id: 'eng-005',
    name: 'Elena Rossi',
    role: 'Director of Growth',
    company: 'MUJI Europe',
    linkedinUrl: 'https://linkedin.com/in/elena-rossi-muji',
    whyTheyMatter:
      'Championing a DTC site relaunch with search at the center of the conversion funnel. Budget approved Q2.',
    tag: 'prospect',
  },
];
