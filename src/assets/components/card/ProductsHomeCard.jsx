import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Redux Actions
import { getAllProductsAction } from "../../../redux/action/products/ProductsAction";

// Icons
import { FaStar } from "react-icons/fa";

export const ProductsHomeCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productData = useSelector((state) => state.products.products);
  const categoryData = useSelector((state) => state.categories.categories);

  const queryParams = new URLSearchParams(location.search);
  const categoryValue = queryParams.get("c");

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
          580: {
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
        className="h-fit w-full cursor-grab py-2 lg:cursor-default"
      >
        {productData.length > 0 ? (
          productData.slice(0, 5).map((product, index) => (
            <SwiperSlide
              className="h-fit w-full overflow-hidden rounded-xl border border-neutral-4 bg-neutral-5 shadow-md"
              key={index}
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.productImage}
                  alt="Product"
                  className="aspect-[16/10] h-[55%] w-full object-cover"
                />
                <div
                  className={`${
                    product.review.length === 0 &&
                    product.soldCount === 0 &&
                    "pb-8"
                  } flex h-fit w-full flex-col gap-1 p-3`}
                >
                  <p className="text-primary-1 text-sm font-semibold">
                    {product.category?.categoryName}
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
                        } text-sm font-light text-neutral-2`}
                      >
                        {product.soldCount} Sold
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center text-2xl font-bold italic text-neutral-4">
            - No Product found -
          </p>
        )}
      </Swiper>
    </div>
  );
};
