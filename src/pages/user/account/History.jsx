import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { getPaymentsHistoryAction } from "../../../redux/action/payments/PaymentsAction";

// Components
import { Navbar } from "../../../assets/components/navbar/Navbar";
import { PaymentHistoryCard } from "../../../assets/components/card/PaymentHistoryCard";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const History = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notificationData = useSelector(
    (state) => state.notifications.notifications,
  );
  const paymentHistoryData = useSelector(
    (state) => state.payments.paymentsHistory,
  );

  useEffect(() => {
    const token = CookieStorage.get(CookiesKeys.AuthToken);

    if (!token) return navigate("/");
  }, [navigate]);

  useEffect(() => {
    const fetchNotificationData = async () => {
      await dispatch(getPaymentsHistoryAction());
    };

    fetchNotificationData();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="px-4 pb-24 pt-4 sm:px-10 sm:pb-4 sm:pt-24 lg:px-20">
        <div className="flex min-h-[70vh] w-full flex-col overflow-hidden rounded-xl border-2 border-neutral-2 bg-slate-50 sm:min-h-[80vh]">
          <h3 className="w-full bg-neutral-1 py-3 text-center text-xl text-neutral-5">
            Payment History
          </h3>
          <div className="flex w-full flex-col gap-4 p-3">
            {paymentHistoryData?.length ? (
              paymentHistoryData.map((payment) => (
                <PaymentHistoryCard key={payment.id} payment={payment} />
              ))
            ) : (
              <p className="m-auto text-2xl font-bold italic text-neutral-4">
                - No payment history found -
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
