import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
        <Route path="/account-profile" element={<Profile />} />
        <Route path="/account-setting" element={<Setting />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/history" element={<History />} />
        <Route path="/cart" element={<Cart />} />

        {/* Products */}
        <Route path="/product" element={<Products />} />
        <Route path="/product/:productId" element={<DetailProduct />} />

        {/* Payment */}
        <Route path="/payment" element={<Payment />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
