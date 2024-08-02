import React from "react";

export const SpecialOfferCardSkeleton = () => {
  return (
    <>
      <div className="h-72 w-full animate-pulse bg-slate-300 md:h-[28rem] md:w-[40%]"></div>
      <div className="flex w-full animate-pulse flex-col gap-2 p-3 md:w-[58%]">
        <div className="flex w-full gap-1">
          <div className="h-4 w-[5%] bg-slate-200"></div>
          <div className="h-4 w-[10%] bg-slate-200"></div>
          <div className="h-4 w-[10%] bg-slate-200"></div>
        </div>
        <div className="h-6 w-[70%] bg-slate-200"></div>
        <div className="h-5 w-[90%] bg-slate-200"></div>
        <div className="flex w-full gap-2">
          <div className="h-7 w-[25%] bg-slate-200"></div>
          <div className="h-7 w-[25%] bg-slate-200"></div>
        </div>
        <div className="h-4 w-[30%] bg-slate-200"></div>
        <div className="flex gap-2">
          <div className="h-8 w-[15%] rounded-full bg-slate-200"></div>
          <div className="h-8 w-[15%] rounded-full bg-slate-200"></div>
          <div className="h-8 w-[15%] rounded-full bg-slate-200"></div>
        </div>
        <div className="h-4 w-[30%] bg-slate-200"></div>
        <div className="flex gap-2">
          <div className="h-8 w-[15%] rounded-full bg-slate-200"></div>
          <div className="h-8 w-[15%] rounded-full bg-slate-200"></div>
          <div className="h-8 w-[15%] rounded-full bg-slate-200"></div>
        </div>
        <div className="h-10 w-[15%] rounded-md bg-slate-400"></div>
        <div className="flex justify-between">
          <div className="h-4 w-[20%]  bg-slate-200"></div>
          <div className="h-4 w-[20%]  bg-slate-200"></div>
        </div>
        <div className="h-4 w-full rounded-full bg-slate-200"></div>
        <div className="h-4 w-[20%]  bg-slate-200"></div>
        <div className="flex gap-2">
          <div className="h-14 w-14 rounded-md bg-slate-200"></div>
          <div className="h-14 w-14 rounded-md bg-slate-200"></div>
          <div className="h-14 w-14 rounded-md bg-slate-200"></div>
          <div className="h-14 w-14 rounded-md bg-slate-200"></div>
        </div>
      </div>
    </>
  );
};
