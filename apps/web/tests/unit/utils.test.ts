import { describe, it, expect } from 'vitest';
import { cn, formatPostDate, formatNumber } from '@/lib/utils';

describe('cn utility', () => {
  it('test_cn_singleClass_returnsUnchanged', () => {
    expect(cn('p-4')).toBe('p-4');
  });

  it('test_cn_multipleClasses_mergesCorrectly', () => {
    const result = cn('font-bold', 'text-red-500');
    expect(result).toContain('font-bold');
    expect(result).toContain('text-red-500');
  });

  it('test_cn_conditionalClasses_includesTruthyExcludesFalsy', () => {
    const isActive = true;
    const isDisabled = false;
    const result = cn('base', isActive && 'active', isDisabled && 'disabled');
    expect(result).toContain('base');
    expect(result).toContain('active');
    expect(result).not.toContain('disabled');
  });

  it('test_cn_conditionalFalse_excludesClass', () => {
    const result = cn('base', false && 'hidden');
    expect(result).toBe('base');
  });

  it('test_cn_undefinedInput_handledGracefully', () => {
    const result = cn('base', undefined, null, 'end');
    expect(result).toContain('base');
    expect(result).toContain('end');
  });

  it('test_cn_conflictingTailwind_lastWins', () => {
    // twMerge should deduplicate conflicting Tailwind classes
    const result = cn('p-4', 'p-8');
    expect(result).toBe('p-8');
  });

  it('test_cn_conflictingTailwindColors_lastWins', () => {
    const result = cn('text-red-500', 'text-blue-500');
    expect(result).toBe('text-blue-500');
  });

  it('test_cn_emptyInputs_returnsEmptyString', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('test_cn_objectSyntax_handlesCorrectly', () => {
    const result = cn({ 'font-bold': true, hidden: false });
    expect(result).toContain('font-bold');
    expect(result).not.toContain('hidden');
  });
});

describe('formatPostDate', () => {
  it('test_formatPostDate_formatsISO_toUppercaseLongDate', () => {
    expect(formatPostDate('2026-04-02T14:30:00Z')).toBe('APRIL 2, 2026');
  });

  it('test_formatPostDate_handlesEdgeOfMonth', () => {
    expect(formatPostDate('2026-03-31T23:59:00Z')).toMatch(/^(MARCH 31|APRIL 1), 2026$/);
  });

  it('test_formatNumber_addsThousandSeparators', () => {
    expect(formatNumber(48230)).toBe('48,230');
  });

  it('test_formatNumber_handlesZero', () => {
    expect(formatNumber(0)).toBe('0');
  });

  it('test_formatNumber_handlesLargeNumbers', () => {
    expect(formatNumber(1000000)).toBe('1,000,000');
  });
});
