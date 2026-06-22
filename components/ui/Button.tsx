"use client";

import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "danger" | "success";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-green-500 text-white active:bg-green-600 disabled:bg-gray-300",
  secondary: "bg-white text-gray-700 border-2 border-gray-200 active:bg-gray-50",
  danger: "bg-red-500 text-white active:bg-red-600",
  success: "bg-green-500 text-white active:bg-green-600",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`h-14 w-full rounded-2xl text-base font-bold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
