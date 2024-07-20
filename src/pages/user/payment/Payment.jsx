import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

// Redux Actions
import { getAllCartsByAuthAction } from "../../../redux/action/carts/CartsAction";
import { postCreatePaymentMidtransAction } from "../../../redux/action/payments/PaymentsAction";

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
import { IoMdInformationCircle } from "react-icons/io";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

// Images
import MasterCard from "../../../../src/assets/img/mastercard.webp";
import Visa from "../../../../src/assets/img/visa.webp";
import Amex from "../../../../src/assets/img/amex.webp";
import Paypal from "../../../../src/assets/img/paypal.webp";
import Gopay from "../../../../src/assets/img/Gopay.webp";
import Alfamart from "../../../../src/assets/img/Alfamart.webp";
import Indomaret from "../../../../src/assets/img/Indomaret.webp";

export const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qrCode, setQrCode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [paymentInput, setPaymentInput] = useState({
    methodPayment: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  });

  const cartData = useSelector((state) => state.carts.carts);
  const userData = useSelector((state) => state.users.userAuthenticate);

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

  useEffect(() => {
    if (!userData?.userProfile?.address || !cartData?.length) navigate("/cart");
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

  const handlePay = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    if (paymentInput.methodPayment === "Credit Card") {
      const payment = await dispatch(
        postCreatePaymentMidtransAction(paymentInput),
      );
      toast.dismiss(loadingToastId);
      if (!payment) showErrorToast("Payment Failed");
      if (payment) {
        showSuccessToast("Payment Successful");
        setTimeout(() => {
          window.location.href = payment.transaction.redirect_url;
        }, 1000);
      }
    }
    if (paymentInput.methodPayment === "Gopay") {
      const payment = await dispatch(
        postCreatePaymentMidtransAction({
          methodPayment: paymentInput.methodPayment,
        }),
      );

      if (!payment) showErrorToast("Payment Failed");
      if (payment) {
        showSuccessToast("Payment Successful");
        setQrCode(payment.transaction.action[0].url);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex w-full flex-col gap-2 border-b bg-neutral-5 pb-4 shadow-md sm:gap-4 sm:px-10 sm:pt-24 lg:px-20">
        <div className="flex items-center gap-2 bg-primary-1 py-1 sm:bg-neutral-5 sm:py-0">
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
      <div className="mb-10 mt-8 flex w-full flex-col justify-between px-5 sm:flex-row sm:px-10 lg:px-20">
        <div className="flex w-full flex-col gap-4 lg:w-[67%]">
          <h1 className="text-[20px] font-bold">Choose Payment Method</h1>

          {/* Gopay */}
          <div className="flex flex-col gap-2">
            <button
              className={`${
                paymentInput.methodPayment === "Gopay"
                  ? "bg-primary-1"
                  : "bg-neutral-1"
              } flex w-full justify-between rounded px-5 py-4 text-base font-medium text-neutral-5`}
              onClick={() => {
                handlePaymentMethodClick("Gopay");
              }}
            >
              <p>Gopay</p>
              {paymentInput.methodPayment === "Gopay" ? (
                <MdKeyboardArrowUp size={25} />
              ) : (
                <MdKeyboardArrowDown size={25} />
              )}
            </button>

            {paymentInput.methodPayment === "Gopay" && (
              <div className="flex flex-col items-center justify-center gap-5 pt-6">
                <div className="flex w-full justify-center gap-4">
                  <img
                    src={Gopay}
                    alt="Gopay Logo"
                    width={1}
                    height={1}
                    className="w-[20%]"
                  />
                </div>
                <button
                  className="mt-6 w-[90%] rounded-xl bg-primary-1 py-4 text-center text-neutral-5 hover:bg-primary-hover"
                  onClick={() => handlePay()}
                >
                  Pay
                </button>
              </div>
            )}
          </div>

          {/* Virtual Account */}
          <div className="flex flex-col gap-2">
            <button className="flex w-full justify-between rounded bg-neutral-1 px-5 py-4 text-base font-medium text-neutral-5">
              <p>Virtual Account</p>
              <MdKeyboardArrowDown size={25} />
            </button>
          </div>

          {/* Credit Card */}
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
                    src={MasterCard}
                    alt="Master Card Logo"
                    width={1}
                    height={1}
                    className="w-[8%]"
                  />
                  <img
                    src={Visa}
                    alt="Visa Logo"
                    width={1}
                    height={1}
                    className="w-[8%]"
                  />
                  <img
                    src={Amex}
                    alt="American Express Logo"
                    width={1}
                    height={1}
                    className="w-[8%]"
                  />
                  <img
                    src={Paypal}
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
                  className="mt-6 w-[90%] rounded-xl bg-primary-1 py-4 text-center text-neutral-5 hover:bg-primary-hover"
                  onClick={() => handlePay()}
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

      {/* Modal */}
      {qrCode && (
        <div className="fixed top-0 z-50 flex h-screen w-screen items-center justify-center bg-neutral-1 bg-opacity-50">
          <div className="flex w-[30%] flex-col gap-3 rounded-md bg-neutral-5 px-6 py-4 shadow-sm shadow-neutral-5">
            <h1 className="text-center text-xl font-bold">Gopay</h1>
            <img
              src={qrCode}
              alt="QR CODE"
              className="mx-auto w-1/2 border object-contain shadow-md"
            />
            <div className="flex flex-col">
              <h5 className="flex items-center gap-1 text-base font-semibold text-blue-500">
                <IoMdInformationCircle size={18} />
                How to pay
              </h5>
              <p className="text-sm font-normal">
                1. Open your <span className="font-bold">Gojek, Gopay</span> or{" "}
                <span className="font-bold">Other e-wallet app.</span>
              </p>
              <p className="text-sm font-normal">
                2. <span className="font-bold">Scan QRIS</span> on your monitor
              </p>
              <p className="text-sm font-normal">
                3. Confirm payment in the app
              </p>
              <p className="text-sm font-normal">4. Payment Complete</p>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <Link
                to={"/history"}
                className="mx-auto w-fit rounded-xl border border-neutral-1 bg-neutral-1 px-4 py-2 text-center text-neutral-5 hover:bg-opacity-70"
              >
                Check Payment History
              </Link>
              <Link
                to={"/"}
                className="mx-auto w-fit rounded-xl border border-neutral-1 bg-neutral-5 px-4 py-2 text-center text-neutral-1 hover:bg-neutral-1 hover:text-neutral-5"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
