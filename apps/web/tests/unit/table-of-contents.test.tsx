import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { TableOfContents } from '@/components/editorial/table-of-contents';

afterEach(() => {
  cleanup();
});

describe('TableOfContents component', () => {
  it('test_toc_renders_allNineSectionLabels', () => {
    render(<TableOfContents />);
    expect(screen.getByText('Cover')).toBeDefined();
    expect(screen.getByText(/Editor/)).toBeDefined();
    expect(screen.getByText(/The Thesis/)).toBeDefined();
    expect(screen.getByText(/What Performed/)).toBeDefined();
    expect(screen.getByText(/Cohort Comparison/)).toBeDefined();
    expect(screen.getByText(/Named Engagers/)).toBeDefined();
    expect(screen.getByText(/Network Movements/)).toBeDefined();
    expect(screen.getByText(/The Closer/)).toBeDefined();
    expect(screen.getByText('Colophon')).toBeDefined();
  });

  it('test_toc_implementedSections_haveLinks', () => {
    const { container } = render(<TableOfContents />);
    const links = container.querySelectorAll('a');
    expect(links.length).toBe(4);
  });

  it('test_toc_unimplementedSections_haveNoLinks', () => {
    const { container } = render(<TableOfContents />);
    const spans = container.querySelectorAll('ol span');
    expect(spans.length).toBe(5);
  });

  it('test_toc_implementedLinks_haveCorrectHrefs', () => {
    const { container } = render(<TableOfContents />);
    const links = container.querySelectorAll('a');
    const hrefs = Array.from(links).map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('#cover');
    expect(hrefs).toContain('#opener');
    expect(hrefs).toContain('#thesis');
    expect(hrefs).toContain('#what-performed');
  });
});
