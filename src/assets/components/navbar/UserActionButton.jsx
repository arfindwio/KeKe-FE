import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { logoutUserAction } from "../../../redux/action/users/UsersAction";

// Cookie
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

// Icons
import { TbShirt } from "react-icons/tb";
import { RiFileList2Line } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";

// Material Tailwind
import { Menu, MenuHandler, MenuList } from "@material-tailwind/react";

export const UserActionButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleLogout = () => {
    dispatch(logoutUserAction());
    navigate("/login");
  };

  return (
    <>
      {token ? (
        <div className="flex items-center gap-2 md:gap-6">
          <Link
            to={"/product"}
            className={`${
              currentPath === "/product" ? "text-neutral-1" : "text-neutral-3"
            }`}
          >
            <TbShirt size={25} />
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
          <Menu allowHover>
            <MenuHandler>
              <button
                className={`${
                  currentPath === "/account-profile" ||
                  currentPath === "/account-setting" ||
                  currentPath === "/history" ||
                  currentPath === "/notification"
                    ? "text-neutral-1"
                    : "text-neutral-3"
                } outline-none`}
              >
                <LuUser size={25} />
              </button>
            </MenuHandler>
            <MenuList className="flex flex-col gap-1">
              <Link
                to={"/account-profile"}
                className={`${
                  currentPath === "/account-profile" ||
                  currentPath === "/account-setting"
                    ? "text-neutral-1"
                    : "text-neutral-3"
                } flex w-full items-center gap-1 rounded-md p-1 outline-none hover:bg-slate-100`}
              >
                <LuUser size={20} />
                <p>Account</p>
              </Link>
              <Link
                to={"/history"}
                className={`${
                  currentPath === "/history"
                    ? "text-neutral-1"
                    : "text-neutral-3"
                } flex w-full items-center gap-1 rounded-md p-1 outline-none hover:bg-slate-100`}
              >
                <RiFileList2Line size={20} />
                <p>History</p>
              </Link>
              <Link
                to={"/notification"}
                className={`${
                  currentPath === "/notification"
                    ? "text-neutral-1"
                    : "text-neutral-3"
                } flex w-full items-center gap-1 rounded-md p-1 outline-none hover:bg-slate-100`}
              >
                <FiBell size={20} />
                <p className="mr-auto">Notification</p>
                {unreadNotifications.length > 0 && (
                  <p className="rounded-full bg-alert-red px-[6px] py-[0.1px] text-xs font-bold text-neutral-5">
                    {unreadNotifications.length}
                  </p>
                )}
              </Link>
              <hr className="my-2 border-blue-gray-50" />
              <button
                className="flex w-full items-center gap-1 p-1 text-neutral-3 outline-none hover:bg-slate-100"
                onClick={handleLogout}
              >
                <LuLogOut size={20} />
                Logout
              </button>
            </MenuList>
          </Menu>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link
            to={"/login"}
            className="relative flex rounded-lg border border-neutral-1 bg-neutral-5 px-4 py-3 font-semibold text-neutral-1 hover:bg-neutral-1 hover:text-neutral-5"
          >
            <p className="text-sm">Login</p>
          </Link>
          <Link
            to={"/register"}
            className="relative flex rounded-lg border border-neutral-5 bg-neutral-1 px-4 py-3 font-semibold text-neutral-5 hover:border-neutral-1 hover:bg-neutral-5 hover:text-neutral-1"
          >
            <p className="text-sm">Register</p>
          </Link>
        </div>
      )}
    </>
  );
};
