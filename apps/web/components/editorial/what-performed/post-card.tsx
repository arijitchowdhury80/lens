interface PostCardProps {
  rank: number;
  headline: string;
  format: 'carousel' | 'video' | 'text' | 'pdf' | 'image';
  engagementRate: number;
  whyItWorked: string;
}

/** Card displaying a single top-performing post with rank, format, and engagement data. */
export function PostCard({ rank, headline, format, engagementRate, whyItWorked }: PostCardProps) {
  return (
    <article className="border-t border-foreground/10 py-12">
      <header className="mb-6 flex items-baseline justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {String(rank).padStart(2, '0')}
        </span>
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {format}
        </span>
      </header>

      <h2 className="mb-6 font-serif text-3xl leading-tight text-foreground">
        {headline}
      </h2>

      <div className="mb-6 flex items-baseline gap-4">
        <span className="font-serif text-4xl">{engagementRate}%</span>
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          engagement rate
        </span>
      </div>

      <p className="font-serif text-lg italic text-foreground/80">
        {whyItWorked}
      </p>
    </article>
  );
}
