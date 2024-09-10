import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Redux Actions
import { getUserAuthenticateAction } from "../../../redux/action/users/UsersAction";

// Components
import { LoadingSpinner } from "../loading/LoadingSpinner";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const AdminProtected = ({ element }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const userData = useSelector((state) => state.users.userAuthenticate);
  const token = CookieStorage.get(CookiesKeys.AuthToken);

  useEffect(() => {
    const authenticateUser = async () => {
      if (token) {
        const user = await dispatch(getUserAuthenticateAction());
        if (!user) {
          setAuthenticated(false);
        } else {
          setAuthenticated(true);
        }
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    };

    authenticateUser();
  }, [dispatch, token]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!token || !authenticated) {
    return <Navigate to="/login" replace />;
  }
  if (userData.role?.toLowerCase() === "user") {
    return <Navigate to="/" replace />;
  }

  if (location.pathname === "/admin/user") {
    if (userData.role?.toLowerCase() === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return element;
};
