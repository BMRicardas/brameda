// import { WEB3FORMS_PUBLIC_ACCESS_KEY } from "astro:env/server";
import { useEffect, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "astro/zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { SubmitButton } from "../submit-button/submit-button";
import { InputErrorMessage } from "../input-error-message/input-error-message";

import "./contact-form-react.css";

const FORM_RESET_TIMEOUT = 2000;

const FormSchema = z.object({
  access_key: z.string(),
  name: z.string().min(1, "Įveskite vardą"),
  phone: z.string().min(1, "Įveskite telefono numerį"),
  email: z
    .string()
    .min(1, "Įveskite el. pašto adresą")
    .email("Įveskite teisingą el. pašto adresą"),
  message: z
    .string()
    .min(10, "Žinutė turi būti bent 10 simbolių")
    .max(500, "Žinutė turi būti ne ilgesnė nei 500 simbolių"),
});

type FormInput = z.infer<typeof FormSchema>;

export type FormState = "idle" | "loading" | "success" | "error";

type Props = { web3formsPublicAccessKey: string };
export function ContactFormReact({ web3formsPublicAccessKey }: Props) {
  const [formState, setFormState] = useState<FormState>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      access_key: web3formsPublicAccessKey,
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const json = JSON.stringify({
      access_key: data.access_key,
      from_name: `${data.name} - ${data.email}`,
      subject: "Užklausa iš tinklapio",
      vardas: data.name,
      telefonas: data.phone,
      "el. paštas": data.email,
      žinutė: data.message,
    });

    try {
      const response = await fetch("https://api.web3forms.com/submi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      if (!response.ok) {
        setFormState("error");
      } else {
        reset();
        setFormState("success");
      }
    } catch (error) {
      console.error("Network error:", error);

      setFormState("error");
    } finally {
      const timer = setTimeout(() => {
        setFormState("idle");
      }, FORM_RESET_TIMEOUT);
      return () => clearTimeout(timer);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="hidden"
        value={web3formsPublicAccessKey}
        {...register("access_key")}
      />
      <input
        className="hidden"
        name="botcheck"
        style={{ display: "none" }}
        type="checkbox"
      />
      <div className="form-group">
        <label className="input-label" htmlFor="name">
          Vardas
        </label>
        <div className="input-group">
          <input
            aria-invalid={!!errors.name}
            className="input"
            id="name"
            type="text"
            {...register("name")}
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => (
              <InputErrorMessage>{message}</InputErrorMessage>
            )}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="phone" className="input-label">
          Telefonas
        </label>
        <div className="input-group">
          <input
            aria-invalid={!!errors.phone}
            className="input"
            id="phone"
            type="tel"
            {...register("phone")}
          />
          <ErrorMessage
            errors={errors}
            name="phone"
            render={({ message }) => (
              <InputErrorMessage>{message}</InputErrorMessage>
            )}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email" className="input-label">
          El. paštas
        </label>
        <div className="input-group">
          <input
            aria-invalid={!!errors.email}
            className="input"
            id="email"
            type="email"
            {...register("email")}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <InputErrorMessage>{message}</InputErrorMessage>
            )}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="message" className="input-label">
          Žinutė
        </label>
        <div className="input-group">
          <textarea
            aria-invalid={!!errors.message}
            className="input textarea"
            id="message"
            {...register("message")}
          />
          <ErrorMessage
            errors={errors}
            name="message"
            render={({ message }) => (
              <InputErrorMessage>{message}</InputErrorMessage>
            )}
          />
        </div>
      </div>
      <div className="button-container">
        <SubmitButton formState={formState} />
      </div>
    </form>
  );
}
