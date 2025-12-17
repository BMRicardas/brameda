import { ErrorCheckmark } from "@/components/react/checkmarks";
import { SuccessCheckmark } from "@/components/react/checkmarks";
import { LoadingSpinner } from "@/components/react/loading-spinner";
import type { FormState } from "@/schemas/contact-form.types";

import "./submit-animation.css";

type Props = {
  formState: FormState;
};

export function SubmitAnimation({ formState }: Props) {
  switch (formState) {
    case "idle":
      return null;
    case "loading":
      return (
        <div className="spinner-wrapper">
          <LoadingSpinner size="small" />
        </div>
      );
    case "success":
      return (
        <div className="wrapper">
          <SuccessCheckmark />
        </div>
      );
    case "error":
      return (
        <div className="wrapper">
          <ErrorCheckmark />
        </div>
      );
    default:
      return formState satisfies never;
  }
}
