import React from "react";

// Icons
import { FaStar } from "react-icons/fa";

export const ProductCard = ({ product }) => {
  const averageRating = (reviews) => {
    const totalRating = reviews.reduce((acc, curr) => acc + curr.userRating, 0);
    const average = totalRating / reviews.length;

    return average;
  };

  return (
    <>
      <div
        className={`h-fit w-full overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5`}
      >
        <img
          src={product.productImage}
          alt="Product"
          className="aspect-[16/10] h-[55%] w-full object-cover"
        />
        <div
          className={`${
            product.review.length === 0 && product.soldCount === 0 && "pb-8"
          } flex h-fit w-full flex-col gap-1 p-3`}
        >
          <p className="text-primary-1 text-sm font-semibold">
            {product.category?.categoryName}
          </p>
          <p className="truncate break-all text-sm text-neutral-3">
            {product.productName}
          </p>
          <div className={`flex flex-col break-all text-base font-bold`}>
            <p className={`${product.promotion && "text-neutral-1"}`}>
              IDR {product.price.toLocaleString()}
            </p>
            {product.promotion && (
              <p className="break-all text-sm font-semibold text-alert-red">
                <span className="mr-2 text-xs font-normal text-neutral-3 line-through">
                  IDR {product.price / (1 - product.promotion.discount)}
                </span>
                {product.promotion.discount * 100}%
              </p>
            )}
          </div>
          <div
            className={`${
              !product.promotion &&
              (product.review || !product.soldCount === 0) &&
              "pb-5"
            } flex items-center gap-2`}
          >
            {product.review.length > 0 && (
              <>
                <FaStar size={18} className="text-alert-yellow" />
                <p className="text-sm font-light text-neutral-2">
                  {averageRating(product.review)}
                </p>
                <p className="text-sm font-light text-neutral-3 opacity-80">
                  ({product.review.length})
                </p>
              </>
            )}
            {product.soldCount > 0 && (
              <p
                className={`${
                  product.review.length > 0 && "border-l-2 pl-2"
                }  text-sm font-light text-neutral-2`}
              >
                {product.soldCount} Sold
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
