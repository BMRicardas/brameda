import type { Message } from "react-hook-form";

import { type ReactElement } from "react";

import { InputErrorMessage } from "@/components/react/input-error-message";

import "./form-field.css";

type Props = {
  children: ReactElement;
  htmlFor: string;
  label?: string;
  errorMessage?: Message;
};

export const FormField = ({
  children,
  htmlFor,
  label,
  errorMessage,
}: Props) => {
  const hasError = Boolean(errorMessage);

  return (
    <div className="form-field-group">
      {label && (
        <label htmlFor={htmlFor} className="form-field-label">
          {label}
        </label>
      )}
      <div className="form-field-input-group">
        {children}
        {hasError && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
      </div>
    </div>
  );
};
