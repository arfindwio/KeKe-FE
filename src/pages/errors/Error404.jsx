import React from "react";

export const Error404 = () => {
  return (
    <div className="bg-secondary flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-9xl font-bold text-neutral-1">404</div>
        <div className="text-2xl font-semibold tracking-widest text-neutral-3">
          PAGE NOT FOUND
        </div>
      </div>
      <div className="hover:bg-secondary cursor-pointer rounded-xl bg-neutral-1 px-3 py-2 text-lg font-semibold text-neutral-5 transition-all hover:bg-opacity-80">
        <a href="/">Back To Homepage</a>
      </div>
    </div>
  );
};
