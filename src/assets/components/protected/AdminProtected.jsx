import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const AdminProtected = ({ element }) => {
  const userData = useSelector((state) => state.users.userAuthenticate);

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (userData.role.toLowerCase() === "user") {
    return <Navigate to="/" replace />;
  }

  return element;
};
