import type { ReactNode } from "react";
import { clsx } from "clsx";

import "./input-error-message.css";

type Props = {
  children: ReactNode;
  className?: string;
};

export function InputErrorMessage({ children, className }: Props) {
  return (
    <small
      className={clsx("error-message", className)}
      role="alert"
      aria-live="assertive"
    >
      {children}
    </small>
  );
}
