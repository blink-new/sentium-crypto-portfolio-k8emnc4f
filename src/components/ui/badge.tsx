import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
  {
    variants: {
      variant: {
        default: "bg-[#0066ff0f] text-[#0066ff] ring-[#0066ff33]",
        outline: "bg-transparent ring-[#0066ff33] text-[#e2ebfb]",
        boosted: "bg-[#0066ff0f] text-[#36aef2] ring-[#0066ff33]",
        warning: "bg-[rgba(225,255,0,0.1)] text-[#E1FF00] ring-[rgba(225,255,0,0.2)]",
        danger: "bg-[rgba(227,45,60,0.1)] text-[#E32D3C] ring-[rgba(227,45,60,0.2)]",
        success: "bg-[rgba(64,182,107,0.1)] text-[#40B66B] ring-[rgba(64,182,107,0.2)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };