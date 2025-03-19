import type { ReactNode } from "react";

import "./input-error-message.css";

type Props = {
  children: ReactNode;
};

export function InputErrorMessage({ children }: Props) {
  return <small className="error-message">{children}</small>;
}
