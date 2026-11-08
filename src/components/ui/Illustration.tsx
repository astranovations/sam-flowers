import type { CSSProperties } from "react";

type Props = {
  name: string; // base file name, e.g. "b1-pivoines"
  alt?: string;
  className?: string;
  style?: CSSProperties;
  eager?: boolean;
  priority?: "high" | "low";
  onLoad?: () => void;
};

/**
 * Shows /images/<name>.png. If the real illustration is not there yet,
 * falls back to /images/placeholders/<name>.svg.
 */
export default function Illustration({ name, alt = "", className, style, eager, priority, onLoad }: Props) {
  return (
    <img
      className={className}
      style={style}
      src={`/images/${name}.png`}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority}
      onLoad={onLoad}
      onError={(e) => {
        const img = e.currentTarget;
        img.onerror = null;
        img.src = `/images/placeholders/${name}.svg`;
      }}
    />
  );
}
