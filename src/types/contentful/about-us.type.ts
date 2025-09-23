import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

/**
 * Fields type definition for content type 'TypeAboutUs'
 * @name TypeAboutUsFields
 * @type {TypeAboutUsFields}
 * @memberof TypeAboutUs
 */
export interface TypeAboutUsFields {
  /**
   * Field type definition for field 'aboutUs' (Apie mus)
   * @name Apie mus
   * @localized false
   */
  aboutUs: EntryFieldTypes.RichText;
}

/**
 * Entry skeleton type definition for content type 'aboutUs' (about-us)
 * @name TypeAboutUsSkeleton
 * @type {TypeAboutUsSkeleton}
 * @author 2GqZ7dBVhhscVgaXCLGmAa
 * @since 2025-09-23T03:00:08.075Z
 * @version 1
 */
export type TypeAboutUsSkeleton = EntrySkeletonType<
  TypeAboutUsFields,
  "aboutUs"
>;
/**
 * Entry type definition for content type 'aboutUs' (about-us)
 * @name TypeAboutUs
 * @type {TypeAboutUs}
 * @author Ričardas Brazdžius<ricardas.brazdzius@gmail.com>
 * @since 2025-09-23T03:00:08.075Z
 * @version 1
 * @link https://app.contentful.com/spaces/cowmzwzvcxvm/environments/master/content_types/aboutUs
 */
export type TypeAboutUs<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeAboutUsSkeleton, Modifiers, Locales>;

export function isTypeAboutUs<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeAboutUs<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "aboutUs";
}

export type TypeAboutUsWithoutLinkResolutionResponse =
  TypeAboutUs<"WITHOUT_LINK_RESOLUTION">;
export type TypeAboutUsWithoutUnresolvableLinksResponse =
  TypeAboutUs<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeAboutUsWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeAboutUs<"WITH_ALL_LOCALES", Locales>;
export type TypeAboutUsWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeAboutUs<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeAboutUsWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeAboutUs<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
