import React from "react";

export const ProductHomeCardSkeleton = () => {
  return (
    <div className="flex w-full animate-pulse flex-col justify-between ">
      <div className="h-40 w-full bg-slate-200"></div>
      <div className="flex w-full flex-col gap-1 p-3">
        <p className="h-4 w-[80%] bg-slate-100"></p>
        <p className="h-4 w-[98%] bg-slate-100"></p>
        <p className="h-5 w-[60%] bg-slate-100"></p>
        <div className="flex w-full gap-1">
          <div className="h-4 w-[10%] bg-slate-100"></div>
          <div className="h-4 w-[20%] bg-slate-100"></div>
          <div className="h-4 w-[30%] bg-slate-100"></div>
        </div>
      </div>
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="h-fit w-full overflow-hidden rounded-xl border shadow-md">
      <div className="flex w-full animate-pulse flex-col justify-between ">
        <div className="h-40 w-full bg-slate-300"></div>
        <div className="flex w-full flex-col gap-1 p-3">
          <p className="h-4 w-[80%] bg-slate-200"></p>
          <p className="h-4 w-[98%] bg-slate-200"></p>
          <p className="h-5 w-[60%] bg-slate-200"></p>
          <div className="flex w-full gap-1">
            <div className="h-4 w-[10%] bg-slate-200"></div>
            <div className="h-4 w-[20%] bg-slate-200"></div>
            <div className="h-4 w-[30%] bg-slate-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DetailProductCardSkeleton = () => {
  return (
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
      <div className="flex items-center gap-2">
        <div className="h-10 w-[15%] rounded-md bg-slate-400"></div>
        <div className="h-4 w-[15%] bg-slate-200"></div>
      </div>
      <div className="h-4 w-[15%] bg-slate-200"></div>
      <div className="h-5 w-full bg-slate-200"></div>
    </div>
  );
};
