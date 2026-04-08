import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/** Merge Tailwind CSS class names with conflict resolution via clsx and tailwind-merge. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format an ISO date string as "MONTH D, YYYY" in uppercase */
export function formatPostDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).toUpperCase();
}

/** Format a number with thousand separators */
export function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}
