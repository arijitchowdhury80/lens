interface ProofBarProps {
  customerProof: {
    label: string;
    percentage: number;
  };
  vision: {
    label: string;
    percentage: number;
  };
}

export function ProofBar({ customerProof, vision }: ProofBarProps) {
  const maxPercentage = Math.max(customerProof.percentage, vision.percentage);
  const customerProofWidth = (customerProof.percentage / maxPercentage) * 100;
  const visionWidth = (vision.percentage / maxPercentage) * 100;

  return (
    <div className="my-16 space-y-8">
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {customerProof.label}
          </span>
          <span className="font-serif text-2xl">{customerProof.percentage}%</span>
        </div>
        <div
          className="h-3 bg-foreground"
          style={{ width: `${customerProofWidth}%` }}
          data-testid="customer-proof-bar"
        />
      </div>
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {vision.label}
          </span>
          <span className="font-serif text-2xl">{vision.percentage}%</span>
        </div>
        <div
          className="h-3 bg-foreground/30"
          style={{ width: `${visionWidth}%` }}
          data-testid="vision-bar"
        />
      </div>
    </div>
  );
}
