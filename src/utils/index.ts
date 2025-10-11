import { IMAGE_QUALITY, MAIN_IMAGE_WIDTH, THUMBNAIL_WIDTH } from "@/constants";

function isQuality(value: number) {
  return Number.isInteger(value) && value >= 0 && value <= 100;
}

export function getMainPhotoUrl(
  baseUrl: string,
  quality: number = IMAGE_QUALITY.main,
) {
  if (!isQuality(quality)) {
    throw new Error("Quality must be an integer between 0 and 100");
  }

  if (!baseUrl) return "";

  const url = baseUrl.startsWith("http") ? baseUrl : `https:${baseUrl}`;

  return `${url}?fm=webp&q=${quality}&w=${MAIN_IMAGE_WIDTH}`;
}

export function getThumbnailUrl(
  baseUrl: string,
  quality: number = IMAGE_QUALITY.thumb,
) {
  if (!isQuality(quality)) {
    throw new Error("Quality must be an integer between 0 and 100");
  }

  if (!baseUrl) return "";

  const url = baseUrl.startsWith("http") ? baseUrl : `https:${baseUrl}`;

  return `${url}?fm=webp&q=${quality}&w=${THUMBNAIL_WIDTH}`;
}

export function mergeClassNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
