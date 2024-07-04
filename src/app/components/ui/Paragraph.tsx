import { type HTMLAttributes, forwardRef } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "~/lib/utils";

export const paragraphVariants = cva(
  "text-black font-sans tracking-widest dark:text-slate-700 text-center",
  {
    variants: {
      size: {
        xl: "text-xl sm:text-lg lg:text-md",
        lg: "text-lg sm:text-xl lg:text-lg",
        default: "text-base sm:text-lg lg:text-base",
        sm: "text-sm sm:text-base lg:text-sm",
        xs: "text-xs sm:text-sm lg:text-xs",
        xxs: "text-[7.5px] sm:text-xs lg:text-[9px]",
      },
      weight: {
        extralight: "font-extralight",
        light: "font-light",
        medium: "font-medium",
        bold: "font-bold",
        semibold: "font-semibold",
      },
    },

    defaultVariants: {
      size: "default",
      weight: "light",
    },
  },
);

interface ParagraphProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, size, weight, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(paragraphVariants({ size, weight, className }))}
        {...props}
      >
        {children}
      </p>
    );
  },
);

Paragraph.displayName = "Paragraph";

export { Paragraph };
