import { EVENTS, IMAGE_QUALITY, THUMBNAIL_WIDTH } from "@/constants";
import type { Photo } from "./product-gallery";

import styles from "./product-gallery-thumb.module.css";
import { buildSrcSet, getThumbnailUrl } from "@/utils";

type Props = {
  selected: boolean;
  index: number;
  photo: Photo;
  onThumbClick: () => void;
};

export function ProductGalleryThumb({
  selected,
  index,
  photo,
  onThumbClick,
}: Props) {
  function handleClick() {
    onThumbClick();

    if (photo.color) {
      document.dispatchEvent(
        new CustomEvent(EVENTS.THUMB_CLICKED, {
          detail: { color: photo.color },
        }),
      );
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${styles["embla-thumbs__slide"]} ${
        selected ? styles["embla-thumbs__slide--selected"] : ""
      }`}
      aria-label={`Peržiūrėti ${index + 1} nuotrauką`}
    >
      <img
        className={styles["embla-thumbs__slide__image"]}
        src={photo.url}
        alt={photo.altText || photo.fileName}
        width={THUMBNAIL_WIDTH}
        height={THUMBNAIL_WIDTH}
        loading="lazy"
        srcSet={buildSrcSet(getThumbnailUrl(photo.url, IMAGE_QUALITY.thumb), [
          100,
          150,
          THUMBNAIL_WIDTH,
        ])}
        fetchPriority={selected ? "high" : "auto"}
      />
    </button>
  );
}
