import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

import type { TypeProductVariantsSkeleton } from "./product-variants.type";

export interface TypeProductFields {
  slug: EntryFieldTypes.Symbol;
  title: EntryFieldTypes.Symbol;
  order: EntryFieldTypes.Integer;
  mainPhoto: EntryFieldTypes.AssetLink;
  features: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  description: EntryFieldTypes.RichText;
  specifications?: EntryFieldTypes.Object;
  priceWithoutVat?: EntryFieldTypes.Number;
  embeddedYouTubeLink?: EntryFieldTypes.Symbol;
  youTubeVideoId?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  youTubeVideoIDs?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  variants: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeProductVariantsSkeleton>
  >;
  relatedProducts?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeProductSkeleton>
  >;
  displayMode: EntryFieldTypes.Symbol<"all_variants" | "color_selector">;
  brand: EntryFieldTypes.Symbol;
  country: EntryFieldTypes.Symbol;
}

export type TypeProductSkeleton = EntrySkeletonType<
  TypeProductFields,
  "product"
>;
export type TypeProduct<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeProductSkeleton, Modifiers, Locales>;
export type TypeProductWithoutLinkResolutionResponse =
  TypeProduct<"WITHOUT_LINK_RESOLUTION">;
export type TypeProductWithoutUnresolvableLinksResponse =
  TypeProduct<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeProductWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeProduct<"WITH_ALL_LOCALES", Locales>;
export type TypeProductWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeProduct<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeProductWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeProduct<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
