import { useId } from "react";

import { Textarea, type TextareaProps } from "../textarea";
import { FormField } from "./form-field";

type Props = TextareaProps & { label?: string; errorMessage?: string };

export function FormFieldTextarea({ label, errorMessage, ...rest }: Props) {
  const id = useId();
  const hasError = Boolean(errorMessage);

  return (
    <FormField htmlFor={id} label={label} errorMessage={errorMessage}>
      <Textarea id={id} aria-invalid={hasError || undefined} {...rest} />
    </FormField>
  );
}
