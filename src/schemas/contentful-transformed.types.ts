import { z } from "astro:content";

import { type Document } from "@contentful/rich-text-types";

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
  inStock: z.boolean(),
  shippingDuration: z.string().optional(),
});

const BaseProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  order: z.number(),
  inStock: z.boolean(),
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

export const productSchema: z.ZodType<BaseProduct> = BaseProductSchema.extend({
  relatedProducts: z.lazy(() => productSchema.array()).optional(),
});

export type ImageAsset = z.infer<typeof ImageAssetSchema>;
export type AboutUs = z.infer<typeof AboutUsSchema>;
export type ProductVariant = z.infer<typeof ProductVariantSchema>;
export type Product = z.infer<typeof productSchema>;
