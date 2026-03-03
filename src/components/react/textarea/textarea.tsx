import {
  forwardRef,
  useState,
  type DetailedHTMLProps,
  type TextareaHTMLAttributes,
} from "react";
import { mergeClassNames } from "@/utils";
import "./textarea.css";

export type Props = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, onChange, maxLength, ...rest }, ref) => {
    const [charCount, setCharCount] = useState(0);

    return (
      <div className="textarea-wrapper">
        <textarea
          ref={ref}
          className={mergeClassNames("textarea", className)}
          maxLength={maxLength}
          onChange={(e) => {
            setCharCount(e.target.value.length);
            onChange?.(e);
          }}
          {...rest}
        />
        {maxLength !== undefined && (
          <span
            className="char-count"
            aria-live="polite"
            aria-label={`${charCount} of ${maxLength} characters used`}
          >
            {charCount}/{maxLength}
          </span>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
