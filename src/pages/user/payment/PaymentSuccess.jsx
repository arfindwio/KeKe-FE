import React from "react";
import { useNavigate, Link } from "react-router-dom";

// Components
import { Navbar } from "../../../assets/components/navbar/Navbar";

// Images
import PaymentSuccessLogo from "../../../assets/img/PaymentSuccess.svg";

// Icons
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { IoArrowBack } from "react-icons/io5";

export const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="flex w-full flex-col gap-2 border-b bg-neutral-5 pb-4 pt-20 shadow-md sm:gap-4 sm:px-10 sm:pt-24 lg:px-20">
        <div className="flex items-center gap-2 py-1 sm:bg-neutral-5 sm:py-0">
          <IoArrowBack
            size={25}
            className="w-fit cursor-pointer pl-6 text-neutral-1 sm:hidden"
            onClick={() => navigate.back()}
          />
          <h2 className="hidden text-xl font-bold text-neutral-1 sm:block">
            Personal Information
          </h2>
          <TbArrowBadgeRightFilled
            size={20}
            className="hidden text-neutral-3 sm:block"
          />
          <h2 className="text-xl font-bold text-neutral-1 sm:hidden sm:px-0">
            Payment Success
          </h2>
          <h2 className="hidden text-xl font-bold text-neutral-1 sm:block sm:px-0">
            Payment
          </h2>
          <TbArrowBadgeRightFilled
            size={20}
            className="hidden text-neutral-3 sm:block"
          />
          <h2 className="hidden text-xl font-bold text-neutral-1 sm:block">
            Finish
          </h2>
        </div>
        <div className="mx-auto w-[92%] rounded-xl bg-alert-green p-3 text-center sm:w-full">
          <p className="text-nowrap text-sm font-medium text-neutral-5 sm:text-base">
            Thank you for completing the payment
          </p>
        </div>
      </div>

      <div className="mt-2 flex w-full flex-col justify-center gap-4 px-5 pb-10 text-center sm:px-10 md:mt-4 lg:px-20">
        <h1 className="text-center text-lg font-bold sm:text-xl md:text-3xl">
          Congratulations!
        </h1>
        <div className="mx-auto flex w-[40%] max-w-[8rem] justify-center sm:w-[30%] md:w-[20%] md:max-w-[12rem] xl:max-w-[14rem]">
          <img
            src={PaymentSuccessLogo}
            alt="Payment Success Logo"
            className="w-full object-contain"
          />
        </div>
        <p className="text-center text-base text-slate-600 sm:text-lg">
          Payment transaction successful!
        </p>
        <div className="mx-auto flex flex-col  justify-center gap-2">
          <Link
            to={"/history"}
            className="w-fit rounded-full bg-neutral-1 px-6 py-2 text-center text-base text-neutral-5 shadow-md hover:bg-opacity-80"
          >
            Start Shopping
          </Link>
          <Link
            to={"/"}
            className="w-fit rounded-full border border-neutral-1 bg-neutral-5 px-6 py-2 text-center text-base shadow-md hover:bg-neutral-1 hover:text-neutral-5"
          >
            Back To Home
          </Link>
        </div>
      </div>
    </>
  );
};
