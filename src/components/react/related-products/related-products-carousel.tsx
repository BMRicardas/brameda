import useEmblaCarousel from "embla-carousel-react";

import type { Product } from "@/schemas/contentful-transformed.types";

import { DotButton, useDotButton } from "./carousel-dot-button";
import { RelatedProductCard } from "./related-product-card";
import styles from "./related-products-carousel.module.css";

type Prop = {
  products: Product[];
};

/** Static list when 0–1 items to avoid Embla JS and dots. */
function RelatedProductsList({ products }: Prop) {
  return (
    <section className={styles["related-products-carousel"]}>
      <h3 className={styles["carousel-title"]}>Susiję produktai</h3>
      <div className={styles["embla"]}>
        <div className={styles["embla__viewport"]}>
          <div
            className={`${styles["embla__container"]} ${styles["embla__container--static"]}`}
          >
            {products.map((product) => (
              <div className={styles["embla__slide"]} key={product.id}>
                <RelatedProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function RelatedProductsCarousel({ products }: Prop) {
  if (products.length < 2) {
    return <RelatedProductsList products={products} />;
  }

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
            {products.map((product) => (
              <div className={styles["embla__slide"]} key={product.id}>
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
