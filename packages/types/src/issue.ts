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

  /** Top-performing posts of the week, ranked by engagement rate */
  topPosts: Array<{
    headline: string;
    format: 'carousel' | 'video' | 'text' | 'pdf' | 'image';
    engagementRate: number;
    whyItWorked: string;
  }>;

  /** Status — drafts vs published */
  status: 'draft' | 'approved' | 'published';
}
