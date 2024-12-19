import { cn } from "@/lib/utils";

export const roundClassNames =
  "relative flex h-12 w-12 shrink-0 place-items-center justify-center overflow-hidden rounded-full";

export default function Rounded({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn(roundClassNames, className)}>{children}</span>;
}
