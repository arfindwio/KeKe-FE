import React from "react";

export const Error404 = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-secondary">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-9xl font-bold text-primary">404</div>
        <div className="text-2xl font-semibold tracking-wider text-slate-500">
          PAGE NOT FOUND
        </div>
      </div>
      <div className="cursor-pointer rounded-xl border-2 bg-primary px-3 py-2 text-lg font-semibold text-slate-200 transition-all hover:border-primary hover:bg-secondary hover:text-primary">
        <a href="/">Kembali ke Homepage</a>
      </div>
    </div>
  );
};
