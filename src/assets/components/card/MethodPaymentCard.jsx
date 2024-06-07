import React, { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

// Redux Actions
import { reduxPostCreatePaymentMidtrans } from "../../../services/payments/Payments";

// Images
import MasterCard from "../../../../src/assets/img/mastercard.webp";
import Visa from "../../../../src/assets/img/visa.webp";
import Amex from "../../../../src/assets/img/amex.webp";
import Paypal from "../../../../src/assets/img/paypal.webp";
import Gopay from "../../../../src/assets/img/Gopay.webp";
import Alfamart from "../../../../src/assets/img/Alfamart.webp";
import Indomaret from "../../../../src/assets/img/Indomaret.webp";

// Helper
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../helper/ToastHelper";

// Icons
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

export const MethodPaymentCard = ({ inputPayment, methodPayment }) => {
  const dispatch = useDispatch();

  const [paymentInput, setPaymentInput] = useState(inputPayment);

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
    } else if (field === "cvv") {
      const inputValue = value.replace(/\D/g, "");
      setPaymentInput((prevPaymentInput) => ({
        ...prevPaymentInput,
        cvv: inputValue.substring(0, 3),
      }));
    } else if (field === "expiryDate") {
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
    } else {
      setPaymentInput((prevPaymentInput) => ({
        ...prevPaymentInput,
        [field]: value,
      }));
    }
  };

  const handlePay = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    const payment = await dispatch(
      reduxPostCreatePaymentMidtrans(paymentInput),
    );

    toast.dismiss(loadingToastId);

    if (!payment) showErrorToast("Payment Failed");

    if (payment) {
      showSuccessToast("Payment Successful");
      setTimeout(() => {
        window.location.href = payment.transaction.redirect_url;
      }, 1000);
    }
  };

  const renderImage = () => {
    if (methodPayment === "Credit Card") {
      return (
        <>
          <img
            src={MasterCard}
            alt="Master Card Logo"
            width={1}
            height={1}
            className="w-[15%] object-contain sm:h-full sm:w-20"
          />
          <img
            src={Visa}
            alt="Visa Logo"
            width={1}
            height={1}
            className="w-[15%] object-contain sm:h-full sm:w-20"
          />
          <img
            src={Amex}
            alt="American Express Logo"
            width={1}
            height={1}
            className="w-[15%] object-contain sm:h-full sm:w-20"
          />
          <img
            src={Paypal}
            alt="Paypal Logo"
            width={1}
            height={1}
            className="w-[15%]  object-contain sm:h-full sm:w-20"
          />
        </>
      );
    }

    if (methodPayment === "Gopay") {
      return (
        <>
          <img
            src={Gopay}
            alt="Gopay Logo"
            width={1}
            height={1}
            className="w-[15%] object-contain sm:h-full sm:w-20"
          />
        </>
      );
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <button
          className={`${
            paymentInput.methodPayment === methodPayment
              ? "bg-primary-1"
              : "bg-neutral-1"
          } flex w-full justify-between rounded px-5 py-4 text-base font-medium text-neutral-5`}
          onClick={() => {
            handlePaymentMethodClick(methodPayment);
          }}
        >
          <p>{methodPayment}</p>
          {paymentInput.methodPayment === methodPayment ? (
            <MdKeyboardArrowUp size={25} />
          ) : (
            <MdKeyboardArrowDown size={25} />
          )}
        </button>
        {paymentInput.methodPayment === methodPayment && (
          <div className="flex flex-col items-center justify-center gap-5 pt-6">
            <div className="flex w-full flex-wrap justify-center gap-4">
              {renderImage()}
            </div>
            <div className="mx-auto flex w-[70%] flex-wrap justify-between">
              {Object.entries(paymentInput).map(([key, value], index) => {
                if (key === "methodPayment") {
                  return null;
                }

                const formattedKey = key
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")
                  .replace(/([A-Z])/g, " $1")
                  .trim();

                if (key === "cvv" || key === "expiryDate") {
                  return (
                    <div className="flex w-[47%] flex-col gap-2 pt-5">
                      <label htmlFor={key} className="text-sm font-medium">
                        {key === "cvv" ? key.toUpperCase() : formattedKey}
                      </label>
                      <input
                        type={key === "cvv" ? "number" : "text"}
                        id={key}
                        // placeholder="07/24"
                        className="border-b border-neutral-4 px-1 py-1 outline-none"
                        value={value}
                        onChange={(e) => handlePaymentInput(e, key)}
                      />
                    </div>
                  );
                }

                return (
                  <div className="flex w-full flex-col gap-2 pt-5" key={index}>
                    <label htmlFor={key} className="text-sm font-medium">
                      {formattedKey}
                    </label>
                    <input
                      type="text"
                      id={key}
                      // placeholder="4480 0000 0000 0000"
                      className="border-b border-neutral-4 px-1 py-1 outline-none"
                      value={value}
                      onChange={(e) => handlePaymentInput(e, key)}
                    />
                  </div>
                );
              })}
            </div>

            <button
              className="bg-primary-1 hover:bg-primary-hover mt-6 w-[90%] rounded-xl py-4 text-center text-neutral-5"
              onClick={() => handlePay()}
            >
              Pay
            </button>
          </div>
        )}
      </div>
    </>
  );
};
