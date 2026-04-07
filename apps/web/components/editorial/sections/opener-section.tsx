import type { Issue } from '@lens/types';

interface OpenerSectionProps {
  issue: Issue;
}

/** Opener section displaying the editor's note framing the week's claim. */
export function OpenerSection({ issue }: OpenerSectionProps) {
  return (
    <article id="opener" className="mx-auto max-w-4xl px-8 py-24">
      <header className="mb-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Editor&apos;s Note
        </p>
        <div className="mt-2 h-px w-16 bg-foreground/20" />
      </header>

      <div className="font-serif text-2xl leading-relaxed text-foreground md:text-3xl">
        {issue.editorsNote}
      </div>

      <footer className="mt-16 font-serif text-lg italic text-muted-foreground">
        &ndash; The Editor
      </footer>
    </article>
  );
}
