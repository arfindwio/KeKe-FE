import React from "react";

export const PopularCategoryCardSkeleton = () => {
  return (
    <div className="flex w-full animate-pulse flex-row justify-between ">
      <div className="h-16 w-[40%] bg-slate-200"></div>
      <div className="flex w-[58%] flex-col py-1">
        <div className="flex justify-between">
          <p className="h-5 w-[80%] bg-slate-100"></p>
          <p className="h-5 w-[10%] bg-slate-100"></p>
        </div>
        <div className="mt-auto h-6 w-[45%] rounded-md bg-slate-400"></div>
      </div>
    </div>
  );
};
