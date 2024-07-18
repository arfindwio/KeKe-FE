import { combineReducers } from "@reduxjs/toolkit";
import UsersSlice from "./users/UsersSlice";
import UserProfilesSlice from "./userProfiles/UserProfilesSlice";
import NotificationsSlice from "./notifications/NotificationsSlice";
import CategoriesSlice from "./categories/CategoriesSlice";
import PromotionsSlice from "./promotions/PromotionsSlice";
import ProductsSlice from "./products/ProductsSlice";
import ImagesSlice from "./images/ImagesSlice";
import SizesSlice from "./sizes/SizesSlice";
import ColorsSlice from "./colors/ColorsSlice";
import CartsSlice from "./carts/CartsSlice";
import PaymentsSlice from "./payments/PaymentsSlice";
import ReviewsSlice from "./reviews/ReviewsSlice";
import DiscussionsSlice from "./discussions/DiscussionsSlice";
import RepliesSlice from "./replies/RepliesSlice";

export default combineReducers({
  // User
  users: UsersSlice,

  // User Profiles
  userProfiles: UserProfilesSlice,

  // Notifications
  notifications: NotificationsSlice,

  // Categories
  categories: CategoriesSlice,

  // Promotions
  promotions: PromotionsSlice,

  // Products
  products: ProductsSlice,
  // Images
  images: ImagesSlice,

  // Sizes
  sizes: SizesSlice,

  // Colors
  colors: ColorsSlice,

  // Carts
  carts: CartsSlice,

  // Payments
  payments: PaymentsSlice,

  // Reviews
  reviews: ReviewsSlice,

  // Discussions
  discussions: DiscussionsSlice,

  // Replies
  replies: RepliesSlice,
});
