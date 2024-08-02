import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import {
  getProductByIdAction,
  getAllProductsAction,
  getRecommendationProductsAction,
  getRecommendationProductsActionUser,
} from "../../../redux/action/products/ProductsAction";
import { getReviewsByProductIdAction } from "../../../redux/action/reviews/ReviewsAction";
import { getDiscussionsByProductIdAction } from "../../../redux/action/discussions/DiscussionsAction";

// Components
import { ProductCardSkeleton } from "../skeleton/ProductCardSkeleton";

// Icons
import { FaStar } from "react-icons/fa";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const ProductCard = ({ product }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const loadingProduct = useSelector((state) => state.products?.loading);

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  const averageRating = (reviews) => {
    const totalRating = reviews.reduce((acc, curr) => acc + curr.userRating, 0);
    const average = totalRating / reviews.length;

    return average;
  };

  const handleClick = async () => {
    if (location.pathname.startsWith("/product/")) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      await dispatch(getProductByIdAction(product.id));
      await dispatch(
        getAllProductsAction(`?c=${product.category.categoryName}`),
      );
      await dispatch(getReviewsByProductIdAction(product.id, ""));
      await dispatch(getDiscussionsByProductIdAction(product.id, ""));
      if (token) {
        await dispatch(getRecommendationProductsActionUser());
      } else {
        await dispatch(getRecommendationProductsAction());
      }
    }
  };

  return (
    <>
      {loadingProduct ? (
        <ProductCardSkeleton />
      ) : (
        <Link
          to={product.stock > 0 && `/product/${product.id}`}
          className={`h-fit w-full overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5 shadow-md`}
          onClick={handleClick}
        >
          <div className="relative h-[55%] w-full ">
            <img
              src={product?.image[0]?.image}
              alt="Product"
              className="h-full w-full object-cover"
            />
            {product.stock < 1 && (
              <p className="absolute bottom-0 left-0 right-0 top-0 flex flex-wrap items-center justify-center bg-neutral-1 bg-opacity-[.85] text-xl capitalize text-neutral-5">
                Sold Out
              </p>
            )}
          </div>
          <div
            className={`${
              product.review.length === 0 && product.soldCount === 0 && "pb-8"
            } flex h-fit w-full flex-col gap-1 p-3`}
          >
            <p className="truncate text-sm font-semibold text-primary-1">
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
                  <span className="mr-1 text-xs font-normal text-neutral-3 line-through">
                    IDR{" "}
                    {Math.floor(
                      product.price / (1 - product.promotion.discount),
                    ).toLocaleString()}
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
                    {averageRating(product.review).toFixed(1)}
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
        </Link>
      )}
    </>
  );
};
