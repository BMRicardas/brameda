import { IMAGE } from "@/constants";

const isValidQuality = (q: unknown): q is number =>
  typeof q === "number" && Number.isInteger(q) && q >= 0 && q <= 100;

const isValidImageUrl = (url: unknown): url is string =>
  typeof url === "string" && url.trim() !== "";

type ImageUrlParams = {
  quality: number;
  width: number;
};

function buildImageUrl(
  baseUrl: unknown,
  { quality, width }: ImageUrlParams,
): string {
  if (!isValidImageUrl(baseUrl)) {
    return "";
  }

  if (!isValidQuality(quality)) {
    throw new Error(
      `Invalid quality: ${quality}. Must be integer between 0 and 100`,
    );
  }

  if (!Number.isInteger(width) || width <= 0) {
    throw new Error(`Invalid width: ${width}. Must be positive integer`);
  }

  const url = baseUrl.startsWith("http") ? baseUrl : `https:${baseUrl}`;

  return `${url}?fm=webp&q=${quality}&w=${width}`;
}

export const getMainPhotoUrl = (
  baseUrl: unknown,
  quality: number = IMAGE.QUALITY.main,
): string => buildImageUrl(baseUrl, { quality, width: IMAGE.MAIN_WIDTH });

export const getThumbnailUrl = (
  baseUrl: unknown,
  quality: number = IMAGE.QUALITY.thumb,
): string => buildImageUrl(baseUrl, { quality, width: IMAGE.THUMBNAIL_WIDTH });

export const getResponsiveImageUrl = (
  baseUrl: unknown,
  width: number,
  quality: number = IMAGE.QUALITY.main,
): string => buildImageUrl(baseUrl, { quality, width });
