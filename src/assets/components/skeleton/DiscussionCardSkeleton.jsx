import React from "react";

export const DiscussionCardSkeleton = () => {
  return (
    <div className="flex w-full flex-col items-start gap-2 rounded-md border p-4 shadow-sm">
      <div className="flex w-full animate-pulse flex-row gap-2">
        <div className="h-16 w-16 min-w-[4rem] rounded-full bg-slate-200"></div>
        <div className="flex w-full flex-col gap-2 py-2">
          <div className="flex w-full items-center gap-2">
            <div className="h-4 w-[20%] bg-slate-300"></div>
            <div className="h-4 w-[10%] bg-slate-200"></div>
          </div>
          <div className="h-4 w-full bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
};
