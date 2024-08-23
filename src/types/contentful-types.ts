import type {
  Asset,
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  LocaleCode,
} from "contentful";

export type TypeProductSkeleton = {
  contentTypeId: "product";
  fields: {
    slug: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    variants: EntryFieldTypes.Array<
      EntryFieldTypes.EntryResourceLink<TypeVariantSkeleton>
    >;
    features: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    description: EntryFieldTypes.Text;
    specifications: EntryFieldTypes.Object;
    embeddedYouTubeLink: EntryFieldTypes.Symbol;
    photos: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  };
};

// export type TypeProductSkeleton = EntrySkeletonType<Product, "product">;
export type TypeProduct<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypeProductSkeleton, Modifiers, Locales>;

export type TypeVariantSkeleton = {
  contentTypeId: "productVariants";
  fields: {
    variantName: EntryFieldTypes.Symbol;
    color: EntryFieldTypes.Symbol;
    image: Asset;
  };
};

// export type TypeVariantSkeleton = EntrySkeletonType<Variant, "productVariants">;
export type TypeVariant<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypeVariantSkeleton, Modifiers, Locales>;

export type TypeAboutUsSkeleton = {
  contentTypeId: "aboutUs";
  fields: {
    title: EntryFieldTypes.Symbol;
    content: EntryFieldTypes.RichText;
  };
};

// export type TypeAboutUsSkeleton = EntrySkeletonType<AboutUs, "aboutUs">;
export type TypeAboutUs<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypeAboutUsSkeleton, Modifiers, Locales>;
