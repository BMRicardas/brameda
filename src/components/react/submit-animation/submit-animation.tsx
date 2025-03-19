import { ErrorCheckmark } from "../checkmarks/error-checkmark";
import { SuccessCheckmark } from "../checkmarks/success-checkmark";
import type { FormState } from "../contact-form/contact-form-react";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";

import "./submit-animation.css";

type Props = {
  formState: FormState;
};

export function SubmitAnimation({ formState }: Props) {
  if (formState === "loading") {
    return (
      <div className="spinner-wrapper">
        <LoadingSpinner />
      </div>
    );
  }

  if (formState === "success") {
    return (
      <div className="wrapper">
        <SuccessCheckmark />
      </div>
    );
  }

  if (formState === "error") {
    return (
      <div className="wrapper">
        <ErrorCheckmark />
      </div>
    );
  }

  return null;
}
