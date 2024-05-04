import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// Redux Action
import { getUserAuthenticateAction } from "../../../redux/action/users/UsersAction";

// Cookie
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

// Icons
import { MdLogin } from "react-icons/md";
import { IoList } from "react-icons/io5";
import { FiBell } from "react-icons/fi";
import { LuUser } from "react-icons/lu";

export const UserActionButton = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const currentPath = location.pathname;
  const token = CookieStorage.get(CookiesKeys.AuthToken);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const user = await dispatch(getUserAuthenticateAction());
        if (!user) {
          CookieStorage.remove(CookiesKeys.AuthToken);
        }
      }
    };

    fetchData();
  }, [token, dispatch]);

  return (
    <>
      {token ? (
        <div className="flex items-center gap-6">
          <Link
            to={"/history"}
            className={`${
              currentPath === "/history" ? "text-neutral-1" : "text-neutral-3"
            }`}
          >
            <IoList size={25} />
          </Link>
          <Link
            to={"/notification"}
            className={`${
              currentPath === "/notification"
                ? "text-neutral-1"
                : "text-neutral-3"
            }`}
          >
            <FiBell size={23} />
          </Link>
          <Link
            to={"/account-profile"}
            className={`${
              currentPath === "/account-profile" ||
              currentPath === "/account-setting"
                ? "text-neutral-1"
                : "text-neutral-3"
            }`}
          >
            <LuUser size={25} />
          </Link>
        </div>
      ) : (
        <Link
          to={"/login"}
          className="relative flex rounded-xl bg-neutral-1 px-6 py-3 text-neutral-5 hover:bg-opacity-80"
        >
          <MdLogin size={20} className="absolute left-4" />
          <p className="pl-5 text-sm">Login</p>
        </Link>
      )}
    </>
  );
};
