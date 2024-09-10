import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Components
import { ReplyCard } from "../card/ReplyCard";

// Redux Actions
import { postCreateReplyByDiscussionIdAction } from "../../../redux/action/replies/RepliesAction";
import {
  getAllDiscussionsAction,
  deleteDiscussionByIdAction,
} from "../../../redux/action/discussions/DiscussionsAction";

// Material Tailwind
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

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

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const AdminManageDiscussion = ({ discussion }) => {
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [inputReply, setInputReply] = useState({
    replyMessage: "",
  });
  const [openDelete, setOpenDelete] = useState(false);

  const buttonRef = useRef(null);

  const userData = useSelector((state) => state.users.userAuthenticate);

  const displayedItems = showAll
    ? discussion.reply
    : [discussion.reply[discussion.reply.length - 1]];

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

  const handleInputChange = (e) => {
    setInputReply((prevInputReply) => ({
      ...prevInputReply,
      [e.target.name]: e.target.value,
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
        await dispatch(getAllDiscussionsAction(""));
      }
    }
  };

  const handleDelete = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    const deleteDiscussion = await dispatch(
      deleteDiscussionByIdAction(discussion.id),
    );

    toast.dismiss(loadingToastId);

    if (!deleteDiscussion) showErrorToast("Delete Discussion Failed");

    if (deleteDiscussion) {
      showSuccessToast("Delete Discussion Successful");
      await dispatch(getAllDiscussionsAction(""));
      setOpenDelete(false);
    }
  };
  return (
    <div className="flex w-full flex-col gap-2 rounded-md border shadow-sm">
      <h4 className="border-b bg-slate-200 py-2 text-center text-sm font-bold">
        ID {discussion?.product?.id} - {discussion?.product?.productName}
      </h4>
      <div className="p-4">
        <div
          onMouseEnter={() => setIsButtonOpen(true)}
          onMouseLeave={() => setIsButtonOpen(false)}
          className="relative flex w-full items-start justify-between"
        >
          <div className="flex w-fit flex-col gap-1">
            <div className="flex flex-wrap items-center md:gap-2">
              <h5 className="text-sm font-semibold">
                {discussion.user.userProfile.fullName}
                <span
                  className={`${
                    discussion.user.role === "Owner"
                      ? "bg-yellow-700"
                      : discussion.user.role === "Admin"
                        ? "bg-blue-400"
                        : "bg-slate-400"
                  } ms-1 rounded-sm px-2 py-[2px] text-[10px] font-normal text-neutral-5`}
                >
                  {discussion.user.role}
                </span>
              </h5>
              <p className="text-xs font-medium text-neutral-3">
                {discussion.createdAt}
              </p>
            </div>

            <p className="text-justify text-xs font-semibold text-slate-400">
              {discussion.userMessage}
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
        {discussion.reply.length > 1 && (
          <>
            {!showAll ? (
              <button
                className="ms-4 flex w-fit items-center justify-start gap-1 text-start text-xs font-medium text-blue-700"
                onClick={() => setShowAll(!showAll)}
              >
                Show More
                <IoIosArrowUp size={15} />
              </button>
            ) : (
              <button
                className="ms-4 flex w-fit items-center justify-start gap-1 text-start text-xs font-medium text-blue-700"
                onClick={() => setShowAll(!showAll)}
              >
                Show Less
                <IoIosArrowDown size={15} />
              </button>
            )}
          </>
        )}
        {discussion.reply.length > 0 &&
          displayedItems.map((reply, index) => (
            <ReplyCard reply={reply} key={index} />
          ))}

        {token && (
          <div className="ms-auto mt-2 flex w-full items-start pl-4">
            <form
              className="flex w-full flex-col gap-1"
              onKeyDown={handleReply}
            >
              <div className="flex items-center gap-1">
                <h5 className="text-sm font-semibold">
                  {userData.userProfile.fullName}
                </h5>
                <p
                  className={`${
                    userData.role === "Owner"
                      ? "bg-yellow-700"
                      : userData.role === "Admin"
                        ? "bg-blue-400"
                        : "bg-slate-400"
                  } rounded-sm px-2 py-[2px] text-[10px] font-normal text-neutral-5`}
                >
                  {userData.role}
                </p>
              </div>
              <textarea
                rows={isFocused ? 5 : 1}
                onClick={() => setIsFocused(true)}
                placeholder="Input Message here ..."
                name="replyMessage"
                value={inputReply.replyMessage}
                onChange={handleInputChange}
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
            <p>Are you sure you want to delete this Discussion?</p>
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
      </div>
    </div>
  );
};
