import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Redux Actions
import {
  getAllPromotionsAction,
  postCreatePromotionAction,
  putEditPromotionByIdAction,
  deletePromotionByIdAction,
} from "../../redux/action/promotions/PromotionsAction";

// Components
import { AdminSidebar } from "../../assets/components/admin/AdminSidebar";
import { AdminNavbar } from "../../assets/components/admin/AdminNavbar";
import { AdminCard } from "../../assets/components/admin/AdminCard";
import { Pagination } from "../../assets/components/pagination/Pagination";

// Helper
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../helper/ToastHelper";

// Icons
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

// Material Tailwind
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export const AdminPromotion = () => {
  const dispatch = useDispatch();

  const [openNavbar, setOpenNavbar] = useState(false);
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [inputPromotion, setInputPromotion] = useState({
    discount: 0,
    startDate: "",
    endDate: "",
  });
  const [promotionId, setPromotionId] = useState(null);

  const promotionData = useSelector(
    (state) => state.promotions.promotions.promotions,
  );
  const paginationPromotion = useSelector(
    (state) => state.promotions.promotions.pagination,
  );

  openNavbar
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllPromotionsAction(""));
    };

    fetchData();
  }, []);

  const convertDateToISO = (dateString) => {
    const months = {
      Januari: "01",
      Februari: "02",
      Maret: "03",
      April: "04",
      Mei: "05",
      Juni: "06",
      Juli: "07",
      Agustus: "08",
      September: "09",
      Oktober: "10",
      November: "11",
      Desember: "12",
    };

    const [day, monthName, year] = dateString.split(" ");
    const month = months[monthName];
    const formattedDay = day.padStart(2, "0");
    return `${year}-${month}-${formattedDay}`;
  };

  const handleOpen = (type, promotionId) => {
    setPromotionId(promotionId);
    if (type === "delete") {
      setOpenDelete(!openDelete);
    } else if (type === "edit") {
      const filteredData = promotionData.find(
        (promotion) => promotion.id === promotionId,
      );
      setInputPromotion({
        discount: filteredData.discount,
        startDate: convertDateToISO(filteredData.startDate),
        endDate: convertDateToISO(filteredData.endDate),
      });
      setOpen(!open);
    } else if (type === "create") {
      setInputPromotion({
        discount: "",
        startDate: "",
        endDate: "",
      });
      setOpenCreate(!openCreate);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "discount" && parseFloat(e.target.value) > 1) {
      return;
    }

    setInputPromotion((prevInputPromotion) => ({
      ...prevInputPromotion,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      const loadingToastId = showLoadingToast("Loading...");

      const createPromotion = await dispatch(
        postCreatePromotionAction(inputPromotion, promotionId),
      );

      toast.dismiss(loadingToastId);

      if (!createPromotion) showErrorToast("Create Promotion Failed");

      if (createPromotion) {
        showSuccessToast("Create Promotion Successful");
        await dispatch(getAllPromotionsAction(""));
        setOpenCreate(false);
      }
    }
  };

  const handleEdit = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      const loadingToastId = showLoadingToast("Loading...");

      const editPromotion = await dispatch(
        putEditPromotionByIdAction(inputPromotion, promotionId),
      );

      toast.dismiss(loadingToastId);

      if (!editPromotion) showErrorToast("Edit Promotion Failed");

      if (editPromotion) {
        showSuccessToast("Edit Promotion Successful");
        await dispatch(getAllPromotionsAction(""));
        setOpen(false);
      }
    }
  };

  const handleDelete = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    const deletePromotion = await dispatch(
      deletePromotionByIdAction(promotionId),
    );

    toast.dismiss(loadingToastId);

    if (!deletePromotion) showErrorToast("Delete Promotion Failed");

    if (deletePromotion) {
      showSuccessToast("Delete Promotion Successful");
      await dispatch(getAllPromotionsAction(""));
      setOpenDelete(false);
    }
  };

  const handleOpenNavbar = (openValue) => setOpenNavbar(openValue);

  const handleQuery = (formatLink) => {
    dispatch(getAllPromotionsAction(formatLink));
  };

  const getPageValue = () => {
    if (paginationPromotion?.links?.next) {
      const url = paginationPromotion?.links?.next;
      const urlObj = new URL(url);
      return Number(urlObj.searchParams.get("page") - 2);
    } else if (paginationPromotion?.links?.prev) {
      const url = paginationPromotion?.links?.prev;
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
        <div className="ml-auto flex w-full flex-col lg:w-[80%]">
          <AdminNavbar onOpen={handleOpenNavbar} />
          <AdminCard />

          <div className="flex flex-col justify-center gap-1 px-5 pb-16 pt-10">
            <h5 className="mb-2 text-xl font-semibold">Manage Promotion</h5>
            <button
              type="button"
              className="flex w-fit items-center gap-1 rounded-md bg-green-600 px-3 py-1 text-neutral-5 hover:bg-green-800"
              onClick={() => handleOpen("create", "")}
            >
              <FaPlus size={20} />
              <p>Create Promotion</p>
            </button>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-2 bg-slate-200">
                    <th className="px-2 py-2 text-start text-sm">No</th>
                    <th className="px-2 py-2 text-start text-sm">Discount</th>
                    <th className="px-2 py-2 text-start text-sm">Start Date</th>
                    <th className="px-2 py-2 text-start text-sm">End Date</th>
                    <th className="px-2 py-2 text-start text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {promotionData.length > 0 ? (
                    promotionData.map((promotion, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-opacity-20" : "bg-opacity-60"
                        } border-b-2 bg-slate-200`}
                      >
                        <td className="px-2 py-1 text-sm">
                          {getPageValue() > 0
                            ? `${getPageValue()}${index + 1}`
                            : `${index + 1}`}
                        </td>
                        <td className="px-2 py-1 text-sm lg:min-w-0">
                          {promotion.discount * 100}%
                        </td>
                        <td className="px-2 py-1 text-sm lg:min-w-0">
                          {promotion.startDate}
                        </td>
                        <td className="px-2 py-1 text-sm lg:min-w-0">
                          {promotion.endDate}
                        </td>
                        <td className="px-2 py-1 text-sm lg:min-w-0">
                          <button
                            type="button"
                            className="mb-1 mr-1 flex items-center gap-1 rounded-full bg-orange-400 px-3 py-1 text-neutral-5 hover:bg-orange-700"
                            onClick={() => handleOpen("edit", promotion.id)}
                          >
                            <MdEdit size={20} />
                          </button>
                          <button
                            type="button"
                            className="flex items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-neutral-5 hover:bg-red-800"
                            onClick={() => handleOpen("delete", promotion.id)}
                          >
                            <RiDeleteBin5Line size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <td
                      className="h-full border-b-2 bg-slate-200 bg-opacity-20 text-center italic text-neutral-4"
                      colSpan={5}
                    >
                      No Promotion Found
                    </td>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagiantion Section */}
            <div className="mx-auto">
              <Pagination
                onQuery={handleQuery}
                type={"promotions"}
                nextLink={paginationPromotion?.links?.next}
                prevLink={paginationPromotion?.links?.prev}
                totalItems={paginationPromotion?.total_items}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Material Tailwind */}
      {/* Modal Create */}
      <Dialog
        open={openCreate}
        size={"md"}
        handler={() => setOpenCreate(!openCreate)}
      >
        <DialogHeader className="flex items-center justify-between">
          <h5 className="text-xl font-bold">Create Promotion</h5>
          <IoMdClose
            size={30}
            className="cursor-pointer"
            onClick={() => setOpenCreate(false)}
          />
        </DialogHeader>
        <DialogBody>
          <form className="flex flex-col gap-4" onKeyDown={handleCreate}>
            <div className="flex w-full flex-col">
              <label htmlFor="discount" className="text-neutral-1">
                Discount
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                min={0}
                max={1}
                step={0.1}
                className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                placeholder="Input Discount"
                value={inputPromotion.discount}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="startDate" className="text-neutral-1">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                placeholder="Input Start Date"
                value={inputPromotion.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="endDate" className="text-neutral-1">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                placeholder="Input Start Date"
                value={inputPromotion.endDate}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter className="flex items-center justify-center gap-2">
          <button
            type="button"
            className="flex gap-1 rounded-full border border-neutral-1 px-3 py-1 text-neutral-2 hover:border-neutral-3 hover:text-neutral-3"
            onClick={() => setOpenCreate(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex gap-1 rounded-full  bg-green-600 px-3 py-1 text-white hover:bg-green-800"
            onClick={handleCreate}
          >
            Save
          </button>
        </DialogFooter>
      </Dialog>

      {/* Modal Edit */}
      <Dialog open={open} size={"md"} handler={() => setOpen(!open)}>
        <DialogHeader className="flex items-center justify-between">
          <h5 className="text-xl font-bold">Edit Promotion</h5>
          <IoMdClose
            size={30}
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </DialogHeader>
        <DialogBody>
          <form className="flex flex-col gap-4" onKeyDown={handleEdit}>
            <div className="flex w-full flex-col">
              <label htmlFor="discount" className="text-neutral-1">
                Discount
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                min={0}
                max={1}
                step={0.1}
                className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                placeholder="Input Discount"
                value={inputPromotion.discount}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="startDate" className="text-neutral-1">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                placeholder="Input Start Date"
                value={inputPromotion.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="endDate" className="text-neutral-1">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                placeholder="Input Start Date"
                value={inputPromotion.endDate}
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

      {/* Modal Delete */}
      <Dialog
        open={openDelete}
        size={"md"}
        handler={() => setOpenDelete(!openDelete)}
      >
        <DialogHeader className="flex justify-end">
          <IoMdClose
            size={30}
            className="cursor-pointer"
            onClick={() => setOpenDelete(false)}
          />
        </DialogHeader>
        <DialogBody className="mx-auto flex w-[80%] flex-col items-center justify-center gap-4 text-center text-lg">
          <RiDeleteBin5Line size={100} className="text-red-800" />
          <p>Are you sure you want to delete this promotion?</p>
        </DialogBody>
        <DialogFooter className="flex items-center justify-center gap-2">
          <button
            type="button"
            className="flex gap-1 rounded-full border border-neutral-1 px-3 py-1 text-neutral-2 hover:border-neutral-3 hover:text-neutral-3"
            onClick={() => setOpenDelete(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex gap-1 rounded-full  bg-red-600 px-3 py-1 text-neutral-5 hover:bg-red-800"
            onClick={handleDelete}
          >
            Delete
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
