export interface Issue {
  /** Sequential issue number, starting at 1 */
  issueNumber: number;

  /** ISO date of the Monday this issue publishes */
  publishDate: string;

  /** Two short parallel sentences — the week's editorial claim */
  cover: {
    line1: string;
    line2: string;
  };

  /** Aggregate stats shown on the cover stat line */
  stats: {
    postsAnalyzed: number;
    namedEngagers: number;
    entitiesTracked: number;
  };

  /** The editor's note for this issue — first-person voice, 80-150 words */
  editorsNote: string;

  /** The Week's Thesis — the single biggest pattern explaining the week */
  thesis: {
    /** The one-sentence claim. Short, declarative, no em-dashes. */
    claim: string;
    /** The simple visual comparison data (for the proof bar). */
    visual: {
      customerProof: {
        label: string;
        percentage: number;
      };
      vision: {
        label: string;
        percentage: number;
      };
    };
    /** The supporting paragraph, 60 to 100 words. */
    supporting: string;
  };

  /** Cover framing: small label above and subtitle below the big claim */
  coverFraming: {
    /** Small mono label shown above the claim, e.g., "The week in one line" */
    label: string;
    /** Subtitle shown below the claim explaining what it is based on */
    subtitle: string;
  };

  /** Methodology behind the Thesis percentages */
  thesisMethodology: {
    /** What was measured, e.g., "engagement rate" */
    metric: string;
    /** How the metric is computed, e.g., "(reactions + comments + reposts) divided by impressions" */
    formula: string;
    /** Number of posts in the customer-proof cohort */
    customerProofPostCount: number;
    /** Number of posts in the vision cohort */
    visionPostCount: number;
    /** Time window of the analysis, e.g., "April 1 to April 7, 2026" */
    timeWindow: string;
  };

  /** Connector sentences linking sections to each other */
  sectionConnectors: {
    /** What the Opener says to point at the next sections */
    fromOpener: string;
    /** What the Thesis says to point at section 2 */
    fromThesis: string;
    /** What section 2 says to point at the next section */
    fromWhatPerformed: string;
  };

  /** Top-performing posts of the week, ranked by engagement rate */
  topPosts: Array<{
    headline: string;
    format: 'carousel' | 'video' | 'text' | 'pdf' | 'image';
    engagementRate: number;
    whyItWorked: string;
    /** The full LinkedIn post URL */
    url: string;
    /** ISO timestamp of when the post was published */
    publishedAt: string;
    /** Total impressions */
    impressions: number;
    /** Total reactions (likes, celebrate, etc.) */
    reactions: number;
    /** Total comments */
    comments: number;
    /** Total reposts/shares */
    reposts: number;
    /** Classification: customer-proof, vision, how-to, announcement, opinion */
    classification: 'customer-proof' | 'vision' | 'how-to' | 'announcement' | 'opinion';
    /** The named customer or subject, if any (e.g., "Rimowa") */
    namedSubject: string | null;
  }>;

  /** Status: drafts vs published */
  status: 'draft' | 'approved' | 'published';
}
