import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormField } from "@/components/react/form-field";
import { SubmitButton } from "@/components/react/submit-button";
import { InputErrorMessage } from "@/components/react/input-error-message";

import {
  FormSchema,
  type FormInput,
  type FormState,
} from "@/schemas/contact-form.types";

import { FORM_RESET_TIMEOUT } from "@/constants";

import "./contact-form.css";

type Props = { web3formsPublicAccessKey: string };

export function ContactForm({ web3formsPublicAccessKey }: Props) {
  const [state, setState] = useState<FormState>("idle");
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

  const { errors } = formState;

  useEffect(() => {
    return () => controllerRef.current?.abort();
  }, []);

  useEffect(() => {
    if (state !== "success") return;

    const timer = setTimeout(() => {
      setState("idle");
    }, FORM_RESET_TIMEOUT);

    return () => clearTimeout(timer);
  }, [state, setState]);

  function setRootError(message: string) {
    setError("root", { type: "server", message });
    setState("error");

    return;
  }

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    clearErrors();
    setState("loading");

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
      const response = await fetch("https://api.web3forms.com/submit", {
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
        setRootError("Įvyko nenumatyta klaida. Bandykite dar kartą.");
        return;
      } else {
        setState("success");
        reset();
      }
    } catch (error) {
      console.error("Network error while submitting contact form", error);

      if (error instanceof DOMException && error.name === "AbortError") return;

      if (!controllerRef.current?.signal.aborted) {
        setRootError(
          "Įvyko tinklo klaida. Patikrinkite savo interneto ryšį ir bandykite dar kartą.",
        );
      }
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="contact-form">
      <input
        {...register("access_key")}
        type="hidden"
        value={web3formsPublicAccessKey}
      />
      <input
        {...register("botcheck")}
        className="hidden"
        style={{ display: "none" }}
        type="checkbox"
      />
      <FormField
        {...register("name")}
        label="Vardas"
        errorMessage={errors.name?.message}
      />
      <FormField
        {...register("phone")}
        label="Telefonas"
        type="tel"
        errorMessage={errors.phone?.message}
      />
      <FormField
        {...register("email")}
        label="El. paštas"
        type="email"
        errorMessage={errors.email?.message}
      />
      <FormField
        {...register("message")}
        label="Žinutė"
        as="textarea"
        errorMessage={errors.message?.message}
      />
      <div className="form-footer">
        <SubmitButton formState={state} className="submit-button" />
        {errors.root?.message && (
          <InputErrorMessage>{errors.root.message}</InputErrorMessage>
        )}
      </div>
    </form>
  );
}
