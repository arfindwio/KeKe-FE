import React from "react";
import { Navigate } from "react-router-dom";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";


export const TokenProtected = ({ element }) => {
  const token = CookieStorage.get(CookiesKeys.AuthToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return element;
};
