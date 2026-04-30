import { type Document } from "@contentful/rich-text-types";
import { z } from "astro/zod";

// Shared asset schema (used in both raw and transformed types)
export const ImageAssetSchema = z.object({
  url: z.string(),
  details: z.object({
    size: z.number(),
    image: z.object({
      width: z.number(),
      height: z.number(),
    }),
  }),
  fileName: z.string(),
  contentType: z.string(),
});

const DisplayModeEnum = z.enum(["all_variants", "color_selector"]);

const SupportedCountries = z.union([
  z.literal("Jungtinė Karalystė"),
  z.literal("Vokietija"),
  z.literal("Kinija"),
  z.literal("Lietuva"),
]);

// Raw Contentful response validation schemas

const RawProductVariantSchema = z.object({
  sys: z.object({ id: z.string() }),
  fields: z
    .object({
      variantName: z.string(),
      color: z.string(),
      photos: z
        .array(
          z
            .object({
              fields: z.object({ file: ImageAssetSchema }).passthrough(),
            })
            .passthrough(),
        )
        .optional(),
      inStock: z.boolean().optional(),
      shippingDuration: z.string().optional(),
    })
    .passthrough(),
});

export const RawProductSchema = z.object({
  sys: z.object({ id: z.string() }),
  fields: z
    .object({
      slug: z.string(),
      title: z.string(),
      order: z.number(),
      mainPhoto: z
        .object({
          fields: z.object({ file: ImageAssetSchema }).passthrough(),
        })
        .passthrough(),
      features: z.array(z.string()),
      description: z.custom<Document>(),
      specifications: z.record(z.unknown()).optional(),
      priceWithoutVat: z.number().optional(),
      youTubeVideoIDs: z.array(z.string()).optional(),
      variants: z.array(RawProductVariantSchema),
      relatedProducts: z
        .array(
          z
            .object({
              sys: z.object({ id: z.string() }),
              fields: z
                .object({
                  slug: z.string(),
                  title: z.string(),
                  mainPhoto: z
                    .object({
                      fields: z
                        .object({ file: ImageAssetSchema })
                        .passthrough(),
                    })
                    .passthrough(),
                })
                .passthrough(),
            })
            .passthrough(),
        )
        .optional(),
      displayMode: DisplayModeEnum,
      brand: z.string(),
      country: SupportedCountries,
    })
    .passthrough(),
});

export const AboutUsSchema = z.object({
  aboutUs: z.custom<Document>(),
});

export const ProductVariantSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  photos: z.array(ImageAssetSchema),
  price: z.number().optional(),
  inStock: z.boolean().optional(),
  shippingDuration: z.string().optional(),
});

const BaseProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  order: z.number(),
  mainPhoto: ImageAssetSchema,
  features: z.array(z.string()),
  description: z.custom<Document>(),
  specifications: z.record(z.unknown()).optional(),
  priceWithoutVat: z.number().optional(),
  youTubeVideoIDs: z.array(z.string()).optional(),
  variants: z.array(ProductVariantSchema),
  displayMode: DisplayModeEnum,
  brand: z.string(),
  country: SupportedCountries,
});

export const ProductSchema = BaseProductSchema.extend({
  relatedProducts: z.array(BaseProductSchema).optional(),
});

export type ImageAsset = z.infer<typeof ImageAssetSchema>;
export type AboutUs = z.infer<typeof AboutUsSchema>;
export type ProductVariant = z.infer<typeof ProductVariantSchema>;
export type Product = z.infer<typeof ProductSchema>;
