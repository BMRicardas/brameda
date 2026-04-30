import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export type TypeAboutUsFields = {
  aboutUs: EntryFieldTypes.RichText;
};

export type TypeAboutUsSkeleton = EntrySkeletonType<
  TypeAboutUsFields,
  "aboutUs"
>;
export type TypeAboutUs<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeAboutUsSkeleton, Modifiers, Locales>;
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
