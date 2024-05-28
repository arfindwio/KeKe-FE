import React from "react";

export const ReplyCard = ({ reply }) => {
  return (
    <div className="ms-auto flex w-full items-start gap-4 pl-4 md:pl-16">
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
      <div className="flex w-fit flex-col gap-1">
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
    </div>
  );
};
