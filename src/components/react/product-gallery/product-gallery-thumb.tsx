import { EVENTS } from "@/constants";
import type { Photo } from "./product-gallery";

import styles from "./product-gallery-thumb.module.css";

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
      />
    </button>
  );
}
