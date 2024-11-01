import type { Asset, Entry } from "contentful";
import type {
  TypeProductSkeleton,
  TypeProductVariantsSkeleton,
} from "@/types/contentful";
import type { ImageAsset, Product, ProductVariant } from "@/schemas/contentful";
import { createCache } from "@/utils/cache";
import { generateHash } from "@/utils/hash";

const assetCache = createCache<ImageAsset>();
const productCache = createCache<Product>();
const variantCache = createCache<ProductVariant>();

// Helper functions
function transformAsset(
  asset?: Asset<"WITHOUT_UNRESOLVABLE_LINKS">,
): ImageAsset | undefined {
  if (!asset?.fields?.file?.url) return undefined;

  const hash = generateHash(asset);
  const cached = assetCache.get(asset.sys.id, hash);
  if (cached) return cached;

  const transformed = {
    url: `https:${asset.fields.file.url}`,
    title: typeof asset.fields.title === "string" ? asset.fields.title : "",
    description:
      typeof asset.fields.description === "string"
        ? asset.fields.description
        : "",
    width: asset.fields.file.details?.image?.width,
    height: asset.fields.file.details?.image?.height,
  };

  assetCache.set(asset.sys.id, transformed, hash);
  return transformed;
}

function transformVariant(
  variant: Entry<TypeProductVariantsSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">,
): ProductVariant {
  const hash = generateHash(variant);
  const cached = variantCache.get(variant.sys.id, hash);
  if (cached) return cached;

  return {
    id: variant.sys.id,
    name: variant.fields.variantName,
    color: variant.fields.color,
    price: variant.fields.priceWithoutVat,
    stock: variant.fields.stock,
    photos: variant.fields.photos
      .map((photo) => transformAsset(photo))
      .filter((photo): photo is ImageAsset => photo !== undefined),
    sku: variant.fields.sku,
    displayOrder: variant.fields.displayOrder,
    isDefault: variant.fields.isDefault,
  };
}

export function transformProduct(
  entry: Entry<TypeProductSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">,
): Product {
  const hash = generateHash(entry);
  const cached = productCache.get(entry.sys.id, hash);
  if (cached) return cached;

  const mainPhoto = transformAsset(entry.fields.mainPhoto);
  if (!mainPhoto) {
    throw new Error(`Product ${entry.sys.id} has no main image`);
  }

  const specifications = entry.fields.specifications
    ? (entry.fields.specifications as Record<string, unknown>)
    : undefined;

  return {
    id: entry.sys.id,
    slug: entry.fields.slug,
    title: entry.fields.title,
    mainPhoto,
    displayMode: entry.fields.displayMode,
    variants: entry.fields.variants
      .map((variant) => variant && transformVariant(variant))
      .filter((variant): variant is ProductVariant => variant !== undefined),
    features: entry.fields.features,
    description: entry.fields.description,
    specifications,
    videoUrl: entry.fields.embeddedYouTubeLink,
    order: entry.fields.order,
    isActive: entry.fields.isActive,
    categories: entry.fields.category,
  };
}
