import React from "react";

export const Error404 = () => {
  return (
    <div className="bg-secondary flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-neutral-1 text-9xl font-bold">404</div>
        <div className="text-neutral-3 text-2xl font-semibold tracking-widest">
          PAGE NOT FOUND
        </div>
      </div>
      <div className="bg-neutral-1 hover:bg-secondary text-neutral-5 cursor-pointer rounded-xl px-3 py-2 text-lg font-semibold transition-all hover:bg-opacity-80">
        <a href="/">Kembali ke Homepage</a>
      </div>
    </div>
  );
};
