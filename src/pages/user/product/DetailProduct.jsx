import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

// Components
import { Navbar } from "../../../assets/components/navbar/Navbar";
import { DetailProductSection } from "../../../assets/components/detailProduct/DetailProductSection";
import { ProductCard } from "../../../assets/components/card/ProductCard";
import { Footer } from "../../../assets/components/footer/Footer";

// Redux Actions
import {
  getProductByIdAction,
  getAllProductsAction,
  getRecommendationProductsAction,
  getRecommendationProductsUserAction,
} from "../../../redux/action/products/ProductsAction";

// Icons
import { FaStar } from "react-icons/fa";
import { FcRating } from "react-icons/fc";
import { IoMdChatbubbles } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const DetailProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const productData = useSelector((state) => state.products.products);
  const detailProductData = useSelector((state) => state.products.product);
  const recommendationProductData = useSelector(
    (state) => state.products.recommendationProducts,
  );

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        await dispatch(getRecommendationProductsUserAction());
      } else {
        await dispatch(getProductByIdAction(productId));
        await dispatch(getRecommendationProductsAction());
        await dispatch(
          getAllProductsAction(`?c=${detailProductData.category.categoryName}`),
        );
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex flex-col gap-8 px-4 pb-10 pt-24 sm:px-10 md:pb-10 lg:px-20">
        <DetailProductSection />

        {/* Review Section */}
        <div className="flex flex-col gap-3">
          <h5 className="text-lg font-semibold">Review</h5>
          <div className="grid w-full grid-cols-2 gap-2">
            <div className="col-span-2 flex w-full items-center gap-4 rounded-md border border-neutral-2 p-4 shadow-sm">
              <FcRating size={40} />
              <p className="text-base">
                How was your experience with this product? Leave your review now
              </p>
              <button className="ms-auto w-fit rounded-lg bg-neutral-1 px-3 py-2 text-neutral-5 hover:bg-opacity-80">
                Add Your Review
              </button>
            </div>
            <div className="my-auto flex w-full items-center gap-4 rounded-md border p-4 shadow-sm">
              <div className="h-[8%] w-[8%]">
                <img
                  src="https://ik.imagekit.io/arfin07/images.png?updatedAt=1706817534316"
                  alt="profile"
                  className="w-full rounded-full object-cover"
                />
              </div>
              <div className="flex w-fit flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="flex text-alert-yellow">
                    <FaStar size={15} />
                    <FaStar size={15} />
                    <FaStar size={15} />
                    <FaStar size={15} />
                    <FaStar size={15} />
                  </div>
                  <p className="text-xs font-medium text-neutral-3">
                    12 Maret 2024
                  </p>
                </div>
                <h5 className="text-sm font-semibold">Arfin Dwi Octavianto</h5>
                <p className="text-justify text-xs text-neutral-4">
                  Ini Komentar
                </p>
              </div>
            </div>
            <div className="my-auto flex w-full items-center gap-4 rounded-md border p-4 shadow-sm">
              <div className="h-[8%] w-[8%]">
                <img
                  src="https://ik.imagekit.io/arfin07/images.png?updatedAt=1706817534316"
                  alt="profile"
                  className="w-full rounded-full object-cover"
                />
              </div>
              <div className="flex w-fit flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="flex text-alert-yellow">
                    <FaStar size={15} />
                    <FaStar size={15} />
                    <FaStar size={15} />
                    <FaStar size={15} />
                    <FaStar size={15} />
                  </div>
                  <p className="text-xs font-medium text-neutral-3">
                    12 Maret 2024
                  </p>
                </div>
                <h5 className="text-sm font-semibold">Arfin Dwi Octavianto</h5>
                <p className="text-justify text-xs text-neutral-4">
                  Ini Komentar
                </p>
              </div>
            </div>
            <div className="col-span-2 my-auto flex items-center gap-4 rounded-md border p-4 shadow-sm">
              <div className="h-[4%] w-[4%]">
                <img
                  src="https://ik.imagekit.io/arfin07/images.png?updatedAt=1706817534316"
                  alt="profile"
                  className="w-full rounded-full object-cover"
                />
              </div>
              <div className="flex w-fit flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="flex text-alert-yellow">
                    <FaStar size={15} />
                    <FaStar size={15} />
                    <FaStar size={15} />
                    <FaStar size={15} />
                    <FaStar size={15} />
                  </div>
                  <p className="text-xs font-medium text-neutral-3">
                    12 Maret 2024
                  </p>
                </div>
                <h5 className="text-sm font-semibold">Arfin Dwi Octavianto</h5>
                <p className="text-justify text-xs text-neutral-4">
                  Ini Komentar
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Discussion Section */}
        <div className="flex flex-col gap-3">
          <h5 className="text-lg font-semibold">Discussion</h5>
          <div className="flex w-full flex-col items-center gap-2">
            <div className="col-span-2 flex w-full items-center gap-4 rounded-md border border-neutral-2 p-4 shadow-sm">
              <IoMdChatbubbles size={40} />
              <p className="text-base">
                Have questions? Discuss with the seller
              </p>
              <button className="ms-auto w-fit rounded-lg bg-neutral-1 px-3 py-2 text-neutral-5 hover:bg-opacity-80">
                Add Your Discussion
              </button>
            </div>
            <div className="flex w-full flex-col items-center gap-2 rounded-md border p-4 shadow-sm">
              <div className="flex w-full items-center gap-4">
                <div className="h-[4%] w-[4%]">
                  <img
                    src="https://ik.imagekit.io/arfin07/images.png?updatedAt=1706817534316"
                    alt="profile"
                    className="w-full rounded-full object-cover"
                  />
                </div>
                <div className="flex w-fit flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h5 className="text-sm font-semibold">
                      Arfin Dwi Octavianto
                    </h5>
                    <p className="text-xs font-medium text-neutral-3">
                      12 Maret 2024
                    </p>
                  </div>

                  <p className="text-justify text-xs text-neutral-4">
                    Ini Komentar
                  </p>
                </div>
              </div>
              <div className="ms-auto flex w-[98%] items-center gap-4 pl-10">
                <div className="h-[4%] w-[4%]">
                  <img
                    src="https://ik.imagekit.io/arfin07/images.png?updatedAt=1706817534316"
                    alt="profile"
                    className="w-full rounded-full object-cover"
                  />
                </div>
                <div className="flex w-fit flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h5 className="text-sm font-semibold">
                      Arfin Dwi Octavianto
                    </h5>
                    <p className="text-xs font-medium text-neutral-3">
                      12 Maret 2024
                    </p>
                  </div>

                  <p className="text-justify text-xs text-neutral-4">
                    Ini Komentar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Product Section */}
        <div className="flex flex-col gap-3 border-t pt-4">
          <h5 className="text-lg font-semibold">Similar Product</h5>
          <div className="grid h-fit w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {productData.slice(0, 5).map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>

        {/* Recommendation Product Section */}
        <div className="flex flex-col gap-3 ">
          <h5 className="text-lg font-semibold">Recommendation Product</h5>
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
