import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { InputErrorMessage } from "@/components/react/input-error-message";
import { SubmitButton } from "@/components/react/submit-button";
import { FORM } from "@/constants";
import { ERROR_MESSAGES } from "@/constants/messages";
import { env } from "@/lib/env";
import {
  FormSchema,
  MESSAGE_MAX_LENGTH,
  type FormInput,
  type FormState,
} from "@/schemas/contact-form.types";

import { FormFieldInput, FormFieldTextarea } from "../form-field";
import { Input } from "../input";
import "./contact-form.css";

type Props = { web3formsPublicAccessKey?: string };

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim() !== "";

export function ContactForm({ web3formsPublicAccessKey }: Props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const publicKey =
    web3formsPublicAccessKey || env().WEB3FORMS_PUBLIC_ACCESS_KEY;
  const { register, handleSubmit, reset, setError, clearErrors, formState } =
    useForm<FormInput>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        access_key: publicKey,
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
    }, FORM.RESET_TIMEOUT);

    return () => clearTimeout(timer);
  }, [isSuccess]);

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    clearErrors();

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const contactInfo = [data.name, data.email || data.phone].filter(
      isNonEmptyString,
    );
    const from_name =
      contactInfo.length > 0 ? contactInfo.join(" - ") : "Unknown Sender";

    const payload = {
      access_key: data.access_key,
      from_name,
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

      if (controller.signal.aborted) {
        return;
      }

      if (!response.ok) {
        console.error(
          "Web3Forms submission failed",
          response.status,
          response.statusText,
        );
        setError("root", {
          type: "server",
          message: ERROR_MESSAGES.FORM_SUBMISSION_FAILED,
        });
        return;
      }

      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Network error while submitting contact form", error);

      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      if (!controller.signal.aborted) {
        setError("root", {
          type: "server",
          message: ERROR_MESSAGES.NETWORK_ERROR,
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
      <Input {...register("access_key")} type="hidden" value={publicKey} />

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
