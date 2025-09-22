import { z } from "astro:content";

import { type Document } from "@contentful/rich-text-types";

export const imageAssetSchema = z.object({
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

export const productVariantSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  photos: z.array(imageAssetSchema),
  price: z.number().optional(),
  inStock: z.boolean(),
  shippingDuration: z.string().optional(),
});

const baseProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  order: z.number(),
  inStock: z.boolean(),
  mainPhoto: imageAssetSchema,
  features: z.array(z.string()),
  description: z.custom<Document>(),
  specifications: z.record(z.unknown()).optional(),
  priceWithoutVat: z.number().optional(),
  videoUrl: z.string().optional(),
  variants: z.array(productVariantSchema),
  displayMode: z.enum(["all_variants", "color_selector"]),
});

type BaseProduct = z.infer<typeof baseProductSchema> & {
  relatedProducts?: BaseProduct[];
};

export const productSchema: z.ZodType<BaseProduct> = baseProductSchema.extend({
  relatedProducts: z.lazy(() => productSchema.array()).optional(),
});

export type ImageAsset = z.infer<typeof imageAssetSchema>;
export type ProductVariant = z.infer<typeof productVariantSchema>;
export type Product = z.infer<typeof productSchema>;
