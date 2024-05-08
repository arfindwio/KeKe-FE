import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { logoutUserAction } from "../../../redux/action/users/UsersAction";

// Material Tailwind
import { Dialog, DialogBody } from "@material-tailwind/react";

// Icons
import { LuHome } from "react-icons/lu";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { LiaClipboardListSolid } from "react-icons/lia";
import { FiBell } from "react-icons/fi";
import { PiUserCircle } from "react-icons/pi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { TbSettings } from "react-icons/tb";
import { TbShirt } from "react-icons/tb";
import { LuLogOut } from "react-icons/lu";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

export const NavbarMobile = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const notificationData = useSelector(
    (state) => state.notifications.notifications,
  );
  const cartData = useSelector((state) => state.carts.carts);

  const currentPath = location.pathname;
  const token = CookieStorage.get(CookiesKeys.AuthToken);

  const totalItemCart = cartData.reduce((acc, item) => acc + item.quantity, 0);
  const unreadNotifications = notificationData.filter(
    (notification) => !notification.isRead,
  );

  return (
    <>
      <div className="fixed bottom-0 z-50 flex w-full items-start justify-between border-t bg-neutral-5 pb-1 pt-3 shadow-md">
        <Link
          to={"/"}
          className={`${
            currentPath === "/" ? "text-neutral-1" : "text-neutral-3"
          } ${
            token ? " w-[24.5%]" : "w-[33%]"
          } flex flex-col items-center justify-center gap-1 break-all text-center`}
        >
          <LuHome size={25} />
          <p className="text-xs font-medium">Home</p>
        </Link>
        <Link
          to={"/product"}
          className={`${
            currentPath === "/product" ? "text-neutral-1" : "text-neutral-3"
          } ${
            token ? " w-[24.5%]" : "w-[33%]"
          } flex flex-col items-center justify-center gap-1 break-all text-center`}
        >
          <TbShirt size={25} />
          <p className="text-xs font-medium">Product</p>
        </Link>
        {token && (
          <>
            <Link
              to={"/cart"}
              className={`${
                currentPath === "/cart" ? "text-neutral-1" : "text-neutral-3"
              } ${
                token ? " w-[24.5%]" : "w-[33%]"
              } flex flex-col items-center justify-center`}
            >
              <div className="relative flex h-full w-fit flex-col gap-1 break-all text-center">
                <MdOutlineShoppingCart size={25} />
                <p className="text-xs font-medium">Cart</p>
                {cartData.length > 0 && (
                  <p className="absolute -top-2 right-0 rounded-full bg-alert-red px-[4px] py-[0.1px] text-xs font-bold text-neutral-5">
                    {totalItemCart}
                  </p>
                )}
              </div>
            </Link>
          </>
        )}
        {!token ? (
          <Link
            to={"/login"}
            className={`flex w-[33%] flex-col items-center justify-center gap-1 break-all text-center text-neutral-3`}
          >
            <PiUserCircle size={25} />
            <p className="text-xs font-medium">Login</p>
          </Link>
        ) : (
          <button
            className={`${
              currentPath === "/account-profile" ||
              currentPath === "/account-setting" ||
              currentPath === "/notification" ||
              currentPath === "/history"
                ? "text-neutral-1"
                : "text-neutral-3"
            } flex w-[24.5%] flex-col items-center justify-center gap-1 break-all text-center`}
            onClick={() => setOpen(!open)}
          >
            <PiUserCircle size={25} />
            <p className="text-xs font-medium">Account</p>
          </button>
        )}
      </div>
      <Dialog open={open} handler={() => setOpen(!open)}>
        <DialogBody>
          <Link
            to={"/account-profile"}
            className={`${
              currentPath === "/account-profile"
                ? "border-neutral-1 text-neutral-1"
                : "border-slate-300 hover:border-neutral-1 hover:text-neutral-1"
            } flex cursor-pointer items-center gap-3 border-b-2 py-4`}
          >
            <FiEdit3 size={25} className="text-neutral-1" />
            <div className="text-md font-semibold">Profile</div>
          </Link>
          <Link
            to={"/account-setting"}
            className={`${
              currentPath === "/account-setting"
                ? "border-neutral-1 text-neutral-1"
                : "border-slate-300 hover:border-neutral-1 hover:text-neutral-1"
            } flex cursor-pointer items-center gap-3 border-b-2 py-4`}
          >
            <TbSettings size={25} className="text-neutral-1" />
            <div className="text-md font-semibold">Setting</div>
          </Link>
          <Link
            to={"/notification"}
            className={`${
              currentPath === "/notification"
                ? "border-neutral-1 text-neutral-1"
                : "border-slate-300 hover:border-neutral-1 hover:text-neutral-1"
            } relative flex cursor-pointer items-center gap-3 border-b-2 py-4`}
          >
            <FiBell size={25} className="text-neutral-1" />
            <div className="text-md font-semibold">Notification</div>
            {unreadNotifications.length > 0 && (
              <p className="absolute right-2 top-5 rounded-full bg-alert-red px-2 py-[1.5px] text-xs font-bold text-neutral-5">
                {unreadNotifications.length}
              </p>
            )}
          </Link>
          <Link
            to={"/history"}
            className={`${
              currentPath === "/history"
                ? "border-neutral-1 text-neutral-1"
                : "border-slate-300 hover:border-neutral-1 hover:text-neutral-1"
            } flex cursor-pointer items-center gap-3 border-b-2 py-4`}
          >
            <LiaClipboardListSolid size={25} className="text-neutral-1" />
            <div className="text-md font-semibold">History</div>
          </Link>
          <button
            className="flex w-full cursor-pointer items-center gap-3 border-b-2 border-slate-300 py-4 hover:border-neutral-1 hover:text-neutral-1"
            onClick={() => {
              dispatch(logoutUserAction());
              setOpen(!open);
            }}
          >
            <LuLogOut size={25} className="text-neutral-1" />
            <div className="text-md font-semibold">Logout</div>
          </button>
        </DialogBody>
      </Dialog>
    </>
  );
};
