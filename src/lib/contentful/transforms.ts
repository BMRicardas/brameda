import type { AssetFile } from "contentful";

import { z } from "astro/zod";

import {
  ImageAssetSchema,
  RawProductSchema,
} from "@/schemas/contentful-transformed.types";

type ValidatedProduct = z.infer<typeof RawProductSchema>;
type ValidatedVariant = z.infer<
  typeof RawProductSchema
>["fields"]["variants"][number];
type ValidatedRelatedProduct = NonNullable<
  ValidatedProduct["fields"]["relatedProducts"]
>[number];

const isAssetFile = (file: unknown): file is AssetFile =>
  ImageAssetSchema.safeParse(file).success;

function transformVariant(variant: ValidatedVariant) {
  const photoList = (variant.fields.photos ?? []).map(
    (photo) => photo.fields.file,
  );
  const photos = photoList.filter(isAssetFile);

  return {
    id: variant.sys.id,
    name: variant.fields.variantName,
    color: variant.fields.color,
    photos,
    inStock: variant.fields.inStock,
    shippingDuration: variant.fields.shippingDuration,
  };
}

function transformRelatedProduct(product: ValidatedRelatedProduct) {
  return {
    id: product.sys.id,
    slug: product.fields.slug,
    title: product.fields.title,
    mainPhoto: product.fields.mainPhoto.fields.file,
  };
}

export function transformProduct(entry: ValidatedProduct) {
  const specifications = entry.fields.specifications;
  const mainPhoto = entry.fields.mainPhoto.fields.file;

  return {
    id: entry.sys.id,
    slug: entry.fields.slug,
    title: entry.fields.title,
    order: entry.fields.order,
    mainPhoto,
    features: entry.fields.features,
    description: entry.fields.description,
    specifications,
    priceWithoutVat: entry.fields.priceWithoutVat,
    videoUrl: entry.fields.embeddedYouTubeLink,
    variants: entry.fields.variants.map(transformVariant),
    relatedProducts: entry.fields.relatedProducts?.map(transformRelatedProduct),
    displayMode: entry.fields.displayMode,
  };
}
