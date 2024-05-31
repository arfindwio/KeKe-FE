import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Redux Actions
import { getAllCartsByAuthAction } from "../../../redux/action/carts/CartsAction";

// Helper
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../helper/ToastHelper";

// Components
import { Navbar } from "../../../assets/components/navbar/Navbar";
import { PriceDetailCard } from "../../../assets/components/card/PriceDetailCard";
import { Footer } from "../../../assets/components/footer/Footer";

// Icons
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [timeLeft, setTimeLeft] = useState(3600);
  const [paymentInput, setPaymentInput] = useState({
    // flightId: id,
    // bookingCode: "",
    methodPayment: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  });

  const cartData = useSelector((state) => state.carts.carts);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const token = CookieStorage.get(CookiesKeys.AuthToken);

    if (!token) return navigate("/");
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllCartsByAuthAction());
    };

    fetchData();
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePaymentMethodClick = (method) => {
    setPaymentInput((prevPaymentInput) => ({
      ...prevPaymentInput,
      methodPayment: prevPaymentInput.methodPayment === method ? "" : method,
    }));
  };

  const handlePaymentInput = (e, field) => {
    const value = e.target.value;

    if (field === "cardNumber") {
      const maxLength = 16;
      const inputValue = value.replace(/\D/g, "");
      const formattedValue =
        inputValue
          .substring(0, maxLength)
          .match(/.{1,4}/g)
          ?.join(" ") || "";
      setPaymentInput((prevPaymentInput) => ({
        ...prevPaymentInput,
        cardNumber: formattedValue,
      }));
    }

    if (field === "cvv") {
      const inputValue = value.replace(/\D/g, "");
      setPaymentInput((prevPaymentInput) => ({
        ...prevPaymentInput,
        cvv: inputValue.substring(0, 3),
      }));
    }

    if (field === "expiryDate") {
      const maxLength = 4;
      const inputValue = value.replace(/\D/g, "");
      const formattedValue =
        inputValue
          .substring(0, maxLength)
          .match(/.{1,2}/g)
          ?.join("/") || "";
      setPaymentInput((prevPaymentInput) => ({
        ...prevPaymentInput,
        expiryDate: formattedValue,
      }));
    }
  };

  const hnadlePayBooking = async () => {
    // const loadingToastId = showLoadingToast("Loading...");
    // const payment = await putPayBooking(paymentInput);
    // toast.dismiss(loadingToastId);
    // if (!payment) showErrorToast("Pay Tickeet Failed");
    // if (payment) {
    //   showSuccessToast("Pay Ticket Successful");
    //   setTimeout(() => {
    //     window.location.href = payment.transaction.redirect_url;
    //   }, 1000);
    // }
  };

  return (
    <>
      <Navbar />
      <div className="flex w-full flex-col gap-2 border-b bg-neutral-5 pb-4 shadow-md sm:gap-4 sm:px-10 sm:pt-24 lg:px-20">
        <div className="bg-primary-1 flex items-center gap-2 py-1 sm:bg-neutral-5 sm:py-0">
          <IoArrowBack
            size={25}
            className="w-fit cursor-pointer pl-6 text-neutral-5 sm:hidden"
            onClick={() => navigate.back()}
          />
          <h2 className="hidden text-xl font-bold text-neutral-1 sm:block">
            Personal Information
          </h2>
          <TbArrowBadgeRightFilled
            size={20}
            className="hidden text-neutral-3 sm:block"
          />
          <h2 className="text-xl font-bold text-neutral-5 sm:px-0 sm:text-neutral-1">
            Payment
          </h2>
          <TbArrowBadgeRightFilled
            size={20}
            className="hidden text-neutral-3 sm:block"
          />
          <h2 className="hidden text-xl font-bold text-neutral-3 sm:block">
            Finish
          </h2>
        </div>
        <div className="mx-auto w-[92%] rounded-xl bg-alert-red p-3 text-center sm:w-full">
          <p className="text-base font-medium text-neutral-5">
            Complete in {formatTime(timeLeft)}
          </p>
        </div>
      </div>
      <div className="mb-10 mt-8 flex w-full flex-col justify-between px-10 sm:flex-row lg:px-20">
        <div className="flex w-full flex-col gap-4 sm:w-[67%]">
          <h1 className="text-[20px] font-bold">Choose Payment Method</h1>

          <div className="flex flex-col gap-2">
            <button className="flex w-full justify-between rounded bg-neutral-1 px-5 py-4 text-base font-medium text-neutral-5">
              <p>Gopay</p>
              <MdKeyboardArrowDown size={25} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <button className="flex w-full justify-between rounded bg-neutral-1 px-5 py-4 text-base font-medium text-neutral-5">
              <p>Virtual Account</p>
              <MdKeyboardArrowDown size={25} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className={`${
                paymentInput.methodPayment === "Credit Card"
                  ? "bg-primary-1"
                  : "bg-neutral-1"
              } flex w-full justify-between rounded px-5 py-4 text-base font-medium text-neutral-5`}
              onClick={() => {
                handlePaymentMethodClick("Credit Card");
              }}
            >
              <p>Credit Card</p>
              {paymentInput.methodPayment === "Credit Card" ? (
                <MdKeyboardArrowUp size={25} />
              ) : (
                <MdKeyboardArrowDown size={25} />
              )}
            </button>
            {paymentInput.methodPayment === "Credit Card" && (
              <div className="flex flex-col items-center justify-center gap-5 pt-6">
                <div className="flex w-full justify-center gap-4">
                  <img
                    src="/mastercardLogo.svg"
                    alt="Master Card Logo"
                    width={1}
                    height={1}
                    className="w-[8%]"
                  />
                  <img
                    src="/visaLogo.svg"
                    alt="Visa Logo"
                    width={1}
                    height={1}
                    className="w-[8%]"
                  />
                  <img
                    src="/amexLogo.svg"
                    alt="American Express Logo"
                    width={1}
                    height={1}
                    className="w-[8%]"
                  />
                  <img
                    src="/paypalLogo.svg"
                    alt="Paypal Logo"
                    width={1}
                    height={1}
                    className="w-[8%]"
                  />
                </div>
                <div className="flex w-[70%] flex-col gap-2">
                  <label htmlFor="cardNumber" className="text-sm font-medium">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    placeholder="4480 0000 0000 0000"
                    className="border-b border-neutral-4 px-1 py-1 outline-none"
                    value={paymentInput.cardNumber}
                    onChange={(e) => handlePaymentInput(e, "cardNumber")}
                  />
                </div>
                <div className="flex w-[70%] flex-col gap-2">
                  <label htmlFor="cardHolder" className="text-sm font-medium">
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    id="cardHolder"
                    placeholder="Budi Cahyono"
                    className="border-b border-neutral-4 px-1 py-1 outline-none"
                  />
                </div>
                <div className="flex w-[70%] justify-between gap-2">
                  <div className="flex w-[47%] flex-col">
                    <label htmlFor="cvv" className="text-sm font-medium">
                      CVV
                    </label>
                    <input
                      type="number"
                      maxLength={3}
                      id="cvv"
                      placeholder="000"
                      className="border-b border-neutral-4 px-1 py-1 outline-none"
                      value={paymentInput.cvv}
                      onChange={(e) => handlePaymentInput(e, "cvv")}
                    />
                  </div>
                  <div className="flex w-[47%] flex-col">
                    <label htmlFor="expiryDate" className="text-sm font-medium">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      placeholder="07/24"
                      className="border-b border-neutral-4 px-1 py-1 outline-none"
                      value={paymentInput.expiryDate}
                      onChange={(e) => handlePaymentInput(e, "expiryDate")}
                    />
                  </div>
                </div>
                <button
                  className="bg-primary-1 mt-10 w-[90%] rounded-xl py-4 text-center text-neutral-5"
                  onClick={() => hnadlePayBooking()}
                >
                  Pay
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="fixed bottom-14 left-0 z-[1] flex w-full flex-col gap-1 rounded-md border border-neutral-4 bg-neutral-5 px-4 pb-4 pt-2 shadow-sm sm:px-10 md:bottom-0 lg:sticky lg:top-20 lg:h-fit lg:w-[30%] lg:gap-3 lg:px-3 lg:py-4 lg:pb-4 lg:pt-2">
          <PriceDetailCard carts={cartData} />
        </div>
      </div>

      <Footer />
    </>
  );
};
