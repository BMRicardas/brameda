import {
  createElement,
  useId,
  type DetailedHTMLProps,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import type { Message } from "react-hook-form";

import { InputErrorMessage } from "@/components/react/input-error-message/input-error-message";

import "./form-field.css";
import { mergeClassNames } from "@/utils";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type TextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

type BaseProps = {
  label?: string;
  errorMessage?: Message;
};

type Props =
  | (BaseProps &
      InputProps & {
        as?: "input";
        type?: "text" | "email" | "tel";
        inputClassName?: string;
      })
  | (BaseProps &
      TextAreaProps & {
        as: "textarea";
        textareaClassName?: string;
      });

export function FormField({
  label,
  as = "input",
  errorMessage,
  ...rest
}: Props) {
  const id = useId();
  const hasError = Boolean(errorMessage);

  const customClassName =
    as === "textarea"
      ? (rest as { textareaClassName?: string }).textareaClassName
      : (rest as { inputClassName?: string }).inputClassName;

  const { inputClassName, textareaClassName, ...elementProps } = rest as any;

  const className = mergeClassNames(
    "form-field-input",
    as === "textarea" ? "-textarea" : undefined,
    customClassName,
  );

  const field = createElement(as, {
    id,
    className,
    "aria-invalid": hasError,
    ...elementProps,
  });

  return (
    <div className="form-field-group">
      {label && (
        <label htmlFor={id} className="form-field-label">
          {label}
        </label>
      )}
      <div className="form-field-input-group">
        {field}
        {hasError && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
      </div>
    </div>
  );
}
