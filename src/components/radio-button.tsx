import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

const radioButton = tv({
  base: [
    "w-fit px-5 py-2 rounded-lg border transition-colors",
    "text-base/6 font-normal",
  ],

  variants: {
    checked: {
      true: [
        "bg-gray-600 border-yellow text-yellow",
        "pointer-events-none",
        "hover:bg-gray-500",
        "cursor-pointer",
      ],
      false: "",
    },

    disabled: {
      true: [
        "bg-transparent border-gray-600 text-gray-500",
        "pointer-events-none",
      ],
      false: "",
    },
  },

  compoundVariants: [
    {
      checked: false,
      disabled: false,
      class: [
        "bg-gray-600 border-gray-500 text-gray-200",
        "hover:bg-gray-500",
        "cursor-pointer",
      ],
    },
  ],

  defaultVariants: {
    checked: false,
    disabled: false,
  },
});

interface RadioButtonProps {
  label: string;
  value: string;
  name: string;
  checked: boolean;
  disabled?: boolean;
  onChange: ComponentProps<"input">["onChange"];
}

export function RadioButton({
  label,
  value,
  name,
  checked = false,
  disabled = false,
  onChange,
}: RadioButtonProps) {
  return (
    <label className={radioButton({ checked, disabled })}>
      {label}
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="sr-only"
      />
    </label>
  );
}
