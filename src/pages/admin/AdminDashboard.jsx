import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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
import { Pagination } from "../../assets/components/pagination/Pagination";
import { AdminDataSkeleton } from "../../assets/components/skeleton/admin/AdminDataSkeleton";

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
  const navigate = useNavigate();
  const location = useLocation();

  const [openNavbar, setOpenNavbar] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputPayment, setInputPayment] = useState({
    trackingNumber: "",
  });
  const [paymentId, setPaymentId] = useState(null);

  const loadingData = useSelector((state) => state.payments.loading);
  const paymentData = useSelector((state) => state.payments.payments.payments);
  const reportData = useSelector(
    (state) => state.payments.payments.transactions,
  );
  const paginationPayment = useSelector(
    (state) => state.payments.payments.pagination,
  );

  openNavbar
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  useEffect(() => {
    const fetchData = async () => {
      if (location.search) {
        await dispatch(getAllPaymentsAction(location.search));
      } else {
        await dispatch(getAllPaymentsAction(""));
      }
    };

    fetchData();
  }, [location.search]);

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
        await dispatch(getAllPaymentsAction(""));
        setOpen(false);
      }
    }
  };

  const handleOpenNavbar = (openValue) => setOpenNavbar(openValue);

  const formatDate = (dateString) => {
    const [year, month] = dateString.split("-");

    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    // Ubah bulan (berbasis 1) ke dalam format string
    const monthName = months[parseInt(month, 10) - 1];

    return `${monthName} ${year}`;
  };

  const handleFilter = (e) => {
    navigate(
      `/admin/dashboard${
        e.target.value ? `?query=${formatDate(e.target.value)}` : ""
      }`,
    );
  };

  const handleQuery = (formatLink) => {
    dispatch(getAllPaymentsAction(formatLink));
  };

  const getPageValue = () => {
    if (paginationPayment?.links?.next) {
      const url = paginationPayment?.links?.next;
      const urlObj = new URL(url);
      return Number(urlObj.searchParams.get("page") - 2);
    } else if (paginationPayment?.links?.prev) {
      const url = paginationPayment?.links?.prev;
      const urlObj = new URL(url);
      return Number(urlObj.searchParams.get("page"));
    } else {
      return 0;
    }
  };

  return (
    <>
      <div className="flex">
        <div className="fixed w-[20%]">
          <AdminSidebar />
        </div>
        <div className="ml-auto flex w-full flex-col  lg:w-[80%]">
          <AdminNavbar onOpen={handleOpenNavbar} />
          <AdminCard />
          <div className="flex flex-col gap-3 px-5 pt-10 sm:gap-1">
            <div className="flex w-full flex-wrap items-center justify-between gap-1 sm:gap-0">
              <h5 className="text-xl font-semibold">Transaction Report</h5>
              <input
                type="month"
                className="border border-neutral-4 p-1 text-sm"
                onChange={handleFilter}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-4 rounded border border-neutral-1 p-3">
                <h5 className="text-center text-base font-semibold">
                  Total Payment (<span className="text-alert-green">Paid</span>)
                </h5>
                <div className="flex w-full items-start justify-between">
                  <div className="flex w-[49%] flex-col justify-center gap-1 text-center">
                    <p className="text-sm">Quantity</p>
                    <p className="border border-neutral-4 p-1">
                      {reportData.paid.quantity
                        ? reportData.paid.quantity
                        : "0"}
                    </p>
                  </div>
                  <div className="flex w-[49%] flex-col justify-center gap-1 text-center">
                    <p className="text-sm">Total Price</p>
                    <p className="break-all border border-neutral-4 p-1">
                      IDR{" "}
                      {reportData.paid.total
                        ? reportData.paid.total.toLocaleString()
                        : "0"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded border border-neutral-1 p-3">
                <h5 className="text-center text-base font-semibold">
                  Total Payment (<span className="text-alert-red">Unpaid</span>)
                </h5>
                <div className="flex w-full items-start justify-between">
                  <div className="flex w-[49%] flex-col justify-center gap-1 text-center">
                    <p className="text-sm">Quantity</p>
                    <p className="border border-neutral-4 p-1">
                      {reportData.unpaid.quantity
                        ? reportData.unpaid.quantity
                        : "0"}
                    </p>
                  </div>
                  <div className="flex w-[49%] flex-col justify-center gap-1 text-center">
                    <p className="text-sm">Total Price</p>
                    <p className="border border-neutral-4 p-1">
                      IDR{" "}
                      {reportData.unpaid.total
                        ? reportData.unpaid.total.toLocaleString()
                        : "0"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded border border-neutral-1 p-3 sm:col-span-2 lg:col-span-1">
                <h5 className="text-center text-base font-semibold">
                  Total Payment (<span className="text-slate-400">Expired</span>
                  )
                </h5>
                <div className="flex w-full items-start justify-between">
                  <div className="flex w-[49%] flex-col justify-center gap-1 text-center">
                    <p className="text-sm">Quantity</p>
                    <p className="border border-neutral-4 p-1">
                      {reportData.expired.quantity
                        ? reportData.expired.quantity
                        : "0"}
                    </p>
                  </div>
                  <div className="flex w-[49%] flex-col justify-center gap-1 text-center">
                    <p className="text-sm">Total Price</p>
                    <p className="border border-neutral-4 p-1">
                      IDR{" "}
                      {reportData.expired.total
                        ? reportData.expired.total.toLocaleString()
                        : "0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-1 px-5 pb-16 pt-10">
            <h5 className="mb-2 text-xl font-semibold">Manage Payment</h5>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-2 bg-slate-200">
                    <th className="px-2 py-2 text-start text-sm">No</th>
                    <th className="px-2 py-2 text-start text-sm">Name</th>
                    <th className="px-2 py-2 text-start text-sm">Product</th>
                    <th className="px-2 py-2 text-start text-sm">Amount</th>
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
                  {loadingData ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="animate-pulse">
                        <AdminDataSkeleton tdCount={10} />
                      </tr>
                    ))
                  ) : paymentData?.length > 0 ? (
                    paymentData.map((payment, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-opacity-20" : "bg-opacity-60"
                        } h-full border-b-2 bg-slate-200`}
                      >
                        <td className=" px-2 py-1 text-sm">
                          {getPageValue() > 0
                            ? `${getPageValue()}${index + 1}`
                            : `${index + 1}`}
                        </td>
                        <td className=" px-2 py-1 text-sm">
                          {payment?.user?.userProfile?.fullName}
                        </td>
                        <td className="flex min-w-[30vw] flex-col pl-4 pt-1 text-sm lg:min-w-0">
                          <ol className="flex h-full w-fit list-outside list-decimal flex-col">
                            {payment.cart.map((cart, index) => (
                              <li className="break-all" key={index}>
                                {cart.product.productName} -{" "}
                                <span className="font-semibold">
                                  {cart?.size?.sizeName?.toUpperCase()}
                                </span>{" "}
                                -{" "}
                                <span className="font-semibold">
                                  {cart?.color?.colorName}{" "}
                                </span>
                                -{" "}
                                <span className="text-neutral-3">
                                  {cart?.quantity} Items
                                </span>
                                {cart.note && (
                                  <span className="font-medium italic text-neutral-3">
                                    ({cart.note})
                                  </span>
                                )}
                              </li>
                            ))}
                          </ol>
                        </td>
                        <td className="min-w-[20vw] px-2 py-1 text-sm lg:min-w-0">
                          IDR {payment?.amount.toLocaleString()}
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
                          {payment.trackingNumber ? (
                            payment.trackingNumber
                          ) : (
                            <p className="font-normal not-italic text-neutral-3 text-opacity-50">
                              null
                            </p>
                          )}
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
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <td
                      className="h-full border-b-2 bg-slate-200 bg-opacity-20 text-center italic text-neutral-4"
                      colSpan={9}
                    >
                      No Payment Found
                    </td>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Section */}
            <div className="mx-auto">
              <Pagination
                onQuery={handleQuery}
                type={"payments"}
                nextLink={paginationPayment?.links?.next}
                prevLink={paginationPayment?.links?.prev}
                totalItems={paginationPayment?.total_items}
              />
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
