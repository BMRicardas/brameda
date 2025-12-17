import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import useEmblaCarousel from "embla-carousel-react";

import { ProductGalleryThumb } from "./product-gallery-thumb";
import { getMainPhotoUrl, getThumbnailUrl } from "@/utils";

import { EVENTS, MAIN_IMAGE_WIDTH } from "@/constants";
import type { ColorSelectedEvent } from "@/types";

import styles from "./product-gallery.module.css";

declare global {
  interface DocumentEventMap {
    colorSelected: ColorSelectedEvent;
  }
}

export type Photo = {
  color: string;
  altText: string;
  url: string;
  details: {
    size: number;
    image: {
      width: number;
      height: number;
    };
  };
  fileName: string;
  contentType: string;
};

type Props = {
  photos: Photo[];
  initialColor?: string;
  displayMode?: "all_variants" | "color_selector";
};

export function ProductGallery({
  photos,
  initialColor,
  displayMode = "all_variants",
}: Props) {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(initialColor);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isInternalColorChange = useRef(false);

  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    watchDrag: (api) => api.canScrollPrev() || api.canScrollNext(),
  });

  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    align: "center",
    containScroll: "keepSnaps",
    dragFree: true,
    watchDrag: (api) => api.canScrollPrev() || api.canScrollNext(),
  });

  const filteredPhotos = useMemo(() => {
    if (displayMode === "all_variants" || !selectedColor) return photos;
    return photos.filter((p) => p.color === selectedColor);
  }, [photos, selectedColor, displayMode]);

  const effectivePhotos =
    displayMode === "color_selector" && filteredPhotos.length === 0
      ? photos
      : filteredPhotos;

  const mainPhotos = useMemo(
    () => effectivePhotos.map((photo) => ({ ...photo, url: getMainPhotoUrl(photo.url) })),
    [effectivePhotos]
  );

  const thumbPhotos = useMemo(
    () => filteredPhotos.map((photo) => ({ ...photo, url: getThumbnailUrl(photo.url) })),
    [filteredPhotos]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;

    const index = emblaMainApi.selectedScrollSnap();
    setSelectedIndex(index);
    emblaThumbsApi?.scrollTo(index);

    if (displayMode === "all_variants" && filteredPhotos[index]) {
      const newColor = filteredPhotos[index].color;
      if (newColor !== selectedColor) {
        isInternalColorChange.current = true;
        setSelectedColor(newColor);
        const event = new CustomEvent(EVENTS.COLOR_SELECTED, {
          detail: { color: newColor },
        });
        document.dispatchEvent(event);
      }
    }
  }, [emblaMainApi, emblaThumbsApi, displayMode, filteredPhotos, selectedColor]);

  // Handle carousel events
  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
    return () => { emblaMainApi.off("select", onSelect).off("reInit", onSelect) };
  }, [emblaMainApi, onSelect]);

  // Handle external color selection
  useEffect(() => {
    const onColorSelected = (event: ColorSelectedEvent) => {
      if (event.detail?.color && displayMode === "color_selector") {
        setSelectedColor(event.detail.color);
      }
    };

    document.addEventListener(EVENTS.COLOR_SELECTED, onColorSelected);
    return () => { document.removeEventListener(EVENTS.COLOR_SELECTED, onColorSelected) };
  }, [displayMode]);

  // Reset carousel when filtered photos change
  useEffect(() => {
    if (!emblaMainApi) return;

    if (isInternalColorChange.current) {
      isInternalColorChange.current = false;
      return;
    }

    emblaMainApi.reInit();
    emblaMainApi.scrollTo(0, true);
    setSelectedIndex(0);
  }, [emblaMainApi, filteredPhotos.length, selectedColor]);

  // Prefetch all images
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefetch = () => {
      photos.forEach((photo) => {
        [getMainPhotoUrl(photo.url), getThumbnailUrl(photo.url)].forEach((url) => {
          if (url) {
            const link = document.createElement("link");
            link.rel = "prefetch";
            link.as = "image";
            link.href = url;
            document.head.appendChild(link);
          }
        });
      });
    };

    if (document.readyState === "complete") {
      prefetch();
    } else {
      window.addEventListener("load", prefetch, { once: true });
    }
  }, [photos]);

  const onThumbClick = useCallback(
    (index: number) => { emblaMainApi?.scrollTo(index) },
    [emblaMainApi]
  );

  const showThumbnails = filteredPhotos.length > 1;

  return (
    <div className={styles["embla"]}>
      <div className={styles["embla__viewport"]} ref={emblaMainRef}>
        <div className={styles["embla__container"]}>
          {mainPhotos.map((photo, index) => {
            return (
              <div
                className={styles["embla__slide"]}
                key={`${photo.color}-${photo.fileName}-${index}`}
                aria-hidden={selectedIndex !== index}
              >
                <img
                  className={styles["embla__slide__image"]}
                  src={photo.url}
                  alt={photo.altText || photo.fileName}
                  fetchPriority="high"
                  loading="lazy"
                  width={MAIN_IMAGE_WIDTH}
                  height={MAIN_IMAGE_WIDTH}
                />
              </div>
            );
          })}
        </div>
      </div>

      {showThumbnails && (
        <div className={styles["embla-thumbs"]}>
          <div className={styles["embla-thumbs__viewport"]} ref={emblaThumbsRef}>
            <div className={styles["embla-thumbs__container"]}>
              {thumbPhotos.map((photo, index) => (
                <ProductGalleryThumb
                  key={`thumb-${photo.color}-${photo.fileName}-${index}`}
                  index={index}
                  selected={index === selectedIndex}
                  photo={photo}
                  onThumbClick={() => onThumbClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}