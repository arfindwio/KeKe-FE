import React from "react";

export const AdminDiscussionSkeleton = () => {
  return (
    <div className="flex w-full animate-pulse flex-col rounded-md border shadow-sm">
      <div className="border-b p-2">
        <div className="mx-auto h-4 w-[40%] bg-slate-200"></div>
      </div>
      <div className="flex flex-col gap-2 py-4">
        <div className="flex flex-col gap-1 px-4 py-1">
          <div className="flex items-center gap-2">
            <div className="h-5 w-[40%] bg-slate-200"></div>
            <div className="h-5 w-[10%] bg-slate-200"></div>
            <div className="h-3 w-[30%] bg-slate-200"></div>
          </div>
          <div className="h-3 w-full bg-slate-200"></div>
        </div>
        <div className="flex flex-col gap-2 pl-8 pr-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="h-5 w-[40%] bg-slate-200"></div>
              <div className="h-5 w-[10%] bg-slate-200"></div>
              <div className="h-3 w-[30%] bg-slate-200"></div>
            </div>
            <div className="h-3 w-full bg-slate-200"></div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="h-5 w-[40%] bg-slate-200"></div>
              <div className="h-5 w-[10%] bg-slate-200"></div>
              <div className="h-3 w-[30%] bg-slate-200"></div>
            </div>
            <div className="h-3 w-full bg-slate-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
