import { type Product } from "@/schemas/contentful-transformed.types";
import { getThumbnailUrl } from "@/utils";

import styles from "./related-product-card.module.css";

type Props = {
  product: Product;
  showBadge?: boolean;
  badgeText?: string;
};

export default function RelatedProductCard({
  product,
  showBadge = false,
  badgeText,
}: Props) {
  return (
    <a href={`/products/${product.slug}`} className={styles["card"]}>
      <div className={styles["image-container"]}>
        {showBadge && badgeText && (
          <span className={styles["badge"]}>{badgeText}</span>
        )}
        <img
          src={getThumbnailUrl(product.mainPhoto.url)}
          alt={`Image of ${product.title}`}
          className={styles["image"]}
          loading="lazy"
        />
      </div>
      <div className={styles["content"]}>
        <h4 className={styles["title"]}>{product.title}</h4>
      </div>
    </a>
  );
}
