import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// Redux Actions
import { getAllProductsAction } from "../../../redux/action/products/ProductsAction";

export const SidebarFilter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [queryFormat, setQueryFormat] = useState("");

  const categoryData = useSelector(
    (state) => state.categories?.categories?.categories,
  );

  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    setQueryFormat(location.search);
    dispatch(getAllProductsAction(location.search));
  }, [location.search, dispatch]);

  const handleFilter = async (type, filter) => {
    const params = new URLSearchParams(queryFormat);
    const currentValue = params.getAll(type);

    if (filter === "popular") {
      if (currentValue.includes("newest")) {
        params.delete(type);
        currentValue
          .filter((value) => value !== "newest")
          .forEach((value) => params.append(type, value));
      }
    } else if (filter === "newest") {
      if (currentValue.includes("popular")) {
        params.delete(type);
        currentValue
          .filter((value) => value !== "popular")
          .forEach((value) => params.append(type, value));
      }
    }

    if (currentValue.includes(filter)) {
      params.delete(type);
      const remainingFilters = currentValue.filter((value) => value !== filter);
      remainingFilters.forEach((value) => params.append(type, value));
    } else {
      params.append(type, filter);
    }

    const queryString = params.toString();
    setQueryFormat(queryString);
    await dispatch(getAllProductsAction(`?${queryString}`));
    navigate(`/product${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Filter</h2>
        <div className="flex flex-col gap-4 px-3">
          <div className="flex w-fit cursor-pointer gap-2">
            <input
              type="checkbox"
              id="newest"
              className="relative w-[20px] cursor-pointer"
              checked={queryFormat.includes(`f=newest`)}
              onChange={() => handleFilter("f", "newest")}
            />
            <label htmlFor="newest" className="cursor-pointer font-medium">
              Newest
            </label>
          </div>
          <div className="flex w-fit cursor-pointer gap-2">
            <input
              type="checkbox"
              id="popular"
              className="relative w-[20px] cursor-pointer"
              checked={queryFormat.includes(`f=popular`)}
              onChange={() => handleFilter("f", "popular")}
            />
            <label htmlFor="popular" className="cursor-pointer font-medium">
              Popular
            </label>
          </div>
          <div className="flex w-fit cursor-pointer gap-2">
            <input
              type="checkbox"
              id="promo"
              className="relative w-[20px] cursor-pointer"
              checked={queryFormat.includes(`f=promo`)}
              onChange={() => handleFilter("f", "promo")}
            />
            <label htmlFor="promo" className="cursor-pointer font-medium">
              Promo
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Categories</h2>
        <div className="flex flex-col gap-4 px-3">
          {categoryData.map((category, index) => (
            <div
              className="flex w-full cursor-pointer flex-wrap gap-2"
              key={index}
            >
              <input
                type="checkbox"
                id={category.categoryName}
                className="relative w-[20px] cursor-pointer"
                checked={queryParams
                  .getAll("c")
                  .includes(category.categoryName)}
                onChange={() => handleFilter("c", category.categoryName)}
              />
              <label
                htmlFor={category.categoryName}
                className="cursor-pointer font-medium"
              >
                {category.categoryName}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
