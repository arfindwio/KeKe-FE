import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Redux Actions
import {
  getAllProductsAction,
  getRecommendationProductsAction,
  getSpecialOfferProductAction,
} from "../redux/action/products/ProductsAction";
import { getAllCategoriesAction } from "../redux/action/categories/CategoriesAction";

// Icons
import { FaStar } from "react-icons/fa";

// Components
import { Navbar } from "../assets/components/navbar/Navbar";
import { BannerCard } from "../assets/components/card/BannerCard";
import { CategoryHomeCard } from "../assets/components/card/CategoryHomeCard";
import { RecommendedCard } from "../assets/components/card/RecommendedCard";
import { SpecialOfferCard } from "../assets/components/card/SpecialOfferCard";
import { Footer } from "../assets/components/footer/Footer";

export const Home = () => {
  const dispatch = useDispatch();

  const productData = useSelector((state) => state.products.products);
  const specialOfferData = useSelector(
    (state) => state.products.specialOfferProduct,
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllProductsAction());
      await dispatch(getRecommendationProductsAction());
      await dispatch(getAllCategoriesAction());
      await dispatch(getSpecialOfferProductAction());
    };

    fetchData();
  }, []);

  const averageRating = (reviews) => {
    const totalRating = reviews.reduce((acc, curr) => acc + curr.userRating, 0);
    const average = totalRating / reviews.length;

    return average;
  };
  return (
    <>
      <Navbar />
      <div className=" bg-slate-100 px-4 pb-10 pt-24 sm:px-10 md:pb-10 lg:px-20">
        <div className="flex flex-col gap-5 md:gap-10">
          <BannerCard />

          <CategoryHomeCard />

          <div className="flex flex-col gap-4 border-b border-neutral-4 pb-4">
            <RecommendedCard />
          </div>

          {specialOfferData && <SpecialOfferCard />}

          <div className="flex flex-col gap-4">
            <h1 className="w-full text-xl font-bold">New Products</h1>
            <Swiper
              spaceBetween={10}
              slidesPerView={1.5}
              breakpoints={{
                450: {
                  slidesPerView: 3.5,
                  spaceBetween: 10,
                },
              }}
              modules={[Mousewheel, Keyboard]}
              className="w-full cursor-grab text-center lg:cursor-default"
            >
              <SwiperSlide className="w-fit cursor-pointer rounded-full border border-neutral-3 bg-neutral-1 px-2 py-1 text-neutral-5">
                Show All
              </SwiperSlide>
              <SwiperSlide className="w-fit cursor-pointer break-all rounded-full border border-neutral-3 bg-neutral-4 px-2 py-1 hover:bg-neutral-1 hover:text-neutral-5">
                Categories
              </SwiperSlide>
              <SwiperSlide className="w-fit cursor-pointer break-all rounded-full border border-neutral-3 bg-neutral-4 px-2 py-1 hover:bg-neutral-1 hover:text-neutral-5">
                Categories
              </SwiperSlide>
            </Swiper>
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
              {productData.map((product) => (
                <SwiperSlide
                  className={`flex flex-col overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5`}
                  key={product.id}
                >
                  <img
                    src={product.productImage}
                    alt="Product"
                    className="aspect-[16/10] h-full w-full object-cover"
                  />
                  <div
                    className={`${
                      product.review.length === 0 &&
                      product.soldCount === 0 &&
                      "pb-8"
                    } flex flex-col gap-2 p-3`}
                  >
                    <p className="text-sm font-semibold text-neutral-2">
                      {product.category?.categoryName}
                    </p>
                    <p className="text-sm text-neutral-3">
                      {product.productName}
                    </p>
                    <p className="text-base font-bold text-neutral-1">
                      IDR {product.price.toLocaleString()}
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
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
