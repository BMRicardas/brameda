import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export type TypeProductFields = {
  slug: EntryFieldTypes.Symbol;
  title: EntryFieldTypes.Symbol;
  order: EntryFieldTypes.Integer;
  inStock: EntryFieldTypes.Boolean;
  mainPhoto: EntryFieldTypes.Object;
  features: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  description: EntryFieldTypes.Text;
  specifications?: EntryFieldTypes.Object;
  priceWithoutVat?: EntryFieldTypes.Number;
  embeddedYouTubeLink?: EntryFieldTypes.Symbol;
  variants: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeProductVariantsSkeleton>
  >;
  relatedProducts?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeProductSkeleton>
  >;
  displayMode: EntryFieldTypes.Symbol<"all_variants" | "color_selector">;
};

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

export type TypeProductVariantsFields = {
  variantName: EntryFieldTypes.Symbol;
  color: EntryFieldTypes.Symbol;
  photos: EntryFieldTypes.Object;
  priceWithoutVat?: EntryFieldTypes.Number;
  inStock: EntryFieldTypes.Boolean;
  shippingDuration?: EntryFieldTypes.Symbol;
};

export type TypeProductVariantsSkeleton = EntrySkeletonType<
  TypeProductVariantsFields,
  "productVariants"
>;
export type TypeProductVariants<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeProductVariantsSkeleton, Modifiers, Locales>;
export type TypeProductVariantsWithoutLinkResolutionResponse =
  TypeProductVariants<"WITHOUT_LINK_RESOLUTION">;
export type TypeProductVariantsWithoutUnresolvableLinksResponse =
  TypeProductVariants<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeProductVariantsWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeProductVariants<"WITH_ALL_LOCALES", Locales>;
export type TypeProductVariantsWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeProductVariants<
  "WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES",
  Locales
>;
export type TypeProductVariantsWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeProductVariants<
  "WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES",
  Locales
>;
