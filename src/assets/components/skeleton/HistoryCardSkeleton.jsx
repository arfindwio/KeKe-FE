import React from "react";

export const HistoryCardSkeleton = () => {
  return (
    <div className="flex w-full rounded-md border border-neutral-4 p-3 shadow-md">
      <div className="flex w-full animate-pulse flex-col gap-2">
        <div className="flex w-full items-center gap-2">
          <div className="h-4 w-[15%] bg-slate-200"></div>
          <div className="h-4 w-[10%] bg-slate-200"></div>
          <div className="h-5 w-[5%] bg-slate-200"></div>
          <div className="h-5 w-[5%] bg-slate-200"></div>
          <div className="h-5 w-[20%] bg-slate-200"></div>
        </div>
        <div className="mb-2 flex w-full gap-2 sm:mb-0">
          <div className="h-20 min-h-[5rem] w-20 min-w-[5rem] bg-slate-400 sm:h-24 sm:min-h-[6rem] sm:w-24 sm:min-w-[6rem]"></div>
          <div className="flex w-full justify-between gap-2">
            <div className="flex w-full flex-col gap-1 sm:w-[70%] sm:gap-2">
              <div className="h-5 w-[90%] bg-slate-300"></div>
              <div className="flex gap-2">
                <div className="h-4 w-[20%] bg-slate-200 sm:w-[10%]"></div>
                <div className="h-4 w-[20%] bg-slate-200 sm:w-[10%]"></div>
              </div>
              <div className="h-4 w-[50%] bg-slate-200"></div>
              <div className="h-4 w-[90%] bg-slate-200"></div>
            </div>
            <div className="hidden w-[28%] flex-col items-center justify-center gap-2 border-l-4 sm:flex">
              <div className="h-4 w-[40%] bg-slate-300"></div>
              <div className="h-5 w-[50%] bg-slate-300"></div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 border-t-4 pt-4 sm:hidden">
          <div className="h-4 w-[40%] bg-slate-300"></div>
          <div className="h-5 w-[50%] bg-slate-300"></div>
        </div>
      </div>
    </div>
  );
};
