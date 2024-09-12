import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

// Redux Actions
import { getAllProductsAction } from "../../../redux/action/products/ProductsAction";

// Components
import { Navbar } from "../../../assets/components/navbar/Navbar";
import { SidebarFilter } from "../../../assets/components/sidebar/SidebarFilter";
import { ProductCard } from "../../../assets/components/card/ProductCard";
import { Pagination } from "../../../assets/components/pagination/Pagination";
import { ScrollButton } from "../../../assets/components/button/ScrollButton";
import { Footer } from "../../../assets/components/footer/Footer";
import { ProductCardSkeleton } from "../../../assets/components/skeleton/ProductCardSkeleton";

// Material Tailwind
import { Drawer } from "@material-tailwind/react";

// Icons
import { IoMdClose } from "react-icons/io";

export const Products = () => {
  const dispatch = useDispatch();

  const [openBottom, setOpenBottom] = useState(false);

  const loadingProduct = useSelector((state) => state.products?.loading);
  const productData = useSelector(
    (state) => state.products?.products?.products,
  );
  const paginationProduct = useSelector(
    (state) => state.products?.products?.pagination,
  );

  const minWidth = useMediaQuery({ minDeviceWidth: 720 });
  const minWidth320 = useMediaQuery({ minDeviceWidth: 320 });

  openBottom
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

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
          {!minWidth && (
            <Drawer
              placement="bottom"
              open={openBottom}
              onClose={() => setOpenBottom(false)}
              className={`${
                openBottom && "min-h-[70vh]"
              } overflow-auto p-4 md:hidden`}
            >
              <div className="relative">
                <IoMdClose
                  size={30}
                  className="absolute right-0 top-0 cursor-pointer"
                  onClick={() => setOpenBottom(false)}
                />
              </div>
              <div className="flex flex-col gap-6">
                <SidebarFilter />
              </div>
            </Drawer>
          )}
        </div>
        <div className="flex flex-col md:flex-row md:justify-between">
          {minWidth && (
            <div className="hidden h-fit w-full flex-col gap-6 rounded-lg bg-neutral-5 p-6 md:flex md:w-[35%]">
              <SidebarFilter />
            </div>
          )}
          <div className="flex w-full flex-col md:w-[63%]">
            <div
              className={`${
                minWidth320 ? "grid-cols-2" : "grid-cols-1"
              } grid gap-3 sm:grid-cols-3 xl:grid-cols-4`}
            >
              {loadingProduct ? (
                Array.from({ length: 12 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              ) : productData?.length > 0 ? (
                productData?.map((product, index) => (
                  <ProductCard product={product} key={index} />
                ))
              ) : (
                <p
                  className={`${
                    minWidth320 ? "col-span-2" : "col-span-1"
                  } m-auto text-center text-2xl font-bold italic text-neutral-4 sm:col-span-3 xl:col-span-4`}
                >
                  - No product found -
                </p>
              )}
            </div>

            {/* Pagination Section */}
            <div
              className={`${
                minWidth320 ? "col-span-2" : "col-span-1"
              } mt-auto sm:col-span-3 xl:col-span-4`}
            >
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
