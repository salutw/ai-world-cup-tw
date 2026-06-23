import type { CSSProperties } from "react";

interface ProbabilityBar {
  label: string;
  value: number;
  color?: string;
}

interface ProbabilityBarsProps {
  items: ProbabilityBar[];
}

export function ProbabilityBars({ items }: ProbabilityBarsProps) {
  return (
    <div className="probability-list">
      {items.map((item) => {
        const style = {
          "--bar-value": item.value,
          "--bar-color": item.color ?? "var(--green)"
        } as CSSProperties;

        return (
          <div className="probability-row" key={item.label}>
            <span>{item.label}</span>
            <span className="bar-track" aria-hidden="true">
              <span className="bar-fill" style={style} />
            </span>
            <strong>{Math.round(item.value)}%</strong>
          </div>
        );
      })}
    </div>
  );
}
