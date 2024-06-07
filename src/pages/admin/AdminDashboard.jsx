import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { getAllPaymentsAction } from "../../redux/action/payments/PaymentsAction";

// Components
import { AdminSidebar } from "../../assets/components/admin/AdminSidebar";
import { AdminNavbar } from "../../assets/components/admin/AdminNavbar";
import { AdminCard } from "../../assets/components/admin/AdminCard";

export const AdminDashboard = () => {
  const dispatch = useDispatch();

  const paymentData = useSelector((state) => state.payments.payments);
  console.log(paymentData);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllPaymentsAction());
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="flex">
        <div className="fixed w-[20%]">
          <AdminSidebar />
        </div>
        <div className="ml-auto flex w-[80%] flex-col">
          <AdminNavbar />
          <AdminCard />
          <div className="flex flex-col justify-center gap-1 px-5 pt-10">
            <div className="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr className="border-2 bg-slate-100">
                    <th className="px-2 py-2 text-start text-sm">Name</th>
                    <th className="px-2 py-2 text-start text-sm">Product</th>
                    <th className="px-2 py-2 text-start text-sm">Address</th>
                    <th className="px-2 py-2 text-start text-sm">Status</th>
                    <th className="px-2 py-2 text-start text-sm">
                      Tracking No
                    </th>
                    <th className="px-2 py-2 text-start text-sm">
                      Method Payment
                    </th>
                    <th className="px-2 py-2 text-start text-sm">
                      Payment Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paymentData.map((payment, index) => (
                    <tr key={index}>
                      <td className="border-b-2 px-2 py-1 text-sm">
                        {payment?.user?.userProfile?.fullName}
                      </td>
                      <td className="flex min-w-[30vw] flex-col border-b-2 px-2 py-1 text-sm lg:min-w-0">
                        {payment.cart.map((cart, index) => (
                          <p key={index}>
                            {index + 1}. {cart.product.productName} -{" "}
                            {(cart?.size?.sizeName).toUpperCase()} -{" "}
                            {cart?.color?.colorName} ({cart.note})
                          </p>
                        ))}
                      </td>
                      <td className="min-w-[20vw] border-b-2 px-2 py-1 text-sm lg:min-w-0">
                        {payment?.user?.userProfile?.address}
                      </td>
                      <td
                        className={`${
                          payment.paymentStatus === "Paid"
                            ? "text-alert-green"
                            : "text-alert-red"
                        } border-b-2 px-2 py-1 text-sm font-semibold`}
                      >
                        {payment.paymentStatus}
                      </td>
                      <td className="border-b-2 px-2 py-1 text-sm">
                        {payment.trackingNumber
                          ? payment.trackingNumber
                          : "null"}
                      </td>
                      <td className="border-b-2 px-2 py-1 text-sm">
                        {payment.methodPayment}
                      </td>
                      <td className="border-b-2 px-2 py-1 text-sm">
                        {payment.updatedAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
