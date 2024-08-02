import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Components
import { PopularCategoryCardSkeleton } from "../skeleton/PopularCategoryCardSkeleton";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const CategoryHomeCard = () => {
  const categoryData = useSelector(
    (state) => state.categories?.categories?.categories,
  );

  const loadingCategory = useSelector((state) => state.categories.loading);

  return (
    <>
      <div className="flex flex-col gap-4 rounded-md border bg-neutral-5 p-4 shadow-md">
        <h1 className="w-full text-xl font-bold">Popular Categories</h1>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          breakpoints={{
            540: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            960: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1320: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          modules={[Mousewheel, Keyboard]}
          className="w-full cursor-grab pr-2 2xl:cursor-default"
        >
          {categoryData?.slice(0, 5)?.map((category, index) => (
            <SwiperSlide
              className="flex w-full flex-row justify-between rounded-md border border-neutral-4 bg-neutral-5 p-4"
              key={index}
            >
              {loadingCategory ? (
                <PopularCategoryCardSkeleton />
              ) : (
                <>
                  <img
                    src={category?.image?.image}
                    alt="Category"
                    className="aspect-video h-full w-[40%] object-cover object-top"
                  />
                  <div className="flex w-[58%] flex-col">
                    <div className="flex justify-between">
                      <p className="truncate text-sm font-bold">
                        {category?.categoryName}
                      </p>
                      <p className="text-xs font-medium text-neutral-3">
                        ({category?.product?.length})
                      </p>
                    </div>
                    <Link
                      to={`/product?c=${category?.categoryName}`}
                      className="mt-auto w-fit rounded-md bg-neutral-1 px-2 py-1 text-xs text-neutral-5 hover:bg-opacity-80"
                    >
                      Show All
                    </Link>
                  </div>
                </>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
