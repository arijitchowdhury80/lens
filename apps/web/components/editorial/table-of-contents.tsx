interface TocItem {
  label: string;
  href: string | null;
}

const TOC_ITEMS: TocItem[] = [
  { label: 'Cover', href: '#cover' },
  { label: "Editor's Note", href: '#opener' },
  { label: '§ 1 \u2013 The Thesis', href: '#thesis' },
  { label: '§ 2 \u2013 What Performed', href: '#what-performed' },
  { label: '§ 3 \u2013 Cohort Comparison', href: null },
  { label: '§ 4 \u2013 Named Engagers', href: null },
  { label: '§ 5 \u2013 Network Movements', href: null },
  { label: 'The Closer', href: null },
  { label: 'Colophon', href: null },
];

/** Floating table of contents sidebar for the Weekly Issue. */
export function TableOfContents() {
  return (
    <nav
      aria-label="Issue contents"
      className="fixed right-8 top-32 hidden w-56 lg:block"
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Contents
      </p>
      <ol className="space-y-3">
        {TOC_ITEMS.map((item) => (
          <li key={item.label}>
            {item.href ? (
              <a
                href={item.href}
                className="font-serif text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ) : (
              <span className="font-serif text-sm text-foreground/30">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
