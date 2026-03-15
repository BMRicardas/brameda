import type { HTMLTag } from "astro/types";

export type Theme = "light" | "dark";
export type ColorSelectedEvent = CustomEvent<{ color: string }>;
export type Link = {
  href: string;
  text: string;
};
export type Tag = Extract<HTMLTag, "article" | "section">;

type BaseStructuredData = {
  "@context": "https://schema.org";
  "@type": "Organization" | "Product" | "ItemList";
  name: string;
  url: string;
};

export type OrganizationStructuredData = BaseStructuredData & {
  "@type": "Organization";
  logo: string;
  description: string;
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint: {
    "@type": "ContactPoint";
    telephone: string;
    contactType: "sales";
    email: string;
    availableLanguage: string[];
  };
};

export type ProductStructuredData = BaseStructuredData & {
  "@type": "Product";
  image: string;
  description: string;
  brand: {
    "@type": "Brand";
    name: string;
  };
  manufacturer: {
    "@type": "Organization";
    name: string;
    address: {
      "@type": "PostalAddress";
      addressCountry: string;
    };
  };
  offers: {
    "@type": "Offer";
    priceSpecification?: {
      "@type": "PriceSpecification";
      price: number;
      priceCurrency: "EUR";
      valueAddedTaxIncluded: false;
    };
    seller: {
      "@type": "Organization";
      name: string;
    };
    availability: "https://schema.org/InStoreOnly";
    itemCondition: "https://schema.org/NewCondition";
  };
};

export type ItemListStructuredData = BaseStructuredData & {
  "@type": "ItemList";
  numberOfItems: number;
  itemListOrder: "https://schema.org/ItemListUnordered";
  itemListElement: {
    "@type": "ListItem";
    position: number;
    item: {
      "@type": "Product";
      name: string;
      url: string;
      image: string;
    };
  }[];
};

export type StructuredData =
  | OrganizationStructuredData
  | ProductStructuredData
  | ItemListStructuredData;
