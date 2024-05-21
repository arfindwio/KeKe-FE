import React from "react";
import { useSelector } from "react-redux";

// Components
import { Navbar } from "../../../assets/components/navbar/Navbar";
import { SidebarFilter } from "../../../assets/components/sidebar/SidebarFilter";
import { ProductCard } from "../../../assets/components/card/ProductCard";
import { Footer } from "../../../assets/components/footer/Footer";

export const Products = () => {
  const productData = useSelector((state) => state.products.products);

  return (
    <>
      <Navbar />

      <div className="flex min-h-[70vh] flex-col gap-5 bg-slate-100 px-4 pb-10 pt-24 sm:px-10 md:pb-10 lg:px-20">
        <h1 className="text-3xl font-bold">Products</h1>
        <div className="flex justify-between">
          <div className="flex h-fit w-[35%] flex-col gap-6 rounded-lg bg-neutral-5 p-6">
            <SidebarFilter />
          </div>
          <div className="grid w-[63%] grid-cols-3 gap-3">
            {productData.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
