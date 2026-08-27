interface SkeletonProps {
  className?: string;
}

/** Shimmering placeholder block — used while real content (photography, copy) is pending. */
export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`animate-shimmer rounded-md ${className}`} aria-hidden="true" />;
}
