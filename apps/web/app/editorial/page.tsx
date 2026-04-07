import { getCurrentIssue } from '@lens/mock-data';
import { CoverSection } from '@/components/editorial/sections/cover-section';
import { OpenerSection } from '@/components/editorial/sections/opener-section';
import { ThesisSection } from '@/components/editorial/sections/thesis-section';
import { WhatPerformedSection } from '@/components/editorial/sections/what-performed-section';
import { TableOfContents } from '@/components/editorial/table-of-contents';
import { logger } from '@/lib/logger';

function loadIssue() {
  try {
    return { issue: getCurrentIssue(), error: null };
  } catch (error) {
    logger.error({ err: error }, 'editorial_issue_load_failed');
    return { issue: null, error };
  }
}

/** Single scrollable Weekly Issue composing all editorial sections with a floating TOC. */
export default function EditorialIssuePage() {
  const { issue, error } = loadIssue();

  if (error || !issue) {
    return (
      <article className="mx-auto max-w-4xl px-8 py-24">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          This issue is unavailable.
        </p>
      </article>
    );
  }

  logger.debug({ issueNumber: issue.issueNumber }, 'editorial_issue_render_success');

  return (
    <>
      <TableOfContents />
      <div>
        <CoverSection issue={issue} />
        <OpenerSection issue={issue} />
        <ThesisSection issue={issue} />
        <WhatPerformedSection issue={issue} />
      </div>
    </>
  );
}
