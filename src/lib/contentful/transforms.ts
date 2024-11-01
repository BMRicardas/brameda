import type { Asset, Entry } from "contentful";
import type {
  TypeProductSkeleton,
  TypeProductVariantsSkeleton,
} from "@/types/contentful";
import type { ImageAsset, Product, ProductVariant } from "@/schemas/contentful";

// Helper for transforming Contentful asset to ImageAsset
function transformAsset(
  asset: Asset<"WITHOUT_UNRESOLVABLE_LINKS">,
): ImageAsset {
  if (!asset?.fields?.file?.url) {
    throw new Error(`Invalid asset: ${asset?.sys?.id}`);
  }

  return {
    url: `https:${asset.fields.file.url}`,
    title: asset.fields.title || "",
    description: asset.fields.description || "",
    width: asset.fields.file.details?.image?.width,
    height: asset.fields.file.details?.image?.height,
  };
}

// Helper for transforming variants
function transformVariant(
  variant: Entry<TypeProductVariantsSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">,
): ProductVariant {
  return {
    id: variant.sys.id,
    name: variant.fields.variantName,
    color: variant.fields.color,
    photos: variant.fields.photos
      .filter((photo): photo is Asset<"WITHOUT_UNRESOLVABLE_LINKS"> => !!photo)
      .map(transformAsset),
    stock: variant.fields.stock,
    price: variant.fields.priceWithoutVat,
    sku: variant.fields.sku,
    displayOrder: variant.fields.displayOrder,
    isDefault: variant.fields.isDefault,
  };
}

// Main transform function
export function transformContentfulToProduct(
  entry: Entry<TypeProductSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">,
): Product {
  if (!entry.fields.mainPhoto) {
    throw new Error(`Product ${entry.sys.id} has no main image`);
  }

  const specifications = entry.fields.specifications
    ? (entry.fields.specifications as Record<string, unknown>)
    : undefined;

  return {
    id: entry.sys.id,
    slug: entry.fields.slug,
    title: entry.fields.title,
    mainPhoto: transformAsset(entry.fields.mainPhoto),
    displayMode: entry.fields.displayMode,
    variants: entry.fields.variants
      .filter(
        (
          variant,
        ): variant is Entry<
          TypeProductVariantsSkeleton,
          "WITHOUT_UNRESOLVABLE_LINKS"
        > => !!variant,
      )
      .map(transformVariant),
    features: entry.fields.features,
    description: entry.fields.description,
    specifications,
    videoUrl: entry.fields.embeddedYouTubeLink,
    order: entry.fields.order,
    isActive: entry.fields.isActive ?? true,
    categories: entry.fields.category,
  };
}
