//
export const COMPANY = {
  NAME: "UAB „Brameda“",
  ABOUT_US: `Platiname pažangias avalynę padengiančias mašinas, firmos Swimsuit Dryers Company maudymosi kostiumėlių džiovintuvus, modernius pėdų dezinfekatorius.

UAB „Brameda“ savo veiklą pradėjo 1991 m. Šiuo metu atstovaujame gerai žinomus prekių ženklus. Platiname Anglijos gamintojo „Swimsuit Dryers Company“ maudymosi kostiumėlių džiovintuvus, „Quen“ pažangius avalynę padengiančius aparatus, Vokietijos gamintojo „Ophardt“ modernius pėdų dezinfekatorius.`,
  URL: "https://www.brameda.lt",
  EMAIL: "info@brameda.lt",
  PHONE: "+370 699 36437",
  ADDRESS: {
    STREET: "Senamiesčio g. 102-201",
    CITY: "Panevėžys",
    POST_CODE: "35116",
    COUNTRY: "Lietuva",
  },
} as const;

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

// Contentful
export const CONTENTFUL = {
  ABOUT_US_ID: "35kolZTRCPaSzpJAEPhFrw",
} as const;
