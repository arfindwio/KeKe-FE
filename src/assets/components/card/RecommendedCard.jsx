import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Components
import { ProductHomeCardSkeleton } from "../skeleton/ProductCardSkeleton";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Icons
import { FaStar } from "react-icons/fa";

export const RecommendedCard = () => {
  const recommendationProductData = useSelector(
    (state) => state.products?.recommendationProducts,
  );
  const loadingProduct = useSelector((state) => state.products?.loading);

  const averageRating = (reviews) => {
    const totalRating = reviews.reduce((acc, curr) => acc + curr.userRating, 0);
    const average = totalRating / reviews.length;

    return average;
  };
  return (
    <>
      <h1 className="w-full text-xl font-bold">Recommended For You</h1>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          400: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          540: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          800: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          1000: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
        modules={[Mousewheel, Keyboard]}
        className="h-fit w-full cursor-grab py-2 lg:cursor-default"
      >
        {!recommendationProductData && loadingProduct
          ? Array.from({ length: 6 }).map((_, index) => (
              <>
                <SwiperSlide
                  className="h-fit w-full overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5 shadow-md"
                  key={index}
                >
                  <ProductHomeCardSkeleton />
                </SwiperSlide>
              </>
            ))
          : recommendationProductData.slice(0, 6).map((product, index) => (
              <SwiperSlide
                className="h-fit w-full overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5 shadow-md"
                key={index}
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product?.image[0]?.image}
                    alt="Product"
                    className="h-[55%] w-full object-contain"
                  />
                  <div
                    className={`${
                      product.review.length === 0 &&
                      product.soldCount === 0 &&
                      "pb-8"
                    } flex h-fit w-full flex-col gap-1 p-3`}
                  >
                    <p className="truncate text-sm font-semibold text-primary-1">
                      {product.category.categoryName}
                    </p>
                    <p className="truncate text-sm text-neutral-3">
                      {product.productName}
                    </p>
                    <div
                      className={`flex flex-col break-all text-base font-bold`}
                    >
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
                      } flex flex-wrap items-center gap-2`}
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
                          } text-sm font-light text-neutral-2`}
                        >
                          {product.soldCount} Sold
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
      </Swiper>
    </>
  );
};
