import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import {
  getAllProductsAction,
  getRecommendationProductsActionUser,
  getRecommendationProductsAction,
  getSpecialOfferProductAction,
} from "../redux/action/products/ProductsAction";
import { getAllCategoriesAction } from "../redux/action/categories/CategoriesAction";

// Components
import { Navbar } from "../assets/components/navbar/Navbar";
import { BannerCard } from "../assets/components/card/BannerCard";
import { CategoryHomeCard } from "../assets/components/card/CategoryHomeCard";
import { RecommendedCard } from "../assets/components/card/RecommendedCard";
import { SpecialOfferCard } from "../assets/components/card/SpecialOfferCard";
import { ProductsHomeCard } from "../assets/components/card/ProductsHomeCard";
import { ScrollButton } from "../assets/components/button/ScrollButton";
import { Footer } from "../assets/components/footer/Footer";

// Cookies
import { CookieStorage, CookiesKeys } from "../utils/cookie";

export const Home = () => {
  const dispatch = useDispatch();

  const specialOfferData = useSelector(
    (state) => state.products.specialOfferProduct,
  );

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllProductsAction(""));
      await dispatch(getAllCategoriesAction(""));
      await dispatch(getSpecialOfferProductAction());
      if (token) return await dispatch(getRecommendationProductsActionUser());
      await dispatch(getRecommendationProductsAction());
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className=" px-4 pb-10 pt-24 sm:px-10 md:pb-10 lg:px-20">
        <div className="flex flex-col gap-5">
          <BannerCard />

          <CategoryHomeCard />

          <div className="flex flex-col gap-4">
            <RecommendedCard />
          </div>

          {specialOfferData && <SpecialOfferCard />}

          <ProductsHomeCard />
        </div>
      </div>

      <ScrollButton />

      <Footer />
    </>
  );
};
