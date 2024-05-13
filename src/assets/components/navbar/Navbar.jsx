import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

// Redux Actions
import {
  getUserAuthenticateAction,
  logoutUserAction,
} from "../../../redux/action/users/UsersAction";
import { getAllNotificationsAction } from "../../../redux/action/notifications/NotificationsAction";

// Image
import Logo from "../../img/Logo1.svg";

// Components
import { InputSearch } from "./InputSearch";
import { UserActionButton } from "./UserActionButton";
import { NavbarMobile } from "./NavbarMobile";

// Cookie
import { CookiesKeys, CookieStorage } from "../../../utils/cookie";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const googleTokenValue = queryParams.get("googleToken");
  const token = CookieStorage.get(CookiesKeys.AuthToken);

  const isMobile = useMediaQuery({ maxDeviceWidth: 719 });

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        await dispatch(getAllNotificationsAction());
        const user = await dispatch(getUserAuthenticateAction());
        if (!user) {
          await dispatch(logoutUserAction());
        }
      }
    };

    fetchData();
  }, [token, dispatch]);

  useEffect(() => {
    if (googleTokenValue) {
      CookieStorage.set(CookiesKeys.AuthToken, googleTokenValue);
      navigate("/");
    }
  }, [googleTokenValue, navigate]);

  return (
    <>
      <header className="fixed z-50 flex w-full items-center justify-between border-b bg-neutral-5 px-4 py-2 shadow-md print:hidden sm:px-10 lg:px-20">
        <div className="flex w-full items-center justify-between md:w-fit">
          <Link to={"/"}>
            <img
              src={Logo}
              alt="KeKe Logo"
              width={1}
              height={1}
              className="w-[2.8rem]"
            />
          </Link>
          <InputSearch />
        </div>
        <div className="hidden md:flex">
          <UserActionButton />
        </div>
      </header>
      {isMobile && <NavbarMobile />}
    </>
  );
};
