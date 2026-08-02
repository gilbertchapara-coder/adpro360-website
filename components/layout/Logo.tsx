import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

// Source PNG is 2950×1976 (aspect ratio ≈ 1.493). width/height below give
// next/image the right intrinsic ratio at each of the source's two display
// heights (34px header/menu, 44px footer) — actual size is set by the
// className height, these just prevent layout shift while it loads.
const dimensionsBySize = {
  sm: { width: 51, height: 34 },
  lg: { width: 66, height: 44 },
} as const;

const logoVariants = cva("block w-auto", {
  variants: {
    size: {
      sm: "h-s24", // 34px
      lg: "h-s26", // 44px
    },
    tone: {
      normal: "",
      brightened: "brightness-115",
    },
  },
  defaultVariants: {
    size: "sm",
    tone: "normal",
  },
});

type LogoProps = VariantProps<typeof logoVariants> & { className?: string };

export function Logo({ size = "sm", tone, className }: LogoProps) {
  const { width, height } = dimensionsBySize[size ?? "sm"];
  return (
    <Image
      src="/assets/adpro-mark.png"
      alt="AdPro 360"
      width={width}
      height={height}
      priority
      className={cn(logoVariants({ size, tone }), className)}
    />
  );
}
