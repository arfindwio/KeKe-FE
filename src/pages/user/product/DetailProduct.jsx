import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

// Components
import { Navbar } from "../../../assets/components/navbar/Navbar";
import { DetailProductSection } from "../../../assets/components/detailProduct/DetailProductSection";
import { ReviewCard } from "../../../assets/components/card/ReviewCard";
import { DiscussionCard } from "../../../assets/components/card/DiscussionCard";
import { ProductCard } from "../../../assets/components/card/ProductCard";
import { Footer } from "../../../assets/components/footer/Footer";

// Redux Actions
import {
  getProductByIdAction,
  getAllProductsAction,
  getRecommendationProductsAction,
  getRecommendationProductsActionUser,
} from "../../../redux/action/products/ProductsAction";
import {
  getReviewsByProductIdAction,
  postCreateReviewByProductIdAction,
} from "../../../redux/action/reviews/ReviewsAction";
import {
  getDiscussionsByProductIdAction,
  postCreateDiscussionByProductIdAction,
} from "../../../redux/action/discussions/DiscussionsAction";

// Icons
import { FcRating } from "react-icons/fc";
import { IoMdChatbubbles } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

// Helper
import {
  showLoadingToast,
  showSuccessToast,
  showErrorToast,
} from "../../../helper/ToastHelper";

