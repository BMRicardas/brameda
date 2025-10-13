import { DotButton, useDotButton } from "./carousel-dot-button";
import useEmblaCarousel from "embla-carousel-react";

import type { Product } from "@/schemas/contentful-transformed.types";
import { RelatedProductCard } from "./related-product-card";
import styles from "./related-products-carousel.module.css";

type Prop = {
  products: Product[];
};

export function RelatedProductsCarousel({ products }: Prop) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    watchDrag: (api) => api.canScrollPrev() || api.canScrollNext(),
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section className={styles["related-products-carousel"]}>
      <h3 className={styles["carousel-title"]}>Susiję produktai</h3>
      <div className={styles["embla"]}>
        <div className={styles["embla__viewport"]} ref={emblaRef}>
          <div
            className={`${styles["embla__container"]} ${
              products.length <= 2 ? styles["embla__container--static"] : ""
            }`}
          >
            {products.map((product, index) => (
              <div className={styles["embla__slide"]} key={index}>
                <RelatedProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles["embla__controls"]}>
          {products.length > 3 && (
            <div className={styles["embla__dots"]}>
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={`${styles["embla__dot"]} ${
                    index === selectedIndex
                      ? styles["embla__dot--selected"]
                      : ""
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
