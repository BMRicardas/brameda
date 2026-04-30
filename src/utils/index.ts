import { IMAGE } from "@/constants";

const isValidQuality = (q: unknown): q is number =>
  typeof q === "number" && Number.isInteger(q) && q >= 0 && q <= 100;

const isValidImageUrl = (url: unknown): url is string =>
  typeof url === "string" && url.trim() !== "";

type ImageUrlParams = {
  quality: number;
  width: number;
};

function buildImageUrl(baseUrl: unknown, { quality, width }: ImageUrlParams) {
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

export function getMainPhotoUrl(
  baseUrl: unknown,
  quality: number = IMAGE.QUALITY.main,
) {
  return buildImageUrl(baseUrl, { quality, width: IMAGE.MAIN_WIDTH });
}

export function getThumbnailUrl(
  baseUrl: unknown,
  quality: number = IMAGE.QUALITY.thumb,
) {
  return buildImageUrl(baseUrl, { quality, width: IMAGE.THUMBNAIL_WIDTH });
}

export function getYouTubeEmbedUrls(videoId: string[] | undefined) {
  if (!videoId || videoId.length === 0) {
    return [];
  }

  const embedUrls = videoId.map((id) => `https://www.youtube.com/embed/${id}`);

  return embedUrls;
}
