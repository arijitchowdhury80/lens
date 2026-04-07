'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/** Available top-level navigation modes (Editorial and Explore). */
const modes = [
  { label: 'Editorial', href: '/editorial' },
  { label: 'Explore', href: '/explore' },
] as const;

/** Sticky top navigation bar with wordmark, mode tabs, and entity selector. */
export function TopBar() {
  const pathname = usePathname() ?? '';

  const activeMode = modes.find((m) => pathname.startsWith(m.href))?.href ?? '/editorial';

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* Wordmark */}
        <Link href="/" className="font-serif text-xl tracking-tight" style={{ color: 'var(--lens-fg)' }}>
          LENS
        </Link>

        {/* Mode tabs */}
        <nav className="flex gap-1 rounded-lg bg-gray-100 p-1">
          {modes.map((mode) => (
            <Link
              key={mode.href}
              href={mode.href}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                activeMode === mode.href
                  ? 'bg-white text-[var(--lens-fg)] shadow-sm'
                  : 'text-[var(--lens-muted)] hover:text-[var(--lens-fg)]'
              }`}
            >
              {mode.label}
            </Link>
          ))}
        </nav>

        {/* Right side: entity selector + profile */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm text-[var(--lens-fg)] hover:bg-gray-50"
          >
            Algolia
            <svg className="h-3 w-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-[var(--lens-muted)]">
            AC
          </div>
        </div>
      </div>
    </header>
  );
}
