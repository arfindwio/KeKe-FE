import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Redux Actions
import { getAllDiscussionsAction } from "../../redux/action/discussions/DiscussionsAction";
import { postCreateNotificationAction } from "../../redux/action/notifications/NotificationsAction";

// Components
import { AdminSidebar } from "../../assets/components/admin/AdminSidebar";
import { AdminNavbar } from "../../assets/components/admin/AdminNavbar";
import { AdminCard } from "../../assets/components/admin/AdminCard";
import { Pagination } from "../../assets/components/pagination/Pagination";
import { AdminManageDiscussion } from "../../assets/components/admin/AdminManageDiscussion";
import { AdminDiscussionSkeleton } from "../../assets/components/skeleton/admin/AdminDiscussionSkeleton";

// Helper
import {
  showSuccessToast,
  showLoadingToast,
  showErrorToast,
} from "../../helper/ToastHelper";

// Icons
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

// Material Tailwind
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export const AdminDiscussion = () => {
  const dispatch = useDispatch();

  const [openNavbar, setOpenNavbar] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [inputNotification, setInputNotification] = useState({
    title: "",
    message: "",
  });

  const discussionData = useSelector(
    (state) => state.discussions.discussionsAdmin.discussions,
  );
  const loadingData = useSelector((state) => state.discussions.loading);
  const paginationDiscussion = useSelector(
    (state) => state.discussions.discussionsAdmin.pagination,
  );

  openNavbar
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllDiscussionsAction(""));
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setInputNotification((prevInputNotification) => ({
      ...prevInputNotification,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      const loadingToastId = showLoadingToast("Loading...");

      const createNotification = await dispatch(
        postCreateNotificationAction(inputNotification),
      );

      toast.dismiss(loadingToastId);

      if (!createNotification)
        showErrorToast("Create Notification for all user Failed");

      if (createNotification) {
        setOpenCreate(false);
        showSuccessToast("Create Notification for all user Successful");
      }
    }
  };

  const handleOpenNavbar = (openValue) => setOpenNavbar(openValue);

  const handleQuery = (formatLink) => {
    dispatch(getAllDiscussionsAction(formatLink));
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
            <h5 className="mb-2 text-xl font-semibold">Manage Discussion</h5>
            <button
              type="button"
              className="flex w-fit items-center gap-1 rounded-md bg-green-600 px-3 py-1 text-neutral-5 hover:bg-green-800"
              onClick={() => setOpenCreate(true)}
            >
              <FaPlus size={20} />
              <p>Create Notification</p>
            </button>
            <div className="mt-3 grid gap-6 md:grid-cols-2">
              {loadingData ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <AdminDiscussionSkeleton key={index} />
                ))
              ) : discussionData?.length > 0 ? (
                discussionData?.map((discussion, index) => (
                  <AdminManageDiscussion discussion={discussion} key={index} />
                ))
              ) : (
                <p className="col-span-2 text-center text-lg font-bold italic text-neutral-4">
                  No Discussion found
                </p>
              )}
            </div>

            {/* Pagination Section */}
            <div className="mx-auto">
              <Pagination
                onQuery={handleQuery}
                type={"discussions"}
                nextLink={paginationDiscussion?.links?.next}
                prevLink={paginationDiscussion?.links?.prev}
                totalItems={paginationDiscussion?.total_items}
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
          <h5 className="text-xl font-bold">Create Notification</h5>
          <IoMdClose
            size={30}
            className="cursor-pointer"
            onClick={() => setOpenCreate(false)}
          />
        </DialogHeader>
        <DialogBody>
          <form className="flex flex-col gap-4" onKeyDown={handleCreate}>
            <div className="flex w-full flex-col">
              <label htmlFor="title" className="text-neutral-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                placeholder="Input Title Notification"
                value={inputNotification.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="message" className="text-neutral-1">
                Message
              </label>
              <input
                type="text"
                id="message"
                name="message"
                className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                placeholder="Input Message Notification"
                value={inputNotification.message}
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
            Create
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
