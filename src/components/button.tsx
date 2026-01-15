import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

const button = tv({
  base: [
    "cursor-pointer w-full select-none transition-colors",
    "py-4.5 px-6 bg-yellow border-2 border-transparent rounded-lg hover:border-yellow-light",
    "text-sm/5 font-bold text-gray-900 uppercase",
  ],
  variants: {
    disabled: {
      true: "opacity-30",
      false: null,
    },
  },
});

interface ButtonProps extends ComponentProps<"button"> {
  disabled?: boolean;
}

export function Button({ disabled = false, className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      {...props}
      className={button({ className, disabled })}
    />
  );
}
