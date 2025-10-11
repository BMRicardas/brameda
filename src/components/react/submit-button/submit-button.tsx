import { SubmitAnimation } from "@/components/react/submit-animation/submit-animation";

import type { FormState } from "@/schemas/contact-form.types";

import "./submit-button.css";

type Props = {
  formState: FormState;
  disabled?: boolean;
};

const LABELS: Record<FormState, { label: string; animation?: FormState }> = {
  idle: { label: "Siųsti žinutę" },
  loading: { label: "Siunčiama", animation: "loading" },
  success: { label: "Žinutė išsiųsta", animation: "success" },
  error: { label: "Nepavyko išsiųsti", animation: "error" },
};

export function SubmitButton({ formState, disabled = false }: Props) {
  const { label, animation } = LABELS[formState];

  return (
    <button
      className="btn btn-dark -animation"
      type="submit"
      disabled={disabled || formState === "loading"}
    >
      {label}
      {animation && <SubmitAnimation formState={animation} />}
    </button>
  );
}
