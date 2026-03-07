import { z } from "astro/zod";

const EnvSchema = z.object({
  CONTENTFUL_SPACE_ID: z.string().min(1, "CONTENTFUL_SPACE_ID is required"),
  CONTENTFUL_DELIVERY_TOKEN: z
    .string()
    .min(1, "CONTENTFUL_DELIVERY_TOKEN is required"),
  CONTENTFUL_PREVIEW_TOKEN: z
    .string()
    .min(1, "CONTENTFUL_PREVIEW_TOKEN is required"),
  WEB3FORMS_PUBLIC_ACCESS_KEY: z
    .string()
    .min(1, "WEB3FORMS_PUBLIC_ACCESS_KEY is required"),
});

type EnvConfig = z.infer<typeof EnvSchema>;

export const getEnv = (): EnvConfig => {
  const result = EnvSchema.safeParse({
    CONTENTFUL_SPACE_ID: import.meta.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_DELIVERY_TOKEN: import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
    CONTENTFUL_PREVIEW_TOKEN: import.meta.env.CONTENTFUL_PREVIEW_TOKEN,
    WEB3FORMS_PUBLIC_ACCESS_KEY: import.meta.env.WEB3FORMS_PUBLIC_ACCESS_KEY,
  });

  if (!result.success) {
    const missingVars = Object.entries(result.error.flatten().fieldErrors)
      .map(([key, errors]) => `${key}: ${errors?.join(", ")}`)
      .join("\n  ");

    throw new Error(
      `Invalid environment configuration:\n  ${missingVars}\n\nPlease check your .env file or deployment secrets.`,
    );
  }

  return result.data;
};

let cachedConfig: EnvConfig | null = null;

export const env = (): EnvConfig => {
  if (!cachedConfig) {
    cachedConfig = getEnv();
  }
  return cachedConfig;
};
