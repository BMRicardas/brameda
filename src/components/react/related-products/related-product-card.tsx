import { type Product } from "@/schemas/contentful-transformed.types";
import { getThumbnailUrl } from "@/utils";

import { THUMBNAIL_WIDTH } from "@/constants";

import styles from "./related-product-card.module.css";

type Props = {
  product: Product;
};

export function RelatedProductCard({ product }: Props) {
  return (
    <a href={`/products/${product.slug}`} className={styles["card"]}>
      <div className={styles["image-container"]}>
        <img
          src={getThumbnailUrl(product.mainPhoto.url)}
          alt={`Image of ${product.title}`}
          className={styles["image"]}
          loading="lazy"
          width={THUMBNAIL_WIDTH}
          height={THUMBNAIL_WIDTH}
        />
      </div>
      <div className={styles["content"]}>
        <h4 className={styles["title"]}>{product.title}</h4>
      </div>
    </a>
  );
}
