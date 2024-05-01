import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import { Error404 } from "../pages/errors/Error404";
import { Login } from "../pages//user/auth/Login";
import { Register } from "../pages/user/auth/Register";
import { Otp } from "../pages/user/auth/Otp";

export const RouteList = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Error */}
        <Route path="*" element={<Error404 />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<Otp />} />
      </Routes>
    </BrowserRouter>
  );
};
