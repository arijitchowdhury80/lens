export type Persona =
  | 'ecommerce-builder'
  | 'aiml-practitioner'
  | 'gtm-leader'
  | 'cs-leader'
  | 'ai-founder';

export type CohortRow = {
  persona: Persona;
  thisWeek: number;
  lastMonth: number;
  threeMonths: number;
  sixMonths: number;
  trend: 'up' | 'down' | 'flat';
};

export type Engager = {
  id: string;
  name: string;
  role: string;
  company: string;
  linkedinUrl: string;
  whyTheyMatter: string;
  tag: 'customer' | 'alumni' | 'tech-voice' | 'partner' | 'prospect';
};

export type LinkedInPost = {
  id: string;
  title: string;
  url: string;
  format: 'carousel' | 'video' | 'image' | 'text' | 'pdf';
  voice: 'brand' | string;
  engagementRate: number;
  engagementVsAvg: number;
  whyItWorked: string;
  reposters: Engager[];
};

export type ContentBrief = {
  id: string;
  title: string;
  hook: string;
  format: string;
  voice: string;
  persona: Persona;
  shipBy: string;
  cohort: string;
  pattern: string;
  signal: string;
  whoToReach: Engager[];
  confidence: 1 | 2 | 3 | 4;
};

export type NetworkMovement = {
  id: string;
  type: 'exec-move' | 'partnership' | 'event';
  headline: string;
  detail: string;
  date: string;
  relevance: string;
};

export type ExploreCard = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  insightCount: number;
};

export type WeeklyIssue = {
  number: number;
  date: string;
  coverClaim: { line1: string; line2: string };
  editorNote: string;
};
