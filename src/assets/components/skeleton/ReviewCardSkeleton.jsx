import React from "react";

// Icons
import { FaStar } from "react-icons/fa";

export const ReviewCardSkeleton = () => {
  return (
    <div className="flex w-full animate-pulse flex-row gap-2">
      <div className="h-16 w-16 min-w-[4rem] rounded-full bg-slate-200"></div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center gap-2">
          <div className="flex text-slate-200">
            <FaStar size={15} />
            <FaStar size={15} />
            <FaStar size={15} />
            <FaStar size={15} />
            <FaStar size={15} />
          </div>
          <div className="h-4 w-[10%] bg-slate-200"></div>
        </div>
        <div className="h-4 w-[20%] bg-slate-300"></div>
        <div className="h-4 w-full bg-slate-200"></div>
      </div>
    </div>
  );
};
