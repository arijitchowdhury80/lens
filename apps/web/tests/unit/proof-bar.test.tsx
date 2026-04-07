import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { ProofBar } from '@/components/thesis/proof-bar';

afterEach(() => {
  cleanup();
});

const defaultProps = {
  customerProof: { label: 'Customer proof', percentage: 4.8 },
  vision: { label: 'Vision content', percentage: 2.1 },
};

describe('ProofBar component', () => {
  it('test_proofBar_renders_customerProofLabel', () => {
    render(<ProofBar {...defaultProps} />);
    expect(screen.getByText('Customer proof')).toBeDefined();
  });

  it('test_proofBar_renders_customerProofPercentage', () => {
    render(<ProofBar {...defaultProps} />);
    expect(screen.getByText('4.8%')).toBeDefined();
  });

  it('test_proofBar_renders_visionLabel', () => {
    render(<ProofBar {...defaultProps} />);
    expect(screen.getByText('Vision content')).toBeDefined();
  });

  it('test_proofBar_renders_visionPercentage', () => {
    render(<ProofBar {...defaultProps} />);
    expect(screen.getByText('2.1%')).toBeDefined();
  });

  it('test_proofBar_customerProofBar_isWiderThanVisionBar', () => {
    render(<ProofBar {...defaultProps} />);
    const customerBar = screen.getByTestId('customer-proof-bar');
    const visionBar = screen.getByTestId('vision-bar');
    const customerWidth = parseFloat(customerBar.style.width);
    const visionWidth = parseFloat(visionBar.style.width);
    expect(customerWidth).toBeGreaterThan(visionWidth);
  });
});
