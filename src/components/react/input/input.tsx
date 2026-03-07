import {
  forwardRef,
  type DetailedHTMLProps,
  type InputHTMLAttributes,
} from "react";
import "./input.css";
import clsx from "clsx";

export type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, ...rest }, ref) => {
    return <input ref={ref} className={clsx("input", className)} {...rest} />;
  },
);

Input.displayName = "Input";
