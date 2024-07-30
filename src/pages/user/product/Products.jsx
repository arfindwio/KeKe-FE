import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

// Redux Actions
import { getAllProductsAction } from "../../../redux/action/products/ProductsAction";
import { getAllCategoriesAction } from "../../../redux/action/categories/CategoriesAction";

// Components
import { Navbar } from "../../../assets/components/navbar/Navbar";
import { SidebarFilter } from "../../../assets/components/sidebar/SidebarFilter";
import { ProductCard } from "../../../assets/components/card/ProductCard";
import { Pagination } from "../../../assets/components/pagination/Pagination";
import { ScrollButton } from "../../../assets/components/button/ScrollButton";
import { Footer } from "../../../assets/components/footer/Footer";

// Material Tailwind
import { Drawer } from "@material-tailwind/react";

export const Products = () => {
  const dispatch = useDispatch();

  const [openBottom, setOpenBottom] = useState(false);

  const productData = useSelector(
    (state) => state.products?.products?.products,
  );
  const paginationProduct = useSelector(
    (state) => state.products?.products?.pagination,
  );

  const minWidth = useMediaQuery({ minDeviceWidth: 720 });

  openBottom
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllProductsAction(""));
      await dispatch(getAllCategoriesAction(""));
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if (minWidth) {
      setOpenBottom(false);
    }
  }, [minWidth]);

  const handleQuery = (formatLink) => {
    dispatch(getAllProductsAction(formatLink));
  };

  return (
    <>
      <Navbar />

      <div className="flex min-h-[70vh] flex-col gap-3 bg-slate-100 px-4 pb-10 pt-24 sm:px-10 md:gap-5 md:pb-10 lg:px-20">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold md:text-3xl">Products</h1>
          <button
            className="text-lg font-medium text-primary-1 md:hidden"
            onClick={() => setOpenBottom(true)}
          >
            Filter
          </button>
          <Drawer
            placement="bottom"
            open={openBottom}
            onClose={() => setOpenBottom(false)}
            className={`${
              openBottom && "min-h-[70vh]"
            } overflow-auto p-4 md:hidden`}
          >
            <div className="relative">
              <button
                className="absolute right-0 top-0"
                onClick={() => setOpenBottom(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-6">
              <SidebarFilter />
            </div>
          </Drawer>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="hidden h-fit w-full flex-col gap-6 rounded-lg bg-neutral-5 p-6 md:flex md:w-[35%]">
            <SidebarFilter />
          </div>
          <div className="w-full md:w-[63%]">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {productData?.length > 0 ? (
                productData?.map((product, index) => (
                  <ProductCard product={product} key={index} />
                ))
              ) : (
                <p className="col-span-3 flex h-[50vh] items-center justify-center text-center text-2xl font-bold italic text-neutral-4 md:h-auto">
                  - No product found -
                </p>
              )}
            </div>
            {/* Pagination Section */}
            <div className="col-span-3 flex items-center justify-center">
              <Pagination
                onQuery={handleQuery}
                type={"products"}
                nextLink={paginationProduct?.links?.next}
                prevLink={paginationProduct?.links?.prev}
                totalItems={paginationProduct?.total_items}
              />
            </div>
          </div>
        </div>
      </div>
      <ScrollButton />
      <Footer />
    </>
  );
};
