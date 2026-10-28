import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "outline-dark" | "soft";
type Size = "sm" | "md";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-ink hover:bg-primary-600",
  outline:
    "border-2 border-primary text-primary-700 hover:border-primary hover:bg-primary hover:text-ink",
  "outline-dark":
    "border-2 border-ink text-ink hover:bg-ink hover:text-white",
  soft: "bg-primary/10 text-primary-700 hover:bg-primary/25",
};

const sizes: Record<Size, string> = {
  sm: "min-h-11 px-4 text-xs lg:min-h-9",
  md: "min-h-[50px] px-6 text-base sm:px-9",
};

interface StyleProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: StyleProps = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: StyleProps & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonStyles({ variant, size, className })} {...props} />
  );
}
