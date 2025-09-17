import type { FormState } from "../contact-form/contact-form-react";
import { SubmitAnimation } from "../submit-animation/submit-animation";

import "./submit-button.css";

type Props = {
  formState: FormState;
};

export function SubmitButton({ formState }: Props) {
  const buttonLabel = () => {
    switch (formState) {
      case "idle":
        return "Siųsti žinutę";
      case "loading":
        return (
          <>
            Siunčiama
            <SubmitAnimation formState={formState} />
          </>
        );
      case "success":
        return (
          <>
            Žinutė išsiųsta
            <SubmitAnimation formState={formState} />
          </>
        );
      case "error":
        return (
          <>
            Nepavyko išsiųsti
            <SubmitAnimation formState={formState} />
          </>
        );
      default:
        return formState satisfies never;
    }
  };

  return (
    <button
      className="btn btn-dark -animation"
      disabled={formState !== "idle"}
      type="submit"
    >
      {buttonLabel()}
    </button>
  );
}
