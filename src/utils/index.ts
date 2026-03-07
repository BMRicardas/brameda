import { IMAGE } from "@/constants";

function isQuality(value: number) {
  return Number.isInteger(value) && value >= 0 && value <= 100;
}

export function getMainPhotoUrl(
  baseUrl: string,
  quality: number = IMAGE.QUALITY.main,
) {
  if (!isQuality(quality)) {
    throw new Error("Quality must be an integer between 0 and 100");
  }

  if (!baseUrl?.trim()) return "";

  const url = baseUrl.startsWith("http") ? baseUrl : `https:${baseUrl}`;

  return `${url}?fm=webp&q=${quality}&w=${IMAGE.MAIN_WIDTH}`;
}

export function getThumbnailUrl(
  baseUrl: string,
  quality: number = IMAGE.QUALITY.thumb,
) {
  if (!isQuality(quality)) {
    throw new Error("Quality must be an integer between 0 and 100");
  }

  if (!baseUrl) return "";

  const url = baseUrl.startsWith("http") ? baseUrl : `https:${baseUrl}`;

  return `${url}?fm=webp&q=${quality}&w=${IMAGE.THUMBNAIL_WIDTH}`;
}
