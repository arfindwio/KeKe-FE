import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Redux Actions
import { getAllDiscussionsAction } from "../../../redux/action/discussions/DiscussionsAction";
import { deleteReplyByIdAction } from "../../../redux/action/replies/RepliesAction";

// Material Tailwind
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

// Icons
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";

// Helper
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../helper/ToastHelper";

export const ReplyCard = ({ reply, productId }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [openDelete, setOpenDelete] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isButtonOpen, setIsButtonOpen] = useState(false);

  const buttonRef = useRef(null);

  const userData = useSelector((state) => state.users.userAuthenticate);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (buttonRef.current && !buttonRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  const handleDelete = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    const deleteReply = await dispatch(deleteReplyByIdAction(reply.id));

    toast.dismiss(loadingToastId);

    if (!deleteReply) showErrorToast("Delete Reply Failed");

    if (deleteReply) {
      showSuccessToast("Delete Reply Successful");
      location.pathname === "/admin/discussion"
        ? await dispatch(getAllDiscussionsAction())
        : await dispatch(getAllDiscussionsAction(productId));
      setOpenDelete(false);
    }
  };

  const renderAdmin = () => {
    return (
      <div
        onMouseEnter={() => setIsButtonOpen(true)}
        onMouseLeave={() => setIsButtonOpen(false)}
        className="relative flex w-full items-start justify-between pl-4"
      >
        <div className="flex w-fit flex-col gap-1">
          <div className="flex flex-wrap items-center md:gap-2">
            <h5 className="text-sm font-semibold">
              {reply.user.userProfile.fullName}
              <span
                className={`${
                  reply.user.role === "Admin" ? "bg-blue-400" : "bg-slate-400"
                }  ms-1 rounded-sm px-2 py-[2px] text-[10px] font-normal text-neutral-5`}
              >
                {reply.user.role}
              </span>
            </h5>
            <p className="text-xs font-medium text-neutral-3">
              {reply.createdAt}
            </p>
          </div>
          <p className="text-justify text-xs font-semibold text-slate-400">
            {reply.replyMessage}
          </p>
        </div>

        {(isButtonOpen || isMenuOpen) && (
          <button
            data-ripple-light="true"
            data-popover-target="menu"
            className="rounded-full p-2 hover:bg-neutral-4 hover:bg-opacity-30"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <BsThreeDotsVertical size={15} />
          </button>
        )}

        {isMenuOpen && (
          <ul
            ref={buttonRef}
            role="menu"
            data-popover="menu"
            className="absolute right-0 top-8 z-[1] w-fit overflow-auto rounded-md border border-blue-gray-50 bg-white p-2 text-xs font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
          >
            <li
              role="menuitem"
              className="cursor-pointer p-2 hover:bg-gray-100"
              onClick={() => setOpenDelete(!openDelete)}
            >
              Delete
            </li>
          </ul>
        )}
      </div>
    );
  };

  const renderUser = () => {
    return (
      <>
        <div
          onMouseEnter={() => setIsButtonOpen(true)}
          onMouseLeave={() => setIsButtonOpen(false)}
          className="relative flex w-full items-start gap-4 pl-4 md:pl-16"
        >
          <div className="h-10 w-10 lg:h-[4%] lg:w-[4%]">
            <img
              src={
                reply.user.userProfile.profilePicture
                  ? reply.user.userProfile.profilePicture
                  : "https://ik.imagekit.io/arfin07/images.png?updatedAt=1706817534316"
              }
              alt="profile"
              className="w-full rounded-full object-cover"
            />
          </div>
          <div className="mr-auto flex w-fit flex-col gap-1">
            <div className="flex flex-wrap items-start md:gap-2">
              <h5 className="text-sm font-semibold">
                {reply.user.userProfile.fullName}
              </h5>
              <p className="text-xs font-medium text-neutral-3">
                {reply.createdAt}
              </p>
            </div>
            <p className="text-justify text-xs text-neutral-4">
              {reply.replyMessage}
            </p>
          </div>
          {(userData.id === reply.user.id || userData.role === "Admin") &&
            (isButtonOpen || isMenuOpen) && (
              <button
                data-ripple-light="true"
                data-popover-target="menu"
                className="rounded-full p-2 hover:bg-neutral-4 hover:bg-opacity-30"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <BsThreeDotsVertical size={15} />
              </button>
            )}

          {isMenuOpen && (
            <ul
              ref={buttonRef}
              role="menu"
              data-popover="menu"
              className="absolute right-0 top-8 z-[1] w-fit overflow-auto rounded-md border border-blue-gray-50 bg-white p-2 text-xs font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
            >
              <li
                role="menuitem"
                className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={() => setOpenDelete(!openDelete)}
              >
                Delete
              </li>
            </ul>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      {location.pathname === "/admin/discussion" ? renderAdmin() : renderUser()}

      {/* Tailwind Material */}
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
          <p>Are you sure you want to delete this Reply?</p>
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
