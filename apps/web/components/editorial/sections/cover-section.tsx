import type { Issue } from '@lens/types';

interface CoverSectionProps {
  issue: Issue;
}

/** Cover section of the Weekly Issue displaying the headline and stats. */
export function CoverSection({ issue }: CoverSectionProps) {
  // Append T00:00:00 to avoid UTC midnight → previous-day-in-local-tz shift
  const formattedDate = new Date(issue.publishDate + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article id="cover" className="mx-auto max-w-4xl px-8 py-24">
      {/* Issue masthead */}
      <header className="mb-32">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          LENS &nbsp;&middot;&nbsp; Issue {issue.issueNumber}
        </p>
        <div className="mt-2 h-px w-16 bg-foreground/20" />
      </header>

      {/* The week's claim */}
      <section className="mb-32">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {issue.coverFraming.label}
        </p>
        <h1 className="font-serif text-6xl font-light leading-[1.05] tracking-tight md:text-7xl">
          {issue.cover.line1}
          <br />
          {issue.cover.line2}
        </h1>
        <p className="mt-8 font-serif text-xl italic text-foreground/70">
          {issue.coverFraming.subtitle}
        </p>
      </section>

      {/* Footer block */}
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
