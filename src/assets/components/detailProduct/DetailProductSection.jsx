import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Redux Actions
import {
  getAllCartsByAuthAction,
  postCreateCartByProductIdAction,
} from "../../../redux/action/carts/CartsAction";

// Icons
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

// Helper
import {
  showLoadingToast,
  showSuccessToast,
  showErrorToast,
} from "../../../helper/ToastHelper";

export const DetailProductSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputCart, setInputCart] = useState({
    note: "",
    sizeId: null,
    colorId: null,
  });

  const detailProductData = useSelector((state) => state.products.product);

  const selectedColor = detailProductData?.color.find(
    (color) => color.id === inputCart.colorId,
  )?.colorName;
  const selectedSize = detailProductData?.size.find(
    (size) => size.id === inputCart.sizeId,
  )?.sizeName;

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  useEffect(() => {
    if (detailProductData) {
      setInputCart((prevState) => ({
        ...prevState,
        sizeId: detailProductData?.size[0]?.id || "",
        colorId: detailProductData?.color[0]?.id || "",
      }));
    }
  }, [detailProductData]);

  const averageRating = (reviews) => {
    const totalRating = reviews.reduce((acc, curr) => acc + curr.userRating, 0);
    const average = totalRating / reviews?.length;

    return average;
  };

  const handleInputCart = (field, valueId) => {
    setInputCart((prevInputCart) => ({
      ...prevInputCart,
      [field]: valueId,
    }));
  };

  const handleInputNote = (e, field) => {
    const value = e.target.value;

    setInputCart((prevInputCart) => ({
      ...prevInputCart,
      [field]: value,
    }));
  };

  const handleAddProductToCart = async () => {
    if (!token) {
      showErrorToast("Please log in first");
      navigate("/login");
    }

    const loadingToastId = showLoadingToast("Loading...");

    const cart = await dispatch(
      postCreateCartByProductIdAction(inputCart, detailProductData?.id),
    );

    toast.dismiss(loadingToastId);

    if (cart) {
      showSuccessToast("Product successfully added to cart");
      await dispatch(getAllCartsByAuthAction());
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center">
        <Link to={"/"} className="text-base font-semibold text-neutral-1">
          Home
        </Link>
        <IoIosArrowForward size={20} className="text-neutral-2" />
        <Link
          to={`/product`}
          className="text-base font-semibold text-neutral-1"
        >
          Product
        </Link>
        <IoIosArrowForward size={20} className="text-neutral-2" />
        <Link
          to={`/product?c=${detailProductData?.category?.categoryName}`}
          className="text-base font-semibold text-neutral-1"
        >
          {detailProductData?.category?.categoryName}
        </Link>
        <IoIosArrowForward size={20} className="text-neutral-2" />
        <p className="truncate text-base text-neutral-3">
          {detailProductData?.productName}
        </p>
      </div>
      <div className="flex flex-col overflow-hidden rounded-md border shadow-md md:flex-row">
        <div className="relative min-h-full w-full border-r md:w-[40%]">
          <Swiper
            navigation={{
              nextEl: ".button-next",
              prevEl: ".button-prev",
            }}
            pagination={{
              clickable: true,
            }}
            loop={true}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation, Mousewheel, Keyboard]}
            className="h-full min-w-full"
          >
            {detailProductData?.image?.map((image, index) => (
              <SwiperSlide>
                <img
                  key={index}
                  src={image?.image}
                  alt="Product Image"
                  className="h-full w-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="button-prev absolute bottom-1/2 left-0 z-[1] translate-y-1/2 scale-[.65] sm:scale-75 md:scale-[.80]">
            <p className="cursor-pointer rounded-xl border border-neutral-4 bg-neutral-5 py-1 pl-[3px] pr-1 text-neutral-3 hover:bg-neutral-1 hover:text-neutral-5">
              <IoIosArrowBack size={40} />
            </p>
          </button>
          <button className="button-next absolute bottom-1/2 right-0 z-[1] translate-y-1/2 scale-[.65] sm:scale-75 md:scale-[.80]">
            <p className="cursor-pointer rounded-xl border border-neutral-4 bg-neutral-5 py-1 pl-1 pr-[3px] text-neutral-3 hover:bg-neutral-1 hover:text-neutral-5">
              <IoIosArrowForward size={40} />
            </p>
          </button>
        </div>
        <div className="flex w-full flex-col gap-3 px-6 py-8 md:w-[60%]">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">
              {detailProductData?.productName}
            </h1>
            <div className="flex items-center gap-2">
              {detailProductData?.review?.length > 0 && (
                <p className="flex gap-1 text-sm font-light text-neutral-2">
                  <FaStar size={18} className="text-alert-yellow" />
                  {averageRating(detailProductData?.review).toFixed(1)}{" "}
                  <span className="text-neutral-3 opacity-80">
                    ({detailProductData?.review?.length})
                  </span>
                </p>
              )}
              {detailProductData?.soldCount > 0 && (
                <p
                  className={`${
                    detailProductData?.review?.length > 0 && "border-l-2 pl-2"
                  } text-sm font-light text-neutral-2`}
                >
                  {detailProductData?.soldCount} Items Sold
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">
              IDR {detailProductData?.price.toLocaleString()}
            </h2>
            {detailProductData?.promotion && (
              <p className="break-all text-base font-semibold text-alert-red">
                <span className="mr-2 text-base font-normal text-neutral-3 line-through">
                  IDR{" "}
                  {Math.floor(
                    detailProductData?.price / 1 -
                      detailProductData?.promotion?.discount,
                  ).toLocaleString()}
                </span>
                {detailProductData?.promotion?.discount * 100}%
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-2 md:border-r-2 md:pr-4">
              <h5 className="text-sm font-semibold">
                Choose Size:{" "}
                <span className="text-slate-400">
                  {selectedSize?.toUpperCase()}
                </span>
              </h5>
              <div className="flex flex-wrap gap-2">
                {detailProductData?.size.map((size, index) => (
                  <p
                    className={`${
                      inputCart.sizeId === size.id
                        ? "border-2 border-neutral-1 font-semibold text-neutral-1"
                        : "border border-neutral-3 font-medium text-neutral-3"
                    } cursor-pointer rounded-full p-2 text-xs`}
                    key={index}
                    onClick={() => handleInputCart("sizeId", size.id)}
                  >
                    {size?.sizeName.toUpperCase()}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h5 className="text-sm font-semibold">
                Choose Color:{" "}
                <span className="text-slate-400">{selectedColor}</span>
              </h5>
              <div className="flex flex-wrap gap-2">
                {detailProductData?.color.map((color, index) => (
                  <p
                    className={`${
                      inputCart.colorId === color.id
                        ? "border-2 border-neutral-1 font-semibold text-neutral-1"
                        : "border border-neutral-3 font-medium text-neutral-3"
                    } cursor-pointer rounded-full p-2 text-xs`}
                    key={index}
                    onClick={() => handleInputCart("colorId", color.id)}
                  >
                    {color.colorName}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <button
              className="w-fit rounded-lg bg-neutral-1 px-2 py-1 text-sm text-neutral-5 hover:bg-opacity-80 md:px-3 md:py-2 md:text-base"
              onClick={() => handleAddProductToCart()}
            >
              ADD TO CART
            </button>
            <p className="text-sm">
              Stock:{" "}
              <span className="text-slate-400">{detailProductData?.stock}</span>
            </p>
          </div>
          <form className="flex w-full flex-col">
            <label htmlFor="note" className="text-sm">
              Note
            </label>
            <div className="relative flex w-full">
              <input
                type="text"
                id="note"
                value={inputCart.note}
                onChange={(e) => handleInputNote(e, "note")}
                placeholder="Please handle with care. Thank you!"
                autoComplete="off"
                className={`w-full border-b-2 pb-2 text-xs font-light text-neutral-3 focus:border-neutral-2 focus:outline-none sm:text-sm`}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col gap-2 border bg-neutral-5 px-6 py-2 shadow-md">
        <h5 className="text-center text-base font-semibold">Description</h5>
        <p className="text-justify text-sm font-medium text-neutral-2">
          {detailProductData?.description}
        </p>
      </div>
    </div>
  );
};
