import { getCurrentIssue } from '@lens/mock-data';
import { logger } from '@/lib/logger';

/** Full-bleed editorial cover page displaying the weekly issue headline and stats. */
export default function EditorialCoverPage() {
  let issue;
  try {
    issue = getCurrentIssue();
    logger.debug('EditorialCoverPage | issue_loaded | issueNumber=%d', issue.issueNumber);
  } catch (error) {
    logger.error(
      { err: error },
      'EditorialCoverPage | getCurrentIssue_failed | error=%s',
      error instanceof Error ? error.message : String(error),
    );
    return (
      <article className="mx-auto max-w-4xl px-8 py-24">
        <p className="text-center text-muted-foreground">Unable to load issue</p>
      </article>
    );
  }

  // Append T00:00:00 to avoid UTC midnight → previous-day-in-local-tz shift
  const formattedDate = new Date(issue.publishDate + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="mx-auto max-w-4xl px-8 py-24">
      {/* Issue masthead — small, all-caps, top of page */}
      <header className="mb-32">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          LENS &nbsp;&middot;&nbsp; Issue {issue.issueNumber}
        </p>
        <div className="mt-2 h-px w-16 bg-foreground/20" />
      </header>

      {/* The week's claim — two parallel sentences in serif, large */}
      <section className="mb-32">
        <h1 className="font-serif text-6xl font-light leading-[1.05] tracking-tight md:text-7xl">
          {issue.cover.line1}
          <br />
          {issue.cover.line2}
        </h1>
      </section>

      {/* Footer block — date, stat line, scroll cue */}
      <footer className="flex items-end justify-between border-t border-foreground/10 pt-8">
        <div>
          <p className="font-serif text-lg text-foreground">Week of {formattedDate}</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {issue.stats.postsAnalyzed} posts &nbsp;&middot;&nbsp;{' '}
            {issue.stats.namedEngagers} engagers &nbsp;&middot;&nbsp;{' '}
            {issue.stats.entitiesTracked} entities tracked
          </p>
        </div>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          scroll to read &darr;
        </p>
      </footer>
    </article>
  );
}
