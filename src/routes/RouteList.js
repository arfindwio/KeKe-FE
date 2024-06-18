import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Componenet
import { TokenProtected } from "../assets/components/protected/TokenProtected";
import { AdminProtected } from "../assets/components/protected/AdminProtected";

// Pages
import { Error404 } from "../pages/errors/Error404";
import { Home } from "../pages/Home";
import { Login } from "../pages//user/auth/Login";
import { Register } from "../pages/user/auth/Register";
import { Otp } from "../pages/user/auth/Otp";
import { VerifyAccount } from "../pages/user/auth/VerifyAccount";
import { ForgetPassword } from "../pages/user/auth/ForgetPassword";
import { UpdatePassword } from "../pages/user/auth/UpdatePassword";
import { Profile } from "../pages/user/account/Profile";
import { Setting } from "../pages/user/account/Setting";
import { Notification } from "../pages/user/account/Notification";
import { History } from "../pages/user/account/History";
import { Cart } from "../pages/user/account/Cart";
import { Products } from "../pages/user/product/Products";
import { DetailProduct } from "../pages/user/product/DetailProduct";
import { Payment } from "../pages/user/payment/Payment";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { AdminPromotion } from "../pages/admin/AdminPromotion";
import { AdminCategory } from "../pages/admin/AdminCategory";
import { AdminProduct } from "../pages/admin/AdminProduct";

export const RouteList = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Error */}
        <Route path="*" element={<Error404 />} />

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />

        {/* Account */}
        <Route
          path="/account-profile"
          element={<TokenProtected element={<Profile />} />}
        />
        <Route
          path="/account-setting"
          element={<TokenProtected element={<Setting />} />}
        />
        <Route
          path="/notification"
          element={<TokenProtected element={<Notification />} />}
        />
        <Route
          path="/history"
          element={<TokenProtected element={<History />} />}
        />
        <Route path="/cart" element={<TokenProtected element={<Cart />} />} />

        {/* Products */}
        <Route path="/product" element={<Products />} />
        <Route path="/product/:productId" element={<DetailProduct />} />

        {/* Payment */}
        <Route path="/payment" element={<Payment />} />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={<AdminProtected element={<AdminDashboard />} />}
        />
        <Route
          path="/admin/promotion"
          element={<AdminProtected element={<AdminPromotion />} />}
        />
        <Route
          path="/admin/category"
          element={<AdminProtected element={<AdminCategory />} />}
        />
        <Route
          path="/admin/product"
          element={<AdminProtected element={<AdminProduct />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};
