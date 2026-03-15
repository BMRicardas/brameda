import type {
  ItemListStructuredData,
  OrganizationStructuredData,
  ProductStructuredData,
} from "@/types";

import { COMPANY } from "@/constants";
import { renderRichTextToPlainText } from "@/lib/rich-text";

import type { Product } from "../schemas/contentful-transformed.types";

import { getMainPhotoUrl } from ".";

export function getCountryCode(
  country: "Jungtinė Karalystė" | "Vokietija" | "Kinija" | "Lietuva",
) {
  switch (country) {
    case "Jungtinė Karalystė":
      return "GB";
    case "Vokietija":
      return "DE";
    case "Kinija":
      return "CN";
    case "Lietuva":
      return "LT";
  }
}

export const ORGANIZATION_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.NAME,
  url: COMPANY.URL,
  logo: `${COMPANY.URL}/favicon.ico`,
  description: COMPANY.ABOUT_US,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.ADDRESS.STREET,
    addressLocality: COMPANY.ADDRESS.CITY,
    postalCode: COMPANY.ADDRESS.POST_CODE,
    addressCountry: getCountryCode(COMPANY.ADDRESS.COUNTRY),
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: COMPANY.PHONE,
    contactType: "sales",
    email: COMPANY.EMAIL,
    availableLanguage: ["Lithuanian", "Russian", "English"],
  },
} satisfies OrganizationStructuredData;

export function getProductStructuredData(
  product: Product,
  url: string,
): ProductStructuredData {
  const mainPhotoUrl = getMainPhotoUrl(product.mainPhoto.url);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    url,
    image: mainPhotoUrl,
    description: renderRichTextToPlainText(product.description),
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    manufacturer: {
      "@type": "Organization",
      name: product.brand,
      address: {
        "@type": "PostalAddress",
        addressCountry: getCountryCode(product.country),
      },
    },
    offers: {
      "@type": "Offer",
      ...(product.priceWithoutVat && {
        priceSpecification: {
          "@type": "PriceSpecification",
          price: product.priceWithoutVat,
          priceCurrency: "EUR",
          valueAddedTaxIncluded: false,
        },
      }),
      seller: {
        "@type": "Organization",
        name: COMPANY.NAME,
      },
      availability: "https://schema.org/InStoreOnly",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

export function getItemListStructuredData(
  products: Product[],
): ItemListStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${COMPANY.NAME} produktų katalogas`,
    url: COMPANY.URL,
    numberOfItems: products.length,
    itemListOrder: "https://schema.org/ItemListUnordered",
    itemListElement: products.map((product, index) => {
      const mainPhotoUrl = getMainPhotoUrl(product.mainPhoto.url);

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.title,
          url: `${COMPANY.URL}/products/${product.slug}/`,
          image: mainPhotoUrl,
        },
      };
    }),
  };
}
