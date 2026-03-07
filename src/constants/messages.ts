export const ERROR_MESSAGES = {
  FORM_SUBMISSION_FAILED: "Įvyko nenumatyta klaida. Bandykite dar kartą.",
  NETWORK_ERROR:
    "Įvyko tinklo klaida. Patikrinkite savo interneto ryšį ir bandykite dar kartą.",
  VALIDATION_ERROR: "Prašome patikrinti duomenis ir bandyti dar kartą.",
  MISSING_CONTACT_INFO:
    "Įveskite bent vieną kontaktinį duomenį: telefoną arba el. paštą.",
} as const;

export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: "Jūsų žinutė nusiųsta. Ačiū!",
} as const;
