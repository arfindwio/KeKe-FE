import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Components
import { ReplyCard } from "./ReplyCard";

// Redux Actions
import { postCreateReplyByDiscussionIdAction } from "../../../redux/action/replies/RepliesAction";
import {
  getDiscussionsByProductIdAction,
  deleteDiscussionByIdAction,
} from "../../../redux/action/discussions/DiscussionsAction";

// Icons
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";

// Helper
import {
  showLoadingToast,
  showSuccessToast,
  showErrorToast,
} from "../../../helper/ToastHelper";

// Material Tailwind
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const DiscussionCard = ({ discussion, productId }) => {
  const dispatch = useDispatch();

  const [isFocused, setIsFocused] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [inputReply, setInputReply] = useState({
    replyMessage: "",
  });
  const [openDelete, setOpenDelete] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isButtonOpen, setIsButtonOpen] = useState(false);

  const buttonRef = useRef(null);

  const userData = useSelector((state) => state.users.userAuthenticate);

  const displayedItems = showAll ? discussion.reply : [discussion.reply[0]];
  const token = CookieStorage.get(CookiesKeys.AuthToken);

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

  const handleCancel = () => {
    setInputReply((prevInpsetInputReply) => ({
      ...prevInpsetInputReply,
      replyMessage: "",
    }));
    setIsFocused(false);
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;

    setInputReply((prevInputReply) => ({
      ...prevInputReply,
      [field]: value,
    }));
  };

  const handleReply = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      const loadingToastId = showLoadingToast("Loading...");

      const reply = await dispatch(
        postCreateReplyByDiscussionIdAction(inputReply, discussion.id),
      );

      toast.dismiss(loadingToastId);

      if (!reply) showErrorToast("Create Reply Failed");

      if (reply) {
        showSuccessToast("Reply Added");
        handleCancel();
        await dispatch(getDiscussionsByProductIdAction(productId, ""));
      }
    }
  };

  const handleDeleteDiscussion = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    const deleteDiscussion = await dispatch(
      deleteDiscussionByIdAction(discussion.id),
    );

    toast.dismiss(loadingToastId);

    if (!deleteDiscussion) showErrorToast("Delete Discussion Failed");

    if (deleteDiscussion) {
      showSuccessToast("Delete Discussion Successful");
      await dispatch(getDiscussionsByProductIdAction(productId, ""));
      setOpenDelete(false);
    }
  };
  return (
    <div className="flex w-full flex-col items-start gap-2 rounded-md border p-4 shadow-sm">
      <div
        onMouseEnter={() => setIsButtonOpen(true)}
        onMouseLeave={() => setIsButtonOpen(false)}
        className=" relative flex w-full items-start gap-2"
      >
        <div className="h-10 w-10 lg:h-[4%] lg:w-[4%]">
          <img
            src={
              discussion.user.userProfile.profilePicture
                ? discussion.user.userProfile.profilePicture
                : "https://ik.imagekit.io/arfin07/images.png?updatedAt=1706817534316"
            }
            alt="profile"
            className="w-full rounded-full object-cover"
          />
        </div>
        <div className="mr-auto flex w-fit flex-col gap-1 md:pt-1">
          <div className="flex flex-wrap items-center md:gap-2">
            <h5 className="text-sm font-semibold">
              {discussion.user.userProfile.fullName}
            </h5>
            <p className="text-xs font-medium text-neutral-3">
              {discussion.createdAt}
            </p>
          </div>

          <p className="text-justify text-xs text-neutral-4">
            {discussion.userMessage}
          </p>
        </div>

        {(userData.id === discussion.user.id || userData.role === "Admin") &&
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
      {discussion.reply.length > 0 &&
        displayedItems.map((reply, index) => (
          <ReplyCard reply={reply} key={index} />
        ))}
      {discussion.reply.length > 1 && (
        <>
          {!showAll ? (
            <button
              className="ms-4 flex w-fit items-center justify-start text-start text-xs font-medium text-blue-700 md:ms-16"
              onClick={() => setShowAll(!showAll)}
            >
              Show More
              <IoIosArrowDown size={15} />
            </button>
          ) : (
            <button
              className="ms-4 flex w-fit items-center justify-start text-start text-xs font-medium text-blue-700 md:ms-16"
              onClick={() => setShowAll(!showAll)}
            >
              Show Less
              <IoIosArrowUp size={15} />
            </button>
          )}
        </>
      )}

      {token && (
        <div className="ms-auto flex w-full items-start gap-2 pl-4 md:gap-4 md:pl-16">
          <div className="h-10 w-10 lg:h-[4%] lg:w-[4%]">
            <img
              src={
                userData.userProfile.profilePicture
                  ? userData.userProfile.profilePicture
                  : "https://ik.imagekit.io/arfin07/images.png?updatedAt=1706817534316"
              }
              alt="profile"
              className="w-full rounded-full object-cover"
            />
          </div>
          <form className="flex w-full flex-col gap-1" onKeyDown={handleReply}>
            <div className="flex items-start gap-2">
              <h5 className="text-sm font-semibold">
                {userData.userProfile.fullName}
              </h5>
            </div>
            <textarea
              rows={isFocused ? 5 : 1}
              onClick={() => setIsFocused(true)}
              placeholder="Input Message here ..."
              value={inputReply.replyMessage}
              onChange={(e) => handleInputChange(e, "replyMessage")}
              className={`mb-auto w-full resize-none rounded-md border border-neutral-4 px-2 py-3 text-justify text-xs text-neutral-3 outline-none focus:border-2`}
            ></textarea>
            {isFocused && (
              <div className="flex gap-2 pt-2">
                <button
                  className="rounded-lg border border-neutral-1 bg-neutral-5 px-4 py-1 text-sm hover:border-neutral-5 hover:bg-neutral-1 hover:text-neutral-5"
                  onClick={() => handleCancel()}
                >
                  Cancel
                </button>
                <button
                  className={`${
                    inputReply.replyMessage
                      ? "bg-neutral-1 hover:bg-opacity-80"
                      : "border-neutral-4 bg-neutral-4"
                  } rounded-lg border px-4 py-1 text-sm text-neutral-5`}
                  disabled={!inputReply.replyMessage}
                  onClick={handleReply}
                >
                  Send
                </button>
              </div>
            )}
          </form>
        </div>
      )}

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
            onClick={handleDeleteDiscussion}
          >
            Delete
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
