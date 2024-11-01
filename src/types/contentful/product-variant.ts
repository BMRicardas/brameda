import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

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
