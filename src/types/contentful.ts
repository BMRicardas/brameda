import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

// Product variant

export interface TypeProductVariantsFields {
  variantName: EntryFieldTypes.Symbol;
  color: EntryFieldTypes.Symbol;
  photos: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  stock: EntryFieldTypes.Integer;
  priceWithoutVat: EntryFieldTypes.Number;
  sku?: EntryFieldTypes.Symbol;
  displayOrder?: EntryFieldTypes.Integer;
  isDefault?: EntryFieldTypes.Boolean;
}

export type TypeProductVariantsSkeleton = EntrySkeletonType<
  TypeProductVariantsFields,
  "productVariants"
>;
export type TypeProductVariants<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeProductVariantsSkeleton, Modifiers, Locales>;

export function isTypeProductVariants<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeProductVariants<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "productVariants";
}

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

// Product

export interface TypeProductFields {
  slug: EntryFieldTypes.Symbol;
  title: EntryFieldTypes.Symbol;
  mainPhoto: EntryFieldTypes.AssetLink;
  displayMode: EntryFieldTypes.Symbol<"all_variants" | "color_selector">;
  variants: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeProductVariantsSkeleton>
  >;
  features: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  description: EntryFieldTypes.Text;
  specifications?: EntryFieldTypes.Object;
  embeddedYouTubeLink?: EntryFieldTypes.Symbol;
  relatedProduct?: EntryFieldTypes.EntryLink<TypeProductSkeleton>;
  order?: EntryFieldTypes.Integer;
  isActive?: EntryFieldTypes.Boolean;
  category?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

export type TypeProductSkeleton = EntrySkeletonType<
  TypeProductFields,
  "product"
>;
export type TypeProduct<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeProductSkeleton, Modifiers, Locales>;

export function isTypeProduct<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeProduct<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "product";
}

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
