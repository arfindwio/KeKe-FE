import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();

  const productData = useSelector((state) => state.products.products);
  const specialOfferData = useSelector(
    (state) => state.products.specialOfferProduct,
  );
  const categoryData = useSelector((state) => state.categories.categories);

  const queryParams = new URLSearchParams(location.search);
  const categoryValue = queryParams.get("c");

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllProductsAction(""));
      await dispatch(getRecommendationProductsAction());
      await dispatch(getAllCategoriesAction());
      await dispatch(getSpecialOfferProductAction());
    };

    fetchData();
  }, []);

  const handleFilter = async (categoryName) => {
    let value = categoryName ? `?c=${categoryName}` : "";
    navigate(value);
    await dispatch(getAllProductsAction(value));
  };

  const averageRating = (reviews) => {
    const totalRating = reviews.reduce((acc, curr) => acc + curr.userRating, 0);
    const average = totalRating / reviews.length;

    return average;
  };
  return (
    <>
      <Navbar />
      <div className=" bg-slate-100 px-4 pb-10 pt-24 sm:px-10 md:pb-10 lg:px-20">
        <div className="flex flex-col gap-5">
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
              <SwiperSlide
                className={`${
                  !categoryValue
                    ? "bg-neutral-1 text-neutral-5"
                    : "border-neutral-3 bg-neutral-4 hover:bg-neutral-1 hover:text-neutral-5"
                } w-fit cursor-pointer break-all rounded-full border  px-2 py-1`}
                onClick={() => handleFilter("")}
              >
                Show All
              </SwiperSlide>
              {categoryData.map((category, index) => (
                <SwiperSlide
                  className={`${
                    categoryValue === category.categoryName
                      ? "bg-neutral-1 text-neutral-5"
                      : "border-neutral-3 bg-neutral-4 hover:bg-neutral-1 hover:text-neutral-5"
                  } w-fit cursor-pointer break-all rounded-full border  px-2 py-1`}
                  key={index}
                  onClick={() => handleFilter(category.categoryName)}
                >
                  {category.categoryName}
                </SwiperSlide>
              ))}
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
              {productData.map((product, index) => (
                <SwiperSlide
                  className={`flex flex-col overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5`}
                  key={index}
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
                    <p className="text-primary-1 text-sm font-semibold">
                      {product.category?.categoryName}
                    </p>
                    <p className="text-sm text-neutral-3">
                      {product.productName}
                    </p>
                    <div
                      className={`flex items-center gap-2 break-all text-base font-bold`}
                    >
                      <p className={`${product.promotion && "text-alert-red"}`}>
                        IDR {product.price.toLocaleString()}
                      </p>
                      {product.promotion && (
                        <p className="font-normal text-neutral-3 line-through">
                          IDR {product.price / (1 - product.promotion.discount)}
                        </p>
                      )}
                    </div>
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
