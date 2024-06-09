import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { getPaymentsHistoryAction } from "../../../redux/action/payments/PaymentsAction";

// Components
import { Navbar } from "../../../assets/components/navbar/Navbar";
import { PaymentHistoryCard } from "../../../assets/components/card/PaymentHistoryCard";
import { Footer } from "../../../assets/components/footer/Footer";

export const History = () => {
  const dispatch = useDispatch();

  const paymentHistoryData = useSelector(
    (state) => state.payments.paymentsHistory,
  );

  useEffect(() => {
    const fetchNotificationData = async () => {
      await dispatch(getPaymentsHistoryAction(""));
    };

    fetchNotificationData();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="px-4 pb-20 pt-24 sm:px-10 md:pb-10 lg:px-20">
        <div className="flex min-h-[70vh] w-full flex-col overflow-hidden rounded-xl border-2 border-neutral-2 bg-slate-50 sm:min-h-[60vh]">
          <h3 className="w-full bg-neutral-1 py-3 text-center text-xl text-neutral-5">
            Payment History
          </h3>
          {paymentHistoryData?.length ? (
            paymentHistoryData.map((payment) => (
              <div className="flex w-full flex-col gap-4 p-3">
                <PaymentHistoryCard key={payment.id} payment={payment} />
              </div>
            ))
          ) : (
            <p className="m-auto text-2xl font-bold italic text-neutral-4">
              - No payment history found -
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
