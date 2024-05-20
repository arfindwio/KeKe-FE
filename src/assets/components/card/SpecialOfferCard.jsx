import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Icons
import { FaStar } from "react-icons/fa";

export const SpecialOfferCard = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const specialOfferData = useSelector(
    (state) => state.products.specialOfferProduct,
  );

  const soldPercent = `w-[${Math.round(
    (specialOfferData?.soldCount /
      (specialOfferData?.soldCount + specialOfferData?.stock)) *
      100,
  )}%]`;

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

  const averageRating = (reviews) => {
    const totalRating = reviews?.reduce(
      (acc, curr) => acc + curr.userRating,
      0,
    );
    const average = totalRating / reviews?.length;

    return average;
  };

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-neutral-4 pb-4">
        <h1 className="w-full text-xl font-bold">Special Offer</h1>
        <div className="flex flex-col justify-between gap-4 rounded-md border border-neutral-4 bg-neutral-5 p-4 md:flex-row md:gap-0">
          <img
            src={specialOfferData.productImage}
            alt="Product"
            className="max-h-[15rem] w-full object-contain md:max-h-none md:w-[40%]"
          />
          <div className="flex w-full flex-col gap-2 md:w-[58%]">
            {specialOfferData.review?.length > 0 && (
              <div className="flex items-center gap-1">
                <FaStar size={20} className="text-alert-yellow" />
                <p className="text-sm font-semibold text-neutral-2">
                  {averageRating(specialOfferData.review)}
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
              <h4 className="text-lg font-bold text-alert-red">
                IDR {specialOfferData.price}
              </h4>
              <h4 className="text-lg font-normal text-neutral-3 line-through">
                IDR{" "}
                {specialOfferData.price /
                  (1 - specialOfferData.promotion.discount)}
              </h4>
            </div>
            <button className="w-fit rounded-lg bg-neutral-1 px-3 py-2 text-neutral-5 hover:bg-opacity-80">
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
                className={`${
                  soldPercent ? soldPercent : `w-0`
                } h-full rounded-full border border-neutral-5 bg-neutral-1 py-1`}
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
