import { z } from "astro/zod";

export const FormSchema = z
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

export type FormInput = z.infer<typeof FormSchema>;

export type FormState = "idle" | "loading" | "success" | "error";
