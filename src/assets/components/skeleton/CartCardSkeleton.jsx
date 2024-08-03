import React from "react";
import { useMediaQuery } from "react-responsive";

export const CartCardSkeleton = () => {
  const minWidth = useMediaQuery({ minDeviceWidth: 960 });

  return (
    <>
      {minWidth ? (
        <>
          <div className="flex w-full animate-pulse flex-row gap-2">
            <div className="h-24 w-24 min-w-[6rem] bg-slate-400"></div>
            <div className="flex w-full justify-between gap-2 py-2">
              <div className="flex w-[70%] flex-col gap-2">
                <div className="h-6 w-[90%] bg-slate-300"></div>
                <div className="flex gap-2">
                  <div className="h-4 w-[15%] bg-slate-200"></div>
                  <div className="h-4 w-[15%] bg-slate-200"></div>
                </div>
              </div>
              <div className="flex w-[28%] flex-col gap-3">
                <div className="ml-auto h-5 w-[60%] bg-slate-200"></div>
                <div className="flex w-full items-center justify-end gap-1">
                  <div className="mr-2 h-5 w-[10%] bg-slate-300"></div>
                  <div className="h-7 w-[21%] rounded-l-full bg-slate-200"></div>
                  <div className="h-7 w-[15%] bg-slate-200"></div>
                  <div className="h-7 w-[21%] rounded-r-full bg-slate-200"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full animate-pulse flex-col gap-1">
            <div className="h-4 w-[10%]  bg-slate-200"></div>
            <div className="h-4 w-full  bg-slate-200"></div>
          </div>
        </>
      ) : (
        <>
          <div className="flex w-full animate-pulse flex-row gap-2">
            <div className="h-20 min-h-[5rem] w-20 min-w-[5rem] bg-slate-400 sm:h-24 sm:min-h-[6rem] sm:w-24 sm:min-w-[6rem]"></div>
            <div className="flex w-full justify-between gap-2 py-2">
              <div className="flex w-full flex-col gap-2">
                <div className="h-6 w-[90%] bg-slate-300"></div>
                <div className="h-5 w-[25%] bg-slate-200"></div>
                <div className="flex gap-2">
                  <div className="h-4 w-[15%] bg-slate-200"></div>
                  <div className="h-4 w-[15%] bg-slate-200"></div>
                </div>
                <div className="flex w-full items-center justify-end gap-1">
                  <div className="mr-2 h-5 w-[15%] bg-slate-300 sm:w-[5%]"></div>
                  <div className="h-7 w-[15%] rounded-l-full bg-slate-200 sm:w-[5%]"></div>
                  <div className="h-7 w-[25%] bg-slate-200 sm:w-[15%]"></div>
                  <div className="h-7 w-[15%] rounded-r-full bg-slate-200 sm:w-[5%]"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full animate-pulse flex-col gap-1">
            <div className="h-4 w-[10%]  bg-slate-200"></div>
            <div className="h-4 w-full  bg-slate-200"></div>
          </div>
        </>
      )}
    </>
  );
};
