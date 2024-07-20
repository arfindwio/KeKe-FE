import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";

// Icons
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

// Helper
import { showErrorToast } from "../../../helper/ToastHelper";

export const PriceDetailCard = ({ carts }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showDetail, setShowDetail] = useState(false);

  const cartData = useSelector((state) => state.carts.carts);
  const userData = useSelector((state) => state.users.userAuthenticate);

  const minWidth = useMediaQuery({ minDeviceWidth: 960 });

  const totalPrice = carts.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0,
  );

  const totalDiscount = carts
    .filter((cart) => cart.product.promotion)
    .reduce((total, cart) => {
      const discount = parseFloat(cart.product.promotion.discount);
      const normalPrice = cart.product.price / (1 - discount);
      const priceAfterDiscount = normalPrice - cart.product.price;
      return total + priceAfterDiscount * cart.quantity;
    }, 0);

  const handlePayment = () => {
    if (!cartData.length)
      return showErrorToast("Please add items to your cart before proceeding.");
    if (!userData.userProfile.address)
      return showErrorToast("Please complete your profile before proceeding.");
    if (userData?.userProfile?.address && cartData?.length)
      navigate("/payment");
  };

  return (
    <>
      <button
        className="mx-auto flex w-fit items-center justify-center gap-1 text-neutral-1 hover:font-semibold lg:hidden"
        onClick={() => setShowDetail(!showDetail)}
      >
        {showDetail ? (
          <>
            <p className="text-xs">Show Less</p>
            <IoIosArrowDown size={18} />
          </>
        ) : (
          <>
            <p className="text-xs">Show More</p>
            <IoIosArrowUp size={18} />
          </>
        )}
      </button>
      <h5 className="text-sm font-bold sm:text-lg">Price Details</h5>
      <div className="flex w-full flex-col gap-1">
        <div
          className={`${
            showDetail ? "flex" : "hidden"
          } justify-between lg:flex`}
        >
          <p className="text-xs font-semibold sm:text-sm">Price</p>
          <p className="text-xs sm:text-sm">
            IDR {Math.floor(totalPrice + totalDiscount).toLocaleString()}
          </p>
        </div>
        {totalDiscount > 0 && (
          <div
            className={`${
              showDetail ? "flex" : "hidden"
            } justify-between lg:flex`}
          >
            <p className="text-xs font-semibold sm:text-sm">Discount</p>
            <p className="text-xs sm:text-sm">
              - IDR {Math.floor(totalDiscount).toLocaleString()}
            </p>
          </div>
        )}

        <div
          className={`${
            showDetail ? "flex" : "hidden"
          } mt-2 flex-col justify-between gap-1 border-t-2 border-neutral-3 pt-2 lg:flex`}
        >
          <div className={`flex justify-between`}>
            <p className="text-xs font-semibold sm:text-sm">Total</p>
            <p className="text-xs sm:text-sm">
              IDR {Math.floor(totalPrice).toLocaleString()}
            </p>
          </div>
          <div className={`flex justify-between`}>
            <p className="text-xs font-semibold sm:text-sm">Tax 11%</p>
            <p className="text-xs sm:text-sm">
              IDR {Math.floor(0.11 * totalPrice).toLocaleString()}
            </p>
          </div>
        </div>
        <div
          className={`${
            (showDetail || minWidth) && "mt-2 border-t-2 pt-2"
          } flex justify-between border-neutral-3 font-bold`}
        >
          <p className="text-xs sm:text-sm">Total Price</p>
          <p className="text-xs sm:text-sm">
            IDR {Math.floor(0.11 * totalPrice + totalPrice).toLocaleString()}
          </p>
        </div>
      </div>
      <button
        onClick={() => handlePayment()}
        className={`${
          location.pathname === "/payment" && "hidden"
        } w-full rounded-lg bg-neutral-1 py-1 text-center text-sm text-neutral-5 hover:bg-opacity-80 sm:text-base`}
      >
        Pay Items
      </button>
    </>
  );
};
