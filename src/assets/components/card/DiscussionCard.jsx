import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Components
import { ReplyCard } from "./ReplyCard";

// Redux Actions
import { postCreateReplyByDiscussionIdAction } from "../../../redux/action/replies/RepliesAction";
import { getDiscussionsByProductIdAction } from "../../../redux/action/discussions/DiscussionsAction";

// Icons
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

// Helper
import {
  showLoadingToast,
  showSuccessToast,
  showErrorToast,
} from "../../../helper/ToastHelper";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const DiscussionCard = ({ discussion, productId }) => {
  const dispatch = useDispatch();

  const [isFocused, setIsFocused] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [inputReply, setInputReply] = useState({
    replyMessage: "",
  });

  const userData = useSelector((state) => state.users.userAuthenticate);

  const displayedItems = showAll ? discussion.reply : [discussion.reply[0]];
  const token = CookieStorage.get(CookiesKeys.AuthToken);

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
        await dispatch(getDiscussionsByProductIdAction(productId));
      }
    }
  };
  return (
    <div className="flex w-full flex-col items-start gap-2 rounded-md border p-4 shadow-sm">
      <div className="flex w-full items-start gap-2">
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
        <div className="flex w-fit flex-col gap-1 md:pt-1">
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
    </div>
  );
};
