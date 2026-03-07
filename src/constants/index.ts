// Image optimization
export const IMAGE = {
  MAIN_WIDTH: 800,
  THUMBNAIL_WIDTH: 200,
  QUALITY: { main: 50, thumb: 30 },
  MAIN_WIDTHS: [320, 480, 640, 800],
  MAIN_SIZES: "(max-width: 600px) 90vw, (max-width: 900px) 60vw, 448px",
} as const;

// Form behavior
export const FORM = {
  RESET_TIMEOUT: 2000,
} as const;

// Event names
export const EVENTS = {
  COLOR_SELECTED: "colorSelected",
  THUMB_CLICKED: "thumbClicked",
} as const;

// Pricing & shipping
export const PRICING = {
  VAT: 1.21,
} as const;

export const SHIPPING = {
  DEFAULT_DURATION: "3-4 savaitės",
} as const;
