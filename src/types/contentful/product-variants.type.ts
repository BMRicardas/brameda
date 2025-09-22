import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

/**
 * Fields type definition for content type 'TypeProductVariants'
 * @name TypeProductVariantsFields
 * @type {TypeProductVariantsFields}
 * @memberof TypeProductVariants
 */
export interface TypeProductVariantsFields {
  /**
   * Field type definition for field 'variantName' (Varianto pavadinimas)
   * @name Varianto pavadinimas
   * @localized false
   */
  variantName: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'color' (Spalva)
   * @name Spalva
   * @localized false
   */
  color: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'inStock' (Yra sandėlyje)
   * @name Yra sandėlyje
   * @localized false
   */
  inStock: EntryFieldTypes.Boolean;
  /**
   * Field type definition for field 'shippingDuration' (Siuntimo trukmė)
   * @name Siuntimo trukmė
   * @localized false
   */
  shippingDuration?: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'photos' (Nuotraukos)
   * @name Nuotraukos
   * @localized false
   */
  photos?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

/**
 * Entry skeleton type definition for content type 'productVariants' (product-variant)
 * @name TypeProductVariantsSkeleton
 * @type {TypeProductVariantsSkeleton}
 * @author 2GqZ7dBVhhscVgaXCLGmAa
 * @since 2024-07-11T20:51:33.068Z
 * @version 83
 */
export type TypeProductVariantsSkeleton = EntrySkeletonType<
  TypeProductVariantsFields,
  "productVariants"
>;
/**
 * Entry type definition for content type 'productVariants' (product-variant)
 * @name TypeProductVariants
 * @type {TypeProductVariants}
 * @author Ričardas Brazdžius<ricardas.brazdzius@gmail.com>
 * @since 2024-07-11T20:51:33.068Z
 * @version 83
 * @link https://app.contentful.com/spaces/cowmzwzvcxvm/environments/master/content_types/productVariants
 */
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
