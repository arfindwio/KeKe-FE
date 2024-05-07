import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

// Redux Actions
import { getUserAuthenticateAction } from "../../../redux/action/users/UsersAction";
import { getAllNotificationsAction } from "../../../redux/action/notifications/NotificationsAction";

// Image
import Logo from "../../img/TravelesiaLogo.svg";

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

  const isMobile = useMediaQuery({ maxDeviceWidth: 539 });

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        await dispatch(getAllNotificationsAction());
        const user = await dispatch(getUserAuthenticateAction());
        if (!user) {
          CookieStorage.remove(CookiesKeys.AuthToken);
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
      {isMobile ? (
        <NavbarMobile />
      ) : (
        <header className="fixed z-50 flex w-full items-center justify-between border-b bg-neutral-5 px-10 py-2 shadow-md print:hidden lg:px-20">
          <div className="flex w-fit items-center justify-between">
            <Link to={"/"}>
              <img
                src={Logo}
                alt="Travelesia Logo"
                width={1}
                height={1}
                className="w-[5.3rem]"
              />
            </Link>
            <InputSearch />
          </div>
          <UserActionButton />
        </header>
      )}
    </>
  );
};
