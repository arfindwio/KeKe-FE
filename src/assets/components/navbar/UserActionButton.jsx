import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Cookie
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

// Icons
import { MdLogin } from "react-icons/md";
import { RiFileList2Line } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";

export const UserActionButton = () => {
  const location = useLocation();

  const notificationData = useSelector(
    (state) => state.notifications.notifications,
  );
  const cartData = useSelector((state) => state.carts.carts);

  const unreadNotifications = notificationData.filter(
    (notification) => !notification.isRead,
  );
  const totalItemCart = cartData.reduce((acc, item) => acc + item.quantity, 0);

  const currentPath = location.pathname;
  const token = CookieStorage.get(CookiesKeys.AuthToken);

  return (
    <>
      {token ? (
        <div className="flex items-center gap-2 md:gap-6">
          <Link
            to={"/notification"}
            className={`${
              currentPath === "/notification"
                ? "text-neutral-1"
                : "text-neutral-3"
            } relative`}
          >
            <FiBell size={23} />
            {unreadNotifications.length > 0 && (
              <p className="absolute -right-[6px] -top-2 rounded-full bg-alert-red px-[6px] py-[0.1px] text-xs font-bold text-neutral-5">
                {unreadNotifications.length}
              </p>
            )}
          </Link>
          <Link
            to={"/cart"}
            className={`${
              currentPath === "/cart" ? "text-neutral-1" : "text-neutral-3"
            } relative`}
          >
            <MdOutlineShoppingCart size={25} />
            {cartData.length > 0 && (
              <p className="absolute -right-2 -top-2 rounded-full bg-alert-red px-[4px] py-[0.1px] text-xs font-bold text-neutral-5">
                {totalItemCart}
              </p>
            )}
          </Link>
          <Link
            to={"/history"}
            className={`${
              currentPath === "/history" ? "text-neutral-1" : "text-neutral-3"
            }`}
          >
            <RiFileList2Line size={25} />
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
