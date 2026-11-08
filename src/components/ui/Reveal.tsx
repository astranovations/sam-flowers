import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type Props = {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
};

/** Fades and lifts its content in when it enters the viewport. */
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children }: Props) {
  const ref = useRef<HTMLElement>(null);
  // Kept in state (not added with classList) so re-renders of the parent,
  // e.g. toggling a card open, do not wipe the "in" class.
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "in" : ""} ${className}`}
      style={{ "--d": `${delay}s` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
