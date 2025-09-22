import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypeProductVariantsSkeleton } from "./product-variants.type";

/**
 * Fields type definition for content type 'TypeProduct'
 * @name TypeProductFields
 * @type {TypeProductFields}
 * @memberof TypeProduct
 */
export interface TypeProductFields {
  /**
   * Field type definition for field 'slug' (slug)
   * @name slug
   * @localized false
   */
  slug: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'title' (Pavadinimas)
   * @name Pavadinimas
   * @localized false
   */
  title: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'order' (Išsidėstymo eiliškumas)
   * @name Išsidėstymo eiliškumas
   * @localized false
   */
  order: EntryFieldTypes.Integer;
  /**
   * Field type definition for field 'inStock' (Yra sandėlyje)
   * @name Yra sandėlyje
   * @localized false
   */
  inStock: EntryFieldTypes.Boolean;
  /**
   * Field type definition for field 'mainPhoto' (Pagrindinė nuotrauka)
   * @name Pagrindinė nuotrauka
   * @localized false
   */
  mainPhoto: EntryFieldTypes.AssetLink;
  /**
   * Field type definition for field 'features' (Savybės)
   * @name Savybės
   * @localized false
   */
  features: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  /**
   * Field type definition for field 'description' (Aprašymas)
   * @name Aprašymas
   * @localized false
   */
  description: EntryFieldTypes.RichText;
  /**
   * Field type definition for field 'specifications' (Specifikacijos)
   * @name Specifikacijos
   * @localized false
   */
  specifications?: EntryFieldTypes.Object;
  /**
   * Field type definition for field 'priceWithoutVat' (Kaina be PVM)
   * @name Kaina be PVM
   * @localized false
   */
  priceWithoutVat?: EntryFieldTypes.Number;
  /**
   * Field type definition for field 'embeddedYouTubeLink' (YouTube nuoroda)
   * @name YouTube nuoroda
   * @localized false
   */
  embeddedYouTubeLink?: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'variants' (Variantai)
   * @name Variantai
   * @localized false
   */
  variants: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeProductVariantsSkeleton>
  >;
  /**
   * Field type definition for field 'relatedProducts' (Susiję produktai)
   * @name Susiję produktai
   * @localized false
   */
  relatedProducts?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeProductSkeleton>
  >;
  /**
   * Field type definition for field 'displayMode' (Rodymo režimas)
   * @name Rodymo režimas
   * @localized false
   */
  displayMode: EntryFieldTypes.Symbol<"all_variants" | "color_selector">;
}

/**
 * Entry skeleton type definition for content type 'product' (product)
 * @name TypeProductSkeleton
 * @type {TypeProductSkeleton}
 * @author 2GqZ7dBVhhscVgaXCLGmAa
 * @since 2024-07-11T17:53:19.244Z
 * @version 123
 */
export type TypeProductSkeleton = EntrySkeletonType<
  TypeProductFields,
  "product"
>;
/**
 * Entry type definition for content type 'product' (product)
 * @name TypeProduct
 * @type {TypeProduct}
 * @author Ričardas Brazdžius<ricardas.brazdzius@gmail.com>
 * @since 2024-07-11T17:53:19.244Z
 * @version 123
 * @link https://app.contentful.com/spaces/cowmzwzvcxvm/environments/master/content_types/product
 */
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
