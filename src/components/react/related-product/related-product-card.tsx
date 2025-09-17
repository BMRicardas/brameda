import type { Product } from "@/schemas/contentful-transformed.types";

import { getMainPhotoUrl } from "@/utils";

import "./related-product-card.css";

type Props = {
  product: Product;
};

export function RelatedProductCard({ product }: Props) {
  const { slug, title, mainPhoto } = product;
  console.log({ mainPhoto });
  return (
    <a href={`/products/${slug}`} className="card">
      <div className="image-container">
        <img
          src={getMainPhotoUrl(mainPhoto.url)}
          alt={title}
          className="image"
          loading="lazy"
        />
      </div>
      <div className="content">
        <h4 className="title">{title}</h4>
      </div>
    </a>
  );
}
