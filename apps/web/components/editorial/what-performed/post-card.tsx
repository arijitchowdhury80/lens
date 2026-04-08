import { formatPostDate, formatNumber } from '@/lib/utils';

interface PostCardProps {
  rank: number;
  headline: string;
  format: 'carousel' | 'video' | 'text' | 'pdf' | 'image';
  engagementRate: number;
  whyItWorked: string;
  url: string;
  publishedAt: string;
  impressions: number;
  reactions: number;
  comments: number;
  reposts: number;
  classification: 'customer-proof' | 'vision' | 'how-to' | 'announcement' | 'opinion';
  namedSubject: string | null;
}

/** Card displaying a single top-performing post with rank, format, and engagement data. */
export function PostCard({
  rank,
  headline,
  format,
  engagementRate,
  whyItWorked,
  url,
  publishedAt,
  impressions,
  reactions,
  comments,
  reposts,
  namedSubject,
}: PostCardProps) {
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

      {namedSubject && (
        <p
          data-testid="named-subject-badge"
          className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          {namedSubject.toUpperCase()}
        </p>
      )}

      <h2 className="mb-6 font-serif text-3xl leading-tight text-foreground">
        {headline}
      </h2>

      <div className="mb-6 flex items-baseline gap-4">
        <span className="font-serif text-4xl">{engagementRate}%</span>
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          engagement rate
        </span>
      </div>

      <p className="mb-6 font-mono text-xs tracking-wider text-muted-foreground">
        {formatNumber(impressions)} IMPRESSIONS &middot;{' '}
        {formatNumber(reactions)} REACTIONS &middot;{' '}
        {formatNumber(comments)} COMMENTS &middot;{' '}
        {formatNumber(reposts)} REPOSTS
      </p>

      <div className="mb-6 flex items-baseline justify-between">
        <span className="font-mono text-xs tracking-wider text-muted-foreground">
          {formatPostDate(publishedAt)}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs uppercase tracking-wider text-muted-foreground underline-offset-4 hover:underline"
        >
          VIEW POST &rarr;
        </a>
      </div>

      <p className="font-serif text-lg italic text-foreground/80">
        {whyItWorked}
      </p>
    </article>
  );
}
