import { z } from "astro/zod";

import { type Document } from "@contentful/rich-text-types";

// Raw Contentful response validation schemas
export const RawImageAssetSchema = z.object({
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

export const RawProductVariantSchema = z.object({
  sys: z.object({ id: z.string() }),
  fields: z
    .object({
      variantName: z.string(),
      color: z.string(),
      photos: z
        .array(
          z
            .object({
              fields: z.object({ file: RawImageAssetSchema }).passthrough(),
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
          fields: z.object({ file: RawImageAssetSchema }).passthrough(),
        })
        .passthrough(),
      features: z.array(z.string()),
      description: z.custom<Document>(),
      specifications: z.record(z.unknown()).optional(),
      priceWithoutVat: z.number().optional(),
      embeddedYouTubeLink: z.string().optional(),
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
                        .object({ file: RawImageAssetSchema })
                        .passthrough(),
                    })
                    .passthrough(),
                })
                .passthrough(),
            })
            .passthrough(),
        )
        .optional(),
      displayMode: z.enum(["all_variants", "color_selector"]),
    })
    .passthrough(),
});

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
  videoUrl: z.string().optional(),
  variants: z.array(ProductVariantSchema),
  displayMode: z.enum(["all_variants", "color_selector"]),
});

type BaseProduct = z.infer<typeof BaseProductSchema> & {
  relatedProducts?: BaseProduct[];
};

export const ProductSchema: z.ZodType<BaseProduct> = BaseProductSchema.extend({
  relatedProducts: z.lazy(() => ProductSchema.array()).optional(),
});

export type ImageAsset = z.infer<typeof ImageAssetSchema>;
export type AboutUs = z.infer<typeof AboutUsSchema>;
export type ProductVariant = z.infer<typeof ProductVariantSchema>;
export type Product = z.infer<typeof ProductSchema>;
