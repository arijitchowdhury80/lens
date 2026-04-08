import { ProofBar } from '@/components/thesis/proof-bar';
import type { Issue } from '@lens/types';

interface ThesisSectionProps {
  issue: Issue;
}

/** Thesis section displaying the single biggest pattern of the week. */
export function ThesisSection({ issue }: ThesisSectionProps) {
  return (
    <article id="thesis" className="mx-auto max-w-4xl px-8 py-24">
      <header className="mb-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          § 1 &nbsp;·&nbsp; The Thesis
        </p>
        <div className="mt-2 h-px w-16 bg-foreground/20" />
      </header>

      <h1 className="font-serif text-5xl font-light leading-[1.1] tracking-tight md:text-6xl">
        {issue.thesis.claim}
      </h1>

      <ProofBar
        customerProof={issue.thesis.visual.customerProof}
        vision={issue.thesis.visual.vision}
      />

      <div className="mb-12 border-t border-foreground/10 pt-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          METHODOLOGY
        </p>
        <p className="font-serif text-lg leading-relaxed text-foreground/70">
          {issue.thesisMethodology.metric.charAt(0).toUpperCase() +
            issue.thesisMethodology.metric.slice(1)}
          , computed as {issue.thesisMethodology.formula}.{' '}
          Customer-proof cohort: {issue.thesisMethodology.customerProofPostCount} posts.{' '}
          Vision cohort: {issue.thesisMethodology.visionPostCount} posts.{' '}
          Time window: {issue.thesisMethodology.timeWindow}.
        </p>
      </div>

      <div className="font-serif text-xl leading-relaxed text-foreground/80">
        {issue.thesis.supporting}
      </div>

      <p className="mt-8 font-serif text-xl italic leading-relaxed text-foreground/70">
        {issue.sectionConnectors.fromThesis}
      </p>
    </article>
  );
}
