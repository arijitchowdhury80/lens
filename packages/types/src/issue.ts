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

  /** Editor's note shown on the Opener screen — used by other screens later */
  editorsNote?: string;

  /** Status — drafts vs published */
  status: 'draft' | 'approved' | 'published';
}
