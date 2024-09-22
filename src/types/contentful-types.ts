import type { contentfulClient } from "@/lib/contentful";
import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, FieldsType, LocaleCode } from "contentful";

// type InferResponseType<T extends EntrySkeletonType<FieldsType, string>> = Awaited<ReturnType<typeof contentfulClient.getEntries<T>>>
type WithoutUnresolvableResponse<T extends EntrySkeletonType<FieldsType, string>> = Entry<T, 'WITHOUT_UNRESOLVABLE_LINKS'>;

// Product Types

// export type ProductResponseType = InferResponseType<TypeProductSkeleton>;
export type ProductResponseType = WithoutUnresolvableResponse<TypeProductSkeleton>;

export interface TypeProductFields {
    slug: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    mainPhoto: EntryFieldTypes.AssetLink;
    displayMode: EntryFieldTypes.Symbol<"all_variants" | "color_selector">;
    variants: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeProductVariantsSkeleton>>;
    features: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    description: EntryFieldTypes.Text;
    specifications?: EntryFieldTypes.Object;
    embeddedYouTubeLink?: EntryFieldTypes.Symbol;
    relatedProduct?: EntryFieldTypes.EntryLink<TypeProductSkeleton>;
}

export type TypeProductSkeleton = EntrySkeletonType<TypeProductFields, "product">;
export type TypeProduct<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeProductSkeleton, Modifiers, Locales>;

// Product Variants Types
export interface TypeProductVariantsFields {
    variantName: EntryFieldTypes.Symbol;
    color: EntryFieldTypes.Symbol;
    photos: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    stock: EntryFieldTypes.Integer;
    priceWithoutVat: EntryFieldTypes.Number;
}

export type TypeProductVariantsSkeleton = EntrySkeletonType<TypeProductVariantsFields, "productVariants">;
export type TypeProductVariants<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeProductVariantsSkeleton, Modifiers, Locales>;
