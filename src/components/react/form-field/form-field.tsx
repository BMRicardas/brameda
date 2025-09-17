import { ErrorMessage } from "@hookform/error-message";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { InputErrorMessage } from "../input-error-message/input-error-message";

import "./form-field.css";

type Props = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel";
  as?: "input" | "textarea";
  register: UseFormRegister<any>;
  errors: FieldErrors;
};

export function FormField({
  name,
  label,
  type = "text",
  as: Component = "input",
  register,
  errors,
}: Props) {
  const hasError = !!errors[name];

  return (
    <div className="form-field-group">
      <label htmlFor={name} className="form-field-label">
        {label}
      </label>
      <div className="form-field-input-group">
        <Component
          id={name}
          type={type}
          className={`form-field-input ${Component === "textarea" ? "-textarea" : ""}`}
          aria-invalid={hasError}
          {...register(name)}
        />
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <InputErrorMessage>{message}</InputErrorMessage>
          )}
        />
      </div>
    </div>
  );
}
