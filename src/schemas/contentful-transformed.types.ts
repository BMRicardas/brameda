import { z } from "astro:content";

export const imageAssetSchema = z.object({
  url: z.string(),
});

export const productVariantSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  photos: z.array(imageAssetSchema),
  stock: z.number().optional(),
  price: z.number().optional(),
  sku: z.string().optional(),
  displayOrder: z.number().optional(),
  isDefault: z.boolean().optional(),
});

export const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  mainPhoto: imageAssetSchema,
  displayMode: z.enum(["all_variants", "color_selector"]),
  variants: z.array(productVariantSchema),
  features: z.array(z.string()),
  description: z.string(),
  specifications: z.record(z.unknown()).optional(),
  videoUrl: z.string().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
  categories: z.array(z.string()).optional(),
});

export type ImageAsset = z.infer<typeof imageAssetSchema>;
export type ProductVariant = z.infer<typeof productVariantSchema>;
export type Product = z.infer<typeof productSchema>;
