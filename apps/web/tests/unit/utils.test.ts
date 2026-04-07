import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

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
