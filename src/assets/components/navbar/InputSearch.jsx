import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Icons
import { LuSearch } from "react-icons/lu";

export const InputSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search");

  const handleSearch = (event) => {
    const keyword = event.target.value.trim();

    if (!keyword) return;

    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();
      if (currentPath === "/product") {
        if (queryParams) {
          if (searchValue) {
            const newQueryParams = queryParams
              .toString()
              .replace(/search=([^&]*)/, `search=${keyword}`);
            navigate(`/product?${newQueryParams}`);
          } else {
            const newQueryParams = decodeURIComponent(
              queryParams.toString().replace(/\+/g, "%20"),
            );
            navigate(`/product?${newQueryParams}&search=${keyword}`);
          }
        } else {
          navigate(`/product?search=${keyword}`);
        }
      } else {
        navigate(`/product?search=${keyword}`);
      }
    }
  };

  return (
    <div className="relative w-[70%]">
      <input
        type="text"
        className="w-[100%] rounded-2xl border bg-slate-100 py-2 pl-4 pr-10 outline-none"
        placeholder="Search..."
        onKeyDown={handleSearch}
      />
      <LuSearch
        size={25}
        className="absolute right-4 top-2 cursor-pointer text-neutral-3"
        onClick={handleSearch}
      />
    </div>
  );
};
