import { PostCard } from '@/components/editorial/what-performed/post-card';
import type { Issue } from '@lens/types';

interface WhatPerformedSectionProps {
  issue: Issue;
}

/** What Performed section showing the top-performing posts of the week. */
export function WhatPerformedSection({ issue }: WhatPerformedSectionProps) {
  const sortedPosts = [...issue.topPosts].sort((a, b) => b.engagementRate - a.engagementRate);

  return (
    <article id="what-performed" className="mx-auto max-w-4xl px-8 py-24">
      <header className="mb-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          § 2 &nbsp;·&nbsp; What Performed
        </p>
        <div className="mt-2 h-px w-16 bg-foreground/20" />
      </header>

      <h1 className="mb-16 font-serif text-5xl font-light leading-[1.1] tracking-tight">
        Three posts carried the week.
      </h1>

      <div>
        {sortedPosts.map((post, index) => (
          <PostCard
            key={post.headline}
            rank={index + 1}
            headline={post.headline}
            format={post.format}
            engagementRate={post.engagementRate}
            whyItWorked={post.whyItWorked}
          />
        ))}
      </div>
    </article>
  );
}
