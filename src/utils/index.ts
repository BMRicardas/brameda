import { MAIN_IMAGE_WIDTH, THUMBNAIL_WIDTH } from "@/constants";

export function getMainPhotoUrl(baseUrl: string) {
  return `https:${baseUrl}?fm=webp&q=50&w=${MAIN_IMAGE_WIDTH}`;
}

export function getThumbnailUrl(baseUrl: string) {
  return `https:${baseUrl}?fm=webp&q=1&w=${THUMBNAIL_WIDTH}`;
}
