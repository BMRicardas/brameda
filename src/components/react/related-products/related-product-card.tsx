import { IMAGE } from "@/constants";
import { type Product } from "@/schemas/contentful-transformed.types";
import { getThumbnailUrl } from "@/utils";

import styles from "./related-product-card.module.css";

type Props = {
  product: Product;
};

export function RelatedProductCard({ product }: Props) {
  const href = `/products/${product.slug}`;
  return (
    <article className={styles["card"]}>
      <a href={href} className={styles["card-link"]}>
        <header className={styles["image-container"]}>
          <img
            src={getThumbnailUrl(product.mainPhoto.url)}
            alt={product.title}
            className={styles["image"]}
            loading="lazy"
            width={IMAGE.THUMBNAIL_WIDTH}
            height={IMAGE.THUMBNAIL_WIDTH}
          />
        </header>
        <div className={styles["content"]}>
          <h4 className={styles["title"]}>{product.title}</h4>
        </div>
      </a>
    </article>
  );
}
