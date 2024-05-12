import React from "react";
import { useSelector } from "react-redux";

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
    (state) => state.products.recommendationProducts,
  );

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
          400: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          540: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          800: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1000: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        modules={[Mousewheel, Keyboard]}
        className="w-full cursor-grab lg:cursor-default"
      >
        {recommendationProductData.slice(0, 5).map((product, index) => (
          <SwiperSlide
            className="flex flex-col overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5"
            key={index}
          >
            <img
              src={product.productImage}
              alt="Product"
              className="aspect-[16/10] h-full w-full object-cover"
            />
            <div
              className={`${
                product.review.length === 0 && product.soldCount === 0 && "pb-8"
              } flex flex-col gap-2 p-3`}
            >
              <p className="text-sm font-semibold text-neutral-2">
                {product.category.categoryName}
              </p>
              <p className="text-sm text-neutral-3">{product.productName}</p>
              <p className="text-base font-bold text-neutral-1">
                IDR {product.price}
              </p>
              <div className="flex items-center gap-2">
                {product.review.length > 0 && (
                  <>
                    <FaStar size={18} className="text-alert-yellow" />
                    <p className="text-sm font-light text-neutral-2">
                      {averageRating(product.review)}
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
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
