import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// Redux Actions
import { getAllProductsAction } from "../../../redux/action/products/ProductsAction";
import { getAllCategoriesAction } from "../../../redux/action/categories/CategoriesAction";

// Icons
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export const SidebarFilter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const filterTimeoutRef = useRef(null);

  const [showAll, setShowAll] = useState(false);
  const [queryFormat, setQueryFormat] = useState("");

  const categoryData = useSelector(
    (state) => state.categories?.categories?.categories,
  );
  const loadingProduct = useSelector((state) => state.products?.loading);

  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const fetchData = async () => {
      if (location.search) {
        setQueryFormat(location.search);
        dispatch(getAllProductsAction(location.search));
      } else {
        dispatch(getAllProductsAction(""));
        dispatch(getAllCategoriesAction("?limit=9999"));
      }
    };

    fetchData();
  }, [location.search]);

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

    if (filterTimeoutRef.current) {
      clearTimeout(filterTimeoutRef.current);
    }

    const queryString = params.toString();
    setQueryFormat(queryString);
    filterTimeoutRef.current = setTimeout(async () => {
      navigate(`/product${queryString ? `?${queryString}` : ""}`);
    }, 200);
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
              className="h-5 w-5 cursor-pointer"
              checked={queryFormat.includes(`f=newest`)}
              onChange={() => handleFilter("f", "newest")}
              disabled={loadingProduct}
            />
            <label htmlFor="newest" className="cursor-pointer font-medium">
              Newest
            </label>
          </div>
          <div className="flex w-fit cursor-pointer gap-2">
            <input
              type="checkbox"
              id="popular"
              className="h-5 w-5 cursor-pointer"
              checked={queryFormat.includes(`f=popular`)}
              onChange={() => handleFilter("f", "popular")}
              disabled={loadingProduct}
            />
            <label htmlFor="popular" className="cursor-pointer font-medium">
              Popular
            </label>
          </div>
          <div className="flex w-fit cursor-pointer gap-2">
            <input
              type="checkbox"
              id="promo"
              className="h-5 w-5 cursor-pointer"
              checked={queryFormat.includes(`f=promo`)}
              onChange={() => handleFilter("f", "promo")}
              disabled={loadingProduct}
            />
            <label htmlFor="promo" className="cursor-pointer font-medium">
              Promo
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Categories</h2>
        <div className="flex w-full flex-col gap-4 px-3">
          {categoryData
            ?.slice(0, showAll ? categoryData.length : 5)
            ?.map((category, index) => (
              <div
                className="flex w-full cursor-pointer flex-nowrap items-center justify-between"
                key={index}
              >
                <input
                  type="checkbox"
                  id={category.categoryName}
                  className="h-5 min-h-[20px] w-5 min-w-[20px] cursor-pointer"
                  checked={queryParams
                    .getAll("c")
                    .includes(category.categoryName)}
                  onChange={() => handleFilter("c", category.categoryName)}
                  disabled={loadingProduct}
                />
                <label
                  htmlFor={category.categoryName}
                  className="w-full cursor-pointer break-all pl-2 font-medium"
                >
                  {category.categoryName}
                </label>
              </div>
            ))}
        </div>
        {categoryData?.length >= 6 && (
          <button
            className="flex w-full items-center justify-center gap-1 px-3 text-center text-xs font-medium text-blue-700"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
            {showAll ? (
              <IoIosArrowUp size={15} />
            ) : (
              <IoIosArrowDown size={15} />
            )}
          </button>
        )}
      </div>
    </>
  );
};
