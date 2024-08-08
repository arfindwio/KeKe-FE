import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
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
import MasterCard from "../../../assets/img/mastercard.webp";
import Visa from "../../../assets/img/visa.webp";
import Amex from "../../../assets/img/amex.webp";
import Paypal from "../../../assets/img/paypal.webp";
import Gopay from "../../../assets/img/Gopay.webp";
import Alfamart from "../../../assets/img/Alfamart.webp";
import Indomaret from "../../../assets/img/Indomaret.webp";
import BCA from "../../../assets/img/BCA.webp";
import BNI from "../../../assets/img/BNI.webp";
import BRI from "../../../assets/img/BRI.webp";
import Cimb from "../../../assets/img/Cimb.webp";
import MandiriBill from "../../../assets/img/MandiriBill.webp";
import Permata from "../../../assets/img/Permata.webp";
import Akulaku from "../../../assets/img/Akulaku.webp";

export const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isProcessing, setIsProcessing] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [virtualAccount, setVirtualAccount] = useState(null);
  const [billPayment, setBillPayment] = useState({
    billerCode: "",
    billKey: "",
  });
  const [paymentCounter, setPaymentCounter] = useState({
    paymentCode: "",
    merchantId: "",
  });
  const [timeLeft, setTimeLeft] = useState(3600);
  const [paymentInput, setPaymentInput] = useState({
    methodPayment: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    bankName: "bca",
    store: "indomaret",
    message: "",
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

  const handleInputChange = (e) => {
    setPaymentInput((prevPaymentInput) => ({
      ...prevPaymentInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePay = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    const loadingToastId = showLoadingToast("Loading...");

    if (paymentInput.methodPayment === "Credit Card") {
      const payment = await dispatch(
        postCreatePaymentMidtransAction({
          methodPayment: paymentInput.methodPayment,
          cardNumber: paymentInput.cardNumber,
          cvv: paymentInput.cvv,
          expiryDate: paymentInput.expiryDate,
        }),
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
    if (paymentInput.methodPayment === "Cardless Credit") {
      const payment = await dispatch(
        postCreatePaymentMidtransAction({
          methodPayment: paymentInput.methodPayment,
        }),
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
        document.body.style.overflow = "hidden";
        setQrCode(payment.transaction.actions[0].url);
      }
    }
    if (
      paymentInput.methodPayment === "Bank Transfer" ||
      paymentInput.methodPayment === "Permata"
    ) {
      const payment = await dispatch(
        postCreatePaymentMidtransAction({
          methodPayment: paymentInput.methodPayment,
        }),
      );

      if (!payment) showErrorToast("Payment Failed");
      if (payment) {
        showSuccessToast("Payment Successful");
        document.body.style.overflow = "hidden";
        if (paymentInput.methodPayment === "Bank Transfer") {
          setVirtualAccount(payment.transaction.va_numbers[0].va_number);
        }
        if (paymentInput.methodPayment === "Permata") {
          setVirtualAccount(payment.transaction.permata_va_number);
        }
      }
    }
    if (paymentInput.methodPayment === "Mandiri Bill") {
      const payment = await dispatch(
        postCreatePaymentMidtransAction({
          methodPayment: paymentInput.methodPayment,
        }),
      );

      if (!payment) showErrorToast("Payment Failed");
      if (payment) {
        showSuccessToast("Payment Successful");
        document.body.style.overflow = "hidden";
        setBillPayment({
          billerCode: payment.transaction.biller_code,
          billKey: payment.transaction.bill_key,
        });
      }
    }
    if (paymentInput.methodPayment === "Counter") {
      const payment = await dispatch(
        postCreatePaymentMidtransAction({
          methodPayment: paymentInput.methodPayment,
          message: paymentInput.message,
        }),
      );

      if (!payment) showErrorToast("Payment Failed");
      if (payment) {
        showSuccessToast("Payment Successful");
        document.body.style.overflow = "hidden";
        setPaymentCounter({
          paymentCode: payment.transaction.payment_code,
          merchantId:
            paymentInput.store === "indomaret"
              ? payment.transaction.merchant_id
              : "",
        });
      }
    }
    setIsProcessing(false);
  };

  const renderBankTransfer = () => {
    if (paymentInput.bankName === "bca") {
      return (
        <>
          <li className="text-sm font-normal">
            Select <span className="font-bold">other transactions</span> on the
            main menu.
          </li>
          <li className="text-sm font-normal">
            Select <span className="font-bold">transfer</span>.
          </li>
          <li className="text-sm font-normal">
            Select to <span className="font-bold">BCA virtual account</span>.
          </li>
          <li className="text-sm font-normal">
            Insert <span className="font-bold">BCA Virtual account number</span>
            .
          </li>
          <li className="text-sm font-normal">
            Insert the <span className="font-bold">payable amount,</span> then{" "}
            <span className="font-bold">confirm</span>.
          </li>
          <li className="text-sm font-normal">Payment completed.</li>
        </>
      );
    }
    if (paymentInput.bankName === "bni") {
      return (
        <>
          <li className="text-sm font-normal">
            Select <span className="font-bold">other</span> on the main menu.
          </li>
          <li className="text-sm font-normal">
            Select <span className="font-bold">transfer</span>.
          </li>
          <li className="text-sm font-normal">
            Select to <span className="font-bold">BNI account</span>.
          </li>
          <li className="text-sm font-normal">
            Insert the <span className="font-bold">payment account number</span>
            .
          </li>
          <li className="text-sm font-normal">
            Insert the <span className="font-bold">payable amount</span> then{" "}
            <span className="font-bold">confirm</span>.
          </li>
          <li className="text-sm font-normal">Payment completed.</li>
        </>
      );
    }
    if (paymentInput.bankName === "bri") {
      return (
        <>
          <li className="text-sm font-normal">
            Select <span className="font-bold">other transactions</span> on the
            main menu.
          </li>
          <li className="text-sm font-normal">
            Select <span className="font-bold">payment</span>.
          </li>
          <li className="text-sm font-normal">
            Select to <span className="font-bold">other</span>.
          </li>
          <li className="text-sm font-normal">
            Insert the <span className="font-bold">BRIVA</span>.
          </li>
          <li className="text-sm font-normal">
            Insert the <span className="font-bold">BRIVA number,</span> then{" "}
            <span className="font-bold">confirm</span>.
          </li>
          <li className="text-sm font-normal">Payment completed.</li>
        </>
      );
    }
    if (paymentInput.bankName === "cimb") {
      return (
        <>
          <li className="text-sm font-normal">
            Select <span className="font-bold">other transactions</span> on the
            main menu.
          </li>
          <li className="text-sm font-normal">
            Select <span className="font-bold">payment</span>.
          </li>
          <li className="text-sm font-normal">
            Select to <span className="font-bold">other</span>.
          </li>
          <li className="text-sm font-normal">
            Insert the <span className="font-bold">Cimb virtual account</span>{" "}
            then <span className="font-bold">confirm</span>.
          </li>
          <li className="text-sm font-normal">Payment completed.</li>
        </>
      );
    }
  };

  const renderCounter = () => {
    if (paymentInput.store === "alfamart") {
      return (
        <>
          <li className="text-sm font-normal">
            Tap <span className="font-bold">Download payment info</span>to get a
            copy of your unique payment details.
          </li>
          <li className="text-sm font-normal">
            Go to the nearest
            <span className="font-bold">Alfamart</span> store near you and
            <span className="font-bold">
              show your barcode/payment code to the cashier
            </span>
            .
          </li>
          <li className="text-sm font-normal">
            The cashier will confirm your transaction details.
          </li>
          <li className="text-sm font-normal">
            Confirm your payment with the cashier.
          </li>
          <li className="text-sm font-normal">
            Once your transaction is successful you'll receive the payment
            confirmation e-mail.
          </li>
          <li className="text-sm font-normal">
            Please keep your Alfamart payment receipt in case you'll need
            further help via support.
          </li>
        </>
      );
    }
    if (paymentInput.store === "indomaret") {
      return (
        <>
          <li className="text-sm font-normal">
            Top <span className="font-bold">Download payment info</span> to get
            a copy of your unique payment details.
          </li>
          <li className="text-sm font-normal">
            If you're going to pay{" "}
            <span className="font-bold">on the counter</span> go to the nearest
            Indomarel store and{" "}
            <span className="font-bold">
              show your payment code/barcode to the cashier
            </span>
            .
          </li>
          <li className="text-sm font-normal">
            The cashier will confirm your transaction details. Once your
            transaction is successful. you'll receive the payment confirmation e
            mail
          </li>
          <li className="text-sm font-normal">
            if you're going to pay via Isaku, open the app and top{" "}
            <span className="font-bold">Bayar</span>.
          </li>
          <li className="text-sm font-normal">
            Choose the merchant you'd like to pay to and enter your{" "}
            <span className="font-bold">payment code</span>.
          </li>
          <li className="text-sm font-normal">
            Tap <span className="font-bold">Selanjutnya</span> and check your
            transaction details.
          </li>
          <li className="text-sm font-normal">
            Tap <span className="font-bold">Bayar sekarang</span> to confirm
            your payment.
          </li>
          <li className="text-sm font-normal">
            Please keep your Indomaret payment receipt in case you'll need
            further help via support
          </li>
        </>
      );
    }
  };

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
          <h2 className="text-xl font-bold text-neutral-1 sm:px-0">Payment</h2>
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
                    className="w-[8%] object-contain"
                  />
                  <img
                    src={Visa}
                    alt="Visa Logo"
                    width={1}
                    height={1}
                    className="w-[8%] object-contain"
                  />
                  <img
                    src={Amex}
                    alt="American Express Logo"
                    width={1}
                    height={1}
                    className="w-[8%] object-contain"
                  />
                  <img
                    src={Paypal}
                    alt="Paypal Logo"
                    width={1}
                    height={1}
                    className="w-[8%] object-contain"
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
                      onWheel={(e) => e.target.blur()}
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
                  disabled={isProcessing}
                >
                  Pay
                </button>
              </div>
            )}
          </div>

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
                    className="w-[20%] object-contain"
                  />
                </div>
                <button
                  className="mt-6 w-[90%] rounded-xl bg-primary-1 py-4 text-center text-neutral-5 hover:bg-primary-hover"
                  onClick={() => handlePay()}
                  disabled={isProcessing}
                >
                  Pay
                </button>
              </div>
            )}
          </div>

          {/* Bank Transfer */}
          <div className="flex flex-col gap-2">
            <button
              className={`${
                paymentInput.methodPayment === "Bank Transfer"
                  ? "bg-primary-1"
                  : "bg-neutral-1"
              } flex w-full justify-between rounded px-5 py-4 text-base font-medium text-neutral-5`}
              onClick={() => {
                handlePaymentMethodClick("Bank Transfer");
              }}
            >
              <p>Bank Transfer</p>
              {paymentInput.methodPayment === "Bank Transfer" ? (
                <MdKeyboardArrowUp size={25} />
              ) : (
                <MdKeyboardArrowDown size={25} />
              )}
            </button>

            {paymentInput.methodPayment === "Bank Transfer" && (
              <div className="flex flex-col items-center justify-center gap-5 pt-6">
                <div className="flex w-full justify-center gap-4">
                  <img
                    src={BCA}
                    alt="BCA Logo"
                    width={1}
                    height={1}
                    className="w-[8%] object-contain"
                  />
                  <img
                    src={BNI}
                    alt="BNI Logo"
                    width={1}
                    height={1}
                    className="w-[8%] object-contain"
                  />
                  <img
                    src={BRI}
                    alt="BRI Logo"
                    width={1}
                    height={1}
                    className="w-[8%] object-contain"
                  />
                  <img
                    src={Cimb}
                    alt="Cimb Logo"
                    width={1}
                    height={1}
                    className="w-[8%] object-contain"
                  />
                </div>
                <div className="flex w-[70%] flex-col gap-2">
                  <label htmlFor="bankName" className="text-neutral-1">
                    Bank Name
                  </label>
                  <select
                    name="bankName"
                    id="bankName"
                    value={paymentInput.bankName}
                    onChange={handleInputChange}
                    className="border-b border-neutral-4 px-1 py-1 outline-none"
                  >
                    <option value="bca">BCA</option>
                    <option value="bni">BNI</option>
                    <option value="bri">BRI</option>
                    <option value="cimb">CIMB</option>
                  </select>
                </div>
                <button
                  className="mt-6 w-[90%] rounded-xl bg-primary-1 py-4 text-center text-neutral-5 hover:bg-primary-hover"
                  onClick={() => handlePay()}
                  disabled={isProcessing}
                >
                  Pay
                </button>
              </div>
            )}
          </div>

          {/* Mandiri Bill */}
          <div className="flex flex-col gap-2">
            <button
              className={`${
                paymentInput.methodPayment === "Mandiri Bill"
                  ? "bg-primary-1"
                  : "bg-neutral-1"
              } flex w-full justify-between rounded px-5 py-4 text-base font-medium text-neutral-5`}
              onClick={() => {
                handlePaymentMethodClick("Mandiri Bill");
              }}
            >
              <p>Mandiri Bill</p>
              {paymentInput.methodPayment === "Mandiri Bill" ? (
                <MdKeyboardArrowUp size={25} />
              ) : (
                <MdKeyboardArrowDown size={25} />
              )}
            </button>

            {paymentInput.methodPayment === "Mandiri Bill" && (
              <div className="flex flex-col items-center justify-center gap-5 pt-6">
                <div className="flex w-full justify-center gap-4">
                  <img
                    src={MandiriBill}
                    alt="Mandiri Bill Logo"
                    width={1}
                    height={1}
                    className="w-[20%] object-contain"
                  />
                </div>
                <button
                  className="mt-6 w-[90%] rounded-xl bg-primary-1 py-4 text-center text-neutral-5 hover:bg-primary-hover"
                  onClick={() => handlePay()}
                  disabled={isProcessing}
                >
                  Pay
                </button>
              </div>
            )}
          </div>

          {/* Permata */}
          <div className="flex flex-col gap-2">
            <button
              className={`${
                paymentInput.methodPayment === "Permata"
                  ? "bg-primary-1"
                  : "bg-neutral-1"
              } flex w-full justify-between rounded px-5 py-4 text-base font-medium text-neutral-5`}
              onClick={() => {
                handlePaymentMethodClick("Permata");
              }}
            >
              <p>Permata</p>
              {paymentInput.methodPayment === "Permata" ? (
                <MdKeyboardArrowUp size={25} />
              ) : (
                <MdKeyboardArrowDown size={25} />
              )}
            </button>

            {paymentInput.methodPayment === "Permata" && (
              <div className="flex flex-col items-center justify-center gap-5 pt-6">
                <div className="flex w-full justify-center gap-4">
                  <img
                    src={Permata}
                    alt="Permata Logo"
                    width={1}
                    height={1}
                    className="w-[20%] object-contain"
                  />
                </div>
                <button
                  className="mt-6 w-[90%] rounded-xl bg-primary-1 py-4 text-center text-neutral-5 hover:bg-primary-hover"
                  onClick={() => handlePay()}
                  disabled={isProcessing}
                >
                  Pay
                </button>
              </div>
            )}
          </div>

          {/* Counter */}
          <div className="flex flex-col gap-2">
            <button
              className={`${
                paymentInput.methodPayment === "Counter"
                  ? "bg-primary-1"
                  : "bg-neutral-1"
              } flex w-full justify-between rounded px-5 py-4 text-base font-medium text-neutral-5`}
              onClick={() => {
                handlePaymentMethodClick("Counter");
              }}
            >
              <p>Counter</p>
              {paymentInput.methodPayment === "Counter" ? (
                <MdKeyboardArrowUp size={25} />
              ) : (
                <MdKeyboardArrowDown size={25} />
              )}
            </button>

            {paymentInput.methodPayment === "Counter" && (
              <div className="flex flex-col items-center justify-center gap-5 pt-6">
                <div className="flex w-full justify-center gap-4">
                  <img
                    src={Indomaret}
                    alt="Indomaret Logo"
                    width={1}
                    height={1}
                    className="w-[15%] object-contain"
                  />
                  <img
                    src={Alfamart}
                    alt="Alfamart Logo"
                    width={1}
                    height={1}
                    className="w-[15%] object-contain"
                  />
                </div>
                <div className="flex w-[70%] flex-col gap-2">
                  <label htmlFor="store" className="text-neutral-1">
                    Store
                  </label>
                  <select
                    name="store"
                    id="store"
                    value={paymentInput.store}
                    onChange={handleInputChange}
                    className="border-b border-neutral-4 px-1 py-1 outline-none"
                  >
                    <option value="indomaret">Indomaret</option>
                    <option value="alfamart">Alfamart</option>
                  </select>
                </div>
                <div className="flex w-[70%] flex-col gap-2">
                  <label htmlFor="message" className="text-neutral-1">
                    Message
                  </label>
                  <input
                    type="text"
                    id="message"
                    placeholder="Input Message Here"
                    className="border-b border-neutral-4 px-1 py-1 outline-none"
                    value={paymentInput.message}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  className="mt-6 w-[90%] rounded-xl bg-primary-1 py-4 text-center text-neutral-5 hover:bg-primary-hover"
                  onClick={() => handlePay()}
                  disabled={isProcessing}
                >
                  Pay
                </button>
              </div>
            )}
          </div>

          {/* Cardless Credit */}
          <div className="flex flex-col gap-2">
            <button
              className={`${
                paymentInput.methodPayment === "Cardless Credit"
                  ? "bg-primary-1"
                  : "bg-neutral-1"
              } flex w-full justify-between rounded px-5 py-4 text-base font-medium text-neutral-5`}
              onClick={() => {
                handlePaymentMethodClick("Cardless Credit");
              }}
            >
              <p>Cardless Credit</p>
              {paymentInput.methodPayment === "Cardless Credit" ? (
                <MdKeyboardArrowUp size={25} />
              ) : (
                <MdKeyboardArrowDown size={25} />
              )}
            </button>

            {paymentInput.methodPayment === "Cardless Credit" && (
              <div className="flex flex-col items-center justify-center gap-5 pt-6">
                <div className="flex w-full justify-center gap-4">
                  <img
                    src={Akulaku}
                    alt="Akulaku Logo"
                    width={1}
                    height={1}
                    className="w-[20%] object-contain"
                  />
                </div>
                <button
                  className="mt-6 w-[90%] rounded-xl bg-primary-1 py-4 text-center text-neutral-5 hover:bg-primary-hover"
                  onClick={() => handlePay()}
                  disabled={isProcessing}
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

      {/* Modal QRCODE */}
      {qrCode && (
        <div className="fixed top-0 z-50 flex h-screen w-screen items-center justify-center bg-neutral-1 bg-opacity-50">
          <div className="flex max-h-[90vh] w-[90%] flex-col gap-3 overflow-auto rounded-md bg-neutral-5 px-6 py-4 shadow-sm shadow-neutral-5 sm:w-[70%] lg:w-[30%]">
            <h1 className="text-center text-xl font-bold">Gopay</h1>
            <img
              src={qrCode}
              alt="QR CODE"
              className="mx-auto w-[60%] border object-contain shadow-md lg:w-[70%] xl:w-[60%]"
            />
            <div className="flex flex-col">
              <h5 className="flex items-center gap-1 text-base font-semibold text-blue-500">
                <IoMdInformationCircle size={18} />
                How to pay
              </h5>
              <ol className="flex list-outside list-decimal flex-col gap-1 px-4">
                <li className="text-sm font-normal">
                  Open your <span className="font-bold">Gojek, Gopay</span> or{" "}
                  <span className="font-bold">Other e-wallet app.</span>
                </li>
                <li className="text-sm font-normal">
                  <span className="font-bold">Scan QRIS</span> on your monitor
                </li>
                <li className="text-sm font-normal">
                  Confirm payment in the app
                </li>
                <li className="text-sm font-normal">Payment Complete</li>
              </ol>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <Link
                to={"/history"}
                onClick={() => (document.body.style.overflow = "auto")}
                className="mx-auto w-fit rounded-xl border border-neutral-1 bg-neutral-1 px-4 py-2 text-center text-sm text-neutral-5 hover:bg-opacity-70 md:text-base"
              >
                Check Payment History
              </Link>
              <Link
                to={"/"}
                onClick={() => (document.body.style.overflow = "auto")}
                className="mx-auto w-fit rounded-xl border border-neutral-1 bg-neutral-5 px-4 py-2 text-center text-sm text-neutral-1 hover:bg-neutral-1 hover:text-neutral-5 md:text-base"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Modal Virtual Account */}
      {virtualAccount && (
        <div className="fixed top-0 z-50 flex h-screen w-screen items-center justify-center bg-neutral-1 bg-opacity-50">
          <div className="flex w-[90%] flex-col gap-3 rounded-md bg-neutral-5 px-6 py-4 shadow-sm shadow-neutral-5 sm:w-[60%] lg:w-[30%]">
            <h1 className="text-center text-xl font-bold">Bank Transfer</h1>
            <div className="border border-neutral-3 p-2 text-center">
              <h5 className="text-sm font-semibold">
                Virtual Account {paymentInput.bankName.toLocaleUpperCase()}
              </h5>
              <p className="text-lg tracking-widest">{virtualAccount}</p>
            </div>
            <div className="flex flex-col">
              <h5 className="flex items-center gap-1 text-base font-semibold text-blue-500">
                <IoMdInformationCircle size={18} />
                How to pay
              </h5>
              <ol className="flex list-outside list-decimal flex-col gap-1 px-4">
                {renderBankTransfer()}
              </ol>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <Link
                to={"/history"}
                onClick={() => (document.body.style.overflow = "auto")}
                className="mx-auto w-fit rounded-xl border border-neutral-1 bg-neutral-1 px-4 py-2 text-center text-sm text-neutral-5 hover:bg-opacity-70 md:text-base"
              >
                Check Payment History
              </Link>
              <Link
                to={"/"}
                onClick={() => (document.body.style.overflow = "auto")}
                className="mx-auto w-fit rounded-xl border border-neutral-1 bg-neutral-5 px-4 py-2 text-center text-sm text-neutral-1 hover:bg-neutral-1 hover:text-neutral-5 md:text-base"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Modal Bill Payment */}
      {(billPayment.billKey || billPayment.billerCode) && (
        <div className="fixed top-0 z-50 flex h-screen w-screen items-center justify-center bg-neutral-1 bg-opacity-50">
          <div className="flex w-[90%] flex-col gap-3 rounded-md bg-neutral-5 px-6 py-4 shadow-sm shadow-neutral-5 sm:w-[60%] lg:w-[30%]">
            <h1 className="text-center text-xl font-bold">Mandiri Bill</h1>
            <div className="border border-neutral-3 p-2 text-center">
              <h5 className="text-sm font-semibold">Biller Code</h5>
              <p className="text-lg tracking-widest">
                {billPayment.billerCode}
              </p>
            </div>
            <div className="border border-neutral-3 p-2 text-center">
              <h5 className="text-sm font-semibold">Bill Key</h5>
              <p className="text-lg tracking-widest">{billPayment.billKey}</p>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <Link
                to={"/history"}
                onClick={() => (document.body.style.overflow = "auto")}
                className="mx-auto w-fit rounded-xl border border-neutral-1 bg-neutral-1 px-4 py-2 text-center text-sm text-neutral-5 hover:bg-opacity-70 md:text-base"
              >
                Check Payment History
              </Link>
              <Link
                to={"/"}
                onClick={() => (document.body.style.overflow = "auto")}
                className="mx-auto w-fit rounded-xl border border-neutral-1 bg-neutral-5 px-4 py-2 text-center text-sm text-neutral-1 hover:bg-neutral-1 hover:text-neutral-5 md:text-base"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Modal Counter */}
      {paymentCounter.paymentCode && (
        <div className="fixed top-0 z-50 flex h-screen w-screen items-center justify-center bg-neutral-1 bg-opacity-50">
          <div className="gap-3overflow-auto flex max-h-[90vh] w-[70%] flex-col rounded-md bg-neutral-5 px-6 py-4 shadow-sm shadow-neutral-5 md:h-auto lg:w-[50%] xl:w-[40%]">
            <h1 className="text-center text-xl font-bold">Counter</h1>
            <div className="border border-neutral-3 p-2 text-center">
              <h5 className="text-sm font-semibold">Payment Code</h5>
              <p className="text-lg tracking-widest">
                {paymentCounter.paymentCode}
              </p>
            </div>
            {paymentCounter.merchantId && (
              <div className="border border-neutral-3 p-2 text-center">
                <h5 className="text-sm font-semibold">Merchant ID</h5>
                <p className="text-lg tracking-widest">
                  {paymentCounter.merchantId}
                </p>
              </div>
            )}
            <div className="flex flex-col">
              <h5 className="flex items-center gap-1 text-base font-semibold text-blue-500">
                <IoMdInformationCircle size={18} />
                How to pay
              </h5>
              <ol className="flex list-outside list-decimal flex-col gap-1 px-4">
                {renderCounter()}
              </ol>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <Link
                to={"/history"}
                onClick={() => (document.body.style.overflow = "auto")}
                className="mx-auto w-fit rounded-xl border border-neutral-1 bg-neutral-1 px-4 py-2 text-center text-sm text-neutral-5 hover:bg-opacity-70 md:text-base"
              >
                Check Payment History
              </Link>
              <Link
                to={"/"}
                onClick={() => (document.body.style.overflow = "auto")}
                className="mx-auto w-fit rounded-xl border border-neutral-1 bg-neutral-5 px-4 py-2 text-center text-sm text-neutral-1 hover:bg-neutral-1 hover:text-neutral-5 md:text-base"
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
