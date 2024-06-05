import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Redux Actions
import {
  getAllCartsByAuthAction,
  postCreateCartByProductIdAction,
} from "../../../redux/action/carts/CartsAction";

// Icons
import { FaStar } from "react-icons/fa";

// Helper
import {
  showLoadingToast,
  showSuccessToast,
  showErrorToast,
} from "../../../helper/ToastHelper";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const SpecialOfferCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [inputCart, setInputCart] = useState({
    note: "",
    sizeId: "",
    colorId: "",
  });

  const specialOfferData = useSelector(
    (state) => state.products.specialOfferProduct,
  );

  const soldPercentage = Math.round(
    (specialOfferData.soldCount /
      (specialOfferData.soldCount + specialOfferData.stock)) *
      100,
  );

  const selectedColor = specialOfferData.color?.find(
    (color) => color.id === inputCart.colorId,
  )?.colorName;
  const selectedSize = specialOfferData.size?.find(
    (size) => size.id === inputCart.sizeId,
  )?.sizeName;

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const endDate = new Date(specialOfferData.promotion.endDate);
      const timeDifference = endDate.getTime() - currentDate.getTime();

      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hoursDifference = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutesDifference = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
      );
      const secondsDifference = Math.floor(
        (timeDifference % (1000 * 60)) / 1000,
      );

      setCountdown({
        days: daysDifference,
        hours: hoursDifference,
        minutes: minutesDifference,
        seconds: secondsDifference,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (specialOfferData) {
      setInputCart((prevState) => ({
        ...prevState,
        sizeId: specialOfferData.size[0]?.id || "",
        colorId: specialOfferData.color[0]?.id || "",
      }));
    }
  }, [specialOfferData]);

  const averageRating = (reviews) => {
    const totalRating = reviews?.reduce(
      (acc, curr) => acc + curr.userRating,
      0,
    );
    const average = totalRating / reviews?.length;

    return average;
  };

  const handleAddProductToCart = async () => {
    if (!token) {
      showErrorToast("Please log in first");
      navigate("/login");
    }

    const loadingToastId = showLoadingToast("Loading...");

    const cart = await dispatch(
      postCreateCartByProductIdAction(inputCart, specialOfferData.id),
    );

    toast.dismiss(loadingToastId);

    if (cart) {
      showSuccessToast("Product successfully added to cart");
      await dispatch(getAllCartsByAuthAction());
    }
  };

  const handleInputCart = (field, valueId) => {
    setInputCart((prevInputCart) => ({
      ...prevInputCart,
      [field]: valueId,
    }));
  };

  return (
    <>
      <div className="flex flex-col gap-4 rounded-md bg-slate-400 p-4 shadow-lg">
        <h1 className="w-full text-center text-xl font-bold text-neutral-5">
          SPECIAL OFFER
        </h1>
        <div className="flex flex-col justify-between gap-4 rounded-md border border-neutral-4 bg-slate-100 p-4 md:flex-row md:gap-0">
          <img
            src={specialOfferData.productImage}
            alt="Product"
            className="min-h-full w-full rounded-md object-cover md:w-[40%]"
          />
          <div className="flex w-full flex-col gap-2 md:w-[58%]">
            {specialOfferData.review?.length > 0 && (
              <div className="flex items-center gap-1">
                <FaStar size={20} className="text-alert-yellow" />
                <p className="text-sm font-semibold text-neutral-2">
                  {averageRating(specialOfferData.review)}
                </p>
                <p className="text-sm font-light text-neutral-3 opacity-80">
                  ({specialOfferData.review.length})
                </p>
              </div>
            )}
            <h5 className="text-base font-bold ">
              {specialOfferData.productName}
            </h5>
            <p className="text-sm text-neutral-4 ">
              {specialOfferData.description}
            </p>
            <div className="flex gap-3">
              <h4 className="text-lg font-bold text-neutral-1">
                IDR {specialOfferData.price}
              </h4>
              <div className="flex items-center gap-1 text-base">
                <h4 className="font-normal text-neutral-3 line-through">
                  IDR{" "}
                  {specialOfferData.price /
                    (1 - specialOfferData.promotion.discount)}
                </h4>
                <p className="font-semibold text-alert-red">
                  {specialOfferData.promotion.discount * 100}%
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 pb-2">
              <div className="flex flex-col gap-2 md:border-r-2 md:pr-4">
                <h5 className="text-sm font-semibold">
                  Choose Size:{" "}
                  <span className="text-slate-400">
                    {selectedSize?.toUpperCase()}
                  </span>
                </h5>
                <div className="flex flex-wrap gap-2">
                  {specialOfferData.size?.map((size, index) => (
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
                  {specialOfferData.color?.map((color, index) => (
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
            <button
              className="w-fit rounded-lg bg-neutral-1 px-3 py-2 text-neutral-5 hover:bg-opacity-80"
              onClick={() => handleAddProductToCart()}
            >
              ADD TO CART
            </button>
            <div className="flex justify-between">
              <p className="text-sm text-neutral-2">
                ALREADY SOLD:
                <span className="font-semibold text-neutral-1">
                  {" "}
                  {specialOfferData.soldCount}
                </span>
              </p>
              <p className="text-sm text-neutral-2">
                AVAILABLE:
                <span className="font-semibold text-neutral-1">
                  {" "}
                  {specialOfferData.stock}
                </span>
              </p>
            </div>
            <div className="w-full overflow-hidden rounded-full bg-neutral-4 px-[2px] py-[2px]">
              <div
                className={`h-full rounded-full border border-neutral-5 bg-neutral-1 py-1`}
                style={{ width: `${soldPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm font-medium">HURRY UP! OFFER ENDS IN:</p>
            <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
              <div className="flex flex-col rounded-lg bg-slate-200 px-3 py-2 text-center">
                <h5 className="text-lg font-medium tracking-wider">
                  {countdown.days}
                </h5>
                <p className="text-xs text-neutral-2">Days</p>
              </div>
              <div className="flex flex-col rounded-lg bg-slate-200 px-3 py-2 text-center">
                <h5 className="text-lg font-medium tracking-wider">
                  {countdown.hours}
                </h5>
                <p className="text-xs text-neutral-2">Hours</p>
              </div>
              <div className="flex flex-col rounded-lg bg-slate-200 px-3 py-2 text-center">
                <h5 className="text-lg font-medium tracking-wider">
                  {countdown.minutes}
                </h5>
                <p className="text-xs text-neutral-2">Min</p>
              </div>
              <div className="flex flex-col rounded-lg bg-slate-200 px-3 py-2 text-center">
                <h5 className="text-lg font-medium tracking-wider">
                  {countdown.seconds}
                </h5>
                <p className="text-xs text-neutral-2">Sec</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
