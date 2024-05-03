import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Icons
import { LuSearch } from "react-icons/lu";

export const InputSearch = () => {
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search");

  const handleSearch = (event) => {
    const keyword = searchRef.current?.value;

    if (!keyword || keyword.trim() === "") return;

    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();
      if (currentPath === "/flight") {
        if (queryParams) {
          if (searchValue) {
            const newQueryParams = queryParams.replace(
              /search=([^&]*)/,
              `search=${keyword}`,
            );
            navigate(`/flight?${newQueryParams}`);
          } else {
            const newQueryParams = decodeURIComponent(
              queryParams.replace(/\+/g, "%20"),
            );
            navigate(`/flight?${newQueryParams}&search=${keyword}`);
          }
        } else {
          navigate(`/flight?search=${keyword}`);
        }
      } else {
        navigate(`/flight?search=${keyword}`);
      }
    }
  };

  return (
    <div className="relative pl-10">
      <input
        type="text"
        className="w-[100%] rounded-2xl border bg-slate-100 py-2 pl-4 pr-10 outline-none"
        placeholder="Search..."
        ref={searchRef}
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
