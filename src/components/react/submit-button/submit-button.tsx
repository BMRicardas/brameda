import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { clsx } from "clsx";

import { SubmitAnimation } from "@/components/react/submit-animation";

import type { FormState } from "@/schemas/contact-form.types";

import "./submit-button.css";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  formState: FormState;
  disabled?: boolean;
  className?: string;
};

const LABELS: Record<FormState, { label: string; animation?: FormState }> = {
  idle: { label: "Siųsti žinutę" },
  loading: { label: "Siunčiama", animation: "loading" },
  success: { label: "Žinutė išsiųsta", animation: "success" },
  error: { label: "Nepavyko išsiųsti", animation: "error" },
};

export function SubmitButton({
  formState,
  disabled = false,
  className,
  ...rest
}: Props) {
  const { label, animation } = LABELS[formState];

  return (
    <button
      className={clsx("btn btn-dark -animation", className)}
      type="submit"
      disabled={disabled || formState === "loading"}
      {...rest}
    >
      {label}
      {animation && <SubmitAnimation formState={animation} />}
    </button>
  );
}
