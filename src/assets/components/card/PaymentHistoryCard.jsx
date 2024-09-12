import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

// Components
import { HistoryCardSkeleton } from "../skeleton/HistoryCardSkeleton";

// Services
import { reduxGetStatusMidtrans } from "../../../services/payments/Payments";

// Icons
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";

export const PaymentHistoryCard = ({ payment }) => {
  const navigate = useNavigate();

  const [showAll, setShowAll] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(null);

  const loadingPaymentHistory = useSelector((state) => state.payments.loading);

  const displayedItems = showAll ? payment?.cart : [payment?.cart[0]];

  const totalPrice = payment?.cart?.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0,
  );

  const handleStatus = async (orderId) => {
    try {
      const response = await reduxGetStatusMidtrans(orderId);

      if (response.data.data.payment_type === "credit_card") {
        setTimeout(() => {
          window.location.href = `https://api.sandbox.veritrans.co.id/v2/token/rba/redirect/${response.data.data.masked_card}-${response.data.data.transaction_id}`;
        }, 1000);
      }
      if (response.data.data.payment_type === "akulaku") {
        setTimeout(() => {
          window.location.href = `https://api.sandbox.midtrans.com/v2/akulaku/redirect/${response.data.data.transaction_id}`;
        }, 1000);
      }

      setTransactionStatus(response.data.data);
      document.body.style.overflow = "hidden";
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
    }
  };

  const renderBankTransfer = () => {
    if (transactionStatus?.va_numbers[0].bank === "bca") {
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
    if (transactionStatus?.va_numbers[0].bank === "bni") {
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
    if (transactionStatus?.va_numbers[0].bank === "bri") {
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
    if (transactionStatus?.va_numbers[0].bank === "cimb") {
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
    if (transactionStatus?.store === "alfamart") {
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
    if (transactionStatus?.store === "indomaret") {
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

  const handleClose = () => {
    document.body.style.overflow = "auto";
    setTransactionStatus(null);
  };

  return (
    <>
      {loadingPaymentHistory ? (
        <HistoryCardSkeleton />
      ) : (
        <div className="flex w-full flex-col gap-3 rounded-md border border-neutral-4 p-3 shadow-md">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <div className="flex w-fit gap-1">
              <FaCartShopping size={18} />
              <p className="text-xs font-medium sm:text-sm">Shopping</p>
            </div>
            <p className="text-xs font-medium sm:text-sm">
              {payment?.createdAt}
            </p>
            <p
              className={` ${
                payment?.paymentStatus === "Paid"
                  ? "bg-alert-green"
                  : payment?.paymentStatus === "Unpaid"
                    ? "bg-alert-red"
                    : "bg-slate-400"
              } rounded-sm px-1 py-[1px] text-xs text-neutral-5 sm:px-2 sm:py-[2px]`}
            >
              {payment?.paymentStatus}
            </p>
            <p
              className={`${
                payment?.deliveryStatus === "Shipped"
                  ? "bg-green-600"
                  : "bg-orange-400"
              } break-all rounded-sm px-1 py-[1px] text-center text-xs text-neutral-5 sm:px-2 sm:py-[2px]`}
            >
              {payment?.deliveryStatus}
            </p>
            {payment?.trackingNumber && (
              <p className="break-all text-xs text-neutral-3 sm:text-sm">
                Track No: {payment?.trackingNumber}
              </p>
            )}
          </div>
          <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:gap-0">
            <div className="flex w-full flex-col gap-2 border-neutral-4 sm:w-[78%] sm:border-r-2">
              {displayedItems?.map((cart, index) => (
                <div
                  key={index}
                  className="flex w-full cursor-pointer justify-between"
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
                      {cart?.promotion && (
                        <span className="text-xs font-semibold text-alert-red sm:text-sm">
                          <span className="mr-1 text-xs font-medium text-neutral-3 line-through sm:text-sm">
                            IDR{" "}
                            {Math.floor(
                              cart?.product?.price /
                                (1 - cart?.promotion?.discount),
                            ).toLocaleString()}
                          </span>
                          {cart?.promotion?.discount * 100}%
                        </span>
                      )}
                    </p>

                    {cart?.note && (
                      <p className="text-xs font-light text-neutral-3 sm:mt-1 sm:text-sm">
                        Note : <span className="italic">{cart?.note}</span>
                      </p>
                    )}
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
            <div className="hidden w-full border-t-2 border-neutral-4 px-2 pt-2 text-center sm:block sm:w-[20%] sm:border-t-0 sm:pt-0">
              <p className="text-xs md:text-sm">Total Payment :</p>
              <p className="text-sm font-bold md:text-lg">
                IDR{" "}
                {Math.floor(0.11 * totalPrice + totalPrice).toLocaleString()}
              </p>
              {payment.paymentStatus === "Unpaid" && (
                <button
                  className="w-fit rounded-md bg-neutral-1 px-2 py-1 text-center text-xs font-semibold text-neutral-5 hover:bg-opacity-80 sm:text-sm"
                  onClick={() => handleStatus(payment?.paymentCode)}
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
          {payment.paymentStatus === "Unpaid" && (
            <div className="flex items-center justify-around gap-2 border-t border-neutral-4 p-2 pb-0 sm:hidden sm:p-3 md:p-5">
              <div className="flex w-fit flex-col text-center sm:gap-2">
                <p className="text-xs">Total :</p>
                <p className="break-all text-sm font-bold">
                  IDR{" "}
                  {Math.floor(0.11 * totalPrice + totalPrice).toLocaleString()}
                </p>
              </div>

              <button
                className="w-fit rounded-md bg-neutral-1 px-3 py-2 text-center text-xs font-bold text-neutral-5 hover:bg-opacity-80 sm:px-6 sm:py-3 sm:text-sm"
                onClick={() => handleStatus(payment?.paymentCode)}
              >
                Pay Now
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal QRCODE */}
      {transactionStatus?.payment_type === "gopay" && (
        <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-neutral-1 bg-opacity-50">
          <div className="flex max-h-[90vh] w-[90%] flex-col gap-3 overflow-auto rounded-md bg-neutral-5 px-6 py-4 shadow-sm shadow-neutral-5 sm:w-[70%] lg:w-[30%]">
            <h1 className="text-center text-xl font-bold">Gopay</h1>
            <img
              src={`https://api.sandbox.veritrans.co.id/v2/gopay/${transactionStatus?.transaction_id}/qr-code`}
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
                onClick={() => handleClose()}
                className="mx-auto w-fit rounded-xl border border-neutral-1 bg-neutral-1 px-4 py-2 text-center text-sm text-neutral-5 hover:bg-opacity-70 md:text-base"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Modal Virtual Account */}
      {(transactionStatus?.payment_type === "bank_transfer" ||
        (transactionStatus?.payment_type === "bank_transfer" &&
          payment.methodPayment === "Permata")) && (
        <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-neutral-1 bg-opacity-30">
          <div className="flex w-[90%] flex-col gap-3 rounded-md bg-neutral-5 px-6 py-4 shadow-sm shadow-neutral-5 sm:w-[60%] lg:w-[30%]">
            <h1 className="text-center text-xl font-bold">Bank Transfer</h1>
            <div className="border border-neutral-3 p-2 text-center">
              <h5 className="text-sm font-semibold">
                Virtual Account {payment.methodPayment.toLocaleUpperCase()}
              </h5>
              <p className="text-lg tracking-widest">
                {transactionStatus?.payment_type === "bank_transfer" &&
                payment.methodPayment === "Permata"
                  ? transactionStatus?.permata_va_number
                  : transactionStatus?.va_numbers[0].va_number}
              </p>
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
                onClick={() => handleClose()}
                className="mx-auto w-fit rounded-xl border border-neutral-1 bg-neutral-1 px-4 py-2 text-center text-sm text-neutral-5 hover:bg-opacity-70 md:text-base"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Modal Bill Payment */}
      {transactionStatus?.payment_type === "echannel" &&
        payment.methodPayment === "Mandiri Bill" && (
          <div className="fixed top-0 z-50 flex h-screen w-screen items-center justify-center bg-neutral-1 bg-opacity-50">
            <div className="flex w-[90%] flex-col gap-3 rounded-md bg-neutral-5 px-6 py-4 shadow-sm shadow-neutral-5 sm:w-[60%] lg:w-[30%]">
              <h1 className="text-center text-xl font-bold">Mandiri Bill</h1>
              <div className="border border-neutral-3 p-2 text-center">
                <h5 className="text-sm font-semibold">Biller Code</h5>
                <p className="text-lg tracking-widest">
                  {transactionStatus?.biller_code}
                </p>
              </div>
              <div className="border border-neutral-3 p-2 text-center">
                <h5 className="text-sm font-semibold">Bill Key</h5>
                <p className="text-lg tracking-widest">
                  {transactionStatus?.bill_key}
                </p>
              </div>
              <div className="flex flex-col justify-center gap-2">
                <Link
                  to={"/history"}
                  onClick={() => handleClose()}
                  className="mx-auto w-fit rounded-xl border border-neutral-1 bg-neutral-1 px-4 py-2 text-center text-sm text-neutral-5 hover:bg-opacity-70 md:text-base"
                >
                  Back
                </Link>
              </div>
            </div>
          </div>
        )}

      {/* Modal Counter */}
      {transactionStatus?.payment_type === "cstore" && (
        <div className="fixed top-0 z-50 flex h-screen w-screen items-center justify-center bg-neutral-1 bg-opacity-50">
          <div className="gap-3overflow-auto flex max-h-[90vh] w-[70%] flex-col rounded-md bg-neutral-5 px-6 py-4 shadow-sm shadow-neutral-5 md:h-auto lg:w-[50%] xl:w-[40%]">
            <h1 className="text-center text-xl font-bold">Counter</h1>
            <div className="border border-neutral-3 p-2 text-center">
              <h5 className="text-sm font-semibold">Payment Code</h5>
              <p className="text-lg tracking-widest">
                {transactionStatus?.payment_code}
              </p>
            </div>
            {transactionStatus?.merchant_id && (
              <div className="border border-neutral-3 p-2 text-center">
                <h5 className="text-sm font-semibold">Merchant ID</h5>
                <p className="text-lg tracking-widest">
                  {transactionStatus?.merchant_id}
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
                onClick={() => handleClose()}
                className="mx-auto w-fit rounded-xl border border-neutral-1 bg-neutral-1 px-4 py-2 text-center text-sm text-neutral-5 hover:bg-opacity-70 md:text-base"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
