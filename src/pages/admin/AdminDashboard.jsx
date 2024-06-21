import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Redux Actions
import {
  getAllPaymentsAction,
  putEditPaymentByIdAction,
} from "../../redux/action/payments/PaymentsAction";

// Components
import { AdminSidebar } from "../../assets/components/admin/AdminSidebar";
import { AdminNavbar } from "../../assets/components/admin/AdminNavbar";
import { AdminCard } from "../../assets/components/admin/AdminCard";

// Icons
import { MdEdit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

// Material Tailwind
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

// Helper
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../helper/ToastHelper";

export const AdminDashboard = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [inputPayment, setInputPayment] = useState({
    trackingNumber: "",
  });
  const [paymentId, setPaymentId] = useState(null);

  const paymentData = useSelector((state) => state.payments.payments);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllPaymentsAction());
    };

    fetchData();
  }, []);

  const handleOpen = (paymentId) => {
    const filteredData = paymentData.find(
      (payment) => payment.id === paymentId,
    );
    setPaymentId(paymentId);
    setInputPayment({
      trackingNumber: filteredData.trackingNumber,
    });
    setOpen(!open);
  };

  const handleInputChange = (e) => {
    setInputPayment((prevInputPayment) => ({
      ...prevInputPayment,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      const loadingToastId = showLoadingToast("Loading...");

      const editPayment = await dispatch(
        putEditPaymentByIdAction(inputPayment, paymentId),
      );

      toast.dismiss(loadingToastId);

      if (!editPayment) showErrorToast("Edit Payment Failed");

      if (editPayment) {
        showSuccessToast("Edit Payment Successful");
        await dispatch(getAllPaymentsAction());
        setOpen(false);
      }
    }
  };

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
            <h5 className="mb-2 text-xl font-semibold">Manage Payment</h5>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-2 bg-slate-200">
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
                    <th className="px-2 py-2 text-start text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentData.map((payment, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-opacity-20" : "bg-opacity-60"
                      } h-full border-b-2 bg-slate-200`}
                    >
                      <td className=" px-2 py-1 text-sm">
                        {payment?.user?.userProfile?.fullName}
                      </td>
                      <td className="flex min-w-[30vw] flex-col px-2 py-1 text-sm lg:min-w-0">
                        {payment.cart.map((cart, index) => (
                          <p key={index}>
                            {index + 1}. {cart.product.productName} -{" "}
                            <span className="font-semibold">
                              {(cart?.size?.sizeName).toUpperCase()}
                            </span>{" "}
                            -{" "}
                            <span className="font-semibold">
                              {cart?.color?.colorName}{" "}
                            </span>
                            {cart.note && (
                              <span className="font-medium italic text-neutral-3">
                                ({cart.note})
                              </span>
                            )}
                          </p>
                        ))}
                      </td>
                      <td className="min-w-[20vw] px-2 py-1 text-sm lg:min-w-0">
                        {payment?.user?.userProfile?.address}
                      </td>
                      <td
                        className={`${
                          payment.paymentStatus === "Paid"
                            ? "text-alert-green"
                            : "text-alert-red"
                        }  px-2 py-1 text-sm font-semibold`}
                      >
                        {payment.paymentStatus}
                      </td>
                      <td className=" px-2 py-1 text-sm">
                        {payment.trackingNumber
                          ? payment.trackingNumber
                          : "null"}
                      </td>
                      <td className=" px-2 py-1 text-sm">
                        {payment.methodPayment}
                      </td>
                      <td className=" px-2 py-1 text-sm">
                        {payment.updatedAt}
                      </td>
                      <td className="px-2 py-1 text-sm lg:min-w-0">
                        <button
                          type="button"
                          className="flex items-center gap-1 rounded-full bg-orange-400 px-3 py-1 text-white hover:bg-orange-700"
                          onClick={() => handleOpen(payment.id)}
                        >
                          <MdEdit size={20} />
                          <p>Edit</p>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Material Tailwind */}
      <Dialog open={open} size={"sm"} handler={() => setOpen(!open)}>
        <DialogHeader className="flex items-center justify-between">
          <h5 className="text-xl font-bold">Edit Payment</h5>
          <IoMdClose
            size={30}
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </DialogHeader>
        <DialogBody>
          <form className="flex flex-col gap-4" onKeyDown={handleEdit}>
            <div className="flex w-full flex-col">
              <label htmlFor="trackingNumber" className="text-neutral-1">
                Tracking Number
              </label>
              <input
                type="text"
                id="trackingNumber"
                name="trackingNumber"
                className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                placeholder="Input Tracking Number"
                value={inputPayment.trackingNumber}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter className="flex items-center justify-center gap-2">
          <button
            type="button"
            className="flex gap-1 rounded-full border border-neutral-1 px-3 py-1 text-neutral-2 hover:border-neutral-3 hover:text-neutral-3"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex gap-1 rounded-full  bg-light-blue-600 px-3 py-1 text-white hover:bg-light-blue-800"
            onClick={handleEdit}
          >
            Save
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
