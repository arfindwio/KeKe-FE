import { combineReducers } from "@reduxjs/toolkit";
import UsersSlice from "./users/UsersSlice";
import UserProfilesSlice from "./userProfiles/UserProfilesSlice";
import NotificationsSlice from "./notifications/NotificationsSlice";
import CategoriesSlice from "./categories/CategoriesSlice";
import PromotionsSlice from "./promotions/PromotionsSlice";
import ProductsSlice from "./products/ProductsSlice";
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
  Notifications: NotificationsSlice,

  // Categories
  Categories: CategoriesSlice,

  // Promotions
  Promotions: PromotionsSlice,

  // Products
  Products: ProductsSlice,

  // Sizes
  Sizes: SizesSlice,

  // Colors
  Colors: ColorsSlice,

  // Carts
  Carts: CartsSlice,

  // Payments
  Payments: PaymentsSlice,

  // Reviews
  Reviews: ReviewsSlice,

  // Discussions
  Discussions: DiscussionsSlice,

  // Replies
  Replies: RepliesSlice,
});
