import React from "react";
import { Link } from "react-router-dom";

export const Error404 = () => {
  return (
    <div className="bg-secondary flex min-h-screen flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8">
      <div className="flex flex-col items-center justify-center gap-0 sm:gap-2">
        <div className="text-7xl font-bold text-neutral-1 sm:text-8xl md:text-9xl">
          404
        </div>
        <div className="text-lg font-semibold tracking-widest text-neutral-3 sm:text-xl md:text-2xl">
          PAGE NOT FOUND
        </div>
      </div>
      <div className=" cursor-pointer rounded-xl bg-neutral-1 px-3 py-2 text-base font-semibold text-neutral-5 transition-all hover:bg-opacity-80 sm:text-lg">
        <Link to="/">Back To Homepage</Link>
      </div>
    </div>
  );
};
