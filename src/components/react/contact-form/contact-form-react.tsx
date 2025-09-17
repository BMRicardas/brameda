// import { WEB3FORMS_PUBLIC_ACCESS_KEY } from "astro:env/server";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "astro/zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormField } from "../form-field/form-field";
import { SubmitButton } from "../submit-button/submit-button";

import "./contact-form-react.css";

const FORM_RESET_TIMEOUT = 2000;

const FormSchema = z
  .object({
    access_key: z.string(),
    botcheck: z.string().optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    message: z
      .string()
      .min(10, "Žinutė turi būti bent 10 simbolių")
      .max(500, "Žinutė turi būti ne ilgesnė nei 500 simbolių"),
  })
  .superRefine(({ phone, email }, ctx) => {
    if (!phone && !email) {
      const message =
        "Įveskite bent vieną kontaktinį duomenį: telefoną arba el. paštą.";

      ctx.addIssue({
        path: ["phone"],
        message,
        code: z.ZodIssueCode.custom,
      });
      ctx.addIssue({
        path: ["email"],
        message,
        code: z.ZodIssueCode.custom,
      });
    }

    if (email && z.string().email().safeParse(email).error) {
      ctx.addIssue({
        path: ["email"],
        message: "Neteisingas el. pašto formatas",
        code: z.ZodIssueCode.custom,
      });
    }
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
    formState: { errors },
  } = useForm<FormInput>({
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

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setFormState("loading");

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
      const response = await fetch("https://api.web3forms.com/submit", {
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
      console.error(
        "A network or unexpected error occurred during submission:",
        error,
      );

      setFormState("error");
    } finally {
      const timer = setTimeout(() => {
        setFormState("idle");
      }, FORM_RESET_TIMEOUT);

      return () => clearTimeout(timer);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <input
        type="hidden"
        value={web3formsPublicAccessKey}
        {...register("access_key")}
      />
      <input
        className="hidden"
        style={{ display: "none" }}
        type="checkbox"
        {...register("botcheck")}
      />
      <FormField
        name="name"
        label="Vardas"
        register={register}
        errors={errors}
      />
      <FormField
        name="phone"
        label="Telefonas"
        type="tel"
        register={register}
        errors={errors}
      />
      <FormField
        name="email"
        label="El. paštas"
        type="email"
        register={register}
        errors={errors}
      />
      <FormField
        name="message"
        label="Žinutė"
        as="textarea"
        register={register}
        errors={errors}
      />
      <div className="button-container">
        <SubmitButton formState={formState} />
      </div>
    </form>
  );
}
