import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";

export const PaymentHistoryCard = ({ payment }) => {
  const navigate = useNavigate();

  const [showAll, setShowAll] = useState(false);

  const displayedItems = showAll ? payment?.cart : [payment?.cart[0]];

  const totalPrice = payment?.cart?.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0,
  );
  return (
    <>
      <div className="flex w-full flex-col gap-3 rounded-md border border-neutral-4 p-3 shadow-md">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex w-fit gap-1">
            <FaCartShopping size={18} />
            <p className="text-sm font-medium">Shopping</p>
          </div>
          <p className="text-sm font-medium">{payment?.createdAt}</p>
          <p
            className={`${
              payment?.paymentStatus === "Paid"
                ? "bg-alert-green"
                : "bg-alert-red"
            } rounded-sm px-2 py-[2px] text-xs text-neutral-5`}
          >
            {payment?.paymentStatus}
          </p>
          <p
            className={`${
              payment?.deliveryStatus === "Shipped"
                ? "bg-green-600"
                : "bg-orange-400"
            } rounded-sm px-2 py-[2px] text-center text-xs text-neutral-5`}
          >
            {payment?.deliveryStatus}
          </p>
          {payment?.trackingNumber && (
            <p className="break-all text-sm text-neutral-3">
              Track No: {payment?.trackingNumber}
            </p>
          )}
        </div>
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:gap-0">
          <div className="flex w-full flex-col gap-2 border-neutral-4 sm:w-[78%] sm:border-r-2">
            {displayedItems?.map((cart, index) => (
              <div
                key={index}
                className="flex w-full cursor-pointer justify-between sm:items-center"
                onClick={() => navigate(`/product/${cart.product.id}`)}
              >
                <div className="w-[32%] rounded-md sm:w-[25%] md:w-[20%] lg:w-[10%]">
                  <img
                    src={cart?.product?.image[0]?.image}
                    alt="Product"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex w-[66%] flex-col sm:w-[73%] md:w-[78%] lg:w-[88%]">
                  <h5 className="truncate text-sm font-semibold sm:text-lg">
                    {cart?.product?.productName}
                  </h5>
                  <div className="flex gap-1">
                    <p className="w-fit rounded-sm bg-neutral-4 px-1 text-xs font-light text-neutral-5">
                      {cart?.color?.colorName}
                    </p>
                    <p className="w-fit rounded-sm bg-neutral-4 px-1 text-xs font-light text-neutral-5">
                      {cart?.size?.sizeName}
                    </p>
                  </div>
                  <p className="text-xs font-light sm:text-sm">
                    {cart?.quantity} Items x IDR{" "}
                    {cart?.product?.price.toLocaleString()}{" "}
                    <span className="text-xs font-semibold text-alert-red sm:text-sm">
                      {cart?.promotion?.discount * 100}%
                    </span>
                  </p>

                  <p className="text-xs font-light text-neutral-3 sm:mt-1 sm:text-sm">
                    Note : <span className="italic">{cart?.note}</span>
                  </p>
                </div>
              </div>
            ))}
            {payment?.cart.length > 1 && (
              <button
                className="mx-auto flex w-fit items-center gap-1 hover:font-medium"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? (
                  <>
                    <p className="text-sm">Show Less</p>
                    <IoIosArrowUp size={20} />
                  </>
                ) : (
                  <>
                    <p className="text-sm">Show More</p>
                    <IoIosArrowDown size={20} />
                  </>
                )}
              </button>
            )}
          </div>
          <div className="w-full border-t-2 border-neutral-4 px-2 pt-2 text-center sm:w-[20%] sm:border-t-0 sm:pt-0">
            <p className="text-xs md:text-sm">Total Payment :</p>
            <p className="text-sm font-bold md:text-lg">
              IDR {Math.floor(0.11 * totalPrice + totalPrice).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
