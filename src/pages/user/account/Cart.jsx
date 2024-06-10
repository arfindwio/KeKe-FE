import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Redux Actions
import { getAllCartsByAuthAction } from "../../../redux/action/carts/CartsAction";

// Components
import { Navbar } from "../../../assets/components/navbar/Navbar";
import { CartCard } from "../../../assets/components/card/CartCard";
import { PriceDetailCard } from "../../../assets/components/card/PriceDetailCard";
import { ProductCard } from "../../../assets/components/card/ProductCard";
import { Footer } from "../../../assets/components/footer/Footer";

// Icons
import { BsBasketFill } from "react-icons/bs";

export const Cart = () => {
  const dispatch = useDispatch();

  const cartData = useSelector((state) => state.carts.carts);
  const recommendationProductData = useSelector(
    (state) => state.products.recommendationProducts,
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllCartsByAuthAction());
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="flex min-h-[30vh] flex-col gap-4 bg-slate-100 px-4 pb-10 pt-24 sm:px-10 lg:px-20">
        <h1 className="text-2xl font-bold text-neutral-1">Shopping Cart</h1>
        <div className="mb-4 flex w-full flex-col justify-between lg:flex-row">
          <div className="flex h-fit w-full flex-col gap-3 rounded-md border border-neutral-4 bg-neutral-5 px-2 py-3 shadow-sm sm:px-6 lg:w-[68%]">
            {cartData.length ? (
              cartData.map((cart) => <CartCard key={cart.id} cart={cart} />)
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 py-5 lg:flex-row lg:gap-4">
                <div className="rounded-full bg-neutral-3 p-7">
                  <BsBasketFill size={80} className="text-neutral-5" />
                </div>
                <div className="flex flex-col text-center lg:text-start">
                  <h5 className="text-xl font-bold">
                    Oops, your shopping cart is empty
                  </h5>
                  <p className="text-base text-neutral-3">
                    Let's fill it with your items!
                  </p>
                  <Link
                    to={"/product"}
                    className="mx-auto mt-4 w-fit rounded-md bg-neutral-1 px-6 py-2 text-center text-sm font-bold text-neutral-5 hover:bg-opacity-80 lg:mx-0"
                  >
                    Start Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="fixed bottom-14 left-0 z-[1] flex w-full flex-col gap-1 rounded-md border border-neutral-4 bg-neutral-5 px-4 pb-4 pt-2 shadow-sm sm:px-10 md:bottom-0 lg:sticky lg:top-20 lg:h-fit lg:w-[30%] lg:gap-3 lg:px-3 lg:py-4 lg:pb-4 lg:pt-2">
            <PriceDetailCard carts={cartData} />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t-2 border-neutral-4 pt-8">
          <h1 className="text-xl font-semibold text-neutral-1">
            Recommended For You
          </h1>
          <div className="grid h-fit w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {recommendationProductData.slice(0, 5).map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
