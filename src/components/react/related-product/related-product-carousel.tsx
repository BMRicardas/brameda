import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { RelatedProductCard } from "./related-product-card";

import "./related-product-carousel.css";
import type { Product } from "@/schemas/contentful-transformed.types";

type Props = {
  products: Product[];
};

export function RelatedProductCarousel({ products }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="related-products-carousel">
      <h3 className="carousel-title">Susiję produktai</h3>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {products.map((product) => (
              <div className="embla__slide" key={product.id}>
                <RelatedProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        <button
          className="embla__button embla__button--prev"
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          aria-label="Ankstesnis produktas"
        >
          &#x2039;
        </button>
        <button
          className="embla__button embla__button--next"
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          aria-label="Kitas produktas"
        >
          &#x203A;
        </button>
      </div>
    </div>
  );
}
