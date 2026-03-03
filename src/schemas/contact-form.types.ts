import { z } from "astro/zod";

const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 250;

export const FormSchema = z
  .object({
    access_key: z.string(),
    botcheck: z.string().optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z
      .union([
        z.string().email("Neteisingas el. pašto formatas"),
        z.literal(""),
      ])
      .optional(),
    message: z
      .string()
      .min(
        MESSAGE_MIN_LENGTH,
        `Žinutė turi būti bent ${MESSAGE_MIN_LENGTH} simbolių`,
      )
      .max(
        MESSAGE_MAX_LENGTH,
        `Žinutė turi būti ne ilgesnė nei ${MESSAGE_MAX_LENGTH} simbolių`,
      ),
  })
  .superRefine(({ phone, email }, ctx) => {
    const hasPhone = !!phone?.trim();
    const hasEmail = !!email?.trim();

    if (!hasPhone && !hasEmail) {
      const message =
        "Įveskite bent vieną kontaktinį duomenį: telefoną arba el. paštą.";

      ctx.addIssue({ path: ["phone"], message, code: z.ZodIssueCode.custom });
      ctx.addIssue({ path: ["email"], message, code: z.ZodIssueCode.custom });
    }
  });

export type FormInput = z.infer<typeof FormSchema>;

export type FormState = "idle" | "loading" | "success" | "error";
