import type {
  TypeProductVariantsWithoutUnresolvableLinksResponse,
  TypeProductWithoutUnresolvableLinksResponse,
} from "@/types/contentful";

function transformVariant(
  variant: TypeProductVariantsWithoutUnresolvableLinksResponse,
) {
  return {
    id: variant.sys.id,
    name: variant.fields.variantName,
    color: variant.fields.color,
    photos: (
      (variant.fields.photos as
        | Array<{ fields: { file: unknown } }>
        | undefined) ?? []
    ).map((photo) => photo.fields.file),
    inStock: variant.fields.inStock,
    shippingDuration: variant.fields.shippingDuration,
  };
}

function transformRelatedProduct(
  product: TypeProductWithoutUnresolvableLinksResponse,
) {
  const mainPhoto = (
    product as { fields: { mainPhoto: { fields: { file: unknown } } } }
  ).fields.mainPhoto.fields.file;

  return {
    id: product.sys.id,
    slug: product.fields.slug,
    title: product.fields.title,
    mainPhoto,
  };
}

export function transformProduct(
  entry: TypeProductWithoutUnresolvableLinksResponse,
) {
  const specifications = entry.fields.specifications
    ? (entry.fields.specifications as Record<string, unknown>)
    : undefined;

  const mainPhoto = (
    entry as { fields: { mainPhoto: { fields: { file: unknown } } } }
  ).fields.mainPhoto.fields.file;

  return {
    id: entry.sys.id,
    slug: entry.fields.slug,
    title: entry.fields.title,
    order: entry.fields.order,
    inStock: entry.fields.inStock,
    mainPhoto,
    features: entry.fields.features,
    description: entry.fields.description,
    specifications,
    priceWithoutVat: entry.fields.priceWithoutVat,
    videoUrl: entry.fields.embeddedYouTubeLink,
    variants: entry.fields.variants
      .map((variant) => variant && transformVariant(variant))
      .filter((variant) => variant !== undefined),
    relatedProducts: entry.fields.relatedProducts
      ?.map((product) => product && transformRelatedProduct(product))
      .filter((product) => product !== undefined),
    displayMode: entry.fields.displayMode,
  };
}