export const DetailProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const textareaRefReview = useRef(null);
  const textareaRefDiscussion = useRef(null);

  const [inputDiscussion, setInputDiscussion] = useState({
    userMessage: "",
  });
  const [inputReview, setInputReview] = useState({
    userRating: 1,
    userComment: "",
  });

  const productData = useSelector((state) => state.products.products);
  const detailProductData = useSelector((state) => state.products.product);
  const recommendationProductData = useSelector(
    (state) => state.products.recommendationProducts,
  );
  const reviewData = useSelector((state) => state.reviews.reviews);
  const discussionData = useSelector((state) => state.discussions.discussions);
  const userData = useSelector((state) => state.users.userAuthenticate);

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProductByIdAction(productId));
      await dispatch(
        getAllProductsAction(`?c=${detailProductData.category.categoryName}`),
      );
      await dispatch(getReviewsByProductIdAction(detailProductData.id));
      await dispatch(getDiscussionsByProductIdAction(detailProductData.id));
      if (token) {
        await dispatch(getRecommendationProductsActionUser());
      } else {
        await dispatch(getRecommendationProductsAction());
      }
    };

    fetchData();
  }, []);

  const handleCancel = () => {
    setInputDiscussion((prevInpsetInputDiscussion) => ({
      ...prevInpsetInputDiscussion,
      userMessage: "",
    }));
    setInputReview((prevInpsetInputReview) => ({
      ...prevInpsetInputReview,
      userRating: 1,
      userComment: "",
    }));
  };

  const handleInputChange = (e, field) => {
    if (field === "userRating" || field === "userComment") {
      if (field === "userRating") {
        setInputReview((previnputReview) => ({
          ...previnputReview,
          [field]: e,
        }));
      } else {
        const value = e.target.value;
        setInputReview((previnputReview) => ({
          ...previnputReview,
          [field]: value,
        }));
      }
    } else {
      const value = e.target.value;

      setInputDiscussion((previnputDiscussion) => ({
        ...previnputDiscussion,
        [field]: value,
      }));
    }
  };

  const handleDiscussion = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      const loadingToastId = showLoadingToast("Loading...");
      const discussion = await dispatch(
        postCreateDiscussionByProductIdAction(
          inputDiscussion,
          detailProductData.id,
        ),
      );
      toast.dismiss(loadingToastId);
      if (!discussion) showErrorToast("Create Discussion Failed");
      if (discussion) {
        showSuccessToast("Discussion Added");
        handleCancel();
        await dispatch(getDiscussionsByProductIdAction(productId));
      }
    }
  };

  const handleButtonClick = (type) => {
    if (!token) {
      showErrorToast("Please log in first");
    } else {
      if (type === "review" && textareaRefReview.current) {
        textareaRefReview.current.focus();
      } else if (type === "discussion" && textareaRefDiscussion.current) {
        textareaRefDiscussion.current.focus();
      }
    }
  };

  const handleReview = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      const loadingToastId = showLoadingToast("Loading...");
      const review = await dispatch(
        postCreateReviewByProductIdAction(inputReview, detailProductData.id),
      );
      toast.dismiss(loadingToastId);
      if (!review) showErrorToast("Add Review Failed");
      if (review) {
        showSuccessToast("Review Added");
        handleCancel();
        await dispatch(getDiscussionsByProductIdAction(productId));
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col gap-8 px-4 pb-10 pt-24 sm:px-10 md:pb-10 lg:px-20">
        <DetailProductSection />

        {/* Review Section */}
        <div className="flex flex-col gap-3">
          <h5 className="text-lg font-semibold">Review</h5>
          <div className="grid w-full grid-cols-2 gap-2">
            <div className="col-span-2 flex w-full items-center gap-4 rounded-md border border-neutral-2 p-2 shadow-sm md:p-4">
              <FcRating size={40} className="hidden md:block" />
              <p className="text-sm md:text-base">
                How was your experience with this product? Leave your review now
              </p>
              <button
                className="ms-auto w-fit rounded-lg bg-neutral-1 px-2 py-1 text-xs text-neutral-5 hover:bg-opacity-80 md:px-3 md:py-2 md:text-base"
                onClick={() => handleButtonClick("review")}
              >
                Add Your Review
              </button>
            </div>
            {reviewData.map((review, index) => (
              <ReviewCard
                review={review}
                key={index}
                index={index}
                totalReviews={reviewData.length}
              />
            ))}
            {token && (
              <form
                className="col-span-2 flex w-full flex-col items-start gap-2 rounded-md border p-4 shadow-sm"
                onKeyDown={handleReview}
              >
                <div className="flex w-full items-start gap-2">
                  <div className="h-10 w-10 md:min-h-[4%] md:min-w-[4%]">
                    <img
                      src={
                        userData.userProfile.profilePicture
                          ? userData.userProfile.profilePicture
                          : "https://ik.imagekit.io/arfin07/images.png?updatedAt=1706817534316"
                      }
                      alt="profile"
                      className="w-full rounded-full object-cover"
                    />
                  </div>
                  <div className="flex  w-full flex-col gap-1 md:pt-1">
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm font-semibold">
                        {userData.userProfile.fullName}
                      </h5>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((star, index) => {
                        const starValue = index + 1;
                        return starValue <= inputReview.userRating ? (
                          <FaStar
                            size={20}
                            key={index}
                            className="cursor-pointer text-yellow-700"
                            onClick={() =>
                              handleInputChange(starValue, "userRating")
                            }
                          />
                        ) : (
                          <FaRegStar
                            size={20}
                            key={index}
                            className="cursor-pointer text-slate-500"
                            onClick={() =>
                              handleInputChange(starValue, "userRating")
                            }
                          />
                        );
                      })}
                    </div>
                    <textarea
                      ref={textareaRefReview}
                      rows={5}
                      placeholder="Input review here ..."
                      id="userComment"
                      value={inputReview.userComment}
                      onChange={(e) => handleInputChange(e, "userComment")}
                      className={`mb-auto w-full resize-none rounded-md border border-neutral-4 px-2 py-3 text-justify text-xs text-neutral-3 outline-none focus:border-2 focus:border-neutral-2 focus:border-opacity-70`}
                    ></textarea>
                    <div className="flex gap-2 pt-2">
                      <button
                        className="rounded-lg border border-neutral-1 bg-neutral-5 px-4 py-1 text-sm hover:border-neutral-5 hover:bg-neutral-1 hover:text-neutral-5"
                        onClick={() => handleCancel()}
                      >
                        Cancel
                      </button>
                      <button
                        className={`${
                          inputReview.userComment
                            ? "bg-neutral-1 hover:bg-opacity-80"
                            : "border-neutral-4 bg-neutral-4"
                        } rounded-lg border px-4 py-1 text-sm text-neutral-5`}
                        disabled={!inputReview.userComment}
                        onClick={handleReview}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Discussion Section */}
        <div className="flex flex-col gap-3">
          <h5 className="text-lg font-semibold">Discussion</h5>
          <div className="flex w-full flex-col items-center gap-2">
            <div className="col-span-2 flex w-full items-center gap-4 rounded-md border border-neutral-2 p-4 shadow-sm">
              <IoMdChatbubbles size={40} className="hidden md:block" />
              <p className="text-sm md:text-base">
                Have questions? Discuss with the seller
              </p>
              <button
                className="ms-auto w-fit rounded-lg bg-neutral-1 px-2 py-1 text-xs text-neutral-5 hover:bg-opacity-80 md:px-3 md:py-2 md:text-base"
                onClick={() => handleButtonClick("discussion")}
              >
                Add Your Discussion
              </button>
            </div>

            {discussionData.map((discussion, index) => (
              <DiscussionCard
                discussion={discussion}
                productId={detailProductData.id}
                key={index}
              />
            ))}
            {token && (
              <form
                className="flex w-full flex-col items-start gap-2 rounded-md border p-4 shadow-sm"
                onKeyDown={handleDiscussion}
              >
                <div className="flex w-full items-start gap-2">
                  <div className="h-10 w-10 md:min-h-[4%] md:min-w-[4%]">
                    <img
                      src={
                        userData.userProfile.profilePicture
                          ? userData.userProfile.profilePicture
                          : "https://ik.imagekit.io/arfin07/images.png?updatedAt=1706817534316"
                      }
                      alt="profile"
                      className="w-full rounded-full object-cover"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-1 md:pt-1">
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm font-semibold">
                        {userData.userProfile.fullName}
                      </h5>
                    </div>

                    <textarea
                      ref={textareaRefDiscussion}
                      rows={5}
                      placeholder="Input discussion here ..."
                      id="userMessage"
                      value={inputDiscussion.userMessage}
                      onChange={(e) => handleInputChange(e, "userMessage")}
                      className={`mb-auto w-full resize-none rounded-md border border-neutral-4 px-2 py-3 text-justify text-xs text-neutral-3 outline-none focus:border-2 focus:border-neutral-2 focus:border-opacity-70`}
                    ></textarea>
                    <div className="flex gap-2 pt-2">
                      <button
                        className="rounded-lg border border-neutral-1 bg-neutral-5 px-4 py-1 text-sm hover:border-neutral-5 hover:bg-neutral-1 hover:text-neutral-5"
                        onClick={() => handleCancel()}
                      >
                        Cancel
                      </button>
                      <button
                        className={`${
                          inputDiscussion.userMessage
                            ? "bg-neutral-1 hover:bg-opacity-80"
                            : "border-neutral-4 bg-neutral-4"
                        } rounded-lg border px-4 py-1 text-sm text-neutral-5`}
                        disabled={!inputDiscussion.userMessage}
                        onClick={handleDiscussion}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
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
