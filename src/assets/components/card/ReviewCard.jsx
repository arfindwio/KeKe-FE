import React from "react";
import { useSelector } from "react-redux";

// Components
import { ReviewCardSkeleton } from "../skeleton/ReviewCardSkeleton";

// Icons
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

export const ReviewCard = ({ review, index, totalReviews }) => {
  const isLastIndex = index === totalReviews - 1;

  const loadingReview = useSelector((state) => state.reviews.loading);

  return (
    <div
      className={`${
        totalReviews % 2 === 1 && isLastIndex
          ? "col-span-2"
          : "col-span-2 md:col-span-1"
      } flex w-full items-start gap-2 rounded-md border p-4 shadow-sm lg:gap-4`}
    >
      {!loadingReview ? (
        <ReviewCardSkeleton />
      ) : (
        <>
          <div
            className={`${
              totalReviews % 2 === 1 && isLastIndex
                ? "h-[4%] w-[4%]"
                : "h-10 w-10 lg:h-[8%] lg:w-[8%]"
            }`}
          >
            <img
              src={
                review.user.userProfile.profilePicture
                  ? review.user.userProfile.profilePicture
                  : "https://ik.imagekit.io/arfin07/images.png?updatedAt=1706817534316"
              }
              alt="profile"
              className="w-full rounded-full object-cover"
            />
          </div>
          <div className="flex w-fit flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="flex text-alert-yellow">
                {Array(review.userRating)
                  .fill(true)
                  .map((_, index) => (
                    <FaStar key={index} size={15} />
                  ))}
                {Array(5 - review.userRating)
                  .fill(true)
                  .map((_, index) => (
                    <FaRegStar key={index} size={15} />
                  ))}
              </div>
              <p className="text-xs font-medium text-neutral-3">
                {review.createdAt}
              </p>
            </div>
            <h5 className="text-sm font-semibold">
              {review.user.userProfile.fullName}
            </h5>
            <p className="text-xs text-neutral-4">{review.userComment}</p>
          </div>
        </>
      )}
    </div>
  );
};
