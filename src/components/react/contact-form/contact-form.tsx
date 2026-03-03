import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitButton } from "@/components/react/submit-button";
import { InputErrorMessage } from "@/components/react/input-error-message";
import {
  FormSchema,
  MESSAGE_MAX_LENGTH,
  type FormInput,
  type FormState,
} from "@/schemas/contact-form.types";
import { FORM_RESET_TIMEOUT } from "@/constants";
import { Input } from "../input";
import { FormFieldInput } from "../form-field/form-field-input";
import { FormFieldTextarea } from "../form-field/form-field-textarea";
import "./contact-form.css";

type Props = { web3formsPublicAccessKey: string };

export function ContactForm({ web3formsPublicAccessKey }: Props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, reset, setError, clearErrors, formState } =
    useForm<FormInput>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        access_key: web3formsPublicAccessKey,
        botcheck: "",
        name: "",
        phone: "",
        email: "",
        message: "",
      },
    });
  const controllerRef = useRef<AbortController | null>(null);

  const { errors, isSubmitting } = formState;

  const derivedState = (
    isSubmitting
      ? "loading"
      : isSuccess
        ? "success"
        : errors.root
          ? "error"
          : "idle"
  ) satisfies FormState;

  useEffect(() => {
    return () => controllerRef.current?.abort();
  }, []);

  useEffect(() => {
    if (!isSuccess) return;

    const timer = setTimeout(() => {
      setIsSuccess(false);
    }, FORM_RESET_TIMEOUT);

    return () => clearTimeout(timer);
  }, [isSuccess]);

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    clearErrors();

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const payload = {
      access_key: data.access_key,
      from_name: [data.name, data.email || data.phone]
        .filter(Boolean)
        .join(" - "),
      subject: "Užklausa iš tinklapio",
      vardas: data.name ?? "",
      telefonas: data.phone ?? "",
      "el. paštas": data.email ?? "",
      žinutė: data.message,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) {
        console.error(
          "Web3Forms submission failed",
          response.status,
          response.statusText,
        );
        setError("root", {
          type: "server",
          message: "Įvyko nenumatyta klaida. Bandykite dar kartą.",
        });
        return;
      }

      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Network error while submitting contact form", error);

      if (error instanceof DOMException && error.name === "AbortError") return;

      if (!controllerRef.current?.signal.aborted) {
        setError("root", {
          type: "server",
          message:
            "Įvyko tinklo klaida. Patikrinkite savo interneto ryšį ir bandykite dar kartą.",
        });
      }
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="contact-form">
      <Input
        {...register("access_key")}
        type="hidden"
        value={web3formsPublicAccessKey}
      />

      <Input
        {...register("botcheck")}
        className="hidden"
        style={{ display: "none" }}
        type="checkbox"
      />
      <FormFieldInput
        {...register("name")}
        label="Vardas"
        disabled={isSubmitting}
        errorMessage={errors.name?.message}
      />
      <FormFieldInput
        {...register("phone")}
        type="tel"
        label="Telefonas"
        disabled={isSubmitting}
        errorMessage={errors.phone?.message}
      />
      <FormFieldInput
        {...register("email")}
        type="email"
        label="El. paštas"
        disabled={isSubmitting}
        errorMessage={errors.email?.message}
      />
      <FormFieldTextarea
        {...register("message")}
        label="Žinutė"
        maxLength={MESSAGE_MAX_LENGTH}
        disabled={isSubmitting}
        errorMessage={errors.message?.message}
      />
      <div className="form-footer">
        <SubmitButton formState={derivedState} className="submit-button" />
        {errors.root?.message && (
          <InputErrorMessage>{errors.root.message}</InputErrorMessage>
        )}
      </div>
    </form>
  );
}
