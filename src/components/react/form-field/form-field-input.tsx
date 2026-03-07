import { useId } from "react";

import { Input, type InputProps } from "../input";
import { FormField } from "./form-field";

type Props = InputProps & { label?: string; errorMessage?: string };

export function FormFieldInput({ label, errorMessage, ...rest }: Props) {
  const id = useId();
  const hasError = Boolean(errorMessage);

  return (
    <FormField htmlFor={id} label={label} errorMessage={errorMessage}>
      <Input id={id} aria-invalid={hasError || undefined} {...rest} />
    </FormField>
  );
}
